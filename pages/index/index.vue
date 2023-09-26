<template>
	<main-layout>
		<view>
			
			<view>
				<view class="display_sb" style="height: 80rpx;" @click="linkTo()">
					<view style="margin-left: 20rpx;">1122</view>
					<u-icon name="arrow-right" size="20"></u-icon>
				</view>
				<u-line ></u-line>
			</view>
		<view>
			<view class="display_sb" style="height: 80rpx;" @click="linkTo()">
				<view style="margin-left: 20rpx;">2233</view>
				<u-icon name="arrow-right" size="20"></u-icon>
			</view>
			<u-line ></u-line>
		</view>
		
			
		</view>
		
	</main-layout>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		created(){
			 this.$_reLaunch('factoryInfo');
		},
		
		onLoad(option) {
		    
			
		},
		onShow() {
			 // this.$_reLaunch('factoryInfo');
		},
		methods: {
			linkTo(item, index) {
				this.$_navigateTo('factory', {
					'item': item
				})
			},
		}
		
		
	
	}
</script>




<style scoped lang="scss">

</style>
