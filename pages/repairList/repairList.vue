<template>
	<view class="main-content page" style="background-color: #393939;">

		<!-- #ifdef MP-WEIXIN -->
		<top :topHeight="topHeight" :isShowIcon="true" textAlign='center' leftColor='#ffffff' :topTitle='topTitle'
			fontSize='40rpx' topTitleColor='#ffffff' @handleBack='handleBack'></top>
		<view style="width: 100%;" :style="{height:topHeight}"></view>
		<!-- #endif -->

		<view class="w_100 h_80 display_a" style="background-color: #232323">
			<text class="c_fff" style="margin-left: 160rpx;">加入乐途汇，养车更优惠</text>
		</view>
		<view class="display_a h_100 w_100">
			<viwe style="width: 30%;" class="c_fff">
				<text class="ml_20">时间</text>
			</viwe>
			<viwe style="width: 30%;" class="c_fff">
				<text class="ml_20">车牌号</text>
			</viwe>
			<viwe style="width: 40%;" class="c_fff">
				<text class="ml_20">故障现象</text>
			</viwe>
		</view>
		<view class="w_100" style="border-bottom: 1px solid #1296db;"></view>
		<view class="list_item  w_100 display_a" style="border-bottom: 1px solid #ff0000;" v-for="(item,index) in repairList" :key="index" @click="">
			<viwe style="width: 30%;" class="c_fff">
				<text class="ml_20">{{item.add_time}}</text>
			</viwe>
			<viwe style="width: 30%;" class="c_fff">
				<text class="ml_20">{{item.card}}</text>
			</viwe>
			<viwe style="width: 40%;">
				<text class="ml_20 c_fff">{{item.content}}</text>
				<!-- <textarea :value="item.content" style="height: 30px;color: #fff;"></textarea> -->
			</viwe>
		</view>
		


		<defaultPage v-if="isShowDefaultPage"></defaultPage>
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

				orderList: [],
				pager: null,
				params: {},
				form: {},
				repairList: [],


			}

		},
		created() {
			console.log(2323);
		},
		onReachBottom() {
			this.loadList()
		},
		onLoad(option) {
			if (option.params) {
				this.params = JSON.parse(option.params);
			}

			this.getPager()

		},
		// async onPullDownRefresh() {
		// 	console.log(33343434)
		// 	await this.pager.refresh();
		// 	uni.stopPullDownRefresh()
		// },
		methods: {
			getPager() {
				// console.log(this.$api.reapirList)
				this.pager = new this.$pageLoad({
					url: this.$api.repairList(),
					list: this.repairList,
					limit: 10,
					success: () => {
						if (this.repairList.length == 0) {
							this.isShowDefaultPage = true
						} else {
							this.isShowDefaultPage = false
						}
						console.log(this.newList);
					}
				});
				//先加载第一页
				this.loadList();
			},
			loadList() {
				this.pager.load();
			},
			//重置
			refreshList() {
				this.pager.refresh();
			},
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

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.list_item{
		min-height: 100rpx;
	}
</style>
