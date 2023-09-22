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
		
		<view class="main" style="background-color:#232323 ;">
		
			<u-form :labelStyle="labelStyle" :model="form" ref="uForm" label-width="80px" :border-bottom="false"
				label-position="left">
				<u-form-item  label="车牌号:" prop="form.card" borderBottom>
					<u--textarea v-model="form.card" height="20" placeholder="请输入车牌号"  :auto-height="false" />
				</u-form-item>
				<u-form-item label="故障现象:" prop="form.content"  borderBottom>
					<u--textarea v-model="form.content" placeholder="请输入故障现象号" />
				</u-form-item>
				<!-- <u-button type="" size="small" text="提交"></u-button> -->
					
			</u-form>
			<view class="w_100 mt_30 h_100 display_j">
				<view class="" style="width: 220rpx;height: 70rpx;">
					<u-button  text="提交" @click="form_sumbit()"  hover-class="none"></u-button>
				</view>
				
			</view>
		
		</view>
		<view class="w_100" style="height: 120rpx;">
			
		</view>
		<copyright></copyright>

		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<view class="popup_top display_J" >
					<text>授权手机号</text>
				</view>
				<view class="display_J">
					<text>为了您的权益请先授权手机号</text>
				</view>
				<view class="display_sb" style="margin-top: 50rpx;display: flex;">
					<!-- <view class="display_J btns_1" @click="cancel" style="text-align: center;">
						<text style="text-align: center;">取消</text>
					</view> -->
					<view class="display_J btns_2"  @click="cancel">
						<text class="text-align">取消</text>
					</view>
					<button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" class="display_J btns_1"
						style="background-color: #46C67B;border: none;" @click="confirm">
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
				tel: uni.getStorageSync('tel') || false,
				isOldUser: uni.getStorageSync('isOldUser') || false,
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
				labelStyle:{
					color:'#fff'
				}


			}

		},
		created() {
			console.log(2323);
		},
		onLoad(option) {
			if (option.params) {
				this.params = JSON.parse(option.params);
			}
			console.log(5555)
			// console.log([0])
			console.log(this)
			// this.$refs.popup.open()
		},
		methods: {
			form_sumbit(){
				if(!this.form.card) {
					this.$_toast('请输入车牌号')
					return false
				}
				if(!this.form.content) {
					this.$_toast('请输入故障内容')
					return false
				}
				if(!this.tel){
					this.$refs.popup.open();
					return false;
				}
				
				this.$http('reapirApply',this.form).then(res=>{
			
					uni.showToast({
						title: '提交成功！'
					})
				this.timer = setTimeout(() => {
					this.$_back();
				}, 2000)
					
				})
				
			},
			confirm() {
				console.log(44444)
				console.log(this.form)
				this.$refs.popup.close()
			},
			cancel() {
				this.$refs.popup.close()
			},

            decryptPhoneNumber(e){
				if(e.detail.encryptedData){
					this.$http('update_phone',{
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv
					},'post').then(res=>{
						if(res.code==200){
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
		}

	}
</script>

<style lang="less" scoped>
	.page{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.main{
		width: 690rpx;
		padding: 30rpx;
		margin-top: 30rpx;
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
</style>
