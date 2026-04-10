<template>

	<main-layout>
		<view>
			<view style="height: 40px;background-color: rgba(68, 114, 196, 1);">
				<div class="display_a" style="padding-top: 5px;margin-left: 20rpx;">
					<img style="height: 10px;width: 10px;"
						:src="item.dj_status > 0? '../../static/image/u37.svg' : '../../static/image/u36.svg'" />
						<view style="margin-left: 20rpx;color: white;line-height: 30px;">{{ item.title }}</view>
					  
				</div>
			</view>
			<u-line></u-line>
			
		<view class="tab-container">
		    <view class="tab" :class="{ 'active': showType == 1 }" @click="infoShowChage(1)">
		        <view>电机参数</view>
		        <view class="underline" v-if="showType == 1"></view>
		    </view>
		    <view class="tab" :class="{ 'active': showType == 2 }" @click="infoShowChage(2)">
		        <view>运行状态</view>
		        <view class="underline" v-if="showType == 2"></view>
		    </view>
		    <view class="tab" :class="{ 'active': showType == 3 }" @click="infoShowChage(3)">
		        <view>检修维护</view>
		        <view class="underline" v-if="showType == 3"></view>
		    </view>
		    <view class="tab" :class="{ 'active': showType == 4 }" @click="infoShowChage(4)">
		        <view>电机报告</view>
		        <view class="underline" v-if="showType == 4"></view>
		    </view>
		</view>


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
			refresh(){
				console.log(22222);
				console.log(this.shopType);
				// if(this.shopType == 3){
					this.$refs['repair'].init();
				// }
				// console.log(345445454);
			},
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
	.tab-container {
	    display: flex;
	    height: 40px;
	    border-bottom: 1px solid #ddd;
	}
	
	.tab {
	    flex: 1;
	    text-align: center;
	    padding: 10px;
	    position: relative;
	    cursor: pointer;
	}
	
	.tab.active {
	    font-weight: bold;
	    color: blue;
	}
	
	.underline {
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 2px;
	    background-color: blue;
	}


</style>