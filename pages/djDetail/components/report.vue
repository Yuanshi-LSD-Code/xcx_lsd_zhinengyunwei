<template>
	<view style="margin-left: 10px;margin-right: 10px;">

		<view v-if="list.length>0">
			<view v-for="(item,index) in list " :key="index">
				<view class="display" style="flex-direction: column;padding-top: 20rpx;" @click="reportTo(item,index)">
					<view style="margin-left: 20rpx;">{{item.label_title}}</view>
					<view style="margin-left: 20rpx;margin-top: 10rpx;">{{item.add_time}}</view>

				</view>
				<u-line></u-line>
			</view>
		</view>
		<view v-if="list.length <=0">
			<view class="display" style="height: 100rpx;padding-top: 15rpx;justify-content : center">
				暂无数据

			</view>
		</view>


	</view>

</template>

<script>
	export default {
		name: 'info',
		props: {
			djId: {
				type: Number,
				default: null,
			}
		},
		data() {
			return {
				list: [],

			}
		},

		onLoad(option) {},
		onShow() {},
		watch: {
			deviceId(newVal) {

				// this.getInfo();
			},
		},

		mounted() {
			this.$nextTick(() => {
				this.getPager();
			})
		},


		methods: {



			getPager() {
				// console.log(this.$api.reapirList)
				this.pager = new this.$pageLoad({
					url: this.$api.djReportList(),
					list: this.list,
					limit: 10,
					success: (res, e) => {

						console.log(e);
					}
				});
				//先加载第一页
				this.loadList();
			},
			loadList() {

				this.pager.load({
					dj_id: this.djId
				});
			},



			reportTo(item) {
				uni.downloadFile({
					url: item.pdf_url,
					success: res => {
						console.log(res)
						if (res.statusCode === 200) {
							// 预览pdf文件
							uni.openDocument({
								filePath: res.tempFilePath,
								showMenu: true, // 右上角菜单，可以进行分享保存pdf
								success: function(file) {
									console.log("file-success", file)
								}
							})
						}
					}
				})
			},


		}



	}
</script>

<style>
</style>