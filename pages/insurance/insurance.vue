<template>
	<view class="main-content page" style="background-color: #393939;">
		
		<!-- #ifdef MP-WEIXIN -->
		<top :topHeight="topHeight" textAlign='left' leftColor='#ff0000' :topTitle='topTitle'
			 fontSize='40rpx' topTitleColor='#ffffff' @handleBack='handleBack'></top>
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
		
		<view class="d_f f_d w_690">
			<view  class="margin_left_20 margin_top_20 c_fff" style="">
				保险介绍
			</view>
			<view  class="margin_left_20 margin_top_20 c_fff">
				马路凶猛如虎口，车辆保障不可少
			</view>
		</view>
		<view class="foot_list mt_30">
			<view class="foot_list_item display_a" style="border-radius: 30rpx;"  v-for="(item,index) in dataList" :key="index"
								@click="linkTo(item,index)">
				<image :src="item.cover"
					style="width: 160rpx;height: 160rpx;border-radius: 20rpx;flex-shrink: 0;" mode=""></image>
				<view class="display_sb ml_20" style="flex-grow: 1;height: 100%;">
					<view class="display" style="flex-direction: column;">
						<text class="c_fff f_30 fw_500">{{item.title}}</text>
						<text class="c_fff mt_20 f_26" v-if="item.introduction">{{item.introduction}}</text>
						<view class="display_a mt_20">
							<view class="tag display_j" v-for="(items,indexs) in setTag(item.label)" :key="indexs">
								<text>{{items}}</text>
							</view>
						</view>
					</view>
					<image src="../../static/image/home/youjiantou.png" style="width: 30rpx;height: 30rpx;" mode="">
					</image>
				</view>
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
						name: '保险',
						status: '1'
					},

					{
						name: '其它',
						status: '2'
					},
				],
				orderList: [],
				pager: null,
				dataList: [{
						'name': '中国人寿保险',
						'img': 'https://hx.dcloud.net.cn/static/favicon/favicon.png'
					},
					{
						'name': '中国平安保险',
						'img': 'https://hx.dcloud.net.cn/static/favicon/favicon.png'
					},
					// {
					// 	'name': '中国平安保险',
					// 	'img': 'https://hx.dcloud.net.cn/static/favicon/favicon.png'
					// },
					// {
					// 	'name': '中国平安保险',
					// 	'img': 'https://hx.dcloud.net.cn/static/favicon/favicon.png'
					// },

				]

			}

		},
		watch:{
			curIndex(onew,old){
				this.tab(onew);
			}
		},
		onLoad() {
			const app = getApp()
			this.init()
		},
		methods: {
			setTag(label){
				if(label){
					return label.split(',')
				}else {
					return []
				}
				console.log(label)
				
			},
			init() {
				this.cate()
				
				// this.tab();
			},
			//轮播图
			async cate() {
				let res = await this.$http('newsCateList',{'type':'insurance'});
				if (res.code == 200) {
					this.tabList = res.data.list
				    this.tab(0);
				}
			},
			clickTab(item, index) {
				this.curIndex = index;
				
			},
			async tab(onew){
				var ii = this.curIndex;
				if(onew) var ii = onew;
				
				let cate_id = this.tabList[ii].id;
				// let res = await this.$http('newsList');
				let res = await this.$http('newsList',{'cate_id':cate_id});
			
				if (res.code == 200) {
					this.dataList = res.data.list;
					
				}
			},
			linkTo(item, index) {
				if (!item) {
				
				}
				this.$_linkTo('article', {
					'item': item,
					'params': {
						'_type': 'ad',
						'_page': 'insurance',
						'navIndex': 1,
						'path': 'index'
					}
				})
			},
		}

	}
</script>

<style lang="less" scoped>
	.foot_list {
		width: 690rpx;
	
		.foot_list_item {
			width: 690rpx;
			background-color: #232323;
			padding: 30rpx;
			width: 100%;
			margin-bottom: 20rpx;
		}
	}
	.tag{
		background-color: #ffa825;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 10rpx;
		color: #fff;
	}
	.page{
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
				width: 0rpx;
				background-color: #a8a8a8;
				transition: all 0.5s;
				// margin-left: 60rpx;
			}
		}

		.tab-item.active {
			.line {
				width: 80%;
			}
		}
	}

	.main {
		margin-top: 20rpx;

		.list {
			display: flex;
			flex-wrap: wrap;
			line-height: 40rpx;
			padding-left: 100rpx;
			padding-top: 30rpx;
			justify-content: space-between;

			.item {
				width: 215rpx;
				height: 215rpx;
				border-radius: 4rpx;
				flex-direction: column;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-right: 100rpx;
				margin-bottom: 30rpx;

				image {
					width: 140rpx;
					height: 140rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
