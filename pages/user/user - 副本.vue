<template>
	<view class="main-content">
		<view class="head-content">
			<!-- #ifdef MP-WEIXIN -->
			<top :topHeight="topHeight" textAlign='left' leftColor='#ff0000' :topTitle='topTitle'
				backgroundColor='#ff0000' fontSize='40rpx' topTitleColor='#ffffff' @handleBack='handleBack'></top>
			<view style="width: 100%;" :style="{height:topHeight}"></view>
			<!-- #endif -->
			
			<view style="height: 80rpx;background-color: #ff0000;">
				<view style="margin-left: 160rpx;line-height: 100rpx;color: #FFFFFF;">以车会友,以友会商</view>
			</view>


			<!-- 头像 -->
			<view style="height: 100px;background-color: #FF0000;border-radius:0 0 50% 50%;">
				<view style="display: flex;">

					<view style="width: 50%;display: flex;height: 80px;margin-left: 20rpx;">
						<image src="../../static/image/icon/avatar.png" style="width: 50px;height: 50px;border-radius: 50%;"></image>
						
						<view class="" style="margin-top: 15px;margin-left: 15px;" v-if="!isLogin" >
						  <button  style="margin-left: 450rpx;" open-type='getUserInfo' @getuserinfo='getUserInfo' @click="login" >
								立即登录
						  </button>
						</view>
						
						<text style="margin-top: 15px;margin-left: 15px;" v-if="isLogin" >
							{{nickname}}}
						</text>
					</view>

					<view style="width: 50%;display: flex;justify-content: flex-end;margin-right: 15px;">
						<view style="margin-top: 15px;margin-right: 20px;" @click="linkToUserInfo()">
							设置
						</view>
						<view style="margin-top: 10px;">
							<image src="../../static/image/icon/go_to.png" style="width: 25px;height: 25px;" @click="linkToUserInfo()"></image>
						</view>
					</view>
					
				</view>
			</view>


			<!-- 预约查询 -->
			<view class="menu" style=""  @click="linkToReparaiList()">
				<view style="height: 60px;width: 60px;display: flex;flex-direction: column;margin-left: 20rpx;">
					<view style="border:1px solid #F00;width: 35px;height: 35px;border-radius: 50%;display: flex;justify-content: center;">
						<image src="../../static/image/icon/answer.png" style="width: 25px;height: 25px;margin-top: 3px;"></image>
					</view>
					
					<text >预约查询</text>
					
				</view>
			</view>


		</view>


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
				topTitle: "赛车聚友俱乐部",
				isShowInput: false,
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				curriculumList: [],
				isShowDefaultPage: false,
				scrollTop: 0,
				token: uni.getStorageSync('token') || null,
				nickname:'',
				avatar:'../../static/image/icon/avatar.png',
				
			
			}

		},
		created() {
			console.log(2323);
			const app = getApp()
			if(app.globalData.nickName){
				this.nickname = app.globalData.nickName;
			}else{
				this.avatar = app.globalData.avatar;
			}
			
			
		},
		methods:{
			linkToUserInfo() {
				
				this.$_linkTo('userInfo', {
					
					'params': {
						'_page': 'user',
						'navIndex': 3,
						'path': 'index'
					}
				})
			},
			
			linkToReparaiList() {
				
				this.$_linkTo('repairList', {
					
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

<style lang="less" scoped>
	.menu {
		height: 80px;
		text-shadow: 1px 1px 1px rgba(255, 255, 255, .1);
		border-radius: 0 0 10px 10px;
		box-shadow: 0px 5px 5px #bfbfbf;
		transition: all 0.15s ease;


	}
</style>
