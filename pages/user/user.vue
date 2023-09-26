<template>
	<main-layout>
		<view>
			<view style="height: 204rpx;width: 100%;background-color:rgb(30 110 205) ;"> 
			<view class="display_a" style="padding-top: 60rpx;padding-left: 30rpx;">
				<image :src="avatar" style="width: 80rpx;height: 80rpx;"></image>
				<view style="margin-left: 30rpx;display: flex;flex-direction: column;">
					<view>
					{{nickname}}
					</view>
					<view>
					openid:{{wx_mini_openid}}
					</view>
				</view>
			</view>
			</view>
		    
		
			
		</view>
		
	</main-layout>
</template>

<script>
	
	export default {
		data() {
			return {
				djDetailJkd:60,
				src:'../../static/image/tab/user_yes.png',
				nickname:'',
				avatar:'',
				wx_mini_openid:'',
			}
		},
		
		created() {
			console.log(2323);
			var that = this;
			setTimeout(function(){
				const app = getApp()
				console.log(app.globalData.nickname);
				if(app.globalData.nickname){
					that.nickname = app.globalData.nickname;
					that.avatar = app.globalData.avatar;
					that.wx_mini_openid = app.globalData.wx_mini_openid;
				}else{
					that.$_toast('请先登录')
				}
			},500)
			
		
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
