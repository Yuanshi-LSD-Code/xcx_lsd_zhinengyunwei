<template>
	<view class="content">
		
		<home v-if="navIndex==0" :swiperCurrent="swiperCurrent"></home>
		<insurance    v-if="navIndex==1"></insurance>
		<repair    v-if="navIndex==2"></repair>
		<user  v-if="navIndex==3"></user>
		<view class="botton_nav" :style="{bottom:(isIphoneX?'25rpx':'')}" >
			
			<view class="botton_nav_con"  v-if="shwoType"  :style="{marginLeft:('')}"   @click="navClick(index)"  v-for="(item,index) in navList " :key="index"  :class="''" >
				<image v-if="navIndex==index" class="botton_nav_con_img" :src="item.selectImg" mode="" :class="''"  ></image>
				<image v-if="navIndex!=index" class="botton_nav_con_img" :src="item.img" mode="" :class="''"  ></image>
				<view class="botton_nav_con_text" :style="{color:(navIndex==index ?'#1296db':'#BBBBBB')}">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	
	// // #ifdef H5
	// var jweixin = require('jweixin-module')  
	// // #endif
	export default {
		data() {
			return {
				isIphoneX:this.isIphoneX,
				title: 'Hello',
				isOldUser:uni.getStorageSync('isOldUser')||false,
				navList:[
					{title:'首页',selectImg:"../../static/image/tab/blue/home_yes.png",img:'../../static/image/tab/blue/home_no.png'},
					{title:'车险',selectImg:"../../static/image/tab/blue/car_yes.png",img:'../../static/image/tab/blue/car_no.png'},
					{title:'快修',selectImg:"../../static/image/tab/blue/repair_yes.png",img:'../../static/image/tab/blue/repair_no.png'},
					{title:'我的',selectImg:"../../static/image/tab/blue/user_yes.png",img:'../../static/image/tab/blue/user_no.png'}
				],
				
				navIndex:0,
				shwoType:true,
				swiperCurrent:0,
				token:uni.getStorageSync('token')||null,
			}
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage(){
			
		},
		// #endif
		onLoad(option) {
			console.log(777)
			console.log(option)
            if(option.navIndex){
				this.navIndex=parseInt(option.navIndex)
			}
			if(option.swiperCurrent){
				this.swiperCurrent=parseInt(option.swiperCurrent)  
				console.log(this.swiperCurrent);
			}
			if(option.college){
				this.is_buy=option.is_buy
			}
			// var points = [40, 100, 1, 5, 25, 10];
			// points.sort(function(a, b){return a - b});
			// console.log(points);
			this.base()
			
			// #ifdef H5
			 // this.$util.officialAccount()  //公众号授权
			  this.getQueryString()
			// #endif
			
			
		},
		onShow() {
			const app = getApp()
			
			// #ifdef H5
			this.$util.officialAccount(jweixin => {
			    jweixin.hideOptionMenu();
			  });
			   if(!this.token){
					 let appid = this.$publicConfig.appid;
					 let url = this.$publicConfig.server+'/Wxwap/login'
					 let uri = encodeURIComponent(url); // 这里务必编码
					 let scope = 'snsapi_userinfo'; // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）  
					 let wx_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
					 if(!uni.getStorageSync('token')){
						window.location.href=wx_url
			  	 }
			  }
			   
			// #endif
		},
		
		watch:{
			navIndex(onew,old){
				this.navIndex = onew;
			}
		},
		methods: {
			async 	groupCheck(){
				// let res = await this.$api.groupCheck()
				// if(res.code==200){
				// 	this.is_buy=res.data.is_buy
				// 	if(this.is_buy==1){
				// 		// this.$refs.popup.open()
				// 	}
				// }
			},
			getQueryString() {
				    const app = getApp()
					var url = window.location.search;    //获取链接后面的参数
					var theRequest = new Object();
					if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					var strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					 }
					}
					let type ='';
					if(theRequest.type){
						type=theRequest.type
					}
					// 判断有token  且不是分享跳转过来的
					if(theRequest.token &&  type!=1){
						this.token=theRequest.token
						uni.setStorageSync('token', theRequest.token)
						uni.setStorageSync('platform', theRequest.platform)
						uni.setStorageSync('id', theRequest.id)
						uni.setStorageSync('uid', theRequest.uid)
						app.globalData.token = theRequest.token
						app.globalData.platform = theRequest.platform
						app.globalData.id = theRequest.id
						app.globalData.uid = theRequest.uid
					}
					if(theRequest.tel){
						uni.setStorageSync('tel', theRequest.tel)
						app.globalData.tel = theRequest.tel
					}else {
						uni.setStorageSync('tel','')
						app.globalData.tel =''
					}
					// 判断是拼团分享过来的  跳转到评团页面
					if(theRequest.group_id && type==1){
						uni.navigateTo({
							url:'/pages/LaunchGroup/LaunchGroup?group_id='+theRequest.group_id+'&invite_uid='+theRequest.invite_uid+'&school_id='+theRequest.school_id
						})
					}
			 },
		
		 navClick(index){
			   this.navIndex=index
			   console.log(3333)
			   console.log(this.navIndex)
			   // if(index==2){
				  //  uni.navigateTo({
				  //  	url:'/pages/releaseBook/releaseBook'
				  //  })
			   // }
		   },
		   base(){
			   // this.$api.base({
			   // 	type:'wx_audit_on'
			   // 	}).then(rt=>{
			   // 		if(rt.code==200){
			   // 			if(rt.data==1){
			   // 				this.shwoType=false
			   // 			}else {
			   // 				this.shwoType=true
			   // 			}
			   // 		}else {
			   // 			this.shwoType=false
			   // 		}
			   // 	 console.log(rt);
			   // })
		   },
		   
		   
		}
	}
