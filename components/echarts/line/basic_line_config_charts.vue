<template>
	<div :class="className" :style="{ height: height, width: width, marginTop: marginTop, }">
		<l-echart ref="chart" @finished="init" ></l-echart>
	</div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'echarts-basic-line-config-charts',
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
    xAxisData: {
      type: Array,
      default: () => [],
    },
    dayMonth: {
      type: Array,
      default: () => [],
    },
    barSeries1: {
      type: Array,
      default: () => [],
    },
    barSeries2: {
      type: Array,
      default: () => [],
    },
    barSeries3: {
      type: Array,
      default: () => [],
    },
    barSeries4: {
      type: Array,
      default: () => [],
    },
    lineSeries: {
      type: Array,
      default: () => [],
    },
    highlightIndex: {
      type: Number,
      default: null,
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        legend: {
          bottom: '5%',
          right: 5,
          itemWidth: 8,
          itemHeight: 8,
        },
        grid: {
          top: '10px',
          bottom: '20px',
          left: '45px',
          right: '10px'
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
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
          min: 0,
          max: 80,
          splitNumber: 4,
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#8fBC8F', '##eeeeee', '#FFFF00', '#FD7F80', '#FD7F80'],
              width: 0.5,
              type: [5, 10],
              dashOffset: '5'
            }
          },
          axisLabel: {
            fontSize: 10,
            padding: [0, 0, -15, -120],
            formatter: function(value) {
              if (value === 20) {
                return '良好';
              } else if (value === 40) {
                return '正常';
              } else if (value === 60) {
                return '关注';
              } else if (value === 80) {
                return '高风险';
              }
              return '';
            },
            color: '#666666',
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: this.barSeries1,
            itemStyle: {
              color: '#409EFF'
            }
          },
          {
            name: '',
            type: 'bar',
            data: this.barSeries2,
            itemStyle: {
              color: '#67C23A'
            }
          },
          {
            name: '',
            type: 'bar',
            data: this.barSeries3,
            itemStyle: {
              color: '#FF6C6C'
            }
          },
          {
            name: '',
            type: 'bar',
            data: this.barSeries4,
            itemStyle: {
              color: '#FF9C00'
            }
          },
          {
            name: '',
            type: 'line',
            data: this.lineSeries,
            smooth: true,
            lineStyle: {
              color: '#42B983'
            }
          }
        ]
      }
    }
  },
  mounted() {
		
     this.$nextTick(() => {
      this.$refs.chart.init(echarts, chart => {
        this.myChart = chart; // 保存图表实例
        chart.setOption(this.option);
		
      });
 
	 });
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null;
    }
  },
  watch: {
    xAxisData(newVal) {
      this.option.xAxis.data = newVal;
      this.$refs.chart.setOption(this.option);
    },
    barSeries1(newVal) {
      this.option.series[0].data = newVal;
      this.$refs.chart.setOption(this.option);
    },
    barSeries2(newVal) {
      this.option.series[1].data = newVal;
      this.$refs.chart.setOption(this.option);
    },
    barSeries3(newVal) {
      this.option.series[2].data = newVal;
      this.$refs.chart.setOption(this.option);
    },
    barSeries4(newVal) {
      this.option.series[3].data = newVal;
      this.$refs.chart.setOption(this.option);
    },
    lineSeries(newVal) {
      this.option.series[4].data = newVal; // 更新折线图数据
      this.$refs.chart.setOption(this.option);
    }
  },
  methods: {
    async init() {
      const chart = await this.$refs.chart.init(echarts);
      this.myChart = chart;
      chart.setOption(this.option);
      chart.on('click', params => {
        let index = params.dataIndex;
        let time = this.dayMonth[index];
        this.$emit('djTimeClick', time);
      });
    }
  }
}
</script>
