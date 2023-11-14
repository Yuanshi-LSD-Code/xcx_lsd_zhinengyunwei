<template>
	<view style="margin-left: 20px;margin-right: 20px;height: 100%;">

		<view class="display_sb" style="height: 40px;">
			<view>检修组件</view>
			<view class="display" @click="changeModule">
				<view>{{item.bar_title}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>

		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修分类</view>
			<view class="display" @click="changeRepair">
				<view>{{item.repair_title}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修结果</view>
			<view class="display" @click="changeStatus">
				<view>{{item.status_title}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修人员</view>
			<view class="display">
				<view> <u--input placeholder="请输入" border="noe" v-model="item.uname" inputAlign="right"></u--input>
				</view>
				<u-icon name="arrow-right" size="14"></u-icon>
			</view>
		</view>
		<u-line></u-line>


		<view class="display_sb" style="height: 40px;">
			<view>现场拍照</view>
			<view class="display" @click="chooseImage">

				<image :src="item.url" style="width: 50rpx;height: 50rpx;"></image>

				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>计划检修时间</view>
			<view class="display" @click="startClick">
				<view>{{item.repair_date}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>实际检修时间</view>
			<view class="display" @click="endClick">
				<view>{{item.repair_true_date}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修说明</view>
			<view class="display">
				<view> <u--input placeholder="请输入" border="noe" v-model="item.remark" inputAlign="right"></u--input>
				</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>

		<view class="safe-area-inset-bottom display_j" style="width: 100%;margin-right: 20px">
			<view style="margin-bottom: 10px;width: 110px;margin-left: -20px;" @click="factoryAdminRepairEdit">
				<u-button text="保存" size="normal" type="success" plain></u-button>
			</view>
		</view>



		<u-picker :show="moduleShow" closeOnClickOverlay="true" :columns="repairCateModule" :defaultIndex="defaultIndex"
			keyName="name" @confirm="moduleConfirm()" @cancel="moduleCancel()"></u-picker>

		<u-picker :show="repairShow" closeOnClickOverlay="true" :columns="repairCateRepair"
			:defaultIndex="defaultIndex2" keyName="name" @confirm="repairConfirm()" @cancel="repairCancel()"></u-picker>

		<u-picker :show="statusShow" closeOnClickOverlay="true" :columns="repairCateStatus"
			:defaultIndex="defaultIndex3" keyName="name" @confirm="statusConfirm()" @cancel="statusCancel()"></u-picker>


		<u-calendar :show="show_repair_time" :defaultDate="item.repair_date" @confirm="confirm_start"
			:minDate="min_time" monthNum="13" :maxDate="max_time" @close="close_start"></u-calendar>

		<u-calendar :show="show_repair_true_time" :defaultDate="item.repair_true_date" @confirm="confirm_end"
			:minDate="min_time" monthNum="13" :maxDate="max_time" @close="close_end"></u-calendar>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				webviewStyles: {
					progress: {
						color: '#3e3adc'
					}
				},
				item: {},
				repairCateModule: [],
				repairCateRepair: [],
				repairCateStatus: [],

				moduleShow: false,
				repairShow: false,
				statusShow: false,

				defaultIndex: "",
				defaultIndex2: "",
				defaultIndex3: "",

				show_repair_time: false,
				show_repair_true_time: false,

				min_time: "",
				max_time: "",



			}
		},
		async onLoad(option) {
			this.item = JSON.parse(option.item);

			let res = await this.$http('factoryAdminRepairCate');

			this.repairCateModule.push(res.data.module_cate);
			this.repairCateRepair.push(res.data.repair_cate);
			this.repairCateStatus.push(res.data.repair_status);

			var currentDate = new Date();

			var beforeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());


			this.min_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 12,
				currentDate
				.getDate()), 'yyyy-mm-dd');
			this.max_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate
				.getDate() + 1), 'yyyy-mm-dd');



		},
		methods: {

			factoryAdminRepairEdit() {
				

				this.$http('factoryAdminRepairEdit', this.item).then((res) => {
					console.log(11212)
					console.log(res)
					console.log(res.code)
					console.log(res.msg)
					// uni.hideLoading()
					if (res.code == 200) {
						this.$_refreshBeforePageInfo();
						this.$_success(res.msg);
					} else {
						this.$_error(res.msg);
					}
				});
			},

			startClick() {
				this.show_repair_time = true;
			},
			endClick() {
				this.show_repair_true_time = true;
			},

			confirm_start(e) {
				this.show_repair_time = false;
				this.item.repair_date = e[0];
			},
			close_start(e) {
				this.show_repair_time = false;

			},
			confirm_end(e) {
				this.show_repair_true_time = false;
				this.item.repair_true_date = e[0];

			},
			close_end(e) {
				this.show_repair_true_time = false;

			},

			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						// let path1 = await this.$refs.watermark.getWatermark(res.tempFilePaths[0]);
						console.log(res)
						uni.showLoading({
							title: "上传中。。。"
						})
						let ret = await this.$_uploadFile(res.tempFilePaths[0])
						this.item.url = ret.url
						uni.hideLoading()

					}
				});
			},

			changeModule() {
				this.moduleShow = true;
			},
			moduleConfirm(e) {

				this.item.bar_id = e.value[0].id;
				this.item.bar_title = e.value[0].name;

				this.moduleShow = false;

			},
			moduleCancel() {
				this.moduleShow = false;
			},

			changeRepair() {
				this.repairShow = true;
			},
			repairConfirm(e) {

				this.item.repair_id = e.value[0].id;
				this.item.repair_title = e.value[0].name;

				this.repairShow = false;

			},
			repairCancel() {
				this.repairShow = false;
			},

			changeStatus() {
				this.statusShow = true;
			},
			statusConfirm(e) {

				this.item.status = e.value[0].id;
				this.item.status_title = e.value[0].name;

				this.statusShow = false;

			},
			statusCancel() {
				this.statusShow = false;
			},



			// async come(item) {
			// 	let res = await this.$http('userCome');
			// 	console.log(33333)
			// 	console.log(res.data.data.redirect_url)
			// 	if (res.code == 200) {
			// 		this.redirect_url = res.data.data.redirect_url
			// 	}

			// }
		}
	}
</script>

<style>
	.safe-area-inset-bottom {
		/* height: 100rpx; */
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: var(--window-bottom, 0);

	}
</style>