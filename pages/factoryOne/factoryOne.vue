<template>
	<main-layout navIndex="1">
		<view>
			<u-line></u-line>

			<view class="display_j" style="height: 40px;">
				<view style="margin-left: 20rpx;margin-right: 60rpx"> {{factory_title}}</view>
			</view>
			<view style="position:absolute;top:11px;right:10px"><img @click="changeFactory()"
					src="../../static/image/u88.svg" style="width: 24px;height: 18px;" /></view>


			<u-line></u-line>
			<view>

				<view class="display_sb" style="height:40px;">
					<view class="font-bold" style="margin-left: 20rpx;">电机健康度</view>
					<div @click="jdkCount" style="display: flex;margin-right: 20rpx;cursor: pointer;">
						<view>查看统计信息</view><u-icon name="arrow-right" size="20"></u-icon>
					</div>
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<view v-for="(item2,index2) in factory_dj_list" style="width: 50%;" @click="djClickJkd(item2)">
						<echarts-stage-speed-gauge className="main-dj-detail-jkd" ref="chart" @finished="init"
							:gauge_org="item2.avgbg ? item2.avgbg.jkd : ''" height="120px"></echarts-stage-speed-gauge>
						<div class="display_j" style="">
							<img style="height: 10px;width: 10px;"
								:src="item2.dj_status > 0? '../../static/image/u37.svg' : '../../static/image/u36.svg'" />
							<view style="margin-left: 20rpx;">{{ item2.title }}</view>
						</div>
					</view>
				</view>
			</view>


			<view class="bg-gray" style="height: 15px;"></view>

			<view class="display_sb" style="height:40px;">
				<view class="font-bold" style="margin-left: 20rpx;">电机运行状态</view>
				<view style="margin-right: 20rpx;">
					<u-icon :name="djStatusShow?'arrow-down':'arrow-right'" @click="djStatusClose" size="20"></u-icon>
				</view>
				
			</view>
			<u-line></u-line>
			<div class="echart_factory" style="display: flex;flex-wrap:wrap;" v-if="djStatusShow">
				<echarts-stacked-column-chart className="main-card-status" ref="chart" @finished="init"
					:legendData="dj_bar.legendData" @djBarClick="factoryOneStatus" :series="dj_bar.series"
					:color="dj_bar.color" width="100%" height="290px"></echarts-stacked-column-chart>
			</div>
			<view class="bg-gray" style="height: 15px;"></view>


			<u-line></u-line>
			<view class="display_sb" style="height:40px;">
				<view class="font-bold" style="margin-left: 20rpx;">检修工作统计</view>
				<div @click="repairClose" style="display: flex;margin-right: 20rpx;cursor: pointer;">
					<view>查看统计信息</view><u-icon :name="repairStatusShow?'arrow-down':'arrow-right'" size="20"></u-icon>
				</div>
			</view>
			<u-line></u-line>
			<div style="width:100%;" v-if="repairStatusShow">

				<view class="example-body" style="height: 30px;margin-left: 20rpx;">
					<view class="display">
						<view @click="startClick()">{{start_time}}</view>
						<view class="display_j" style="width: 15px;"> ~ </view>
						<view @click="endClick()">{{end_time}}</view>
					</view>

					<u-calendar :show="show_start_time" :defaultDate="start_time" :minDate="min_time" monthNum="13"
						:maxDate="max_time" @confirm="confirm_start" @close="close_start"></u-calendar>
					<u-calendar :show="show_end_time" :defaultDate="end_time" :minDate="min_time" monthNum="13"
						:maxDate="max_time" @confirm="confirm_end" @close="close_end"></u-calendar>

				</view>
				<view>
				
					<echarts-base-bar-chart ref="chart" @finished="init" className="main-echart-chart"
						@djBarClick="djBarClick" :series="repair_bar.repairTrue" width="100%"
						height="250px"></echarts-base-bar-chart>
				</view>
			</div>
			


			<view class="bg-gray" style="height: 15px;"></view>

			<view class="display_sb" style="height:40px;">
				<view class="font-bold" style="margin-left: 20rpx;">检修计划</view>
				<view class="display" @click="repairListClick" style="margin-right: 20rpx;">
					<view>查看更多</view><u-icon name="arrow-right" size="20"></u-icon>
				</view>

			</view>
			<view>
				<view v-for="(item,index) in repair_list " :key="index">
					<view class="display_sb" style="height: 80rpx;" @click="repairDetail(item,index)">
						<view style="margin-left: 20rpx;">{{item.label_title}}</view>

					</view>

				</view>
			</view>
			<view class="bg-gray" style="height: 15px;"></view>

			<view class="display_sb" style="height:40px;">
				<view class="font-bold" style="margin-left: 20rpx;">工厂报告</view>
				<view class="display" @click="reportListClick" style="margin-right: 20rpx;">
					<view>查看更多</view><u-icon name="arrow-right" size="20"></u-icon>
				</view>

			</view>
			<view style="bottom: 25rpx;">
				<view v-if="report_list.length >0">
				<view v-for="(item,index) in report_list " :key="index">
					<view class="display_sb" style="height: 80rpx;" @click="reportTo(item,index)">
						<view style="margin-left: 20rpx;">{{index+1}} 、{{item.label_title}}</view>
					</view>

				</view>
				</view>
				<view v-if="report_list.length <=0">
					<view style="height: 80rpx;">
						<view style="margin-left: 20rpx;">
							暂无数据
						</view>
						
					</view>
				  
				</view>
			</view>


			<u-picker :show="show" closeOnClickOverlay="true" :columns="factory_list" :defaultIndex="defaultIndex"
				keyName="title" @confirm="factoryConfirm()" @cancel="factoryCancel()"></u-picker>
		</view>
	</main-layout>
