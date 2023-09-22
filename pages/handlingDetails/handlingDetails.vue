<template>
	<view class="page">
		<view class="main">
			<rich-text :nodes="nodes"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodes:"",
			}
		},
		onLoad() {
			this.block()
		},
		methods: {
			async block(){
				let res = await this.$http('block',{
					pos:'cardState'
				});
				this.nodes=res.data
			}
		}
	}
</script>

<style lang="less" scoped>
  .page{
	  display: flex;
	  align-items: center;
	  flex-direction: column;
  }
  .main{
	  width: 690rpx;
	  padding-top: 30rpx;
  }
</style>
