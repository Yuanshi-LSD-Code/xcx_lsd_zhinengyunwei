<template>
	<div :class="className" :style="{ height: echart_height, width: width, marginTop: marginTop, minHight: minHight }" />
</template>
  
<script>
import * as echarts from 'echarts'
//各电机状态
export default {
	name: 'wold_population_chart',
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '350px'
		},
		minHight: {
			type: String,
			default: '350px'
		},
		autoResize: {
			type: Boolean,
			default: true
		},


		marginTop: {
			type: String,
			default: '10px'
		},
		//标点数据
		legendData: {
			type: Array,
			default: () => [],
		},
		//横轴坐标
		xAxisData: {
			type: Array,
			default: () => [],
		},
		yAxisData: {
			type: Array,
			default: () => [],
		},
		//纵轴坐标值
		series: {
			type: Array,
			default: () => [],
		},
		__that: {
			type: Object,
			default: () => {
				return {};
			},
		},
		yAxisLabel: {
			type: Array,
			default: () => [],
		},
	
		//   chartData: {
		//     type: Object,
		//     required: true
		//   }
	},
	data() {
		return {
			echart_height: this.height,
			myChart: null,
			option: {
				// title: {
				// 	text: 'World Population'
				// },
				radius: '90%',
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					}
				},

				legend: {
					// bottom: '5%',
					left: '0',
					// height:'auto',
					// orient:'vertical',
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '6%',
					containLabel: true
				},
				xAxis: {
					type: 'value',
					boundaryGap: [0, 0.01],

					min: function (value) {
						return 0;
					},
					max: function (value) {
						return 80;
					},

					axisLabel: {
						show: true,
						// rotate: 180,
						interval: function (index, value) {

						},
						fontSize: 10,
						padding: [5, 0, -15, -70],
						formatter: function (value) {

							if (value === 20) {
								var str = '良好';
								return str.split("");;
							} else if (value === 40) {
								var str = '正常';
								return str.split("");
							} else if (value === 60) {
								var str = '关注';
								return str.split("");
							} else if (value === 80) {
								var str = '高风险';
								return str.split("");
							}
							return '';
						}, // y轴1%-100%格式化
						color: '#666666',
					},

					splitArea: {
						show: true,
						areaStyle: {
							color: [
								"rgb(210, 219, 238, 0.2)",
								"rgb(210, 219, 238, 0.2)",
								"rgb(252, 223, 68, 0.5)",
								"rgb(253, 127, 128)"
							]
							// colorStops: [{
							// 	offset: 20,
							// 	color: 'rgba(0, 255, 255, 1)'
							// }, {
							// 	offset: 20,
							// 	color: 'rgba(58, 71, 212, 1)'
							// }],
						},
						min: 0, // y轴最小值
						max: 80, // y轴最大值
						splitNumber: 4,
						// boundaryGap:[0,1], //boundaryGap是坐标轴两端空白策略，数组内数值代表百分比
						axisTick: { show: false }, // 刻度
						splitLine: { show: true, lineStyle: { color: ['#8fBC8F', '##eeeeee', '#FFFF00', '#FD7F80', '#FD7F80'], width: 0.5, type: [5, 10], dashOffset: '5' } }, // 分隔线
						// splitLine: { show: false, lineStyle: { color: '#eeeeee' } }, // 分隔线

					},
				},
				yAxis: {

					axisTick: { show: false },
					axisLabel: {
						overflow: 'breakAll',
						textStyle: {
							width: '70',
						},
					},

					overflow: 'break',
					type: 'category',
					data: this.yAxisData,
					// data: ['Brazil', 'Indonesiasdffsfdsdfssd', 'USA', 'India', 'China', 'World', 'fdgdg', 'uiiui', 'dsfaf', 'dsfaf', 'wewew', 'dadf'],
				},
				series: this.series,
				// series: [
				// 	//动态
				// 	{
				// 		name: '2011',
				// 		type: 'bar',
				// 		data: [50, 30, 60, 75, 75, 50, 62, 56, 65, 20, 40, 50]
				// 	},
				// 	{
				// 		name: '2012',
				// 		type: 'bar',
				// 		data: [60, 35, 70, 45, 54, 68, 35, 52, 68, 30, 56, 60]
				// 	}
				// ]
			},
		}
	},
	mounted() {
		var autoHeight = this.option.yAxis.data.length * 60 + 100;
		this.echart_height = autoHeight + 'px';
		this.$nextTick(() => {
			this.initChart()
		})
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
	watch: {


	},

	methods: {
		initChart() {
			this.myChart = echarts.init(this.$el, 'macarons')
			// this.myChart = echarts.init(chartDom);
			this.option && this.myChart.setOption(this.option);
			var that = this;
			//https://www.runoob.com/echarts/echarts-events.html
			this.myChart.on('click', function (params) {

				// alert(params.name)
				let index = params.dataIndex;
				let label = that.yAxisLabel[index];
				let title = that.yAxisData[index];
				
				that.$emit('djClick',label,title);
				// that.__that.factoryDjDayList(time);

			});
			window.addEventListener('resize', function () {
				that.myChart.resize();
			});
		},

	}
}
</script>