</template>

<script>
	export default {
		data() {
			return {

				djStatusShow: true,
				repairStatusShow: true,

				show: false,
				factory_list: [],
				defaultIndex: [],

				factory_title: '',
				item: {},
				factory_id: '',
				//电机
				factory_dj_list: [],
				dj_bar: [],
				repair_bar: [],
				repair_list: [],
				report_list: [],

				show_start_time: false,
				show_end_time: false,
				start_time: '',
				end_time: '',
				
				min_time: '',
				max_time: '',


			}
		},

		onLoad(option) {

			var item = JSON.parse(option.item);
			this.item = item
			this.factory_title = item.title;
			this.factory_id = item.id;
			this.$http('djFactory').then((res) => {
				this.factory_list.push(res.data.factory_list);

				res.data.factory_list.forEach((item, index) => {
					if (item.id == this.factory_id) {
						this.defaultIndex[0] = index;

					}
				})

			})

			var currentDate = new Date();

			var beforeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

			this.start_time = this.$_formatDate(beforeDate, 'yyyy-mm-dd');
			this.end_time = this.$_formatDate(currentDate, 'yyyy-mm-dd');

			this.min_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate
				.getDate()), 'yyyy-mm-dd');
			this.max_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate
				.getDate() + 1), 'yyyy-mm-dd');

			this.init();

		},


		methods: {
			refresh(){
				console.log(8874443534)
				this.init();
			},
			
			reportListClick(){
				this.$_navigateTo('/pages/factoryOne/reportList', {
					'factory_id': this.factory_id,
					'factory_title': this.factory_title,
				})
			},
			
			repairListClick(){
				this.$_navigateTo('/pages/factoryOne/repairList', {
					'factory_id': this.factory_id,
					'factory_title': this.factory_title,
				})
			},
			
			djClickJkd(item){
				this.$_navigateTo('/pages/djDetail/djDetail', {
					'item': item,
				})
			},
			repairClose() {
				this.repairStatusShow = !this.repairStatusShow;
			},
			djStatusClose() {
				this.djStatusShow = !this.djStatusShow;
			},

			jdkCount() {
				this.$_navigateTo('/pages/factoryAllStatus/factoryOneDjStatus', {
					'factory_id': this.factory_id,
					'factory_title': this.factory_title
				})
			},
			factoryOneStatus(e) {
				this.$_navigateTo('/pages/factoryAllStatus/factoryOneStatus', {
					'factory_id': this.factory_id,
					'factory_title': this.factory_title,
					'bar_index': e
				})
			},

			repairDetail(item, index) {
				console.log(4545454)
				this.$_navigateTo('/pages/factoryOne/repairDetail', {
					'item': item
				})
			},

			init() {
				this.djList();
				this.djBar();
				this.dJRepairInfo();
				this.djRepairListNo();
				this.djFactoryReportListNo();
			},

			reportTo(item, index) {
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
				// this.$_navigateTo('/pages/factoryOne/factoryReport', {
				// 	'item': item
				// })
			},
			barClick() {
				console.log(333);
			},

			djBarClick() {
				console.log(999999999999);
			},
			djFactoryReportListNo() {
				this.$http('djFactoryReportListNo', {
					factory_id: this.factory_id
				}).then((res) => {
					this.report_list = res.data.list;
				});
			},
			djRepairListNo() {
				this.$http('djRepairListNo', {
					factory_id: this.factory_id
				}).then((res) => {
					this.repair_list = res.data.list;
				});
			},
			dJRepairInfo() {
				this.$http('dJRepairInfo', {
					factory_id: this.factory_id,
					start_time: this.start_time,
					end_time: this.end_time
				}).then((res) => {
					this.repair_bar = res.data;
				})
			},
			djBar() {
				this.$http('djFactoryBarStatus', {
					factory_id: this.factory_id
				}).then((res) => {
					this.dj_bar = res.data;
				})
			},



			djList() {
				this.$http('djList', {
					factory_id: this.factory_id
				}).then((res) => {
					this.factory_dj_list = res.data.factory_dj_list;
				});
			},


			changeFactory() {
				this.show = true;
			},
			factoryConfirm(e) {

				this.factory_id = e.value[0].id;
				this.factory_title = e.value[0].title;
				this.item = e.value[0];
				this.init();
				this.show = false;

			},
			factoryCancel() {
				this.show = false;
			},



			startClick() {
				this.show_start_time = true;
			},
			endClick() {
				this.show_end_time = true;
			},

			dateChange(e) {
				console.log(e);
			},
			confirm_start(e) {
				this.show_start_time = false;
				this.start_time = e[0];
				this.dJRepairInfo();
			},
			close_start(e) {
				this.show_start_time = false;
				// this.start_time = e;
				console.log(e);
			},
			confirm_end(e) {
				this.show_end_time = false;
				this.end_time = e[0];
				this.dJRepairInfo();
				console.log(e);
			},
			close_end(e) {
				this.show_end_time = false;
				// this.end_time = e;
				console.log(e);
			},


		},
	}
</script>

<style>

</style>