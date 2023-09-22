/*以下代码仅供参考，如有错误还请各位大哥大姐指导修正*/

//简单时间格式化
//使用方法 供新手参考 :
// 在vue文件中 import { dateFormat } from '@/js_sdk/common.js'
//let date = new Date();
// dateFormat("YYYY-mm-dd HH:mm",date)
export const dateFormat = (fmt, date) => {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

//uni-app request请求封装
//使用方法 供新手参考 :
// 在vue文件中 import { uniAjax } from '@/js_sdk/common.js'
//uniAjax("api/userInfo",{name:"admin"},"POST",(res)=>{
//成功回调函数
// },(err)=>{
//失败回调函数
// },(data)=>{
//完成回调函数
// })
export const uniAjax = (url, dataPost, type, successCallBack, errorCallBack, completeCallBack) => {
	let obj = {};
	obj.url = url || "";
	obj.data = dataPost || {};
	obj.methods = type || "POST";
	obj.success = successCallBack || function(data) {};
	obj.error = errorCallBack || function(data) {};
	obj.complete = completeCallBack || function(data) {};
	uni.request({
		url: obj.url,
		data: obj.data,
		method: obj.methods,
		header: "",
		dataType: "json",
		success: obj.success,
		fail: obj.error,
		complete: obj.complete
	});
}
// 数据深拷贝
//使用方法 供新手参考 :
// 在vue文件中 import { cloneObj } from '@/js_sdk/common.js'
// let dataList = cloneObj(data)
export const cloneObj = (obj) => {
	let newobj = obj.constructor === Array ? [] : {};
	if (typeof obj !== 'object') {
		return;
	}
	for (let i in obj) {
		newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
	}
	return newobj
};

// 常用正则判断
//使用方法 供新手参考 :
// 在vue文件中 import { regExpObj } from '@/js_sdk/common.js'
// let valueReg = regExpObj.regExpZh(value)
export const regExpObj = {
	//匹配有没有中文
	regExpZh: (str) => {
		return RegExp(/[\u4e00-\u9fa5]+/).test(str)
	},
	//只允许中文
	onlyregExpZh: (str) => {
		return RegExp(/^[\u4e00-\u9fa5]+$/).test(str)
	},
	//只允许中文，英文字母，数字
	regExpZhEnNum: (str) => {
		return RegExp(/^[\u4e00-\u9fa5A-Za-z0-9]+$/).test(str)
	},
	//匹配身份证
	regExpIDCard: (str) => {
		return RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(str);
	},
	//匹配手机号
	regExpPhone: (str) => {
		return RegExp(/^1[3456789]\d{9}$/).test(str);
	},
	//匹配邮箱格式
	regExpEmail: (str) => {
		return RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(str);
	},
	//匹配域名
	regExpRealmName: (str) => {
		return RegExp(/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\/.?/).test(str)
	},
	//匹配InternetURL
	regExpInternetURL: (str) => {
		return RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(str)
	},
	//匹配密码（密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)）
	regExpPwd: (str) => {
		return RegExp(/^[a-zA-Z]\w{5,17}$/).test(str)
	},
	//日期格式  2019-01-12
	regExpDate: (str) => {
		return RegExp(/^\d{4}-\d{1,2}-\d{1,2}/).test(str)
	},
	//匹配空白行
	regExpWhiteLine: (str) => {
		return RegExp(/\n\s*\r/).test(str)
	},
	//匹配正数、负数、和小数
	regExpNumberFloat: (str) => {
		return RegExp(/^(\-|\+)?\d+(\.\d+)?$/).test(str)
	},
	//匹配零和非零开头的数字
	regExpZeroNumber: (str) => {
		return RegExp(/^(0|[1-9][0-9]*)$/).test(str)
	},
	//匹配数字
	regExpNumber: (str) => {
		return RegExp(/^[0-9]*$/).test(str)
	},
	//长度为8-20的所有字符
	regExpAllByte: (str) => {
		return RegExp(/^.{8,20}$/).test(str)
	}
}

//判断枚举对象取值
// 在vue文件中 import { enumeration } from '@/js_sdk/common.js'
// let valueStatus = enumeration(enumObj,0);
export const enumeration = (enumObj, index) => {
	//enumObj ====> 枚举对象 例如：{0:"不通过",1:"通过",2:"待审批"};
	//index ====> 查询属性值或属性名
	for (let i in enumObj) {
		if (i == index) {
			return enumObj[i];
		} else if (enumObj[i] == index) {
			return i;
		}
	}
}

//本地缓存
export const dataStroage = {
	//设置离线缓存
	setStroage: (key, data) => {
		uni.setStorageSync(key, data);
	},
	//获取离线缓存
	getStroage: (key) => {
		let data = uni.getStorageSync(key);
		return data;
	},
	//移除某个离线缓存
	removeStroage: (key) => {
		uni.removeStorageSync(key);
	},
	//移除所有离线缓存
	closeAllStroage: () => {
		uni.clearStorageSync();
	}
}

// 原生Js获取URL传递的参数
export const getUrlParam = (name) => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

//大于固定字符串显示省略号
export const handleStr = (str,length) => {
	let handle_str;
	str.length <= length ? handle_str = str : handle_str = str.slice(0, length) + "...";
	return handle_str
}

/* 倒计时
  endtime 结束时间
  nowtime 开始时间 默认值时当前时间
*/
export const countDown = (endtime,nowtime) => {
  let day = 0,
    hour = 0,
    minute = 0,
    second = 0, //时间默认值
    newtime = nowtime || new Date().valueOf()/1000,
    times = endtime - newtime;
  if (times > 0) {
    day = Math.floor(times / (60 * 60 * 24));
    hour = Math.floor(times / (60 * 60)) - (day * 24);
    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
  }
  day <= 9 ? day = '0' + day : null;
  hour <= 9 ? hour = '0' + hour : null;
  minute <= 9 ? minute = '0' + minute : null;
  second <= 9 ? second = '0' + second : null;
  return {day,hour,minute,second}
}

/* 判断数据类型 */
export const isDataType = {
	isArray:(obj) => {
	  return (typeof obj == 'object') && obj.constructor == Array;
	},
	isObject:(obj) => {
	  return Object.prototype.toString.call(obj) === "[object Object]";
	},
	isEmptyObject:(obj) => {
	  let t;
	  for (t in obj) return !1;
	  return !0
	}
}
