// 工具类
import helper from './helper.js';

class Utils extends helper{
// class Util   {
	
	 constructor(){
	        super();
	    }
	// //检查链接是否为网络链接
	// link_check(url, is_reg = false) {

	// 	if (is_reg == false) {
	// 		//匹配是否为网络链接
	// 		var reg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
	// 	} else {
	// 		//匹配是协议名
	// 		var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
	// 	}
	// 	var data = reg.test(url);
	// 	return data ? data : false;
	// }
	/**
	 * @param {type}  title
	 * @param {string}  icon
	 */
	toast(title = "", icon = "none") {
		uni.showToast({
			title,
			icon
		})
	}
};


export default new Utils();
