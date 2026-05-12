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
			var short_url = this[short_url]();
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

	factoryAdminRepairEdit() {
		return 'Dj/factoryAdminRepairEdit';
	}
	factoryAdminRepairCate() {
		return 'Dj/factoryAdminRepairCate';
	}

	//电机状态
	factoryDjDayJkdList() {
		return 'Dj/factoryDjDayJkdList';
	}
	factoryDjDayBarList() {
		return 'Dj/factoryDjDayBarList';
	}
	factoryDjDayBarDayList() {
		return 'Dj/factoryDjDayBarDayList';
	}
	factoryDjDayBarAesList() {
		return 'Dj/factoryDjDayBarAesList';
	}
	factoryDjDayTsAesList() {
		return 'Dj/factoryDjDayTsAesList';
	}




	djFactoryReportList() {
		return 'Dj/djFactoryReportList';
	}
	djRepairCate() {
		return 'Dj/djRepairCate';
	}
	djRepairList() {
		return 'Dj/djRepairList';
	}
	djReportList() {
		return 'Dj/djReportList';
	}
	//电机详情
	factoryAdminDjInfo() {
		return 'Dj/factoryAdminDjInfo';
	}

	factoryDjAvgbgList() {
		return 'Dj/factoryDjAvgbgList';
	}
	factoryDjDayList() {
		return 'Dj/factoryDjDayList';
	}
	factoryDjDayDayList() {
		return 'Dj/factoryDjDayDayList';
	}


	//电机组件
	djBarDayDayList() {
		return 'Dj/djBarDayDayList';
	}
	//组件二天比较
	djBarDayDjList() {
		return 'Dj/djBarDayDjList';
	}
	//工厂电机组件状态
	djDayBarList() {
		return 'Dj/djDayBarList';
	}
	djFactoryReportListNo() {
		return 'Dj/djFactoryReportListNo';
	}
	djRepairListNo() {
		return 'Dj/djRepairListNo';
	}


	//工厂检修工作统计
	dJRepairInfo() {
		return 'Dj/dJRepairInfo';
	}
	//工厂电机
	djList() {
		return 'Dj/djList';
	}
	//所有工厂维修图表
	djFactoryRepairList() {
		return 'Dj/djFactoryRepairList';
	}
	//所有工厂电机列表
	djFactoryBarStatus() {
		return 'Dj/djFactoryBarStatus';
	}
	//所有工厂电机列表
	djFactoryDjList() {
		return 'Dj/djFactoryDjList';
	}

	//所有工厂
	djFactory() {
		return 'Dj/djFactory';
	}

	configSys() {
		return 'Config/configSys';
	}

	factoryNoticeLook() {
		return 'Factory/factoryNoticeLook';
	}

	factoryNoticeList() {
		return 'Factory/factoryNoticeList';
	}
	//新增根据ID查看admin的name
	getAdminById() {
		return 'Factory/getAdminById';
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
	upload() {
		return 'Inter/upload';
	}

	//查询电机的最新一条的维护建议
	getCommentByDeviceId() {
		return 'Dj/getCommentByDeviceId';
	}












}

export default new Api(config);