</script>




<style scoped lang="scss">
	.btn_s {
		width: 100%;
		height: 88rpx;
		// background: linear-gradient(#f5daab, #dbb475);
		// border-radius: 8rpx;
		// margin: 162rpx auto 0 auto;
		// font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		display: flex;
		position: fixed;
		bottom: 200rpx;
		// line-height: 88rpx;
		// left: 30rpx;
		align-items: center;
		color: #ffffff;
		justify-content: flex-end;
		// justify-content: center;
		background: rgba($color: #000000, $alpha: .4);
	
		
	
		// opacity: .5;
	}
	.btns{
		width: 203rpx;
		height: 91rpx;
		background: #ffffff;
		border: 1rpx solid #f5f5f5;
		border-radius: 46rpx;
		
	}
	.popup{
		width: 560rpx;
		height: 380rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		background: #ffffff;
		border-radius: 8rpx;
	}
	.popup_top{
		width: 100%;
		height: 110rpx;
		font-weight: 700;
		font-size: 32rpx;
	}
	.botton_nav{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 10;
		bottom: 0rpx;
		// background-color: #000000;
		justify-content: space-around;
		.botton_nav_con{
			// margin-left: 56rpx;
			// margin-right: 56rpx;
			
			.botton_nav_con_img{
				width: 48rpx;
				height: 48rpx;
			    // margin: 0 auto;
			}
			.botton_nav_con_text{
				display: flex;
				align-items: center;
				justify-content: center;
				color: #bbbbbb;
				font-size: 20rpx;
				font-weight: 400;
				text-align: center;
			}
		}
		.botton_nav_z{
			position: fixed;
			top:94.5%;
			left:50%;
			z-index: 999999;
			transform: translate(-50%, -50%);
			.botton_nav_z_img{
				width: 94rpx!important;
				height: 94rpx!important;
				z-index: 999999;
			}
		   .botton_nav_con_text{
				display: flex;
				align-items: center;
				justify-content: center;
				color: #bbbbbb;
				font-size: 20rpx;
				font-weight: 400;
				text-align: center;
			}
		}
		
	}
</style>
