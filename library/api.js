import http from './http.js';
import config from './config.js';
import utils from './utils/utils.js';
//注意有些需要分页的列表并不在这里

class Api {

	/**
	 * 构造函数
	 * @param {Object} config 请求配置
	 */
	constructor(config) {
		//基础配置
		this.apiUrl = config.apiUrl;
		this.webUrl = config.webUrl;
	}

	url(short_url) {
		
		if (this.__proto__.hasOwnProperty(short_url)) {
			var short_url= this[short_url]();
			// var short_url = this.short_url;
		}

		var real_url = this._redirect(short_url);
		return real_url;
	}
    

	/**
	 * 自定义路径访问
	 * @param {string}  short_url
	 * (1)形如Login/login,自动接入完整域名与模块名;
	 * (2)形如/api/Login/login,则只接入完整域名,不处理模块名;
	 * (3)形如http://开头,不接入域名,直接请求;
	 */
	_redirect(short_url) {
		if (short_url == '') return false;

		var is_network_url = utils.link_check(short_url);
		
		if (is_network_url) {
			var url = short_url;
		} else if (short_url.substr(0, 1) == '/') {
			var url = this.webUrl + short_url;
		} else {
			var url = this.apiUrl + short_url;
		}
		return url;

	}
	
	factoryNoticeList() {
		return 'Factory/factoryNoticeList';
	}
	adList() {
		return 'Ad/adList';
	}
	newsCateList() {
		return 'News/newsCateList';
	}
	newsList() {
		return 'News/newsList';
	}
	newsDetail() {
		return 'News/newsDetail';
	}
	loginCode() {
		return 'Wxapp/login';
	}
	
	base() {
		return 'Config/base';
	}
	
	login() {
		return 'Wxapp/login';
	}
	update_phone() {
		return 'Wxapp/update_phone';
	}
	//获取个人信息
	getUserInfo() {
		return 'User/getMyCenter';
	}
	setMyInfo() {
		return 'User/setMyInfo';
	}
	reapirApply() {
		return 'User/reapirApply';
	}
	repairList() {
		return 'User/repairList';
	}
	userCome() {
		return 'User/userCome';
	}
	newsMixList() {
		return 'News/newsMixList';
	}
	block() {
		return 'Config/block';
	}
	adDetail() {
		return 'Ad/adDetail';
	}
	updateMember() {
		return 'Wxapp/updateMember';
	}
	
	
	
	
	
	
	
	
	




}

export default new Api(config);
