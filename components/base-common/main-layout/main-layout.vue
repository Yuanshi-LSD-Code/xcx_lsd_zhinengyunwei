<template>
	<view class="main-layout">

		<view class="scroll-container">
			<slot></slot>
		</view>

		<template v-if="navIndex || tabbarbool">
			<view class="nav-margin safe-area-inset-bottom"
				style="border-top: 1px solid #eee;;height: 110rpx;position: fixed;bottom: var(--window-bottom, 0);"
				:class="haveBackground ? 'app-layout-background' : ''">
				<view class="placeholder"></view>

				<main-tab-bar :navIndex="navIndex" :navList="navList" :page-count="page_count"></main-tab-bar>
			</view>
		</template>



	</view>


</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		name: "main-layout",

		props: {
			haveBackground: {
				type: Boolean,
				default () {
					return true;
				}
			},
			overflow: {
				type: Boolean,
				default () {
					return true;
				}
			},
			navIndex: '',
		},
		data() {
			return {
				// navList: [{
				// 		title: '首页',
				// 		select_img: "../../../static/image/tab/home_yes.png",
				// 		img: '../../../static/image/tab/home_no.png',
				// 		url: '/pages/index/index',
				// 		id: 1,
				// 	},
				// 	{
				// 		title: '消息',
				// 		select_img: "../../../static/image/tab/notice_yes.png",
				// 		img: '../../../static/image/tab/notice_no.png',
				// 		url: '/pages/notice/notice',
				// 		id: 2,
				// 	},
				// 	{
				// 		title: '我的',
				// 		select_img: "../../../static/image/tab/user_yes.png",
				// 		img: '../../../static/image/tab/user_no.png',
				// 		url: '/pages/user/user',
				// 		id: 3,
				// 	}
				// ],
				tabbarbool: true,
				page_count: getCurrentPages().length,
				currentRoute: '',
			};
		},
		
		computed: {
		    ...mapState({
		          navList: state => state.navbar.navs,
		    })
		},

		mounted() {

			this.currentRoute = this.$platDiff.tabBarUrl(null, this.page_count);
			this.setTabbar();

		},

		watch: {
			navList: {
				handler: function() {
					this.setTabbar();
				},
				immediate: true,
			},

		},

		methods: {
			setTabbar() {
				let currentRoute = this.currentRoute;
				if (
					this.$appScene && [1001, 1045, 1046, 1058, 1067, 1084, 1091].indexOf(this.$appScene) > -1 &&
					(currentRoute.indexOf('appid') > -1 || currentRoute.indexOf('appmsg_compact_url') > -1 || currentRoute
						.indexOf('wxwork_userid') > -1 || currentRoute.indexOf('weixinadinfo') > -1 || currentRoute
						.indexOf('gdt_vid') > -1)
				) {
					currentRoute = this.$utils.deleteUrlParam(currentRoute, ['appid', 'appmsg_compact_url',
						'wxwork_userid', 'weixinadinfo', 'gdt_vid'
					], true);
				}
				for (let i = 0; i < this.navList.length; i++) {
					if (currentRoute == this.navList[i].url) {
						return this.tabbarbool = true;
					}
				}
				return this.tabbarbool = false;
			},
		},
	}
</script>

<style scoped lang="scss">
	.app-layout {
		max-width: 100%;
		//#ifdef MP-ALIPAY
		position: relative;
		min-height: 100vh;
		z-index: 1;
		//#endif
	}

	.app-layout-background {
		background-color: #f7f7f7;
	}

	.app-scroll-y {
		width: 100%;
		height: 100%;
	}

	.app-bottom {
		height: #{160rpx};
	}

	.nav-margin {
		width: #{750rpx};
	}

	.app-tabbar {
		height: #{110rpx};
	}

	.model {
		position: fixed;
		bottom: 0;
		left: 0;
		width: #{750rpx};
		height: #{50rpx};
		z-index: 1600;
	}

	.safe-area-inset-bottom {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.placeholder {
		height: #{160rpx};
		background-color: #fff;
	}

	.scroll-container {
		overflow-y: scroll;
		/* 垂直滚动 */
		height: calc(100% - 110rpx);
		/* 减去底部 TabBar 的高度 */
		padding-bottom: 110rpx;
		/* 底部 TabBar 的高度 */
	}
</style>