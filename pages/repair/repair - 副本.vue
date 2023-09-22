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
			
		</view>
		<copyright></copyright>
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
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				curriculumList: [],
				isShowDefaultPage: false,
				scrollTop: 0,
				token: uni.getStorageSync('token') || null,
			
			}
	
		},
		created() {
			console.log(2323);
		}
	}
</script>

<style>

</style>
