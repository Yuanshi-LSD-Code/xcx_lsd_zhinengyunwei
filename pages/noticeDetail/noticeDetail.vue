<template>

	<main-layout>
		<view>
			<view style="height: 100px;margin-left: 20rpx;margin-top: 20rpx;">
				{{item.content}}
			</view>
			
            <view style="display: flex;justify-content: flex-end;margin-right: 20rpx;">
				{{item.add_time}}
			</view>
		</view>

	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				item:{},

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
            this.$http('factoryNoticeLook',{'id':item.id})
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