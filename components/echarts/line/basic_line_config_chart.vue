<template>
	<div :class="className" :style="{ height: height, width: width, marginTop: marginTop, }" />
</template>
  
<script>
import * as echarts from 'echarts'
//全部电机状态统计
export default {
	name: 'basic_line_config_chart',
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
			default: '100px'
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
		//纵轴坐标值
		series: {
			type: Array,
			default: () => [],
		},
		dayMonth: {
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
			myChart: null,
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					bottom: '5%',
					right: 5,
					// icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
					itemWidth: 8,  // 设置宽度
					itemHeight: 8, // 设置高度
					// itemGap: 40, // 设置两个legend之间的间距


				},
				grid: {
					top: '10px',     // 图形距离容器上边界的距离
					bottom: '20px',  // 图形距离容器下边界的距离
					left: '45px',    // 图形距离容器左边界的距离
					right: '10px'    // 图形距离容器右边界的距离
				},

				xAxis: {
					type: 'category',
					data: this.xAxisData
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false //y轴线消失
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
						},

					},
					min: 0, // y轴最小值
					max: 80, // y轴最大值
					splitNumber: 4,
					// boundaryGap:[0,1], //boundaryGap是坐标轴两端空白策略，数组内数值代表百分比
					axisTick: { show: false }, // 刻度
					splitLine: { show: true, lineStyle: { color: ['#8fBC8F', '##eeeeee', '#FFFF00', '#FD7F80', '#FD7F80'], width: 0.5, type: [5, 10], dashOffset: '5' } }, // 分隔线
					// splitLine: { show: false, lineStyle: { color: '#eeeeee' } }, // 分隔线
					axisLabel: {
						fontSize: 10,
						padding: [0, 0, -15, -120],
						formatter: function (value) {
							// console.log(222)
							// console.log(value)
							if (value === 20) {
								var str = '良好';
								return str.split("");
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
				},
				radius: '95%',
				series: this.series,

				// series: [
				// 	{
				// 		// name: '高风险',
				// 		data: [30, 20, 23, 21, 20, 20, 20],
				// 		type: 'line'
				// 	},

				// ]
			},
		}
	},
	mounted() {
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
	methods: {
		initChart() {
			this.myChart = echarts.init(this.$el, 'macarons')
			// this.myChart = echarts.init(chartDom);
			this.option && this.myChart.setOption(this.option);
			//用于使chart自适应高度和宽度
			var that = this;

			this.myChart.on('click', function (params) {

				let index = params.dataIndex;
				let time = that.dayMonth[index];
				// console.log(7777)
				// console.log(that.dayMonth)
				// console.log(time)

				that.$emit('djTimeClick', time);
				// this.
			});
			window.addEventListener('resize', function () {
				that.myChart.resize();
			});
		},

	}
}
</script>
