<template>
    <view :class="className" :style="{width: width, marginTop: marginTop, marginBottom: marginTop }">
        <view v-if="aaa" :style="{width: '375px', height: echart_height}">
            <l-echart force-use-old-canvas="false" :key="key" width="100%" ref="chart" @finished="init"></l-echart>
        </view>
    </view>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'stacked_column_chart',
    props: {
        refresh: { type: Number, default: null },
        className: { type: String, default: 'chart' },
        width: { type: String, default: '100%' },
        height: { type: String, default: '200px' },
        echartHeight: { type: String, default: '' },
        autoResize: { type: Boolean, default: true },
        marginTop: { type: String, default: '10px' },
        legendData: { type: Array, default: () => [] },
        xAxisData: { type: Array, default: () => [] },
        series: { type: Array, default: () => [] },
        color: { type: Array, default: () => [] },
    },
    data() {
        return {
            myChart: null,
            aaa: false,
            echart_height: this.height,
            option: {
                color: this.color,
                fontStyle: "italic",
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                legend: {
                    top: '-5px',
                    itemWidth: 8,
                    itemHeight: 8,
                    itemGap: 10,
                    data: this.legendData,
                },
                grid: {
                    top: '15px',
                    bottom: '30%',
                    height: '210px',
                    containLabel: true
                },
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        padding: [20, 20, 5, 5],
                        formatter: function(value) {
                            if (value === parseInt(value)) {
                                return value; // 只显示整数
                            }
                        },
                    }
                }],
                xAxis: [{
                    type: 'category',
                    fontSize: 6,
                    //data: this.xAxisData,
					data: ['定子', '转子', '轴承', '松动', '负载', '不平衡不对中'],
                    axisLabel: {
                        rotate: -54,
                        padding: [20, -25, -25, 5],
                        interval: 0
                    }
                }],
                series: this.series
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.chart.init(echarts, chart => {
                chart.setOption(this.option);
            });
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
        legendData(newVal) {
            this.option.legend.data = newVal;
            if (this.echartHeight) {
                if (this.option.legend.data.length <= 10) {
                    var autoHeight = this.option.legend.data.length * 10 + 270;
                    this.echart_height = autoHeight + 'px';
                } else {
                    var autoHeight = this.option.legend.data.length * 10 + 240;
                    this.echart_height = autoHeight + 'px';
                }
            }
            this.aaa = true;
            this.$refs.chart.setOption(this.option);
        },
        series(newVal) {
            this.option.series = newVal;

            // 提取有数据的工厂名称
            const legendData = [];
            newVal.forEach(seriesItem => {
                if (seriesItem.data && seriesItem.data.some(value => value > 0)) {
                    legendData.push(seriesItem.name);
                }
            });

            // 更新图例数据
            this.option.legend.data = legendData;

            // 根据 legendData 长度调整 echart 高度
            if (this.echartHeight) {
                if (legendData.length <= 10) {
                    var autoHeight = legendData.length * 10 + 270;
                    this.echart_height = autoHeight + 'px';
                } else {
                    var autoHeight = legendData.length * 10 + 240;
                    this.echart_height = autoHeight + 'px';
                }
            }

            // 更新图表
            this.$refs.chart.setOption(this.option);
        },
        color(newVal) {
            this.option.color = newVal;
            this.$refs.chart.setOption(this.option);
        },
    },
    methods: {
        async init() {
            const chart = await this.$refs.chart.init(echarts);
            if (this.option.color && this.option.color.length <= 0) {
                delete this.option['color'];
            }
            chart.setOption(this.option);
            chart.on('click', params => {
                console.log('点击事件触发2：', params);
                let index = params.dataIndex;
                this.$emit('djBarClick', index);
            });
        },
    }
}
</script>
