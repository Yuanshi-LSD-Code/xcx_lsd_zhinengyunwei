<template>
	<main-layout>
		<view>
			<view style="height: 400rpx;width: 100%;"> 
			<view class="display_a">
				<view>头像</view>
				<view>呢称</view>
				
			</view>
			</view>
		    
		
			
		</view>
		
	</main-layout>
</template>

<script>
	
	export default {
		data() {
			return {
				djDetailJkd:60
			}
		},
		
		onLoad(option) {
		
			
		},
		onShow() {
			
		},
		methods: {
			linkTo(item, index) {
				this.$_linkTo('factory', {
					'item': item
				})
			},
		}
		
		
	
	}
</script>




<style scoped lang="scss">

</style>
