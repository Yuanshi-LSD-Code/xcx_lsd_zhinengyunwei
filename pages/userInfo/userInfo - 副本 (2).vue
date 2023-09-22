<template>
	<view class="main-content">
		<view class="head-content">
			<!-- #ifdef MP-WEIXIN -->
			<top :topHeight="topHeight" :isShowIcon="true" textAlign='center' leftColor='#000000' :topTitle='topTitle'
				backgroundColor='#ff0000' fontSize='40rpx' topTitleColor='#ffffff' @handleBack='handleBack'></top>
			<view style="width: 100%;" :style="{height:topHeight}"></view>
			<!-- #endif -->

			<view style="height: 80rpx;background-color: #ff0000;">
				<view style="text-align: center;line-height: 100rpx;color: #FFFFFF;">以车会友,以友会商</view>
			</view>


			<view class="main" style="height: auto;">

				<view class="main_foot" style="">
					<view class="main_foot_con" style="padding: 20rpx;">

						<u-form :model="form" ref="uForm" label-width="80px" label-position="left">

							<u-form-item label="姓名" prop="form.name" borderBottom ref="item1">
								<u--input v-model="form.name" border="none"></u--input>
							</u-form-item>
							<u-form-item label="性别" prop="form.name" borderBottom ref="item1">
								<u--input v-model="form.name" border="none"></u--input>
							</u-form-item>

							<u-form-item label="手机号" prop="form.name" borderBottom ref="item1">
								<u--input v-model="form.name" border="none"></u--input>
							</u-form-item>
							<u-form-item label="身份证号" prop="form.name" borderBottom ref="item1">
								<u--input v-model="form.name" border="none"></u--input>
							</u-form-item>

							<!-- <u-button type="" size="small" text="提交"></u-button> -->
							<!-- <u-button @click="submit">提交</u-button> -->
							
							<!-- <button @tap="submit">确认</button> -->
							<!-- <view style="display: flex;justify-content:center;width: 100px;height: 20px;"> -->
								<!-- <view style="align-items: center;"> -->
								<view style="display: flex;justify-content: center;">
										<button class="button_confirm" @tap="submit">确认</button>
								</view>
								
								<!-- </view> -->
								
							<!-- </view> -->


						</u-form>
					</view>



				</view>

			</view>

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
				isOldUser: uni.getStorageSync('isOldUser') || false,
				topHeight: this.header_height,
				popupheight: (uni.getSystemInfoSync().windowHeight * (750 / uni.getSystemInfoSync().windowWidth)), //转rpx
				topTitle: "赛车聚友俱乐部",
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
				form: {}


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
		}

	}
</script>

<style lang="less" scoped>
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
	.button_confirm{
		margin: 80rpx 32rpx 40rpx;
		height: 70rpx;
		width: 250rpx;
		background: rgba(46, 191, 118, 1);
		box-shadow: 0 3rpx 24rpx 0 rgba(46, 191, 118, 0.45);
		border-radius: 5px;
		font-size: 30rpx;
		color: #fff;
		line-height: 70rpx;
	}
	  
</style>
