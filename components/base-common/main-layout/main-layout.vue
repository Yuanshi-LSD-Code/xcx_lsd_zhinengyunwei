<template>
	<view class="main-layout">

		<view>
			<slot></slot>
		</view>

		<template v-if="navIndex || tabbarbool">

			<main-tab-bar :navIndex="navIndex" :navList="navList" :page-count="page_count"></main-tab-bar>
		</template>


	</view>


</template>

<script>
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
				navList: [{
						title: '首页',
						selectImg: "../../../static/image/tab/home_yes.png",
						img: '../../../static/image/tab/home_no.png',
						url: '/pages/index/index',
						id:1,
					},
					{
						title: '消息',
						selectImg: "../../../static/image/tab/notice_yes.png",
						img: '../../../static/image/tab/notice_no.png',
						url: '/pages/notice/notice',
						id:2,
					},
					{
						title: '我的',
						selectImg: "../../../static/image/tab/user_yes.png",
						img: '../../../static/image/tab/user_no.png',
						url: '/pages/user/user',
						id:3,
					}
				],
				tabbarbool: true,
				page_count: getCurrentPages().length,
				currentRoute: '',
			};
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

		methods:{
			setTabbar() {
			    let currentRoute = this.currentRoute;
			    if (
			        this.$appScene
			        && [1001, 1045, 1046, 1058, 1067, 1084, 1091].indexOf(this.$appScene) > -1
			        && (currentRoute.indexOf('appid') > -1 || currentRoute.indexOf('appmsg_compact_url') > -1 || currentRoute .indexOf('wxwork_userid') > -1 || currentRoute .indexOf('weixinadinfo') > -1 || currentRoute .indexOf('gdt_vid') > -1)
			    ) {
			        currentRoute = this.$utils.deleteUrlParam(currentRoute, ['appid', 'appmsg_compact_url', 'wxwork_userid', 'weixinadinfo', 'gdt_vid'], true);
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
</style>