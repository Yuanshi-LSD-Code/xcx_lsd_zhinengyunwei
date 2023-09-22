<template>
	<view class="footer-content">
		<view class="copyright"  style="margin-top:5rpx;">
			<view style="display: flex;flex-direction: column;" class="w_100">
				<rich-text :nodes="copyright" ></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "copyright",
		props: {
			marginTop: {
				type: String,
				default: '120rpx'
			},
			text:{
				type:String,
				default:''
				// default:'<span style="color:red;font-size:16px">赛车聚友俱乐部</span><br/>24小时热线电话：400-888-688'
			}
		},
		data() {
			return {
              copyright:','
			};
		},
		
		async created() {
			console.log(2323);
			 await this.$onLaunched;
			const app = getApp()
			if(this.text){
				this.copyright=this.text;
			}else{
				this.copyright=app.globalData.copyright;
			}
			if(!this.copyright){
				let res = await this.$http('base',{'type':'copyright,server_tel'});
				if(res.code == 200){
					this.copyright = res.data.copyright
				}
			}
		
		},
		watch:{
			text(onew,old){
				console.log(88777)
				console.log(onew)
				this.copyright = onew;
			}
		},
		
		async onLoad() {
			
		}
	}
</script>

<style>
	.copyright {
		/* margin-top: 60px; */
		text-align: center;
	}
	.footer-content{
	    background-color: #393939;
		width: 750rpx;
		position: fixed;
		bottom: 0rpx;
		padding-bottom: 10rpx;
		left: 0;
	}
</style>
