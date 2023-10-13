<template>
	<main-layout>
		<view>


			<view v-for="(item,index) in factory_dj_list " :key=" index">
				<view class="factory_title display_a" style="margin-top: 10rpx;">
					{{item.title}}
				</view>

				<view style="display: flex;flex-wrap: wrap;">
					<view v-for="(item2,index2) in item.dj" style="width: 50%;"  @click="djClickJkd(item2)">
						<echarts-stage-speed-gauge className="main-dj-detail-jkd" ref="chart" @finished="init"
							:gauge_org="item2.avgbg ? item2.avgbg.jkd : ''" height="120px"></echarts-stage-speed-gauge>
						<div class="display_j" style="">
							{{ item2.title }}
						</div>
					</view>
				</view>


			</view>
			<view class="bg-gray" style="height: 15px;"></view>

			<div class="card_status_list card_list" style="">
				<div class="row-space font-bold" style="height:40px;">
					运行状态统计</div>
				<u-line></u-line>
				<div class="echart_factory" style="display: flex;flex-wrap:wrap;">
					<echarts-stacked-column-chart className="main-card-status" ref="chart" @finished="init"
						:legendData="factory_bar.legendData" @djBarClick="djBarClick" :series="factory_bar.series"
						:color="factory_bar.color" width="100%" height="290px"></echarts-stacked-column-chart>
				</div>
			</div>

			<view class="bg-gray" style="height: 15px;"></view>

			<div class="card_work_list card_list" style="margin-top: 20px;">
				<div class="row-space" style="height:40px;">

					检修工作统计
				</div>
				<u-line></u-line>

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

				<div class="echart_factory" style="display: flex;flex-wrap:wrap;">
					<echarts-stacked-column-chart ref="chart" @finished="init" className="main-echart-chart"
						:legendData="factory_repair.legendData" :series="factory_repair.series" width="100%"
						height="290px"></echarts-stacked-column-chart>
				</div>
			</div>


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


				factory_dj_list: [],
				factory_bar: '',
				factory_repair: '',


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
			console.log(78787)
			console.log(this.min_time)
			console.log(this.max_time)


			this.$http('djFactoryDjList').then((res) => {
				this.factory_dj_list = res.data.factory_dj_list;


			});

			this.$http('djFactoryBarStatus').then((res) => {
				this.factory_bar = res.data;
			});

			this.changeRepairTime();



		},
		onShow() {

		},
		methods: {
			djClickJkd(item){
				this.$_navigateTo('/pages/djDetail/djDetail', {
					'item': item,
				})
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
			//获取修理情况
			changeRepairTime(value) {
				this.$http('djFactoryRepairList', {
					start_time: this.start_time,
					end_time: this.end_time
				}).then((res) => {
					this.factory_repair = res.data;
				});
			},
			djBarClick(e) {
				console.log(6667)
				console.log(e)
				this.$_navigateTo('/pages/factoryAllStatus/factoryAllStatus', {
					'bar_index': e
				})

			},
			// activeNames() {
			// 	return this.factory_dj_list.map((i, k) => {
			// 		return k;
			// 	});
			// },

			linkTo(item, index) {
				this.$_linkTo('factory', {
					'item': item
				})
			},
		},



	}
</script>




<style scoped lang="scss">
	.factory_title {
		height: 100rpx;
		background-color: rgba(68, 114, 196, 1);
		color: white;
	}

	.example-body {
		background-color: #fff;
		padding: 10px;
		width: 80%;
	}
</style>