<template>
	<main-layout>
		<view>
			<view>
				<u-tabs :list="barList" :current="tabCurrent" @click="tabClick" activeStyle="color: #3c9cff" keyName="title"></u-tabs>
				<!-- 				 <u-tabs :list="barList" @click="click" keyName="title" itemStyle="height: 54px;width:52px;font-size:12px"></u-tabs> -->
			</view>
			<view class="bg-gray" style="height: 15px;"></view>
			<view>
				<view class="font-bold" style="font-size: 14px;height: 40px;margin-left: 20rpx;">全部电机{{barItem.title}}状态统计</view>
				<u-line></u-line>

				<div class="jdk_line_echarts" style="">

					<echarts-basic-line-chart ref="chart" @finished="init" className="main-jdk-all-bar-time"
						:key="djBarTimeListKey" :__that="this" :yAxisData="djBarTimeList.xAxisData"
						:series="djBarTimeList.series" :dayMonth="djBarTimeList.dayMonth"
						@djTimeClick="factoryDjBarDayBarList" height="250px"></echarts-basic-line-chart>
				</div>

			</view>
			<view class="bg-gray" style="height: 15px;"></view>
			<view>
				<view  class="font-bold" style="font-size: 14px;height: 40px;margin-left: 20rpx;">各电机{{barItem.title}}状态</view>


				<div style="width: 100%;overflow: auto;">
					<echarts-wold-population-chart :__that="this" :key="djBarDjListKey" className="main-jdk-dj"
						:yAxisData="djBarDjList.yAxisData" :series="djBarDjList.series"
						:yAxisLabel="djBarDjList.yAxisLabel"
						@djClick="factoryDjBarDayDayList"></echarts-wold-population-chart>
				</div>
			</view>

			<view class="bg-gray" style="height: 15px;"></view>
			<view>
				<view class="font-bold" style="font-size: 14px;height: 40px;margin-left: 20rpx;">{{dj_bar_bar_device_title}}{{barItem.title}}状态</view>

				<div style="width:100%;height: 50px;">


					<view class="example-body" style="">
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
				</div>


				<div class="w-100" style="height: 145px;">
					<echarts-basic-line-config-chart :series="djBarDjDayList.series"
						:xAxisData="djBarDjDayList.xAxisData" :dayMonth="djBarDjDayList.dayMonth"
						@djTimeClick="factoryDjTimeDetail2" className="main-jkd-dj-day-bar"
						height="100%"></echarts-basic-line-config-chart>
				</div>
			</view>


		</view>

	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				show_start_time: false,
				show_end_time: false,
				start_time: '',
				end_time: '',
				min_time: '',
				max_time: '',

				barList: [{
					id: 0,
					type: 'bar6',
					title: '定子'
				}, {
					id: 1,
					type: 'bar2',
					title: '转子'
				}, {
					id: 2,
					type: 'bar4',
					title: '轴承'
				}, {
					id: 3,
					type: 'bar1',
					title: '松动'
				}, {
					id: 4,
					type: 'bar3',
					title: '负载'
				}, {
					id: 5,
					type: 'bar2',
					title: '不平衡不对中'
				}],
				barItem: {},
				tabCurrent: 0,

				djBarTimeList: {},
				djBarDjList: {},

				dj_bar_bar_device_id: '',
				dj_bar_bar_device_title: '',

				djBarDjDayList: {},

				curr_time_click: '',
			}
		},

		onLoad(option) {

			var currentDate = new Date();

			var beforeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

			this.start_time = this.$_formatDate(beforeDate, 'yyyy-mm-dd');
			this.end_time = this.$_formatDate(currentDate, 'yyyy-mm-dd');

			this.min_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate
				.getDate()), 'yyyy-mm-dd');
			this.max_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate
				.getDate() + 1), 'yyyy-mm-dd');


			this.tabCurrent = option.bar_index;
			this.barList.forEach((item, index) => {
				if (index == this.tabCurrent) {
					this.barItem = item;

				}
			})
			this.init();

			

		},

		methods: {

			factoryDjBarDayDayList(dj_device_id = '', dj_device_title = '') {
				if (dj_device_id) {
					this.dj_bar_bar_device_id = dj_device_id;
				}
				if (dj_device_title) {
					this.dj_bar_bar_device_title = dj_device_title;
				}
				this.djBarDayDayList();

			},


			init() {
				this.djDayBarList();
				this.djBarDayDjList();
				// this.djBarDayDayList();
			},

			djBarDayDayList() {
               
				
				this.$http('djBarDayDayList', {
					'bar_type': this.barItem.type,
					'device_id': this.dj_bar_bar_device_id,
					'start_time': this.start_time,
					'end_time': this.end_time,
				}).then((res) => {
					this.djBarDjDayList = res.data;


				});
			},
			djDayBarList() {

				this.$http('djDayBarList', {
					'bar_type': this.barItem.type
				}).then((res) => {
					this.djBarTimeList = res.data;


				});
			},

			djBarDayDjList() {

				this.$http('djBarDayDjList', {
					'bar_type': this.barItem.type,
					'time': this.curr_time_click,
				}).then((res) => {
					this.djBarDjList = res.data;
					if (this.djBarDjList.yAxisLabel && this.djBarDjList.yAxisLabel.length > 0) {
						this.dj_bar_bar_device_id = this.djBarDjList.yAxisLabel[0];
						this.dj_bar_bar_device_title = this.djBarDjList.yAxisData[0];
						this.djBarDayDayList();
					} else {
						this.dj_bar_bar_device_id = '';
						this.dj_bar_bar_device_title = '';
					}

				});
			},


			tabClick(e) {
				console.log(8888)
				console.log(e)
				this.tabCurrent = e.index;
				this.barList.forEach((item, index) => {
					if (index == this.tabCurrent) {
						this.barItem = item;

					}
				})
				this.djDayBarList();
				this.djBarDayDjList();
			},

			factoryDjBarDayBarList(e) {
				console.log(44455)
				console.log(e)
				this.curr_time_click = e;
				this.djBarDayDjList();

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
				console.log(e);
				this.changeRepairTime();
			},
			close_start(e) {
				this.show_start_time = false;
				// this.start_time = e;
				console.log(e);
			},
			confirm_end(e) {
				this.show_end_time = false;
				this.end_time = e[0];
				console.log(e);
				this.changeRepairTime();
			},
			close_end(e) {
				this.show_end_time = false;
				// this.end_time = e;
				console.log(e);
			},
			changeRepairTime(value) {
				this.djBarDayDayList();
			},
		}
	}
</script>

<style>
	.example-body {
		background-color: #fff;
		padding: 10px;
		width: 80%;
	}
</style>