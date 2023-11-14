<template>

	<view>

		<view>
			<view class="display" style="margin-top: 10px;">
				<view>电机健康度趋势</view>
				<view class="display" style="margin-left: 10px;">
					<view @click="startClick()">{{start_time}}</view>
					<view class="display_j" style="width: 15px;"> ~ </view>
					<view @click="endClick()">{{end_time}}</view>
				</view>

				<u-calendar :show="show_start_time" :defaultDate="start_time" :minDate="min_time" monthNum="13"
					:maxDate="max_time" @confirm="confirm_start" @close="close_start"></u-calendar>
				<u-calendar :show="show_end_time" :defaultDate="end_time" :minDate="min_time" monthNum="13"
					:maxDate="max_time" @confirm="confirm_end" @close="close_end"></u-calendar>
			</view>
			<div class="w-100" style="height: 145px;">
				<echarts-basic-line-config-chart :series="djBarDjDayList.series" :xAxisData="djBarDjDayList.xAxisData"
					:dayMonth="djBarDjDayList.dayMonth" @djTimeClick="factoryDjTimeDetail2"
					className="main-jkd-dj-day-bar" height="100%"></echarts-basic-line-config-chart>
			</div>
		</view>

		<view style="margin-top: 10px;">
			<view>电机组件运行状态</view>

			<div style="width: 100%;overflow: auto;">
				<echarts-wold-population-chart :__that="this" :key="djBarDjListKey" className="main-jdk-dj"
					:yAxisData="djBarDjList.yAxisData" :series="djBarDjList.series" :yAxisLabel="djBarDjList.yAxisLabel"
					@djClick="factoryDjBarDayDayList" height="100%"></echarts-wold-population-chart>
			</div>
		</view>

		<view style="margin-top: 10px;">
			<view class="display">
				<view>{{dj_bar_device_title}}状态趋势</view>
				<view class="display" style="margin-left: 10px;">
					<view @click="barStartClick()">{{bar_start_time}}</view>
					<view class="display_j" style="width: 15px;"> ~ </view>
					<view @click="barEndClick()">{{bar_end_time}}</view>
				</view>

				<u-calendar :show="show_bar_start_time" :defaultDate="bar_start_time" :minDate="min_time" monthNum="13"
					:maxDate="max_time" @confirm="bar_confirm_start" @close="bar_close_start"></u-calendar>
				<u-calendar :show="show_bar_end_time" :defaultDate="bar_end_time" :minDate="min_time" monthNum="13"
					:maxDate="max_time" @confirm="bar_confirm_end" @close="bar_close_end"></u-calendar>
			</view>
			<div class="w-100" style="height: 145px;">
				<echarts-basic-line-config-chart :series="djBarDayList.series" :xAxisData="djBarDayList.xAxisData"
					:dayMonth="djBarDayList.dayMonth" @djTimeClick="factoryDjTime" className="main-jkd-dj-day-bar"
					height="100%"></echarts-basic-line-config-chart>
			</div>
		</view>


		<view style="margin-top: 10px;">
			<view class="display_j" style="width: 100%;">
				<div style="margin-right: 5px;">
					<u-icon name="play-left-fill" size="12" @click.stop="handeItemLeft2"></u-icon>
				</div>
				<view>实时变化趋势</view>
				<div style="margin-left: 5px;">
					<u-icon name="play-right-fill" size="12" :color="right_value2 ? '#333333' : '#cccccc'"
						@click.stop="headerRight2"></u-icon>
				</div>

			</view>
			<div class="w-100" style="height: 145px;">
				<echarts-basic-line-config-chart :series="djBarDayAesList.series" :xAxisData="djBarDayAesList.xAxisData"
					:dayMonth="djBarDayAesList.dayMonth" className="main-jkd-dj-day-bar"
					height="100%"></echarts-basic-line-config-chart>
			</div>
		</view>

		<view style="margin-top: 10px;">

			<view class="display_j select_bord" style="height: 20px;width: 100%;" @click="changeBar">
				<view class="display_j">
					<view class="display_j">
						{{selectTsTypeTitle}}
					</view>
					<u-icon name="arrow-down" size="14"></u-icon>
				</view>


			</view>


			<div class="w-100" style="height: 145px;">
				<echarts-basic-line-config-chart-ts :key="djBarDayAesTsListKey" :marginTop="'0px'"
					:series="djBarDayAesTsList.series" :xAxisData="djBarDayAesTsList.xAxisData"
					className="main-jkd-dj-day" height="133px"></echarts-basic-line-config-chart-ts>
			</div>
		</view>


		<u-picker :show="barShow" closeOnClickOverlay="true" :columns="selectTsType" :defaultIndex="defaultIndexBar"
			keyName="title" @confirm="barConfirm()" @cancel="barCancel()"></u-picker>

	</view>
