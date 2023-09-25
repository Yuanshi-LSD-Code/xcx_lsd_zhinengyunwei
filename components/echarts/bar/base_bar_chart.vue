<template>
	<div :class="className" :key="refresh" :style="{ height: height, width: width, marginTop: marginTop, }" />
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
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: this.series,
						type: 'bar'
					}
				]
			},
		}
	},
	mounted() {
		// console.log(this.legendData);
		// console.log(this.series);
		console.log(33344)
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
		// series: {
		// 	handler(newValue, oldValue) {
		// 		console.log(444);
		// 		console.log(newValue);

		// 		this.goChart()

		// 	},

		// 	immediate: true,
		// 	deep: true,
		// },
	},
	methods: {
		initChart() {

			if (this.myChart == null) {
				this.myChart = echarts.init(this.$el, 'macarons')
			}



			// this.myChart = echarts.init(chartDom);
			if (this.option.color && this.option.color.length <= 0) {
				delete this.option['color']

			}
			this.goChart();
		},

		goChart() {
			console.log(this.myChart)
			if (this.myChart) {
				this.option && this.myChart.setOption(this.option);
				//用于使chart自适应高度和宽度
				var that = this;

				this.myChart.on('click', function (params) {

					let index = params.dataIndex;


					that.$emit('djBarClick', index);

				});

				window.addEventListener('resize', function () {
					that.myChart.resize();
				});
			}

		}

	}
}
</script>
