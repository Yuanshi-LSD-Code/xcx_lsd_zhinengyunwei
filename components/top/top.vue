<template>
	<view class="top" :style="{backgroundColor:backgroundColor,height:topHeight,paddingTop:topHeight,backgroundImage}">
			<view v-if="isShowIcon" class="back" @tap="back" >
				<view  class="top_back_icon" :style="{borderLeft:'4rpx solid'+leftColor,borderBottom:'4rpx solid'+leftColor}" ></view>
			</view>
			
		
			<view v-else class="other" @tap="other">
				<image :src="image" mode=""></image>
			</view>
			
			<view class="top_title" :style="{color:topTitleColor,textAlign:textAlign,fontSize:fontSize}">
				<view class="top_leftText display_a" @click="leftTextClick" v-if="lefText">
					<text style="font-size: 32rpx;color: #333333;">{{lefText}}</text>
					<!-- <image src="../../static/image/sanjiaobiao.png" style="width: 22rpx;height: 12rpx;margin-left: 10rpx;" mode=""></image> -->
				</view>
				<text class="ml_20 f_36 fw_700" >{{topTitle}}</text>
				<view  v-if="rightTitle" class="top_right" @tap="tapRight">
					<view class="top_right_icon" v-if="rightIcon" :style="{background: 'url('+rightIcon+')',backgroundSize:'100%', }">
						<!-- <image :src="rightIcon" mode="" style="width: 100%;height: 100%;"></image> -->
					</view>
					<text style="margin-left: 20rpx;font-size: 36rpx; " :style="{color:rightTitleColor}">{{rightTitle}}</text>
				</view>
			</view>
	 </view>
</template>

<script>
	export default {
		name: 'top',
		
		props:{
			fontSize:{
				type:String,
				default:'28rpx'
			},
			textAlign:{
				type:String,
				default:'center'
			},
			backgroundColor:{
				type:String,
				default:'#232323'
			},
			backgroundImage:{
				type:String,
				default:''
			},
			leftColor:{
				type:String,
				default:'#333333'
			},
			//  右边图标
			rightIcon:{
				type:String,
				default:''
			},
			//左边的文字  
			lefText:{
				type:String,
				default:''
			},
			topHeight:{
				type:String,
				default:'150rpx'
			},
			topTitleColor:{
				type:String,
				default:''
			},
			topTitle:{
				type:String,
				default:''
			},
			rightTitle:{
				type:String,
				default:''
			},
			rightTitleColor:{
				type:String,
				default:'#666666'
			},
			isShowIcon:{
				type:Boolean,
				default:false
			},
			image:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				this.$emit("handleBack")
			},
			other(){
				this.$emit("handleTap")
			},
			tapRight(){
				this.$emit("handRight")
			},
			leftTextClick(){
				this.$emit("leftTextClick")
			}
		}
	}
</script>

<style scoped lang="scss">
/* //顶部样式 */
.top{
	/* display: flex; */
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	width: 100%;
	padding: 0rpx !important;
	/* background-color: #FFFFFF; */
	z-index: 999;
	
	
	
	/* position: relative; */
}
.top .back{
	width: 80rpx;
	height: 80rpx;
	/* border: 2rpx solid #FFFFFF; */
	position: absolute;
	bottom: 12rpx;
	left: 16rpx;
	transform: rotate(45deg);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
}
.top_back_icon{
	width: 24rpx;
	height: 24rpx;
	/* border-left: 4rpx solid #333333;
	border-bottom: 4rpx solid #333333; */
	
}
.top_right{
	/* width: 80rpx; */
	/* height: 80rpx; */
	/* border: 2rpx solid #FFFFFF; */
	position: absolute;
	color: #666666;
	bottom: 0rpx;
	right: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	/* line-height: 40rpx; */
	text{
		font-size: 38rpx;
	}
}
.top .other{
	width: 80rpx;
	height: 80rpx;
	/* border: 2rpx solid #FFFFFF; */
	position: absolute;
	bottom: 10rpx;
	left: 30rpx;
	/* transform: rotate(45deg); */
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
}
.other image{
	width: 28rpx;
	height: 28rpx;
	/* border-left: 4rpx solid #333333;
	border-bottom: 4rpx solid #333333; */
	
}
.top_title{
	font-size:36rpx;
	font-family:PingFang-SC-Bold;
	// font-weight:bold;
	color: #2C2D2C;
	text-align: center;
	// display: flex;
	// align-items: center;
	line-height: 36rpx;
	position: absolute;
	bottom: 30rpx;
	margin: 0 auto;
	right: 0;
	left: 0;

}
.top_leftText{
	position: absolute;
	top:10rpx;
	left:30rpx;
}
.top_right_icon{
	width: 30rpx;
	height: 30rpx;
	
	
}
</style>
