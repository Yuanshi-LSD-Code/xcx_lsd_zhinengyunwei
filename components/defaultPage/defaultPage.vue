<template>
	<view>
		<view class="main" :style="{top:top}">
			<image src="../../static/image/icon/queshenye_1.png" mode="" style="width: 110rpx;height: 160rpx;"></image>
			<view style="margin-top: 30rpx;">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			top:{
				type:String,
				default:'50%'
			},
			title:{
				type:String,
				default:'暂无数据'
			},
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
   .main{
	   align-items: center;
	   flex-direction: column;
	   justify-content: center;
	   position: absolute;
	   z-index:9999;
	   /* position: fixed; */
	   /* #ifdef APP-VUE */
	   display: flex;
	   /* #endif */
	  transform: translate(-50%, -50%);
	  left: 50%;
	 }
</style>
