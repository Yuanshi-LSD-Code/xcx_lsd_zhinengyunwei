<template>
	<main-layout>
		<view style="">

			<view class="display" style="width: 100%;height: 30px;">
				<view class="display_sa select_bord" style="" @click="changeFactory">
					<view class="display_j" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
						{{factory_title}}
					</view>
					<u-icon name="arrow-down" size="14"></u-icon>

				</view>
				<view class="display_sa select_bord" style="" @click="changeBar">
					<view class="display_j">
						{{bar_title}}
					</view>
					<u-icon name="arrow-down" size="14"></u-icon>

				</view>
				<view class="display_sa select_bord" style="" @click="changeStatus">
					<view class="display_j">
						{{status_title}}
					</view>
					<u-icon name="arrow-down" size="14"></u-icon>

				</view>


			</view>


			<view v-if="list.length <=0">
				<view class="display" style="height: 100rpx;padding-top: 15rpx;justify-content : center">
				           暂无数据
				
				</view>
			</view>
			<view v-if="list.length >0">
				<view v-for="(item,index) in list " :key="index">
					<view class="display" style="height: 100rpx;padding-top: 15rpx;" @click="repairDetail(item,index)">


						<view class="display" style="flex-direction: column;margin-left: 10px;">
							<view style="" class="display">
								<view style="width: 140px;">{{item.label_title}}</view>
								
								<view v-if="item.status == 1" class="status_bord display_j" style="border: 1px solid rgba(150, 150, 150, 1);color:gray">{{item.status_title}}</view>
								<view v-if="item.status == 2" class="status_bord display_j" style="border: 1px solid green;color:green">{{item.status_title}}</view>
								<view v-if="item.status == 3" class="status_bord display_j" style="border: 1px solid yellow;color:yellow">{{item.status_title}}</view>
							</view>
							<view style="">{{item.add_time}}</view>
						</view>
						<view style="display: flex;justify-content:flex-end;width: 100%;margin-right: 20px;">
							<u-icon name="arrow-right" size="16"></u-icon>
						</view>



					</view>
					<u-line></u-line>
				</view>
			</view>
			



			<u-picker :show="factoryShow" closeOnClickOverlay="true" :columns="factory_list"
				:defaultIndex="defaultIndex" keyName="title" @confirm="factoryConfirm()"
				@cancel="factoryCancel()"></u-picker>
			<u-picker :show="barShow" closeOnClickOverlay="true" :columns="bar_list" :defaultIndex="defaultIndexBar"
				keyName="title" @confirm="barConfirm()" @cancel="barCancel()"></u-picker>
			<u-picker :show="statusShow" closeOnClickOverlay="true" :columns="status_list"
				:defaultIndex="defaultIndexStatus" keyName="title" @confirm="statusConfirm()"
				@cancel="statusCancel()"></u-picker>

		</view>
	</main-layout>
</template>

<script>
	export default {
		name: 'info',

		data() {
			return {
				list: [],
				factory_id: '',
				factory_title: '全部工厂',

				factoryShow: false,
				factory_list: [],
				defaultIndex: [],
				pager: {},

				barShow: false,
				defaultIndexBar: '',
				bar_list: [],
				bar_id: '',
				bar_title: '全部组件',

				statusShow: false,
				defaultIndexStatus: '',
				status_list: [],
				status: 1,
				status_title: '未开始',


			}
		},

		onLoad(option) {
			this.factory_title = option.factory_title;
			this.factory_id = option.factory_id;
			// this.factory_list.push(['id'=>'','title'=>'全部工厂']);
			this.$http('djRepairCate').then((res) => {
				this.factory_list.push(res.data.factory_list);
				this.bar_list.push(res.data.bar_list);
				this.status_list.push(res.data.status_list);

				res.data.factory_list.forEach((item, index) => {
					if (item.id == this.factory_id) {
						this.defaultIndex[0] = index;

					}
				})

			})

			this.getPager();
			this.init();


		},
		onShow() {},


		onReachBottom() {
			this.loadList()
		},


		methods: {

			repairDetail(item, index) {
				console.log(4545454)
				this.$_navigateTo('/pages/factoryOne/repairDetail', {
					'item': item
				})
			},
			refresh(){
				this.init();
			},

			init() {
				this.pager.reset();
				this.loadList();
			},

			changeStatus() {
				this.statusShow = true;
			},
			statusConfirm(e) {

				this.status = e.value[0].id;
				this.status_title = e.value[0].title;

				this.init();
				this.statusShow = false;

			},
			statusCancel() {
				this.statusShow = false;
			},

			changeBar() {
				this.barShow = true;
			},
			barConfirm(e) {

				this.bar_id = e.value[0].id;
				this.bar_title = e.value[0].title;

				this.init();
				this.barShow = false;

			},
			barCancel() {
				this.barShow = false;
			},




			changeFactory() {
				this.factoryShow = true;
			},
			factoryConfirm(e) {

				this.factory_id = e.value[0].id;
				this.factory_title = e.value[0].title;


				this.init();
				this.factoryShow = false;

			},
			factoryCancel() {
				this.factoryShow = false;
			},



			getPager() {
				// console.log(this.$api.reapirList)
				this.pager = new this.$pageLoad({
					url: this.$api.djRepairList(),
					list: this.list,
					limit: 10,
					success: (res, e) => {

						console.log(e);
					}
				});
				// //先加载第一页
				// this.loadList();
			},
			loadList() {

				this.pager.load({
					factory_id: this.factory_id,
					bar_id: this.bar_id,
					status: this.status,
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
	.select_bord {
		width: 200rpx;
		height: 22px;
		border: 1px solid rgba(150, 150, 150, 1);
		border-radius: 5px;
		margin-left: 26rpx;
	}

	.status_bord {
		/* border: 1px solid ; */
		border-radius: 7px;
		margin-left: 10px;
		width: 50px;
	}
</style>