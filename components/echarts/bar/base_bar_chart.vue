<template>
	<div :class="className" :key="refresh" :style="{ height: height, width: width, marginTop: marginTop, }">
		<l-echart force-use-old-canvas="false" :key="key" width="100%" ref="chart" @finished="init"
			@click="chartClick"></l-echart>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	//维修状态
	export default {
		name: 'base_bar_chart',
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
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					xAxis: {
						type: 'category',
						data: ['定子', '转子', '轴承', '松动', '负载', '不平衡不对中'],
						axisLabel: {
							rotate: -45, // 设置标签倾斜角度，单位为度
							padding: [20, 20, 5, 5],
						},
					},
					radius: '90%',
					yAxis: {
						type: 'value',
						axisLabel: {
							// padding: [20, 20, 5, 5],
							formatter: function (value) {
							                if (value === parseInt(value)) {
							                    return value;  // 只显示整数
							                }
							            }
						},
					},
					series: [{
						data: this.series,
						type: 'bar'
					}]
				},
			}
		},
		mounted() {
			// console.log(this.legendData);
			// console.log(this.series);
			this.$nextTick(() => {

				this.$refs.chart.init(echarts, chart => {
					chart.setOption(this.option);
					
				})


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
			series(newVal) {

				this.option.series[0].data = newVal;

				this.$refs.chart.setOption(this.option)

			},
		},
		methods: {
			async init() {
				console.log(77777777)
				const chart = await this.$refs.chart.init(echarts);
				// this.$refs.chart.setChart((params) => {
				// 	console.log(8888881)
				// 	let index = params.dataIndex;
				// 	// this.$emit('djBarClick', index);
				// })
				// this.$refs.chart.on('click', function(params) {

				// 	let index = params.dataIndex;

				// 	that.$emit('djBarClick', index);

				// });

				chart.setOption(this.option)
				this.$refs.chart.setChart(this.handleClick)

				console.log(this.$refs.chart._api)
				chart.on('click', params => {
					console.log('点击事件触发2：', params);
					// 处理点击回调的业务逻辑
				});
			},
			chartClick() {
				console.log(666666666677)
			},

			goChart() {
				console.log(this.myChart)
				if (this.myChart) {
					this.option && this.myChart.setOption(this.option);
					//用于使chart自适应高度和宽度
					var that = this;

					this.myChart.on('click', function(params) {

						let index = params.dataIndex;

						// that.$emit('djBarClick', index);

					});

					window.addEventListener('resize', function() {
						that.myChart.resize();
					});


				}

			},

			handleClick(event) {
				console.log('点击事件触发：', event);
				// 在这里处理点击事件的业务逻辑
			},

		}
	}
</script>