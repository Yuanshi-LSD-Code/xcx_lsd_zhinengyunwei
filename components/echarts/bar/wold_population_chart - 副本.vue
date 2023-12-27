<template>
	<div :class="className" :style="{ height: height, width: width, marginTop: marginTop,minWidth:echart_width }">
		<l-echart force-use-old-canvas="false" :key="key" width="100%" ref="chart" @finished="init"></l-echart>
	</div>
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
			minWidth: {
				type: String,
				default: '375px'
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
				echart_width: this.width,
				myChart: null,
				option: {
					// title: {
					// 	text: 'World Population'
					// },
					// radius: '90%',
					// tooltip: {
					// 	trigger: 'axis',
					// 	axisPointer: {
					// 		type: 'shadow',
					// 	}
					// },

					legend: {
						// bottom: '5%',
						left: '0',
						// height:'auto',
						// orient:'vertical',
					},
					grid: {
						left: '1%',
						right: '0',
						bottom: '10%',
						containLabel: true
					},
					yAxis: {
						type: 'value',
						// boundaryGap: [0, 0.01],

						min: function(value) {
							return 0;
						},
						max: function(value) {
							return 80;
						},

						axisLabel: {
							show: true,
							// rotate: 180,
							interval: function(index, value) {

							},
							fontSize: 10,
							// padding: [5, 0, -15, -70],
							formatter: function(value) {

								if (value === 20) {
									var str = '良好';
									return str;
								} else if (value === 40) {
									var str = '正常';
									return str;
								} else if (value === 60) {
									var str = '关注';
									return str;
								} else if (value === 80) {
									var str = '高风险';
									return str;
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
							axisTick: {
								show: false
							}, // 刻度
							splitLine: {
								show: true,
								lineStyle: {
									color: ['#8fBC8F', '##eeeeee', '#FFFF00', '#FD7F80', '#FD7F80'],
									width: 0.5,
									type: [5, 10],
									dashOffset: '5'
								}
							}, // 分隔线
							// splitLine: { show: false, lineStyle: { color: '#eeeeee' } }, // 分隔线

						},
					},
					xAxis: {
						axisLabel: {
							interval: 0, // 设置刻度间隔为 0，表示所有刻度都显示
							width: 40, // 设置每个横坐标标签的宽度为60像素
							overflow: 'breakAll', // 超出部分截断显示
							// ellipsis: true // 显示省略号
							// formatter: function(value) {
							// 	console.log(8888999)
							// 	console.log(value)
							// 	if (value.length > 4) {
							// 		return value.substring(0, 4) + '<br/>' + value.substring(4);
							// 	}
							// 	console.log(value)
							// 	return value;
							// }
						},
						// axisTick: {
						// 	show: false
						// },
						// axisLabel: {
						// 	overflow: 'breakAll',
						// 	textStyle: {
						// 		width: '70',
						// 	},
						// },

						type: 'category',
						data: this.yAxisData,
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
			if (this.option.xAxis.data.length == 6) {
				this.echart_width =  '100%';
				this.width = '100%';
			}else if (this.option.xAxis.data.length <= 1) {
				this.echart_width = '20px';
				this.width = '20px';
			} else {
				var autoHeight = this.option.xAxis.data.length * 60 + 50;
				this.echart_width = autoHeight + 'px';
				this.width = autoHeight + 'px';
			}
			// setTimeout(() => {
				this.$nextTick(() => {
					this.$refs.chart.init(echarts, chart => {
						chart.setOption(this.option);
					});
				})
			// }, 1000)
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		watch: {
			yAxisData(newVal) {


				this.option.xAxis.data = newVal;

				//             if(this.option.xAxis.data.length <= 1){
				// 	this.minWidth =  '20px';
				// }else{
				// 	var autoHeight = this.option.xAxis.data.length * 60 + 50;
				// 	this.minWidth = autoHeight + 'px';
				// }

				// if (this.option.xAxis.data.length == 6) {
				// 	this.echart_width =  '100%';
				// }else if (this.option.xAxis.data.length <= 1) {
				// 	this.echart_width = '20px';
				// } else {
				// 	var autoHeight = this.option.xAxis.data.length * 60 + 50;
				// 	this.echart_width = autoHeight + 'px';
				// }

				this.$refs.chart.setOption(this.option)
			},
			series(newVal) {

				this.option.series = newVal;

				this.$refs.chart.setOption(this.option)
			},

		},

		methods: {
			async init() {

				const chart = await this.$refs.chart.init(echarts);
				if (this.option.color && this.option.color.length <= 0) {
					delete this.option['color']
				}
				chart.setOption(this.option)
				chart.on('click', params => {
					console.log('点击事件触发2：', params);
					let index = params.dataIndex;
					let label = this.yAxisLabel[index];
					let title = this.yAxisData[index];


					this.$emit('djClick', label, title);
					// 处理点击回调的业务逻辑
				});
			},

		}
	}
</script>