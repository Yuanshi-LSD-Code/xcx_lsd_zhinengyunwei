<template>
	<view class="main-content page" style="background-color: #393939;">
		<!-- #ifdef MP-WEIXIN -->
		<top :topHeight="topHeight" textAlign='left' leftColor='#fffff' :topTitle='topTitle' fontSize='40rpx'
			topTitleColor='#ffffff' @handleBack='handleBack'></top>
		<view style="width: 100%;" :style="{height:topHeight}"></view>
		<!-- #endif -->
		<view class="w_100 h_80 display_a" style="background-color: #232323">
			<text class="c_fff" style="margin-left: 160rpx;">加入乐途汇，养车更优惠</text>
		</view>

		<view class="personal " style="width: 750rpx;"   @click="linkToUserInfo()">
			<view class="personal-main">
				<image :src="avatar" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view class="personal-info">
					<view class="ml_30">{{nickname|| '无'}}</view>
					<view class="" style="margin-left: 15px;" v-if="!isLogin">
						<button style="width: 120rpx;height: 60rpx;display: flex;" open-type='getUserInfo'
							bindgetuserinfo='bindGetUserInfo' @click="login">
							<text style="align-items: center;">立即登录</text>
						</button>
					</view>
				</view>
			</view>
			<image src="../../static/image/home/youjiantou.png" style="width: 30rpx;height: 40rpx;" mode=""></image>
		</view>

		<view class="personal" style="margin-top: 30rpx;"  @click="linkToReparaiList()">
			<view class="personal-main">
				<image src="../../static/image/icon/answer_blue.png" style="width: 60rpx;height: 60rpx;">
				</image>
				<view class="personal-info">
					<view class="ml_30">预约查询</view>
				</view>
			</view>
			<image src="../../static/image/home/youjiantou.png" style="width: 30rpx;height: 40rpx;" mode=""></image>
		</view>
		
		<button  v-if="avatar=='../../static/image/icon/avatar.png' || !nickname"   style="margin-top: 30rpx;" open-type='getUserInfo'
			bindgetuserinfo='bindGetUserInfo' @click="updateMember">
			<text style="align-items: center;">授权头像昵称</text>
		</button>




		<copyright></copyright>

	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				isLogin: uni.getStorageSync('isLogin') || false,
				topHeight: this.header_height,
				popupheight: (uni.getSystemInfoSync().windowHeight * (750 / uni.getSystemInfoSync().windowWidth)), //转rpx
				topTitle: "赛聚乐途汇",
				isShowInput: false,
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				curriculumList: [],
				isShowDefaultPage: false,
				scrollTop: 0,
				token: uni.getStorageSync('token') || null,
				nickname: '',
				avatar: '../../static/image/icon/avatar.png',

			}

		},
		onLoad() {
			const app = getApp()
			this.isLogin = app.globalData.isLogin
		},
		onShow() {
			const app = getApp()
			this.nickname = app.globalData.nickname?app.globalData.nickname:'';
			this.avatar = app.globalData.avatar ? app.globalData.avatar : '../../static/image/icon/avatar.png';
			this.isLogin = app.globalData.isLogin
		},
		methods: {
			updateMember(e){
				
				uni.getUserProfile({
					desc: '登录',
					success: (res) => {
						let info =JSON.parse(res.rawData)
						console.log();
						this.$http('updateMember',{
							nickName:info.nickName,
							avatarUrl:info.avatarUrl,
						}).then(res=>{
							const app = getApp()
							this.nickname=info.nickName
							this.avatar =info.avatarUrl
							uni.setStorageSync('avatar', info.nickName)
							app.globalData.nickname = info.nickName
						})
					},
					fail: (res) => {
						console.log(res)
					}
				});
			},
			login() {

				//新版登录方式
				var _this = this;
				uni.getUserProfile({
					desc: '登录',
					success: (res) => {
						console.log(res);
						_this.userInfo = res;
						_this.wxLogin();
					},
					fail: (res) => {
						console.log(res)
					}
				});
			},
			wxLogin(e) {
				let _this = this;
				console.log(_this.userInfo);
				let userInfo = _this.userInfo.userInfo
				let iv = _this.userInfo.iv
				let encryptedData = _this.encryptedData
				console.log(e);

				uni.login({
					provider: 'weixin',
					success: (data) => {
						let code = data.code
						console.log(data);
						_this.$http('login', {
							'code': code,
							'userInfo': userInfo,
							'encryptedData': encryptedData,
							'iv': iv
						}).then(res => {
							// that.$api.login(loginRes.code,infoRes.userInfo,infoRes.encryptedData,infoRes.iv).then(res => {
							if (res.code == 200) {
								const app = getApp()
								app.globalData.token = res.data.token
								app.globalData.platform = res.data.platform
								app.globalData.id = res.data.id
								app.globalData.uid = res.data.uid
								app.globalData.nickname = res.data.nickname
								app.globalData.avatar = res.data.avatar
								uni.setStorageSync('token', res.data.token)
								uni.setStorageSync('platform', res.data.platform)
								uni.setStorageSync('id', res.data.id)
								uni.setStorageSync('uid', res.data.uid)
								uni.setStorageSync('tel', res.data.tel)

								uni.setStorageSync('nickname', res.data.nickname)
								uni.setStorageSync('avatar', res.data.avatar)
								uni.setStorageSync('isLogin', true)
								app.globalData.isLogin = true
								this.$storage.setTokenData(res.data);

								_this.isLogin = true;
								_this.nickname = res.data.nickname;
								_this.avatar = res.data.avatar;

								uni.showToast({
									title: '请完善个人资料'
								})
								this.timer = setTimeout(() => {
									uni.navigateTo({
										url: '/pages/userInfo/userInfo'
									})
								}, 500)
								// that.init()
							} else {
								uni.showToast({
									title: res.msg
								})
							}

						})
					}
				})
			},
			linkToUserInfo() {

				this.$_isLoginTo('userInfo', {

					'params': {
						'_page': 'user',
						'navIndex': 3,
						'path': 'index'
					}
				})
			},

			linkToReparaiList() {

				this.$_isLoginTo('repairList', {

					'params': {
						'_page': 'user',
						'navIndex': 3,
						'path': 'index'
					}
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.page{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.personal {
		width: 690rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		background-color: #232322;
		color: #ffffff;
	}

	.personal-main {
		display: flex;
		align-items: center;
	}

	.personal-info {
		display: flex;
		flex-direction: column;
	}

	.u-avatar {
		margin-right: 30rpx;
	}

	.navbar-right {
		padding: 0 40rpx;
	}

	.navbar-right-icon {
		margin-left: 50rpx;
	}

	.hover-class {
		background-color: #efefef;
	}

	.n-p {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		margin-bottom: 20rpx;
	}

	.p-right-icon {
		padding: 0 40rpx;
	}

	.p-left {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		padding: 10rpx;
		margin: 20rpx;
		color: #FFFFFF;
		border-radius: 10rpx;

	}

	.p-right {
		height: 90rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main-name {
		font-size: 36rpx;
		font-weight: 500;
	}

	.p-right-main-time {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #9d9d9d;
	}

	.menu {
		height: 80px;
		text-shadow: 1px 1px 1px rgba(255, 255, 255, .1);
		border-radius: 0 0 10px 10px;
		box-shadow: 0px 5px 5px #bfbfbf;
		transition: all 0.15s ease;


	}
</style>
