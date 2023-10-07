<template>
	<main-layout>
		<view>
			<view>
				<u-tabs :list="barList" :current="tabCurrent" @click="tabClick" keyName="title"></u-tabs>
				<!-- 				 <u-tabs :list="barList" @click="click" keyName="title" itemStyle="height: 54px;width:52px;font-size:12px"></u-tabs> -->
			</view>
			<view class="bg-gray" style="height: 15px;"></view>
			<view>
				<view>全部电机{{barItem.title}}状态统计</view>

				<div class="jdk_line_echarts" style="">

					<echarts-basic-line-chart ref="chart" @finished="init" className="main-jdk-all-bar-time" :key="djBarTimeListKey" :__that="this"
						:xAxisData="djBarTimeList.xAxisData" :series="djBarTimeList.series"
						:dayMonth="djBarTimeList.dayMonth" @djTimeClick="factoryDjBarDayBarList"
						height="250px"></echarts-basic-line-chart>
				</div>

			</view>


		</view>
	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},

		onLoad(option) {


			this.tabCurrent = option.bar_index;
			this.barList.forEach((item, index) => {
				if (index == this.tabCurrent) {
					this.barItem = item;

				}
			})
			this.djDayBarList();
		},

		methods: {

			djDayBarList() {
				this.$http('djDayBarList').then((res) => {
					this.djBarTimeList = res.data;


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
			},

			factoryDjBarDayBarList(e) {
				console.log(44455)
				console.log(e)
			},
		}
	}
</script>

<style>

</style>