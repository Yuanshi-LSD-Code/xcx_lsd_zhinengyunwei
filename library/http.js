import api from './api.js';
import storage from './storage.js'
import utils from './utils/utils.js'
export default function(url,data,type){

	let _url = api.url(url);
	let _type = 'GET'
	let _data = {};
	if(typeof type == 'string'){
		_type = type.toUpperCase();
	}
	if(typeof data == 'object'){
		_data = data;
	}
	//获取token 
	const tokenData = storage.getTokenData();
	console.log(99565222222)
	console.log(tokenData)
	if(tokenData){
		_data.authParamsOne = tokenData.id;
		_data.authParamsTwo = tokenData.token;
		_data.authParamsThree = tokenData.platform;
	};
	return new Promise((resolve,reject)=>{
		uni.request({
			url:_url,
			method:_type,
			data:_data,
			complete: async function(res){
				let data = res.data;
				if(data.code == 404 || data.code == 403 || data.code == 402){
					//退出登录
					const app = getApp();
					app.set_isLogin(false);
					// storage.clearAllStorage();
					utils.toast(data.msg);
					// setTimeout(()=>{
					// 	uni.switchTab({
					// 		url:"/pages/mine/mine"
					// 	});
					// },1000)
					return;
				}else if(data.code==405 || data.code==406){
					// 封号处理
					uni.hideLoading()
					const app = getApp();
					app.set_isLogin(false);
					// // utils.toast(data.msg);
					// let alert=await utils.alert(data.msg)
					// console.log(alert);
					// if(alert){
					// 	uni.navigateTo({
					// 		url:"/pages/conct/conct"
					// 	})
					// }
				}
				// console.log(res.data)
				resolve(res.data); 
			}
		})
	})
}