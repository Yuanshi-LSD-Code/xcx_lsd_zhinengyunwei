<template>
	<div :class="className" :key="refresh" :style="{ height: echart_height, width: width, marginTop: marginTop }" />
</template>
  
<script>
import * as echarts from 'echarts';
//维修状态
export default {
	name: 'stacked_column_chart2',
	props: {
		refresh: {
			type: Number,
			default: null,
		},
		className: {
			type: String,
			default: 'chart',
		},
		width: {
			type: String,
			default: '100%',
		},
		height: {
			type: String,
			default: '100px',
		},
		echartHeight: {
			type: String,
			default: '',
		},
		autoResize: {
			type: Boolean,
			default: true,
		},

		marginTop: {
			type: String,
			default: '10px',
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
		legend: {
			type: Boolean,
			default: false,
		},
		//   chartData: {
		//     type: Object,
		//     required: true
		//   }
	},
	data() {
		return {
			checkName: '',
			echart_height: this.height,
			myChart: null,
			option: {
				color: this.color,
				fontStyle: 'italic', //italic斜体  oblique倾斜
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
					formatter: function (params) {
						console.debug( 'formatter', params );
						let tooltipContent = [];
						// 遍历所有数据项
						for (let i = 0; i < params.length; i++) {
							// 判断数据项是否符合条件
							if (params[i].value > 0) { // 这里以大于50为条件示例
								// 拼接符合条件的数据项到 tooltip 内容中
								tooltipContent.push( params[i].marker + params[i].seriesName + '：' + params[i].value);
							}
						}
						let content = tooltipContent.reverse().join('<br>');
						return content;
					}
				},
				legend: {
					show: true,
					bottom: '5%',
					// right: 'center',
					left: '3',
					// icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
					itemWidth: 8, // 设置宽度
					itemHeight: 8, // 设置高度
					// itemGap: 40, // 设置两个legend之间的间距
					data: [],//this.legendData,
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

					// right: '4%',
					bottom: '25%',
					// width: '0%', // 设置图形宽度
					height: '210px', // 设置图形高度
					containLabel: true,
				},

				yAxis: [
					{
						type: 'value',
						// interval: 1, // 设置刻度间距为整数
						// mix:1,
						axisLabel: {
							formatter: function (value) {
								if (value === parseInt(value)) {
									return value; // 只显示整数
								}
							},
							padding: [20, 20, 5, 5],
						},
					},
				],
				xAxis: [
					{
						type: 'category',
						fontSize: 10,
						data: ['定子', '转子', '轴承', '松动', '负载', '不平衡不对中'],
						axisLabel: {
							rotate: -45, // 设置标签倾斜角度，单位为度
							padding: [20, 20, 5, 5],
						},
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
		};
	},
	mounted() {
		// console.log(this.legendData);
		// console.log(this.series);
		console.log(33344);
		if (this.echartHeight) {
			var autoHeight = this.option.legend.data.length * 13 + 250;
			this.echart_height = autoHeight + 'px';
		}

		this.$nextTick(() => {
			this.initChart();
		});
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
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
				this.myChart = echarts.init(this.$el, 'macarons');
			}

			// this.myChart = echarts.init(chartDom);
			if (this.option.color && this.option.color.length <= 0) {
				delete this.option['color'];
			}

			if (this.legend) {
				delete this.option.legend['left'];
			}

			this.goChart();
		},

		goChart() {
			console.log(this.myChart);
			if (this.myChart) {
				this.option && this.myChart.setOption(this.option);
				//用于使chart自适应高度和宽度
				var that = this;

				this.myChart.on('click', function (params) {
					that.checkName = params.name;
					let index = params.dataIndex;
					var seriesIndex = params.seriesIndex;
					var dataIndex = params.dataIndex;
					that.setClick(seriesIndex);

					that.$emit('djBarClick', index);
				});

				window.addEventListener('resize', function () {
					that.myChart.resize();
				});
			}
		},

		setClick(seriesIndex) {
			console.log(44554);
			console.log(this.option.series);
			this.option.series[seriesIndex].itemStyle = {
				normal: {
					// label:{show:true},
					color: (params) => {
						//通过判断选中的名字改变柱子的颜色样式

						if (this.checkName === params.name) {
							return '#9c6bb5';
						} else {
							return params.color;
						}
					},
				},
			};

			// this.myChart = echarts.init(chartDom);
			this.option && this.myChart.setOption(this.option);
		},
	},
};
</script>
