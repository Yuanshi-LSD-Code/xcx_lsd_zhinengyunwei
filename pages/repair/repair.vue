<template>
	<view class="main-content page" style="background-color: #393939;">
		<!-- #ifdef MP-WEIXIN -->
		<top :topHeight="topHeight" textAlign='left' leftColor='#ffffff' :topTitle='topTitle' fontSize='40rpx'
			topTitleColor='#ffffff' @handleBack='handleBack'></top>
		<view style="width: 100%;" :style="{height:topHeight}"></view>
		<!-- #endif -->
		<view class="w_100 h_80 display_a" style="background-color: #232323">
			<text class="c_fff" style="margin-left: 160rpx;">加入乐途汇，养车更优惠</text>
		</view>
		<view class="tab-list w_100">
			<view v-for="(item,index) in tabList" :class="{'tab-item':true,'active':index == curIndex}"
				@click="clickTab(item,index)">
				<view class="name c_fff f_30 fw_500">{{item.cate_name}}</view>
				<view class="line"></view>
			</view>
		</view>
		<view class="d_f w_100">
			<view  style="color: #DFC276;" class="margin_left_20 margin_top_20 c_fff f_32 fw_700"  @click="linkToAdd()">
				在线预约
			</view>
			<view  style="color: #DFC276;"  class="margin_left_20 margin_top_20 c_fff f_32 fw_700"  @click="call()">
				一键拨打
			</view>

		</view>
		<view class="w_100 mt_20" style="color: #fff;">
			<text class="ml_20">在线预约&nbsp;&nbsp;点击“在线预约”选取您要办理的</text>
		</view>

		<view class="list w_100" >
			<view class="item  " v-for="(item,index) in dataList" :key="index" @click="linkTo(item,index)">
				<image :src="item.cover" mode="" style="width: 270rpx;height: 270rpx;"></image>
				<text class="mt_20 c_fff">{{item.title}}</text>
				<text class="mt_20 f_26 c_fff">{{item.introduction}}</text>
			</view>
		</view>

 <view class="w_100" style="height: 120rpx;">
        	
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
				topTitle: "赛聚乐途汇",
				isShowInput: false,
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				curriculumList: [],
				isShowDefaultPage: false,

				curIndex: 0,
				tabList: [{
						name: '快修服务',
						status: '1'
					},

				],
				orderList: [],
				pager: null,
				dataList: [{
						'name': '补漆喷漆',
						'img': '../../static/image/repair.png',
						'title': '特色钣喷，选用优质原材料',
					},
					// {
					// 	'name':'补漆喷漆',
					// 	'img':'../../static/image/repair.png',
					// 	'title':'特色钣喷，选用优质原材料',
					// },
					// {
					// 	'name':'补漆喷漆',
					// 	'img':'../../static/image/repair.png',
					// 	'title':'特色钣喷，选用优质原材料',
					// },


				]

			}

		},
		created() {
			console.log(2323);

		},
		onLoad() {
			const app = getApp()
			this.init()
		},
		watch: {
			curIndex(onew, old) {
				this.tab(onew);
			}
		},
		methods: {
			init() {
				this.cate()

				// this.tab();
			},
			//轮播图
			async cate() {
				let res = await this.$http('newsCateList', {
					'type': 'repair'
				});
				if (res.code == 200) {
					this.tabList = res.data.list
					this.tab(0);
				}
			},
			async tab(onew) {
				var ii = this.curIndex;
				if (onew) var ii = onew;

				let cate_id = this.tabList[ii].id;
				// let res = await this.$http('newsList');
				let res = await this.$http('newsList', {
					'cate_id': cate_id
				});

				if (res.code == 200) {
					this.dataList = res.data.list;

				}
			},
			clickTab(item, index) {
				this.curIndex = index
				// this.resetList()
			},
			linkTo(item, index) {
				if (!item) {

				}
				this.$_linkTo('article', {
					'item': item,
					'params': {
						'_type': 'ad',
						'_page': 'repair',
						'navIndex': 2,
						'path': 'index'
					}
				})
			},

			linkToAdd() {

				this.$_isLoginTo('repairApply', {

					'params': {
						'_page': 'repair',
						'navIndex': 2,
						'path': 'index'
					}
				})
			},

			call() {
				let app = getApp();
				console.log(33333333)
				console.log(app.globalData)
				var server_tel = app.globalData.server_tel;
				if (!server_tel) server_tel = '123456';
				uni.makePhoneCall({
					phoneNumber: server_tel //仅为示例
				});
			},
		}

	}
</script>

<style lang="less" scoped>
	.page {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tab-list {
		padding-top: 20rpx;
		display: flex;
		// justify-content: space-around;
		justify-content: flex-start;
		// margin-left: 60rpx;
		background-color: #232323;
		height: 100rpx;

		.tab-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-left: 60rpx;

			.name {
				line-height: 40rpx;
				margin-bottom: 4rpx;
				// margin-left: 60rpx;
			}

			.line {

				height: 4rpx;
				width: 2rpx;
				background-color: #a8a8a8;
				transition: all 0.2s;
				// margin-left: 60rpx;
			}
		}

		.tab-item.active {
			.line {
				width: 80%;
			}
		}
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		width: 690rpx;
		justify-content: space-between;
		.item {
			width: 46%;
			border-radius: 4rpx;
			flex-direction: column;
			padding: 20rpx;
			align-items: center;
			background-color: #232323;
			display: flex;
			justify-content: center;

		}
	}
</style>
