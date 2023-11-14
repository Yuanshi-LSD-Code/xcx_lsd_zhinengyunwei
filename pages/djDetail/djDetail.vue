<template>

	<main-layout>
		<view>
			<view style="height: 30px;background-color: rgba(68, 114, 196, 1);">
				<div class="display_a" style="padding-top: 5px;margin-left: 20rpx;">
					<img style="height: 10px;width: 10px;"
						:src="item.status == 1? '../../static/image/u37.svg' : '../../static/image/u36.svg'" />
						<view style="margin-left: 20rpx;color: white;">{{ item.title }}</view>
					  
				</div>
			</view>
			<view class="display_j">

				<echarts-stage-speed-gauge className="main-dj-detail-jkd" :key="keyTime" ref="chart" @finished="init"
					:gauge_org="item.avgbg ? item.avgbg.jkd : ''" height="120px"></echarts-stage-speed-gauge>
			</view>
			<u-line></u-line>
			<view class="display" style="height: 30px;">
				<view class="display_j" style="flex:1">
					<view class="display_j" @click="infoShowChage(1)">
						<view :style="{color:showType==1 ?'blue':''}">电机参数</view>
						<u-icon :name="showType == 1?'arrow-down':'arrow-up'"  size="16" :color="showType==1 ?'blue':''"></u-icon>
					</view>
				</view>
				<u-line direction="col" style="height: 30px;"></u-line>
				<view class="display_j" style="flex:1">
					<view class="display_j" @click="infoShowChage(2)">
						<view :style="{color:showType==2 ?'blue':''}">运行状态</view>
						<u-icon :name="showType == 2?'arrow-down':'arrow-up'"  size="16" :color="showType==2 ?'blue':''"></u-icon>
					</view>
				</view>
				<u-line direction="col" style="height: 30px;"></u-line>
				<view class="display_j" style="flex:1">
					<view class="display_j" @click="infoShowChage(3)">
						<view :style="{color:showType==3 ?'blue':''}">检修维护</view>
						<u-icon :name="showType == 3?'arrow-down':'arrow-up'"  size="16" :color="showType==3 ?'blue':''"></u-icon>
					</view>
				</view>
				<u-line direction="col" style="height: 30px;"></u-line>
				<view class="display_j" style="flex:1">
					<view class="display_j" @click="infoShowChage(4)">
						<view :style="{color:showType==4 ?'blue':''}">电机报告</view>
						<u-icon :name="showType ==4?'arrow-down':'arrow-up'"  size="16" :color="showType==4 ?'blue':''"></u-icon>
					</view>
				</view>
				
			</view>
			<u-line></u-line>
			<view>
				<info v-if="showType==1" :deviceId="item.device_id"></info>
				<status v-if="showType==2" :deviceId="item.device_id"></status>
				<repair v-if="showType==3" :djId="item.id" ref="repair"></repair>
				<report v-if="showType==4" :djId="item.id" ref="report"></report>
				

			</view>


		</view>

	</main-layout>
</template>


<script>
	import info from '@/pages/djDetail/components/info.vue'
	import repair from '@/pages/djDetail/components/repair.vue'
	import report from '@/pages/djDetail/components/report.vue'
	import status from '@/pages/djDetail/components/status.vue'
	export default {
		components: {
			info,
			repair,
			report,
			status,
		},
		data() {
			return {
				showType: 1,
				item: {},
				keyTime: '',


			}
		},

		// watch: {
		// 	tabCurrent(onew, old) {
		// 		this.loadList();
		// 	}
		// },
		onLoad(option) {
			console.log(777);
			console.log(option);
			var item = JSON.parse(option.item);
			this.item = item
			this.keyTime = new Date().getTime();
		},
		onShow() {

		},
		
		onReachBottom() {
			if(this.showType == 4){
				this.$refs['report'].loadList();
			}else if(this.showType == 3){
				this.$refs['repair'].loadList();
			}
			
		},

		methods: {
			infoShowChage(e) {
				
				this.showType = e
			},



		}



	}
</script>

<style>
	.sticky-container {
		position: fixed;
		/* position: sticky; */
		top: 0;
		z-index: 99;
		width: 100%;
	}
</style>