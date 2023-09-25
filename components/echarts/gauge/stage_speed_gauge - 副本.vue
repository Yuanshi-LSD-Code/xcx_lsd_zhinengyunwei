<template>
	<div :class="className" :style="{ height: height, width: width, marginTop: marginTop, }" />
</template>
  
<script>
import * as echarts from 'echarts'
//健康度仪表盘
export default {
	name: 'stage_speed_gauge',
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

		gauge_org: {
			type: String,
			default: '100'
		},
		gauge_charge: {
			type: String,
			default: ''
		},
		marginTop: {
			type: String,
			default: '10px'
		},
		title: {
			type: String,
			default: ''
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
				title: {
					text: '名称',
					x: 'center',
					y: 'center',
					textStyle: {
						fontSize: 20,
						fontWeight: 'normal',
						color: ['#fff']
					},
					subtextStyle: {
						color: '#666',
						fontSize: 30
					},
					// top: 170,   //标题文字距离顶部距离
				},

				series: [
					{
						type: 'gauge',

						// title: {
						// 	show: true,
						// 	offsetCenter: ['0', '20%'],
						// 	color: '#464646',
						// 	fontSize: 16,
						// 	valueAnimation: false,
						// },
						axisLine: {
							lineStyle: {
								width: 8,
								color: [
									[0.25, '#0F0AEA'],
									[0.5, '#0BA02A'],
									[0.75, '#F5B900'],
									[1, '#C31713'],

								]
							}
						},
						pointer: {
							itemStyle: {
								color: '#601885'
							},
							width: 3,
						},
						axisTick: {
							distance: -10,
							length: 5,
							lineStyle: {
								color: '#fff',
								width: 2,
							},
							splitNumber: 2,
							// show: true, 
						},

						splitLine: {
							show: false,
							distance: -30,
							length: 10,
							lineStyle: {
								color: '#fff',
								width: 2
							}
						},
						axisLabel: {
							color: 'auto',

							fontSize: 8,
							show: true,
							distance: 40,
							rotate: 'tangential',
							formatter: function (value) {

								if (value === 10) {
									return '良好';
								} else if (value === 30) {
									return ' ㅤ ㅤ 正常';
								} else if (value === 60) {
									return ' ㅤ关注';
								} else if (value === 90) {
									return '高风险';
								}
								// if (value === 0) { return '100%'; }
								// if (value === 100) { return '0%'; }
								return '';
							},
						},
						title: {
							offsetCenter: [0, '-10%'],
							fontSize: 20
						},
						// grid: {
						//     left: 0,
						//     top: 0,
						//     right: 0,
						//     bottom: 0
						// },
						radius: '90%',
						detail: {
							// valueAnimation: true,
							fontSize: 10,
							formatter: '健康度：' + (this.gauge_org > 0 ? this.gauge_org : 100) + '%',
							// color: 'auto',
							color: '#000000',
							// color: '#611987',
							show: true,
							textStyle: {
								fontSize: 10
							},
							padding: [10, 10],
							offsetCenter: [0, "85%"],
							fontWeight: "bold",

						},
						data: [
							{
								value: 100 -(this.gauge_org > 0 ? this.gauge_org : 100),
							}
						]
					}


				]
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
			window.addEventListener('resize', function () {

				that.myChart.resize();
			});
		},

	}
}
</script>
