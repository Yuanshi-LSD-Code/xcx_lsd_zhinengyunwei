<template>
	<view class="main-content">
		<view class="head-content">
		<!-- <top   :topHeight="topHeight"   :isShowIcon="true" leftColor='#333333' :topTitle='topTitle' backgroundColor='#ffffff' topTitleColor='#333333' @handleBack='handleBack'></top>
		<view style="width: 100%;" :style="{height:topHeight}"></view> -->
		
		<!-- #ifdef MP-WEIXIN -->
		<top :topHeight="topHeight" :isShowIcon="true" textAlign='center' leftColor='#ffffff' :topTitle='topTitle'
			 fontSize='40rpx' topTitleColor='#ffffff' @handleBack='handleBack'></top>
		<view style="width: 100%;" :style="{height:topHeight}"></view>
		<!-- #endif -->
		
		<view class="main">
			<rich-text :nodes="nodes"></rich-text>
		</view>
	</view>
	</view>
</template>

<script>
	import top from '@/components/top/top.vue'
	export default {
		components:{
			top
		},
		data() {
			return {
				topHeight:this.header_height,
				topTitle:"赛聚乐途汇",
				id:"",
				nodes:'',
				params:{},
			}
		},
		onShareAppMessage(){
			
		},
		onLoad(option) {
			if(option.item){
				
			    // var params = JSON.parse(option.params);
				var item = JSON.parse(option.item);
				this.id=item.id;
				this.adDetail(option.item)
				// this.params = params;
			    // this.nodes="详情详情详情详情详情";
			}
		},
		onShow() {
			// #ifdef H5
			this.$util.officialAccount(jweixin => {
			  jweixin.hideOptionMenu();
			});
			// #endif
		},
		methods: {
			handleBack(){
				// uni.reLaunch({
				// 	url:'/pages/index/index'
				// })
				// var path = 'index';
				// if(this.params.path){
				// 	path = this.params.path;
				// }
				
				// this.$_linkTo(path,this.params)
				
				this.$_back();
				// uni.navigateBack({
				// 	delta: 1
				// })
				
			},
			async adDetail(item){
				let res = await this.$http('newsDetail',{'id':this.id});
				
				if(res.code==200){
					this.nodes=res.data.content
					var reg=/<img/gi
					// this.nodes=this.nodes.replace(reg, '<img style="width:100%!important;height:auto;!important"')
					this.nodes=this.nodes.replace(reg,"<img style='width:100%!important;height:100%!important;display:block;'")
				}
				// this.$api.adDetail({
				// 	id:this.id
				// }).then(res=>{
				// 	if(res.code==200){
				// 		this.nodes=res.data.content
				// 		var reg=/<img/gi
				// 		// this.nodes=this.nodes.replace(reg, '<img style="width:100%!important;height:auto;!important"')
				// 		this.nodes=this.nodes.replace(reg,"<img style='width:100%!important;height:100%!important;display:block;'")
				// 	}
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
.main{
	  width: 100%;
	  padding: 30rpx;
  }
</style>
