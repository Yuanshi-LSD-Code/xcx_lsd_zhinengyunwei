import Vue from 'vue';
const pro = Vue.prototype;
const obj = {
	//给中间按钮绑定点击事件
	bindMidButton:function(){
		uni.onTabBarMidButtonTap(()=>{
			pro.$_linkTo('friends')
		})
	},
}
export default function(){
	for(var k in obj){
		obj[k]();
	}
}