<template>
	<div :class="className" :style="{ height: height, width: width, marginTop: marginTop, }">
		<l-echart ref="chart" @finished="init" ></l-echart>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	//全部电机状态统计
	export default {
		name: 'basic_line_config_chart_ts',
		props: {
			key: {
				type: String,
				default: '1'
			},
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
				default: '20px'
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
					// tooltip: {
					// 	trigger: 'axis',
					// 	axisPointer: {
					// 		type: 'shadow'
					// 	}
					// },
					legend: {
						left: '5%',
						// bottom: '5%',

						// right: 5,
						// icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
						itemWidth: 8, // 设置宽度
						itemHeight: 8, // 设置高度
						// itemGap: 40, // 设置两个legend之间的间距


					},
					grid: {
						top: '50px', // 图形距离容器上边界的距离
						bottom: '20px', // 图形距离容器下边界的距离
						left: '45px', // 图形距离容器左边界的距离
						right: '10px' // 图形距离容器右边界的距离
					},


					xAxis: {
						type: 'category',
						data: this.xAxisData
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: false, //y轴线消失
							padding: [60, 20, 5, 5],
						},

						// splitArea: {
						// 	show: true,
						// 	areaStyle: {
						// 		color: [
						// 			"rgb(210, 219, 238, 0.2)",
						// 			"rgb(210, 219, 238, 0.2)",
						// 			"rgb(252, 223, 68, 0.5)",
						// 			"rgb(253, 127, 128)"
						// 		]
						// 	},

						// },

						// splitLine: { show: false, lineStyle: { color: '#eeeeee' } }, // 分隔线
						// axisLabel: {
						// 	fontSize: 10,
						// 	padding: [0, 0, -15, -120],
						// 	formatter: function (value) {
						// 		// console.log(222)
						// 		// console.log(value)
						// 		if (value === 20) {
						// 			var str = '良好';
						// 			return str.split("");
						// 		} else if (value === 40) {
						// 			var str = '正常';
						// 			return str.split("");
						// 		} else if (value === 60) {
						// 			var str = '关注';
						// 			return str.split("");
						// 		} else if (value === 80) {
						// 			var str = '高风险';
						// 			return str.split("");
						// 		}
						// 		return '';
						// 	}, // y轴1%-100%格式化
						// 	color: '#666666',
						// },
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
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(this.option);
				});
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

			xAxisData(newVal) {

				this.option.xAxis.data = newVal;

				this.$refs.chart.setOption(this.option)
			},
			series(newVal) {

				this.option.series = newVal;
               // console.log(77777777788)
               // console.log(newVal)
				this.$refs.chart.setOption(this.option)
			},

		},
		methods: {
			async init() {
				const chart = await this.$refs.chart.init(echarts);

				chart.setOption(this.option)
				chart.on('click', params => {
					//console.log('点击事件触发2：', params);
					let index = params.dataIndex;

					this.$emit('djBarClick', index);
					// 处理点击回调的业务逻辑
				});



			},

		}
	}
</script>