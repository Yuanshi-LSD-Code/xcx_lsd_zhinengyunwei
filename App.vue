<script>
	import Vue from 'vue'
	import appInit from './library/appInit.js'
	import storage from 'library/storage.js'
	import api from './library/api.js'
	export default {
		globalData: {
			isFirstInApp: uni.getStorageSync("isFirstInApp") === '' ? true : false,
			isLogin: false, //是否登陆,全局的登陆状态
			isShowUpdate: false,
			mobileType: '', //平台标识
			clientId: '', // 推送相关的cid
			uuid: '', //设备唯一标识 
			server_tel: '', //设备唯一标识 
			copyright:'',
			downTask(url) {
				console.log(url);
				return new Promise((resolve, reject) => {
					// 创建下载任务
					let dtask = plus.downloader.createDownload(
						url, {}, (d, status) => {
							console.log(d, status);
							if (status == 200) {

								plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, (
									error) => {
									uni.showToast({
										title: '安装失败',
										icon: 'none',
										mask: false,
										duration: 1500
									})
								})
							} else {
								uni.showToast({
									title: '更新失败',
									icon: 'none',
									mask: false,
									duration: 1500
								})
							}
						});
					try {
						// 开始下载
						dtask.start()
						var prg = 0;
						var showLoading = plus.nativeUI.showWaiting("正在下载", {
							back: "none"
						}); //创建一个showWaiting对象 
						dtask.addEventListener('statechanged', function(
							task,
							status
						) {
							// 给下载任务设置一个监听 并根据状态  做操作
							switch (task.state) {
								case 1:
									showLoading.setTitle("正在下载");
									break;
								case 2:
									showLoading.setTitle("已连接到服务器");
									break;
								case 3:
									prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task
										.totalSize)) * 100);
									showLoading.setTitle("  正在下载" + prg + "%  ");
									break;
								case 4:
									plus.nativeUI.closeWaiting();
									//下载完成
									resolve(true)
									break;
							}
						});
					} catch (e) {
						plus.nativeUI.closeWaiting();
						uni.showToast({
							title: '更新失败',
							icon: "none",
							mask: false,
							duration: 1500
						});
						resolve(false)

					}
				})
				console.log('创建下载任务');
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			var info = plus.push.getClientInfo();
			this.globalData.clientId = info.clientid;
			console.log(this.globalData.clientId);
			// 监听推送点击事件
			plus.push.addEventListener('click', (msg) => {
				if (this.$u.os() == 'ios') {
					if (typeof msg.payload == 'object' && typeof msg.payload.payload == 'object') {
						// 代表是后台的app点击进来的
						this.handlePush(msg.payload)
					} else {
						let obj = {}
						obj = JSON.parse(msg.payload)
						console.log(obj);
						this.handlePush(obj)
					}

				} else {
					this.handlePush(msg)
				}
			});
			plus.push.addEventListener('receive', (msg) => {
				console.log(msg);
				// ios监听到推送进行创建推送 在app内不会有推送消息
				if (this.$u.os() == 'ios' && msg.type == 'receive') {
					this.createMsg(msg)
				}
			})
			// #endif 
			// var info = plus.push.getClientInfo();
			// console.log(info);
			// let clientId = info.clientid;
			// console.log(info.clientid);
			// 获取手机屏幕高度
			uni.getSystemInfo({
				success: e => {
					Vue.prototype.screenHeight = e.windowHeight;
					Vue.prototype.screenWidth = e.windowWidth;
					Vue.prototype.header_height = (uni.getSystemInfoSync().statusBarHeight * (750 / uni
							.getSystemInfoSync().windowWidth)) +
						100 + 'rpx';
					Vue.prototype.header_h = (uni.getSystemInfoSync().statusBarHeight * (750 / uni
							.getSystemInfoSync().windowWidth)) +
						100;
					const model = e.model;
					const modelInclude = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX",
						"iPhone 11", "iPhone 11 Pro",
						"iPhone 11 Pro MAX"
					];
					console.log(444)
					console.log(Vue.prototype)
					var flag = false;
					for (let i = 0; i < modelInclude.length; i++) {
						//模糊判断是否是modelInclude 中的机型,因为真机上测试显示的model机型信息比较长无法一一精确匹配
						if (model.indexOf(modelInclude[i]) != -1) {
							flag = true
						}
					}
					if (flag) {
						Vue.prototype.isIphoneX = flag
					}
				}
			})


            let base = this.base()
			
			
			
			let res =  this.login()
			console.log(777777);
			// if (res.code == 200) {
			// 	console.log(77788887);
			// 	this.globalData.token = res.data.token
			// 	this.globalData.platform = res.data.platform
			// 	this.globalData.id = res.data.id
			// 	this.globalData.uid = res.data.uid
			// 	this.globalData.tel = res.data.tel
			// 	this.globalData.nickname = res.data.nickname
			// 	this.globalData.avatar = res.data.avatar

			// 	uni.setStorageSync('token', res.data.token)
			// 	uni.setStorageSync('platform', res.data.platform)
			// 	uni.setStorageSync('id', res.data.id)
			// 	uni.setStorageSync('uid', res.data.uid)
			// 	uni.setStorageSync('tel', res.data.tel)
			// 	uni.setStorageSync('nickname', res.data.nickname)
			// 	uni.setStorageSync('avatar', res.data.avatar)
			// 	uni.setStorageSync('isLogin', true)
			// 	this.globalData.isLogin = true
			// 	console.log(6666666666)
			// 	console.log(this.globalData.isLogin)
			// 	uni.$emit('app', {
			// 		msg: '更新了'
			// 	})
			// } else {
			// 	uni.setStorageSync('isLogin', false)
			// 	this.globalData.isLogin = false
			// }
			console.log(77779999977);
            console.log(this.globalData)
			//app初始化
			appInit();
			//初始化登陆状态
			this.initIsLogin();

			uni.getSystemInfo({
				success: (res) => {
					// console.log(res);
					if (res.platform == 'android') {
						// this.checkUpdate('android')
						this.globalData.mobileType = 'android'
					} else if (res.platform == 'ios') {
						// this.checkUpdate('ios') 
						this.globalData.mobileType = 'ios'
					}
				}
			});
			
			


		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			getDeveiceCode() {
				// #ifdef APP-PLUS
				const that = this
				plus.device.getInfo({
					success: function(e) {
						that.globalData.uuid = e.uuid
						// console.log(api);
						// api.userUpdate(this.globalData.mobileType,this.globalData.uuid)
					},
					fail: function(e) {
						console.log('getDeviceInfo failed: ' + JSON.stringify(e));
					}
				});
				// #endif

			},
			createMsg(msg) {
				// console.log(msg);
				let dataStr = JSON.stringify(msg)
				plus.push.createMessage(msg.content, dataStr);
			},
			handlePush(msg) {
				let {
					type,
					chatroom_id,
					uid1,
					uid2
				} = msg.payload.data
				uni.navigateTo({
					url: `/pages/chatInfo/chatInfo?type=${type}&chatroom_id=${chatroom_id}&uid1=${uid1}&uid2=${uid2}`
				})
			},
			// 判断是否登陆，当有token的时候为登陆状态
			initIsLogin() {
				const token = storage.getTokenData();
				let flag = false;
				if (token) {
					flag = true;
				}
				this.set_isLogin(flag);
				this.getDeveiceCode()
			},
			set_isLogin(boll = fasle) {
				this.globalData.isLogin = boll;
				if (this.globalData.isLogin == false) {
					uni.removeStorageSync("tokenData")
					uni.removeStorageSync("userInfo")
				}
			},
			get_isLogin() {
				return this.globalData.isLogin;
			},

			login() {
				return new Promise((r, j) => {
					uni.login({
						success: async (loginInfo) => {
							let res = await this.$http('loginCode', {
								code: loginInfo.code
							});
							
							if (res.code == 200) {
								console.log(88888)
								
								this.globalData.token = res.data.token
								this.globalData.platform = res.data.platform
								this.globalData.id = res.data.id
								this.globalData.uid = res.data.uid
								this.globalData.tel = res.data.tel
								this.globalData.nickname = res.data.nickname
								this.globalData.avatar = res.data.avatar
								this.globalData.wx_mini_openid = res.data.wx_mini_openid
							
								uni.setStorageSync('token', res.data.token)
								uni.setStorageSync('platform', res.data.platform)
								uni.setStorageSync('id', res.data.id)
								uni.setStorageSync('uid', res.data.uid)
								uni.setStorageSync('tel', res.data.tel)
								uni.setStorageSync('nickname', res.data.nickname)
								uni.setStorageSync('avatar', res.data.avatar)
								uni.setStorageSync('wx_mini_openid', res.data.wx_mini_openid)
								uni.setStorageSync('isLogin', true)
								this.globalData.isLogin = true
								this.$storage.setTokenData(res.data);
								uni.$emit('app', {
									msg: '更新了'
								})
								this.$store.dispatch('user/info',res.data);
								// this.$isResolve();
							} else {
								uni.setStorageSync('isLogin', false)
								this.globalData.isLogin = false
							}
							
							r(res)
						}
					})
				})
			},
			
			async base() {
				let res = await this.$http('base',{'type':'copyright,server_tel'});
				if(res.code == 200){
					
					this.globalData.copyright = res.data.copyright
					this.globalData.server_tel = res.data.server_tel
					
				}
				
				return res;
				
			},


		}
	}
</script>


<style lang="scss">
	// $themeColor: #ffb331;
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import url("./static/style/common.scss");
</style>
