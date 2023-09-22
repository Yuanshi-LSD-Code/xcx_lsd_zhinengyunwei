<template>
	<view class="main-content page" style="background-color: #393939;">
		<view class="w_100">
			<!-- #ifdef MP-WEIXIN -->
			<top :topHeight="topHeight" textAlign='left' leftColor='#fff' :topTitle='topTitle' fontSize='40rpx'
				topTitleColor='#ffffff' @handleBack='handleBack'></top>
			<view style="width: 100%;" :style="{height:topHeight}"></view>
			<!-- #endif -->
			<view class="w_100 h_80 display_a" style="background-color: #232323">
				<text class="c_fff" style="margin-left: 160rpx;">加入乐途汇，养车更优惠</text>
			</view>
			<view class="banner display_j mt_20">
				<swiper :indicator-dots="true" :autoplay="true" interval="3000" style="height: 300rpx;width: 690rpx;">
					<swiper-item v-for="(item,index) in bennarList" :key="index">
						<view class="" style="width: 690rpx;height: 300rpx;" @click="swiperBookDetails(item,index)">
							<image :src="item.url" mode="aspectFill" style="width: 100%;height:100%;"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>




			<!-- <view style="margin-top: 20rpx;">
				<view style="display: flex;flex-direction: column;background-color: #ffd1020d;height:150rpx;">
					<view style="margin-left: 20rpx;margin-top: 35rpx;">
						敬请期待
					</view>
					<view style="margin-left: 20rpx;margin-top: 10rpx;">
						新功能陆续推出
					</view>
				</view>
			</view> -->


		</view>
		<view class="menu">
			<view class="menu_list" style="">
				<view class="item" style="" v-for="(item,index) in findList" :key="index" @click="linkTo(item,index)">
					<image :src="item.img" mode="" style=""></image>
					<text style="text-align: center;">{{item.name}}</text>
				</view>
			</view>
		</view>


		<view class="w_100 mt_20" style="overflow-x: scroll;">
			<image :src="home_bottom_img" :style="{width:imagesWidth+'px',height:imagesHeight+'px'}" mode=""></image>
		</view>

		<view class="w_690 display_a h_100">
			<image src="../../static/image/home/tuijian.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
			<text class="f_36  c_fff ml_20 fw_700">为你推荐</text>
		</view>

		<view class="foot_list">
			<view class="foot_list_item display_a" style="border-radius: 30rpx;" @click="article(item,index)"
				v-for="(item,indexs) in tuijianList" :key="item.id">
				<image :src="item.cover" style="width: 160rpx;height: 160rpx;border-radius: 20rpx;flex-shrink: 0;"
					mode=""></image>
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
		<view class="images w_100 mt_30 display_a" style="flex-direction: column;">
			<image @click="cardListClick(item)" v-for="(item,index) in cardList" :key="item.url" class="mb_20"
				:src="item.url" style="width: 690rpx;height: 200rpx;border-radius: 30rpx;" mode=""></image>
		</view>

		<view class="w_100" style="height: 120rpx;">

		</view>
		<copyright :text="copyright"></copyright>

	</view>
</template>

