<template>
	<view :style="{ height: height, width: width, marginTop: marginTop,marginBottom:marginTop }">
		<l-echart ref="chart" @finished="init"></l-echart>
	</view>

	<!-- <div :class="className" :style="{ height: height, width: width, marginTop: marginTop, }" /> -->
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
				default: '5px'
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

					series: [{
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
								length: '90%',
								width: 2,
							},
							// 仪表盘指针
							// pointer: {
							// 	show: true,
							// 	// 仪表盘指针icon
							// 	icon: "path://M 113.24 94.74 C 125.20 98.73 128.31 113.32 117.91 121.07 C 111.12 126.13 101.45 123.57 96.85 116.44 Q 96.57 116.00 96.07 116.13 L 6.27 138.45 A 0.79 0.79 0.0 0 1 5.34 137.98 Q 5.01 137.21 5.85 136.95 Q 49.99 123.32 94.14 109.71 A 0.83 0.82 84.3 0 0 94.72 108.99 C 95.49 99.36 103.91 91.62 113.24 94.74 Z",
							// 	// icon: "image://https://lsdnew.dev.ycmua.com//static/img_07.png",
							// 	width: '90%',
							// 	// length: "100%", // 指针长度
							// 	// keepAspect: true,
							// 	// offsetCenter: [-18, '55%'],
							// 	itemStyle: {
							// 		color: "#601885",
							// 	},
							// },
							// min:0,
							// max:100,
							anchor: {
								show: true,
								showAbove: true,
								size: 5,
								itemStyle: {
									borderWidth: 5,
									borderColor: "#601885",
								}

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
								formatter: function(value) {

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
							data: [{
								// value: this.gauge_org > 0 ? this.gauge_org-10 : 0,
								value: 100 - (this.gauge_org > 0 ? this.gauge_org : 100),
							}]
						}


					]
				},
			}
		},


		mounted() {

			this.$nextTick(() => {
				// console.log(78787)
				// console.log(this.option)
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
			gauge_org(newVal) {
				console.log(4444)
				console.log(newVal)
				var title = 100 - (newVal > 0 ? newVal : 100);
				this.option.series[0].data[0]['value'] = title;

				var formatter = '健康度：' + (newVal > 0 ? newVal : 100) + '%';
				this.option.series[0].detail.formatter = formatter;
				this.$refs.chart.setOption(this.option)

			},
		},

		methods: {
			async init() {
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)

			},

		}
	}
</script>