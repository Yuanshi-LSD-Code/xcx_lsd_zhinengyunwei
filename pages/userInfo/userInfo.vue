<template>
	<view class="main-content page" style="background-color: #393939;">
		
		<!-- #ifdef MP-WEIXIN -->
		<top :topHeight="topHeight" :isShowIcon="true" textAlign='center' leftColor='#ffffff' :topTitle='topTitle' 
			 fontSize='40rpx' topTitleColor='#ffffff' @handleBack='handleBack'></top>
		<view style="width: 100%;" :style="{height:topHeight}"></view>
		<!-- #endif -->
		
		<view class="w_100 h_80 display_a" style="background-color: #232323">
			<text class="c_fff" style="margin-left: 160rpx;">加入乐途汇，养车更优惠</text>
		</view>
		<view class="main" style="height: auto;">
		
			<view class="main_foot" style="">
				<view class="main_foot_con" style="padding: 20rpx;">
		
					<u-form :labelStyle="labelStyle" :model="form" ref="uForm" label-width="80px" label-position="left">
		
						<u-form-item label="姓名" prop="nickname" borderBottom ref="item1">
							<input v-model="nickname"  style="color: #FFFFFF;"></input>
						</u-form-item>
						<!-- <u-form-item label="性别" prop="form.sex" borderBottom ref="item1">
							<u--input v-model="form.sex" border="none"></u--input>
						</u-form-item> -->
		
						<u-form-item label="性别" prop="sex" borderBottom ref="item1">
							<u-radio-group v-model="radiovalue6" @change="groupChange" >
								<u-radio labelColor="#ffffff" :customStyle="{marginRight: '16px'}" activeColor="#2D9CCF"
									v-for="(item, index) in radiolist6" :key="index" :label="item.name"
									:name="item.name" @change="radioChange">
								</u-radio>
							</u-radio-group>
		
						</u-form-item>
		
						<u-form-item label="手机号" prop="tel" borderBottom ref="item1">
							<u-input readonly="true" v-model="tel" border="none" color="#ffffff" >
								<template slot="suffix">
									<u-button open-type="getPhoneNumber" text="授权手机号"
										@getphonenumber="decryptPhoneNumber" class="display_J btns_2"
										style="background-color: #46C67B;border: none;" @click="confirm">
										<!-- <text class="">授权手机号</text> -->
									</u-button>
								</template>
							</u-input>
		
		
						</u-form-item>
						<u-form-item label="车牌号"  borderBottom ref="item1">
							<u--input  placeholder="请输入车牌号"  color="#ffffff" v-model="license_number" border="none"></u--input>
						</u-form-item>
						<u-form-item label="身份证号" prop="idcard" borderBottom ref="item1">
							<input v-model="idcard" placeholder="请输入身份证号码" style="color: #FFFFFF;" border="none"></input>
						</u-form-item>
						
						<view class="display_j w_100 h_100">
							<checkbox style="transform:scale(0.7)" :checked="privacyChecked" @click="privacyChecked=!privacyChecked"  />
							<text @click="privacyPolicyProtocol" style="color: #fff;">隐私正常及用户协议</text>
						</view>
					
		
		
						<!-- <u-button type="" size="small" text="提交"></u-button> -->
						<!-- <u-button @click="submit">提交</u-button> -->
		
						<!-- <button @tap="submit">确认</button> -->
						<!-- <view style="display: flex;justify-content:center;width: 100px;height: 20px;"> -->
						<!-- <view style="align-items: center;"> -->
						<view style="display: flex;justify-content: center;">
							<button class="button_confirm" @click="submit">确认</button>
						</view>
		
						<!-- </view> -->
		
						<!-- </view> -->
		
		
					</u-form>
				</view>
		
		
		
			</view>
		
		</view>
		
		<view class="w_100" style="height: 120rpx;">
			
		</view>
		<copyright></copyright>

		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<view class="popup_top display_J">
					<text>授权手机号</text>
				</view>
				<view class="display_J">
					<text>为了您的权益请先授权手机号</text>
				</view>
				<view class="display_sb" style="margin-top: 50rpx;display: flex;">
					<!-- <view class="display_J btns_1" @click="cancel" style="text-align: center;">
						<text style="text-align: center;">取消</text>
					</view> -->
					<view class="display_J btns_2" @click="cancel">
						<text class="text-align">取消</text>
					</view>
					<button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" class="display_J btns_1"
						style="background-color: #2D9CCF;border: none;" @click="confirm">
						<text class="">确认</text>
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				privacyChecked:true,
				labelStyle:{
					color:'#fff'
				},
				isLogin: uni.getStorageSync('isLogin') || false,
				topHeight: this.header_height,
				popupheight: (uni.getSystemInfoSync().windowHeight * (750 / uni.getSystemInfoSync().windowWidth)), //转rpx
				topTitle: "赛聚乐途汇",
				isShowInput: false,
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				curriculumList: [],
				isShowDefaultPage: false,

				curIndex: 0,

				orderList: [],
				pager: null,
				params: {},
				form: {},
				tel: '',
				nickname: '',
				sex: '',
				idcard: '',

				//横向排列形式数据
				radiolist6: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					},
					// {
					// 	name: '未知',
					// 	disabled: false
					// },

				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue6: '',
				type:'',
 

			}

		},
		created() {

		},
		onLoad(option) {
			if (option.params) {
				this.params = JSON.parse(option.params);
			}
			this.type=option.type?option.type:''
			
			console.log(2323);
			this.getUserInfo();


			// this.$refs.popup.open()
		},
		methods: {
			privacyPolicyProtocol(){
				console.log(111);	
				uni.navigateTo({
					url:'/pages/privacyPolicyProtocol/privacyPolicyProtocol'
				})
			},
			getUserInfo() {
				const res = this.$http('getUserInfo').then(res => {
					console.log(88888888888)
					console.log(res)
					if (res.code == 200) {
						this.nickname = res.data.user.nickname;
						this.sex = res.data.user.sex;
						this.tel = res.data.user.tel;
						this.idcard = res.data.user.idcard;
						if (this.sex == 0) {
							this.radiovalue6 = '未知';
						}
						if (this.sex == 2) {
							this.radiovalue6 = '女';
						}
						if (this.sex == 1) {
							this.radiovalue6 = '男';
						}
						console.log(7878788);
						console.log(this.form);
					}
				});

			},

			groupChange(n) {
				console.log('groupChange', n);
				if (n == '男') {
					this.sex = 1;
				} else if (n == '女') {
					this.sex = 2;
				} else {
					this.sex = 0;
				}
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			confirm() {
				this.$refs.popup.close()
			},
			cancel() {
				this.$refs.popup.close()
			},

			handleBack() {
				// var path = 'index';
				// if (this.params.path) {
				// 	path = this.params.path;
				// }
				// this.$_linkTo(path, this.params)

				uni.navigateBack({
					delta: 1
				})

			},
			submit() {
				console.log(33)
				console.log(this.form)
				if(!this.privacyChecked){
					uni.showToast({
						title: '请同意隐私正常及用户协议',
						icon:"none"
					})
					return false
				}
				if(!this.tel){
					uni.showToast({
						title: '请授权手机号',
						icon:"none"
					})
					return false
				}
				let form = {
					'nickname': this.nickname,
					'sex': this.sex,
					'tel': this.tel,
					'idcard': this.idcard,
				}
			
				this.$http('setMyInfo', form).then(res => {
					const app = getApp()
					app.globalData.nickname = this.nickname
					uni.setStorageSync('nickname', this.nickname)
					uni.showToast({
						title: '修改成功！'
					})
					setTimeout(()=>{
						if(this.type=="home"){
							uni.reLaunch({
								url:'/pages/home/home'
							})
						}else {
							this.$_back();
						}
					},500)
					// this.$_back();
				})
			},
			
			decryptPhoneNumber(e){
				if(e.detail.encryptedData){
					this.$http('update_phone',{
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv
					},'post').then(res=>{
						if(res.code==200){
							this.tel = res.data.mobile;
							uni.showToast({
								title: '授权成功！'
							})
							const app = getApp()
							uni.setStorageSync('tel', res.data.mobile)
							app.globalData.tel = res.data.mobile
							this.tel=res.data.mobile
						}
					})
				}
				
				console.log(e,888888);
			},
		}

	}
