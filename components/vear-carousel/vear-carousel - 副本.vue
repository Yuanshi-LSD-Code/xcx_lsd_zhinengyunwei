<template>
	<swiper class="image-container" style="margin-top: 100rpx;" previous-margin="55rpx" next-margin="55rpx" interval="2000" circular autoplay @change="swiperChange">
		<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" v-for="(item, index) in imgList" :key="item[urlKey]">
			<view class="main-list-item-left" style="border-color: #000000;">
					<image :src="item.avatar" v-if="item.avatar" style="width: 88upx;height: 88upx;border-radius: 10upx;" mode="" @click.stop="click_avatar(item)"></image>
					<image class="sign" v-if="item.vip==2" src="/static/image/open_vip_icon_1.png" mode=""></image>
					<image class="sign" v-if="item.vip==3" src="/static/image/open_vip_icon_2.png" mode=""></image>
					<image class="sign" v-if="item.vip==4" src="/static/image/open_vip_icon_3.png" mode=""></image>
				</view>
				<view class="main-list-item-right">
					<view class="row1">
						<view class="row1-left">
							<view class="row1-left-title wrap_1" >
								{{item.title}}
							</view>
							<view class="row1-left-icon">
								<view class="item-icon" v-if="item.is_margin">
									<image src="../../static/image/item_icon_1.png" style="width: 30rpx; height: 30rpx;border-radius: 0upx;" mode=""></image>
								</view>
								<view class="item-icon" v-if="item.is_recom">
									<!-- <image src="../../static/image/item_icon_3.png" mode="" style="width: 26rpx;height: 26rpx;"></image> -->
									<image src="../../static/image/item_icon_3.png" style="width: 30rpx; height: 30rpx;border-radius: 0upx;" mode=""></image>
								</view>
								<view class="item-icon" v-if="item.is_top">
									<image src="../../static/image/item_icon_2.png" style="width: 30rpx; height: 30rpx;border-radius: 0upx;" mode=""></image>
								</view>
							</view>
						</view>
						<view class="row1-right c_red f_26">
							<text class="row1-right-1 c_red">￥</text>
							<text  class="row1-right-2 c_red">{{item.money}}</text>
						</view>
					</view>
					<view class="row2 border-bottom">
						<view class="row2-left">
							<view class="row2-left-tag tag1">
								{{item.type_text}}
							</view>
							<view class="row2-left-tag">
								{{item.project_text}}
							</view>
							<view class="row2-left-gray" style="margin-right: 30rpx;">
								<text class="text">{{item.earned_num}}人已赚</text>
								<text class="line">|</text>
								<text class="text">剩余{{item.surplus_num}}</text>
							</view>
						</view>
						<!-- <view class="row2-right" v-if="item.red_envelope==2" @click.stop="onRed(item)">
							<image src="../../static/image/red_en.png" mode="" ></image>
						</view> -->
					</view>
				</view>
			</view>
			<!-- <image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'" :src="item[urlKey]" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''" mode="aspectFill"></image> -->
		</swiper-item>
	</swiper>
</template>
<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default() {
					return []
				}
			},
			urlKey: {
				type: String,
				default() {
					return ''
				}
			},
		},
		data() {
			return {
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
				this.$emit('selected', e, this.currentIndex)
			},
			clickImg(item) {
				this.$emit('selected', item, this.currentIndex)
			}
		}
	}
</script>
<style scoped>
	.image-container {
		width: 750rpx;
		height: 350rpx;
	}

	.item-img {
		width: 630rpx;
		height: 300rpx;
		border-radius: 14rpx;
		animation: to-big .3s;
	}

	.swiper-item {
		width: 630rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img-side {
		width: 630rpx;
		height: 260rpx;
		border-radius: 14rpx;
		animation: to-mini .3s;
	}

	.swiper-item-side {
		width: 630rpx;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@keyframes to-mini
	{
		from {
			height: 300rpx;
		}
		to {
			height: 260rpx;
		}
	}
	@keyframes to-big
	{
		from {
			height: 260rpx;
		}
		to {
			height: 300rpx;
		}
	}
	
	
	
	.main-list-item-left{
		padding: 0 30rpx;
		flex-shrink: 0;
		position: relative;
		image{
			width: 89rpx;
			height: 89rpx;
			border-radius: 50%;
		}
		.sign{
			position: absolute;
			width: 30rpx;
			height: 30rpx;
			bottom: 20rpx;
			right: 25rpx;
		}
	}
	.main-list-item-right{
		flex-grow: 1;
		padding-right: 30rpx;
	}
	.row1{
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.row1-left{
		display: flex;
		// align-items: flex-end;
		font-size: 32rpx;
		line-height: 40rpx;
	}
	.row1-left-icon{
		display: flex;
		margin-left: 8rpx;
	}
	.item-icon{
		display: flex;
		align-items: center;
		margin-left: 8rpx;
		image{
			width: 30rpx; 
			height: 30rpx;
		}
	}
	.row1-right{
		display: flex;
		align-items: flex-end;
	}
	.c_red{
		color: red;
	}
	.row1-right-1{
		font-size: 32rpx;
		line-height: 32rpx;
	}
	.row1-right-2{
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: bold;
	}
	.row2{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-top: 10rpx;
		padding-bottom: 20rpx;
	}
	.row2-left{
		display: flex;
		align-items: center;
	}
	.row2-left-tag{
		font-size: 24rpx;
		line-height: 24rpx;
		height: 40rpx;
		padding: 0 16rpx;
		border-radius: 20rpx;
		color: #68696B;
		background-color: #f5f5f5;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&.tag1{
			margin-right: 14rpx;
		}
	}
	.row2-left-gray{
		font-size: 26rpx;
		color: #BCBDBF;
		line-height: 26rpx;
	}
	.row2-right{
		padding:0 10rpx;
		height: 40rpx;
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
	.row1-left-title{
		font-size: 30rpx;
	}
</style>