</template>

<script>
	export default {
		props: {
			deviceId: {
				type: Number,
				default: '',
			}
		},
		data() {
			return {

				show_start_time: false,
				show_end_time: false,
				start_time: '',
				end_time: '',
				min_time: '',
				max_time: '',
				djBarDjDayList: {},

				djBarDjList: {},
				curr_time_click: '',
				dj_bar_device_id: '',
				dj_bar_device_title: "",


				show_bar_start_time: false,
				show_bar_end_time: false,
				bar_start_time: '',
				bar_end_time: '',
				djBarDayList: {},

				aes_time: '',
				//实时趋势
				djBarDayAesList: {},


				djBarDayAesTsList: {},
				selectTsType: [
					[{
							title: '三相电流',
							type: 'irms',
							id: 1
						}, {
							title: '三相电压',
							type: 'vrms',
							id: 2
						}, {
							title: '有功功率',
							type: 'ActivePower',
							id: 3
						}, {
							title: '电压平衡度',
							type: 'Voltagebalance',
							id: 4
						},
						{
							title: '电流平衡度',
							type: 'CurrentBalance',
							id: 5
						}, {
							title: '频率',
							type: 'SignalFrequency',
							id: 6
						}, {
							title: '总谐波',
							type: 'THD',
							id: 7
						},
						{
							title: '三次谐波',
							type: 'ThirdHarmonic',
							id: 8
						}, {
							title: '五次谐波',
							type: 'FifthHarmonic',
							id: 9
						}, {
							title: '七次谐波',
							type: 'SeventhHarmonic',
							id: 10
						}, {
							title: '九次谐波',
							type: 'NinthHarmonic',
							id: 11
						}, {
							title: '十一次谐波',
							type: 'EleventhHarmonic',
							id: 12
						},
						{
							title: '十三次谐波',
							type: 'ThirteenthHarmonic',
							id: 13
						}
					]
				],
				selectTsTypeTitle: '三相电流',
				selectTsTypeValue: 'irms',
				defaultIndexBar: '',
				barShow: false,

				right_value2: false,

			}
		},

		onLoad(option) {},

		mounted() {
			this.$nextTick(() => {
				var currentDate = new Date();

				var beforeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate
					.getDate());

				this.start_time = this.$_formatDate(beforeDate, 'yyyy-mm-dd');
				this.end_time = this.$_formatDate(currentDate, 'yyyy-mm-dd');

				this.min_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 12,
					currentDate
					.getDate()), 'yyyy-mm-dd');
				this.max_time = this.$_formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(),
					currentDate
					.getDate() + 1), 'yyyy-mm-dd');

				this.bar_start_time = this.$_formatDate(beforeDate, 'yyyy-mm-dd');
				this.bar_end_time = this.$_formatDate(currentDate, 'yyyy-mm-dd');

				this.aes_time = this.$_formatDate(currentDate, 'yyyy-mm-dd');


				this.init();
			})
		},

		methods: {
			init() {
				this.djBarDayDayList();
				this.djBarDayDjList();

			},
			
			factoryDjTimeDetail2(e){
				this.curr_time_click = e;
				this.djBarDayDjList();
			},

			factoryDjTime(e) {
				this.aes_time = e;
				this.factoryDjDayBarAesList();
			},

			factoryDjBarDayDayList(label, title) {
				// console.log(e);
				this.dj_bar_device_id = label,
					this.dj_bar_device_title = title,
					this.factoryDjDayBarDayList();
			},

			handeItemLeft2() {
				// 自定义时间
				var diyDate = new Date(this.aes_time)
				//减1天
				this.aes_time = this.$_formatDate(new Date(diyDate.setDate(diyDate.getDate() - 1)), 'yyyy-mm-dd');
				this.factoryDjDayBarAesList();
				this.right_value2 = true;
			},

			headerRight2() {
				// 自定义时间
				var diyDate = new Date(this.aes_time)
				//加1天
				this.aes_time = this.$_formatDate(new Date(diyDate.setDate(diyDate.getDate() + 1)), 'yyyy-mm-dd');


				if (this.aes_time >= this.$_formatDate(new Date(), 'yyyy-mm-dd')) {
					this.right_value2 = false;
				}
				this.factoryDjDayBarAesList();


			},


			changeBar() {
				this.barShow = true;
			},

			barConfirm(e) {
				console.log(8788)
				console.log(e)
				this.selectTsTypeValue = e.value[0].type;
				this.selectTsTypeTitle = e.value[0].title;

				this.factoryDjDayTsAesList();
				this.barShow = false;

			},
			barCancel() {
				this.barShow = false;
			},



			//电机健康度趋势
			djBarDayDayList() {

				this.$http('factoryDjDayJkdList', {
					'start_time': this.start_time,
					'end_time': this.end_time,
					'device_id': this.deviceId,

				}).then((res) => {
					this.djBarDjDayList = res.data;


				});
			},

			//电机组件运行状态
			djBarDayDjList() {

				this.$http('factoryDjDayBarList', {
					'device_id': this.deviceId,
					'time': this.curr_time_click,
				}).then((res) => {
					this.djBarDjList = res.data;
					if (this.djBarDjList.yAxisLabel && this.djBarDjList.yAxisLabel.length > 0) {
						this.dj_bar_device_id = this.djBarDjList.yAxisLabel[0];
						this.dj_bar_device_title = this.djBarDjList.yAxisData[0];

					} else {
						this.dj_bar_device_id = '';
						this.dj_bar_device_title = '';
					}
					this.factoryDjDayBarDayList();

				});
			},

			//电机组件状态趋势
			factoryDjDayBarDayList() {

				this.$http('factoryDjDayBarDayList', {
					'start_time': this.bar_start_time,
					'end_time': this.bar_end_time,
					'device_id': this.deviceId,
					'bar': this.dj_bar_device_id,


				}).then((res) => {
					this.djBarDayList = res.data;
					this.factoryDjDayBarAesList();

				});
			},
			//实时趋势
			factoryDjDayBarAesList() {

				this.$http('factoryDjDayBarAesList', {
					'time': this.aes_time,
					'device_id': this.deviceId,
					'bar_new': this.dj_bar_device_id,


				}).then((res) => {
					this.djBarDayAesList = res.data;

					this.factoryDjDayTsAesList();
				});
			},

			factoryDjDayTsAesList() {

				this.$http('factoryDjDayTsAesList', {
					'time': this.aes_time,
					'device_id': this.deviceId,
					'bar_new': this.dj_bar_device_id,
					'type': this.selectTsTypeValue,

				}).then((res) => {
					this.djBarDayAesTsList = res.data;


				});
			},

			BarStartClick() {
				this.show_bar_start_time = true;
			},
			barEndClick() {
				this.show_bar_end_time = true;
			},

			dateChange(e) {
				console.log(e);
			},
			bar_confirm_start(e) {
				this.show_bar_start_time = false;
				this.bar_start_time = e[0];
				console.log(e);
				this.changeBarTime();
			},
			bar_close_start(e) {
				this.show_bar_start_time = false;
				// this.start_time = e;
				console.log(e);
			},
			bar_confirm_end(e) {
				this.bar_show_end_time = false;
				this.bar_end_time = e[0];
				console.log(e);
				this.changeBarTime();
			},
			bar_close_end(e) {
				this.show_bar_end_time = false;
				// this.end_time = e;
				console.log(e);
			},

			changeBarTime(value) {
				this.djBarDayList();
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
		},

	}
</script>

<style>
</style>