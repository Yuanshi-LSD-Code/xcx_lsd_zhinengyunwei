<template>

	<main-layout>
		<view>
			<view class="sticky-container">
			<!-- <u-sticky offset-top="0"> -->
			<u-subsection :list="tabList" :current="tabCurrent" mode="button" @change="sectionChange" ></u-subsection>
			</u-sticky>
            </view>
			<view style="margin-top: 74rpx;"></view>
			<view>
				<view v-for="(item,index) in list " :key="index">
					<view class="display_sb" style="height: 80rpx;" @click="linkTo(item,index)">
						<view style="margin-left: 30rpx;">{{item.content}}</view>
						<!-- <u-icon name="arrow-right" size="20"></u-icon> -->
					</view>
					<view >
						<view style="display: flex;justify-content: flex-end;margin-right: 20rpx;">
						{{item.add_time}}
						</view>
					</view>
					<u-line></u-line>
				</view>

				
			</view>

		</view>

	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				tabCurrent: 0,
				pager: null,
				isShowDefaultPage: false,
				list:[],

			}
		},

		// watch: {
		// 	tabCurrent(onew, old) {
		// 		this.loadList();
		// 	}
		// },
		onLoad(option) {
			this.getPager();

		},
		onShow() {

		},
		onReachBottom() {
			this.loadList()
		},
		methods: {

			getPager() {
				// console.log(this.$api.reapirList)
				this.pager = new this.$pageLoad({
					url: this.$api.factoryNoticeList(),
					list: this.list,
					limit: 20,
					success: (res,e) => {
						this.tabList = res.data.tabList;
						this.tabCurrent = res.data.tabCurrent;
						this.isShowDefaultPage = e.noMore;
						console.log(e);
					}
				});
				//先加载第一页
				this.loadList();
			},
			loadList() {
				
				this.pager.load({status:this.tabCurrent});
			},
			
			
			linkTo(item, index) {
				
				this.$_navigateTo('noticeDetail', {
					'item': item
				})
			},

			sectionChange(index) {
				this.tabCurrent = index;
				this.pager.reset();
				this.loadList();
				// this.list= ['全部5', '未读3', '已读2']
			}
		}



	}
</script>

<style>
	.sticky-container {
				position: fixed;
	  /* position: sticky; */
	  top: 0;
	  z-index: 99;
	  width: 100%;
	}
</style>