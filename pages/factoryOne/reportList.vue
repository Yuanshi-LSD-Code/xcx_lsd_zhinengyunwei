<template>
	<main-layout>
		<view style="">

			<view class="display" style="width: 100%;height: 30px;">
				<view class="display_sa select_bord" style="" @click="changeFactory">
					<view class="display_j" style="">
						{{factory_title}}
					</view>
					<u-icon name="arrow-down" size="14"></u-icon>

				</view>
				
				<view class="display_sa select_bord" style="border-radius: 3px;">
					<u--input placeholder="请输入姓名" border="none" fontSize="12px" v-model="uname" @change="change" style="width: 100px;height: 30px;"></u--input>
				
				</view>
				
				<!-- <view class="display_sa select_bord" style="" @click="changeBar">
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

				</view> -->


			</view>

			<view v-for="(item,index) in list " :key="index">
				<view class="display" style="height: 100rpx;padding-top: 15rpx;" @click="reportTo(item,index)">


					<view class="display" style="flex-direction: column;margin-left: 10px;">
						<view style="" class="display">
							<view style="">{{item.label_title}}</view>
						</view>
						<view class=".display_sb">
							<view>{{item.admin_account}}</view>
							<view style="">{{item.add_time}}</view>
						</view>
						
					</view>
					<view style="display: flex;justify-content:flex-end;width: 30%;">
						<u-icon name="arrow-right" size="16"></u-icon>
					</view>



				</view>
				<u-line></u-line>
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
				status: '',
				status_title: '全部状态',

				uname: '',

			}
		},

		onLoad(option) {
			// this.factory_title = option.factory_title;
			// this.factory_id = option.factory_id;
			// this.factory_list.push(['id'=>'','title'=>'全部工厂']);
			this.$http('djRepairCate').then((res) => {
				this.factory_list.push(res.data.factory_list);
				// this.bar_list.push(res.data.bar_list);
				// this.status_list.push(res.data.status_list);

				// res.data.factory_list.forEach((item, index) => {
				// 	if (item.id == this.factory_id) {
				// 		this.defaultIndex[0] = index;

				// 	}
				// })

			})

			this.getPager();
			this.init();


		},
		onShow() {},


		onReachBottom() {
			this.loadList()
		},


		methods: {
			
			change(e){
				
				this.uname = e;
				this.init();
			},

			repairDetail(item, index) {
				console.log(4545454)
				this.$_navigateTo('/pages/factoryOne/repairDetail', {
					'item': item
				})
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
					url: this.$api.djFactoryReportList(),
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
					uname: this.uname,
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
		border: 1px solid rgba(150, 150, 150, 1);
		border-radius: 7px;
		margin-left: 10px;
		width: 50px;
	}
</style>