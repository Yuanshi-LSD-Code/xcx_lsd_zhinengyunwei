<template>
	<main-layout>
		<view style="">

			<view class="display" style="width: 100%;height: 30px;margin-top: 5PX;">
				<!-- <view class="display_sa select_bord" style="" @click="changeFactory">
					<view class="display_j" style="">
						{{factory_title}}
					</view>
					<u-icon name="arrow-down" size="14"></u-icon>

				</view> -->
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
			<u-line></u-line>

			<view v-for="(item,index) in list " :key="index">
				<view class="display" style="height: 100rpx;padding-top: 15rpx;" @click="repairDetail(item,index)">


					<view class="display" style="flex-direction: column;margin-left: 10px;">
						<view style="" class="display">
							<view style="width: 100px;">{{item.label_title}}</view>
							<view class="status_bord display_j" style="">{{item.status_title}}</view>
						</view>
						<view style="">{{item.add_time}}</view>
					</view>
					<view style="display: flex;justify-content:flex-end;width: 100%;margin-right: 20px;">
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
		props: {
			djId: {
				type: Number,
				default: '',
			}
		},
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


			}
		},
		
		mounted() {
			this.$nextTick(() => {
				this.$http('djRepairCate').then((res) => {
					this.factory_list.push(res.data.factory_list);
					this.bar_list.push(res.data.bar_list);
					this.status_list.push(res.data.status_list);
				
				})
				this.getPager();
				this.init();
			})
		},

		onLoad(option) {
			
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
					dj_id: this.djId,
				});
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