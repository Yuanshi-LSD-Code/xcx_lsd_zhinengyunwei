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
				id:'',
			}
		},
		onLoad(option) {
			this.id=option.id?option.id:''
			this.adDetail()
		},
		methods: {
			async adDetail(){
				let res = await this.$http('adDetail',{
					id:this.id
				});
				this.nodes=res.data.content
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
