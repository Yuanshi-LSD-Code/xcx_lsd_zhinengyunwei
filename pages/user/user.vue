<template>
	<main-layout>
		<view>
			<view> 磐石建龙-炼铁在线</view>
		    <echarts-stage-speed-gauge className="main-dj-detail-jkd" ref="chart" @finished="init" :gauge_org="djDetailJkd" height="150px"></echarts-stage-speed-gauge>
		
			
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
