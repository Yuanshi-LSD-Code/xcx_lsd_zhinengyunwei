<template>

	<main-layout>
		<view>
			<view style="height: 30px;background-color: rgba(68, 114, 196, 1);">
				<div class="display_a" style="margin-top: 10px;">
					<img style="height: 10px;width: 10px;"
						:src="item.status == 1? '../../static/image/u37.svg' : '../../static/image/u36.svg'" />
					{{ item.title }}
				</div>
			</view>
			<view style="display: flex;flex-wrap: wrap;">
				
				<echarts-stage-speed-gauge className="main-dj-detail-jkd" :key="keyTime" ref="chart" @finished="init"
					:gauge_org="item.avgbg ? item.avgbg.jkd : ''" height="120px"></echarts-stage-speed-gauge>
			</view>
			<u-line></u-line>
			<view style="display">
				<view>11111</view>
				<view>22222</view>
				<view>33333</view>
				<view>44444</view>
			</view>
			<u-line></u-line>
			<view>
				
			</view>

			
		</view>

	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				item: {},
				keyTime:'',

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
			this.keyTime =  new Date().getTime();
		},
		onShow() {

		},

		methods: {




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