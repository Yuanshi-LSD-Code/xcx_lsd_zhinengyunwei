//给vue原型链注册方法
import utils from './utils/utils.js'
let app;
const obj = {
	test(){
		console.log(this);
	},
	
	uploadFile(path){
		return utils.uploadFile(path)
	},
	navigateTo(name,params){
		utils.navigateTo(name,params)
	},
	redirectTo(name,params){
		utils.redirectTo(name,params)
	},
	reLaunch(name,params){
		utils.reLaunch(name,params)
	},
	//显示加载中
	showLoading(title="加载中"){
		return new Promise((resolve,reject)=>{
			uni.showLoading({
			    title: title,
				mask:true,
				success:()=>{
					resolve(true);
				},
				fail:()=>{
					resolve(false);
				}
			});
		})
	},
	//隐藏加载中,延迟一段时间
	hideLoading(duration=350){
		setTimeout(function () {
		    uni.hideLoading();
		}, duration);
	},
	//判断是否登陆的跳转
	isLoginTo(url){
		let app = getApp();
		if(!app){
			return;
		}
		const isLogin = app.get_isLogin();
		// console.log(isLogin,app.globalData)
		if(isLogin){
			obj.linkTo(url);
		}else{
			obj.alert('请先登录');
			return false;
		}
	},
	switchTo(name){
		utils.switchTo(name);
	},
	back(){
		uni.navigateBack();
	},
	//延迟返回
	stBack(duration){
		let m_duration = 1000;
		if(typeof duration == 'number'){
			m_duration = duration;
		}
		setTimeout(()=>{
			obj.back();
		},m_duration)
	},
	// 吐司
	toast(title){
		utils.toast(title,'none');
	},
	success(title){
		utils.toast(title,'success');
	},
	error(title){
		utils.toast(title,'error');
	},
	//alert
	alert(title="",content=""){
		return new Promise((resolve,reject)=>{
			uni.showModal({
			    title: title,
			    content: content,
				showCancel:false,
			    success: function (res) {
			        resolve(res.confirm);
			    }
			});
		})
	},
	// 确认弹窗
	confirm(title="",content=""){
		return new Promise((resolve,reject)=>{
			uni.showModal({
			    title: title,
			    content: content,
				showCancel:true,
			    success: function (res) {
			        resolve(res.confirm);
			    }
			});
		})
	},
	chooseImg(){
		return utils.chooseImg(...arguments);
	},
	// 获取上一个页面的vue实例
	getBeforePageVm(){
		return utils.getBeforePageVm();
	},
	// 进行上一个页面的信息刷新
	refreshBeforePageInfo(){
		utils.refreshBeforePageInfo(...arguments);
	},
	formatDate(date, fmt){
		return utils.formatDate(date, fmt);
	},
}

function vuePro(Vue){
	for(let k in obj){
		let key = '$_'+k;
		Vue.prototype[key] = obj[k];
	}
}
export default vuePro;