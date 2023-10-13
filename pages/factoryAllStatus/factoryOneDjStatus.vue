<template>
	<main-layout>
		<view>
			<u-line></u-line>

			<view class="display_j" style="height: 40px;">
				<view> {{factory_title}}</view>
			</view>
			<view style="position:absolute;top:11px;right:10px"><img @click="changeFactory()"
					src="../../static/image/u88.svg" style="width: 24px;height: 18px;" /></view>

			<u-picker :show="show" closeOnClickOverlay="true" :columns="factory_list" :defaultIndex="defaultIndex"
				keyName="title" @confirm="factoryConfirm()" @cancel="factoryCancel()"></u-picker>

			<u-line></u-line>

			<view class="bg-gray" style="height: 15px;"></view>
			<view>
				<view style="font-size: 14px;height: 40px;">全部电机状态统计</view>
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
				<view style="font-size: 14px;height: 40px;">各电机状态</view>


				<div style="width: 100%;overflow: auto;">
					<echarts-wold-population-chart :__that="this" :key="djBarDjListKey" className="main-jdk-dj"
						:yAxisData="djBarDjList.yAxisData" :series="djBarDjList.series"
						:yAxisLabel="djBarDjList.yAxisLabel"
						@djClick="factoryDjBarDayDayList"></echarts-wold-population-chart>
				</div>
			</view>

			<view class="bg-gray" style="height: 15px;"></view>
			<view>
				<view style="font-size: 14px;height: 40px;">{{dj_bar_bar_device_title}}状态</view>

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

				show: false,
				factory_list: [],
				defaultIndex: [],
				item: {},

				factory_id: "",
				factory_title: "",
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

			if (option.bar_index) {
				this.tabCurrent = option.bar_index;
				this.barList.forEach((item, index) => {
					if (index == this.tabCurrent) {
						this.barItem = item;

					}
				})
			}


			if (option.factory_id) {
				this.factory_id = option.factory_id;
				this.$http('djFactory').then((res) => {
					this.factory_list.push(res.data.factory_list);

					res.data.factory_list.forEach((item, index) => {
						if (item.id == this.factory_id) {
							this.defaultIndex[0] = index;

						}
					})

				})
			}
			if (option.factory_title) {
				this.factory_title = option.factory_title;
			}
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
			init() {
				this.djDayBarList();
				this.djBarDayDjList();
				// this.djBarDayDayList();
			},

			djBarDayDayList() {

				this.$http('factoryDjDayDayList', {
					'device_id': this.dj_bar_bar_device_id,
					'start_time': this.start_time,
					'end_time': this.end_time,
					'factory_id': this.factory_id,
				}).then((res) => {
					this.djBarDjDayList = res.data;


				});
			},
			djDayBarList() {

				this.$http('factoryDjAvgbgList', {
					'factory_id': this.factory_id,
				}).then((res) => {
					this.djBarTimeList = res.data;


				});
			},

			djBarDayDjList() {

				this.$http('factoryDjDayList', {
					'factory_id': this.factory_id,
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