<script>
	import swiperCustom from '@/components/swiperCustom/swiperCustom.vue'

	export default {
		components: {
			swiperCustom
		},
		props: {
			// swiperCurrent:{
			// 	type:Number,
			// 	default:0
			// }
		},
		computed: {

		},
		data() {
			return {
				imagesWidth: "",
				imagesHeight: '',
				tel: uni.getStorageSync('tel') || false,
				isLogin: uni.getStorageSync('isLogin') || false,
				isOldUser: uni.getStorageSync('isOldUser') || false,
				topHeight: this.header_height,
				popupheight: (uni.getSystemInfoSync().windowHeight * (750 / uni.getSystemInfoSync().windowWidth)), //转rpx
				topTitle: "赛聚乐途汇",
				isShowInput: false,
				copyright: this.copyright,
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				curriculumList: [],
				isShowDefaultPage: false,
				scrollTop: 0,
				tuijianList: [],
				cardList: [],
				home_bottom_img: '',
				token: uni.getStorageSync('token') || null,
				bennarList: [{
						"url": "https://img0.baidu.com/it/u=1871922419,873719132&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=300",
						"background": "#19c766",
						"link": "/pages/client/webva?url=https://ext.dcloud.net.cn/plugin?id=4155"
					},
					{
						"url": "https://img0.baidu.com/it/u=794508269,673967059&fm=253&fmt=auto&app=138&f=JPEG?w=630&h=472",
						"background": "#19cdde",
						"link": "/pages/client/vipcard/index"
					},

				],
				findList: [{
						name: '优惠加油',
						img: '../../static/image/icon/oil.png',
						linkName: 'oil',
						params: {
							'navIndex': 0
						},
						type: 2,

					},
					{
						name: '信用卡办理',
						img: '../../static/image/home/xinyongka.png',
						linkName: 'index',
						type: 2,
						path: '/pages/handlingDetails/handlingDetails',
						params: {
							'navIndex': 2
						}
					},
					{
						name: '保险服务',
						img: '../../static/image/tab/blue/car_yes.png',
						linkName: 'index',
						path: '/pages/insurance/insurance',
						type: 1,
						params: {
							'navIndex': 1
						}
					},

					{
						name: '汽车快修',
						img: '../../static/image/tab/blue/repair_yes.png',
						linkName: 'index',
						path: '/pages/repair/repair',
						type: 1,
						params: {
							'navIndex': 2
						}
					},

					// {
					// 	name: '会员中心',
					// 	img: '../../static/image/tab/blue/user_yes.png',
					// 	linkName: 'index',
					// 	params: {
					// 		'navIndex': 3
					// 	}
					// },
				],

			}

		},

		async onLoad() {
			const app = getApp()
			this.copyright = app.globalData.copyright;
			this.isLogin = app.globalData.isLogin
			this.tel = app.globalData.tel
			
			this.init()
			await this.base()
			uni.$on('app', data => {
				this.copyright = app.globalData.copyright;
				this.isLogin = app.globalData.isLogin
				this.tel = app.globalData.tel
				this.init()
				this.base()
				if(!uni.getStorageSync('tel')){
					uni.reLaunch({
						url:'/pages/userInfo/userInfo?type=home'
					})
				}
				console.log(777)
			})
			uni.getImageInfo({
				src: this.home_bottom_img,
				success: (res) => {
					this.imagesWidth = res.width
					this.imagesHeight = res.height
					console.log(res, "获取图片信息")
				},
				fail: (err) => {
					console.log(err)
				}
			});


		},
		

		methods: {
			setTag(label) {
				if (label) {
					return label.split(',')
				} else {
					return []
				}
			},
			article(item, index) {
				uni.navigateTo({
					url: '/pages/article/article?item=' + JSON.stringify(item)
				})
			},
			cardListClick(item) {
				uni.navigateTo({
					url: '/pages/cardDetail/cardDetail?id=' + item.id
				})
			},
			swiperBookDetails(item) {



				if (item.url_type == 2) {
					item.id = item.goods_id
					this.$_linkTo('article', {
						'item': item,
						'params': {
							'_type': 'ad',
							'_page': 'home',
							'navIndex': 0,
							'path': 'index'
						}
					})
					// uni.navigateTo({
					// 	url: '/pages/bookDetails/bookDetails?goods_id=' + item.link_id
					// })
				} else if (item.url_type == 3) {
					uni.navigateTo({
						url: '/pages/webview/webview?web_url=' + item.link_id
					})
				}
				//  else {
				// 	uni.navigateTo({
				// 		url: '/pages/article/article?id=' + item.id
				// 	})
				// }




				// console.log(item);

			},
			init() {
				this.adList()
				this.getCardList()
				this.newsMixList()

			},
			async base() {
				let res = await this.$http('base', {
					type: 'home_bottom_img'
				});
				this.home_bottom_img = res.data.home_bottom_img
				console.log(res, "====")
			},
			//轮播图
			async adList() {
				let res = await this.$http('adList');
				if (res.code == 200) {
					this.bennarList = res.data.list
				}
			},
			async getCardList() {
				let res = await this.$http('adList', {
					type: 'card'
				});
				if (res.code == 200) {
					this.cardList = res.data.list

				}
			},
			async newsMixList() {
				let res = await this.$http('newsMixList');
				this.tuijianList = res.data.list
			},
			linkTo(item, index) {
				if (!item.linkName) {
					this.$_toast('开发中')
					return;
				}
				if (index == 0) {
					const app = getApp()
					var tel = app.globalData.tel
					var isLogin = app.globalData.isLogin
					if (tel) {
						uni.navigateTo({
							url: '/pages/oil/oil'
						})
					} else {
						if (!isLogin) {
							this.$_toast('请先登录')
							this.timer = setTimeout(() => {
								// uni.navigateTo({
								// 	url:'/pages/user/user'
								// })
								var item2 = this.findList[3];
								console.log(88888)
								console.log(item2)
								this.$_linkTo(item2.linkName, item2.params)
							}, 500)
						} else if (!tel) {
							this.$_toast('请先绑定手机号')
							this.timer = setTimeout(() => {
								uni.navigateTo({
									url: '/pages/userInfo/userInfo'
								})
							}, 500)
						}

					}

				} else {
					if (item.type == 1) {
						uni.switchTab({
							url: item.path
						})
					} else if (item.type == 2) {
						uni.navigateTo({
							url: item.path
						})
					}
					// this.$_linkTo(item.linkName, item.params)
				}



			},
		}
	}
</script>

<style lang="less" scoped>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tag {
		background-color: #ffa825;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 10rpx;
		color: #fff;
	}

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

	.menu {
		background-color: #232323;
		width: 690rpx;
		margin-top: 30rpx;
		position: relative;

		.menu_list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 30rpx;

			.item {
				flex-direction: column;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #DFC276;

				image {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 20rpx;
					border-radius: 50%;
				}

			}
		}

	}
</style>
