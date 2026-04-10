<template>
  <div :class="className" v-if="aaa" :style="{ height: height, width: width, marginTop: marginTop, minWidth: echart_width }">
    <l-echart force-use-old-canvas="false" :key="key" width="100%" ref="chart" @finished="init"></l-echart>
  </div>
</template>

<script>
import * as echarts from 'echarts'

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
    legendData: {
      type: Array,
      default: () => [],
    },
    xAxisData: {
      type: Array,
      default: () => [],
    },
    yAxisData: {
      type: Array,
      default: () => [],
    },
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
    }
  },
  data() {
    return {
      isIphoneX: this.isIphoneX,
      echart_width: this.width,
      aaa: false,
      myChart: null,
      selectedIndex: null, // 记录选中的柱形图索引
	  originalColors: [], // 记录每个柱形图的原始颜色

      option: {
        legend: {
          left: '0',
        },
        grid: {
          left: '1%',
          right: '0',
          bottom: '10%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 80,
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function(value) {
              if (value === 20) return '良好';
              if (value === 40) return '正常';
              if (value === 60) return '关注';
              if (value === 80) return '高风险';
              return '';
            },
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
                color: ['#8fBC8F', '#eeeeee', '#FFFF00', '#FD7F80', '#FD7F80'],
                width: 0.5,
                type: [5, 10],
                dashOffset: '5'
              }
            }
          },
        },
        xAxis: {
          axisLabel: {
            fontSize: 8,
            interval: 0,
            width: 23,
            overflow: 'breakAll',
          },
          type: 'category',
          data: this.yAxisData,
        },
        series: this.series
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
    yAxisData(newVal) {
      this.option.xAxis.data = newVal;
      if (this.option.xAxis.data.length === 6) {
        this.echart_width = '100%';
      } else if (this.option.xAxis.data.length <= 1) {
        this.echart_width = '20px';
      } else {
        let autoHeight = this.option.xAxis.data.length * 60 + 50;
        if (this.isIphoneX) {
          if (autoHeight > 1300) {
            autoHeight = 1300;
          }
        }
        this.echart_width = autoHeight + 'px';
      }
      this.aaa = true;
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
        delete this.option['color'];
      }
      chart.setOption(this.option);
	
	// 保存初始颜色
	   /* this.originalColors = this.option.series.map(serie => 
	      serie.data.map(item => item.itemStyle?.color || '#4CAF50') // 默认颜色
	    ); */
	
		/* // 保存初始颜色
		this.originalColors = this.option.series.map(serie => 
		    serie.data.map(item => item.itemStyle?.color || (serie.itemStyle?.color || '#4CAF50'))
		); */
	
		
      // 添加点击事件处理
      chart.on('click', params => {
      //  console.log('点击事件触发：', params);
        let index = params.dataIndex;
        let label = this.yAxisLabel[index];
        let title = this.yAxisData[index];

        // 更新选中的柱形图索引
        this.selectedIndex = index;

        // 更新图表颜色
        this.updateChartColors(chart);
        
        // 触发自定义事件
        this.$emit('djClick', label, title);
      });
    },

    // 更新图表颜色    
    updateChartColors(chart) {
      // 获取当前系列配置
      const series = this.option.series.map(serie => ({
        ...serie,
        itemStyle: {
          color: (params) => {
            // 如果是选中的柱形图，返回红色，否则返回原来的颜色
            if (params.dataIndex === this.selectedIndex) {
              return 'red'; // 被点击的柱形图颜色为红色
            }  
		   return params.color;// 其他柱形图保持原来的颜色
          }
        }
      }));

      // 更新图表配置
      chart.setOption({
        ...this.option,
        series
      });
    }
  }
}
</script>