</script>

<style lang="scss" scoped>
	.page{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.popup {
		width: 560rpx;
		height: 380rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		background: #ffffff;
		border-radius: 8rpx;
	}

	.popup_top {
		width: 100%;
		height: 110rpx;
		font-weight: 700;
		font-size: 32rpx;
	}

	.btns_1 {
		box-sizing: border-box;
		width: 190rpx;
		height: 80rpx;
		background: #ffffff;
		border: 1rpx solid #ffffff;
		border-radius: 46rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16px;
		margin-right: 13px;
		border-radius: 48px;
		transition: all 0.3s;

	}

	.btns_2 {
		box-sizing: border-box;
		width: 160rpx;
		height: 50rpx;
		background: #ffffff;
		border: 1rpx solid #ffffff;
		border-radius: 46rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16px;
		margin-right: 13px;
		border-radius: 48px;
		transition: all 0.3s;

	}

	.btns_2 {
		box-sizing: border-box;
		width: 190rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #E0E1E3;
		margin-bottom: 16px;
		margin-right: 13px;
		border-radius: 48px;
		transition: all 0.3s;
		color: #333333;

	}

	.button_confirm {
		margin: 80rpx 32rpx 40rpx;
		height: 70rpx;
		width: 250rpx;
		background: #2D9CCF;
		box-shadow: 0 3rpx 24rpx 0 rgba(46, 191, 118, 0.45);
		border-radius: 5px;
		font-size: 30rpx;
		color: #fff;
		line-height: 70rpx;
	}
</style>
