<template>
	<!-- <div :class="className" :key="refresh" :style="{ height: height, width: width, marginTop: marginTop, }" /> -->
	<view :class="className" :style="{ height: height, width: width, marginTop: marginTop,marginBottom:marginTop }">
		<l-echart force-use-old-canvas="false" :key="key" width="100%" ref="chart" @finished="init"></l-echart>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	//维修状态
	export default {
		name: 'stacked_column_chart',
		props: {
			refresh: {
				type: Number,
				default: null,
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
			color: {
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
					color: this.color,
					fontStyle: "italic", //italic斜体  oblique倾斜
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						// padding:5,
						bottom: '5%',
						// left:'10%',
						// right: 'center',
						// icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
						// itemWidth: 10, // 设置宽度
						// itemHeight: 10, // 设置高度
						itemGap: 10, // 设置两个legend之间的间距
						data: this.legendData
						// data: [
						// 	{
						// 		name: '高风险',  // 这个name需要和 series 里面的 name 对应起来
						// 		// textStyle: {
						// 		// 	color: '#2DC3FB' // 单独设置某一个图列的颜色
						// 		// }
						// 	},
						// 	{
						// 		name: '关注',  // 这个name需要和 series 里面的 name 对应起来
						// 		// textStyle: {
						// 		// 	color: '#FDD43C' // 单独设置某一个图列的颜色
						// 		// }
						// 	},
						// 	{
						// 		name: '正常',  // 这个name需要和 series 里面的 name 对应起来
						// 		// textStyle: {
						// 		// 	color: '#FDD43C' // 单独设置某一个图列的颜色
						// 		// }
						// 	},
						// 	{
						// 		name: '良好',  // 这个name需要和 series 里面的 name 对应起来
						// 		// textStyle: {
						// 		// 	color: '#FDD43C' // 单独设置某一个图列的颜色
						// 		// }
						// 	}
						// ]

					},

					radius: '90%',
					grid: {
						top: '15px', // 图形距离容器上边界的距离
                        left:'10%',
						// right: '0%',
						bottom: '30%',
						containLabel: true
					},

					yAxis: [{
						type: 'value',
						axisLabel: {
							padding: [20, 20, 5, 5],
						},
					}],
					xAxis: [{

							type: 'category',
							fontSize: 6,
							data: ['定子', '转子', '轴承', '松动', '负载', '不平衡不对中'],
							axisLabel: {
								rotate: -54, // 设置标签倾斜角度，单位为度
								padding: [20, -25, -25, 5],
								// margin: , 
								interval: 0 // 设置横坐标文字全部显示
							},


							// formatter: function(value) {
							//                 return '{big|' + value + '}';
							// },
							// rich: {
							// 	big: {
							// 		align: 'left',
							// 		padding: [0, 10, 0, 0] // 调整偏移值，负值表示向左偏移
							// 	}
							// }

							// axisTick: {
							// 	alignWithLabel: true
							// }

						},

					],
					series: this.series,
					// series: [
					// 	{
					// 		name: '高风险',
					// 		type: 'bar',
					// 		stack: 'Ad',
					// 		barWidth: 25,
					// 		emphasis: {
					// 			focus: 'series'
					// 		},
					// 		data: [2, 2, 2, 2, 1]
					// 	},
					// 	{
					// 		name: '关注',
					// 		type: 'bar',
					// 		stack: 'Ad',
					// 		barWidth: 25,
					// 		emphasis: {
					// 			focus: 'series'
					// 		},
					// 		data: [1, 2, 2, 2, 2]
					// 	},
					// 	{
					// 		name: '正常',
					// 		type: 'bar',
					// 		stack: 'Ad',
					// 		barWidth: 25,
					// 		emphasis: {
					// 			focus: 'series'
					// 		},
					// 		data: [2, 1, 2, 2, 2]
					// 	},
					// 	{
					// 		name: '良好',
					// 		type: 'bar',
					// 		stack: 'Ad',
					// 		barWidth: 25,
					// 		emphasis: {
					// 			focus: 'series'
					// 		},
					// 		data: [2, 1, 2, 2, 2]
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
			legendData(newVal) {

				this.option.legend.data = newVal;
				if (this.option.color && this.option.color.length <= 0) {
					delete this.option['color']

				}
				this.$refs.chart.setOption(this.option)
			},
			series(newVal) {

				this.option.series = newVal;
				if (this.option.color && this.option.color.length <= 0) {
					delete this.option['color']

				}
				this.$refs.chart.setOption(this.option)
			},
			color(newVal) {

				this.option.color = newVal;

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
						
					
						this.$emit('djBarClick', index);
					// 处理点击回调的业务逻辑
				});
			},

		}
	}
</script>