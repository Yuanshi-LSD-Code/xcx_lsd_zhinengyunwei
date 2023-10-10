<template>
	<view :class="className" :style="{ height: height, width: width, marginTop: marginTop, }">
		<l-echart ref="chart" @finished="init"></l-echart>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	//全部电机状态统计
	export default {
		name: 'basic_line_chart',
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
			__that: {
				type: Object,
				default: () => {
					return {};
				},
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
						// right: 'center',
						// icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
						itemWidth: 8, // 设置宽度
						itemHeight: 8, // 设置高度
						// itemGap: 40, // 设置两个legend之间的间距
						// data:this.legendData,
						data: [{
								name: '良好', // 这个name需要和 series 里面的 name 对应起来
								// textStyle: {
								// 	color: '#2DC3FB' // 单独设置某一个图列的颜色
								// }
							},
							{
								name: '正常', // 这个name需要和 series 里面的 name 对应起来
								// textStyle: {
								// 	color: '#FDD43C' // 单独设置某一个图列的颜色
								// }
							},
							{
								name: '关注', // 这个name需要和 series 里面的 name 对应起来
								// textStyle: {
								// 	color: '#FDD43C' // 单独设置某一个图列的颜色
								// }
							},
							{
								name: '高风险', // 这个name需要和 series 里面的 name 对应起来
								// textStyle: {
								// 	color: '#FDD43C' // 单独设置某一个图列的颜色
								// }
							}
						]

					},
					xAxis: {
						type: 'category',
						data: this.xAxisData,
						// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					radius: '90%',
					series: this.series,
					// series: [

					// 	{
					// 		name: '良好',
					// 		data: [140, 230, 274, 218, 135, 157, 240],
					// 		type: 'line'
					// 	},
					// 	{
					// 		name: '正常',
					// 		data: [130, 230, 234, 228, 135, 147, 260],
					// 		type: 'line'
					// 	},
					// 	{
					// 		name: '关注',
					// 		data: [110, 230, 224, 218, 165, 147, 270],
					// 		type: 'line'
					// 	},
					// 	{
					// 		name: '高风险',
					// 		data: [100, 230, 214, 218, 135, 147, 260],
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
			legendData(newVal) {

				this.option.legend.data = newVal;

				this.$refs.chart.setOption(this.option)
			},
			xAxisData(newVal) {

				this.option.xAxis.data = newVal;

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
				var that = this;
				chart.on('click', params => {
					console.log('点击事件触发2：', params);
					let index = params.dataIndex;
                   let time = that.dayMonth[index];
					// uni.$emit('djBarClick', index);
					this.$emit('djTimeClick', time);
					// 处理点击回调的业务逻辑
				});



			},

		}
	}
</script>