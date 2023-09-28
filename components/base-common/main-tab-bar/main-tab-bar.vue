<template>

	<view class="main-tab-bar">

		<view class="botton_nav" :style="{bottom:(isIphoneX?'25rpx':'')}">

			<view class="botton_nav_con" v-if="shwoType" :style="{marginLeft:('')}" @click="navClick(item,index)"
				v-for="(item,index) in navList " :key="index" :class="''">
				<image v-if="(navIndex==item.id || router == item.url)" class="botton_nav_con_img" :src="item.select_img"
					mode="" :class="''">
				</image>
				<image v-else class="botton_nav_con_img" :src="item.img"
					mode="" :class="''"></image>
				<view class="botton_nav_con_text"
					:style="{color:((navIndex==item.id || router == item.url) ?'#1296db':'#BBBBBB')}">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "main-tab-bar",
		props: {
			navList: {
				type: Array,
				default () {
					return [];
				}
			},
			pageCount: Number,
			navIndex:''
		},
		data() {
			return {
				isIphoneX: this.isIphoneX,
				title: 'Hello',


				// navIndex: '',
				shwoType: true,
				swiperCurrent: 0,
				token: uni.getStorageSync('token') || null,
				router: '',
			};
		},


		created() {
			this.router = this.$platDiff.tabBarUrl(null, this.pageCount);
			
		},

		watch: {
			// #ifdef H5
			// '$route': {
			// 	handler: function(data) {
			// 		console.log(44455);
			// 		let {
			// 			query,
			// 			meta
			// 		} = data;
			// 		let str = '?';
			// 		for (let key in query) {
			// 			str += `${key}=${query[key]}&`
			// 		}
			// 		let url = '/' + meta.pagePath + str;
			// 		url = url.slice(0, url.length - 1);
			// 		this.router = url;
			// 		console.log(44455888);
			// 		console.log(this.router);
			// 	},
			// 	deep: true,
			// 	immediate: true
			// }
			// #endif
		},
		methods: {
			navClick(item, index) {
				console.log(22222)
				console.log(item.url)
				this.$_reLaunch(item.url)
			},
		},
	}
</script>
<style scoped lang="scss">
	.btn_s {
		width: 100%;
		height: 88rpx;
		// background: linear-gradient(#f5daab, #dbb475);
		// border-radius: 8rpx;
		// margin: 162rpx auto 0 auto;
		// font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		display: flex;
		position: fixed;
		bottom: 200rpx;
		// line-height: 88rpx;
		// left: 30rpx;
		align-items: center;
		color: #ffffff;
		justify-content: flex-end;
		// justify-content: center;
		background: rgba($color: #000000, $alpha: .4);



		// opacity: .5;
	}

	.btns {
		width: 203rpx;
		height: 91rpx;
		background: #ffffff;
		border: 1rpx solid #f5f5f5;
		border-radius: 46rpx;

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

	.botton_nav {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		// z-index: 10;
		bottom: var(--window-bottom, 0);
		background-color: #FFFFFF;
		justify-content: space-around;
		

		.botton_nav_con {
			// margin-left: 56rpx;
			// margin-right: 56rpx;

			.botton_nav_con_img {
				width: 48rpx;
				height: 48rpx;
				// margin: 0 auto;
			}

			.botton_nav_con_text {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #bbbbbb;
				font-size: 14rpx;
				font-weight: 300;
				text-align: center;
			}
		}

		.botton_nav_z {
			position: fixed;
			top: 94.5%;
			left: 50%;
			z-index: 999999;
			transform: translate(-50%, -50%);

			.botton_nav_z_img {
				width: 94rpx !important;
				height: 94rpx !important;
				z-index: 999999;
			}

			.botton_nav_con_text {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #bbbbbb;
				font-size: 20rpx;
				font-weight: 400;
				text-align: center;
			}
		}

	}
</style>