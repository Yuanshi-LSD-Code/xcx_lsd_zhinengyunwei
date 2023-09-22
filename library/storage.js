//统一管理本地存储


//从本地缓存中同步获取指定 key 对应的内容。
function getStorage(key){
	return uni.getStorageSync(key);
}
// 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
function setStorage(k,v){
	uni.setStorageSync(k,v);
}
//从本地缓存中同步移除指定 key。
function remove(k){
	uni.removeStorageSync(k);
}
class Storage {
	
	//登陆页面储存tokenData;
	setTokenData(data){
		setStorage('tokenData',data);
	}
	//获取tokenData;
	getTokenData(){
		return getStorage('tokenData');
	}
	//我的页面储存个人信息
	setUserInfo(data){
		setStorage('userInfo',data)
	}
	getUserInfo(){
		return getStorage('userInfo');
	}
	//获取uid
	getUid(){
		return this.getUserInfo().id;
	}
	
	
	
	removeStepArr(){
		uni.removeStorageSync('stepArr');
	}
	
	
	//清除所有缓存
	clearAllStorage(){
		 uni.clearStorageSync();
	}
}

const storage = new Storage;
export default storage;