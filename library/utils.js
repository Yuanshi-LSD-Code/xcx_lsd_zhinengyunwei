// 验证手机号


import api from './api.js';
// import $publicConfig from 'config/publicConfig.js'

// #ifdef H5
// var jweixin = require('jweixin-module')  
// #endif



//  公众号的 jssdk 方法
export function officialAccount(callback) {
	let path = location.href.split('#')[0]
	let appid = $publicConfig.appid;
	api.get_jssdk_sign({ // 后端签名
		url: path
	}).then(res => {
		if (res.code == 200) {
			let apiList = [ // 可能需要用到的能力
				'updateAppMessageShareData',
				'chooseWXPay',
				'onMenuShareAppMessage',
				'hideOptionMenu',
				'openAddress',
			];
			//后台请求的 信息
			let info = {
				debug: false, // 调试，发布的时候改为false
				appId: appid,
				nonceStr: res.data.noncestr,
				timestamp: res.data.timestamp,
				signature: res.data.signature,
				jsApiList: apiList
			};
			console.log(info);
			jweixin.config(info);
			jweixin.ready(res => {
				if (callback) callback(jweixin); //配置成功  回调
			});
			jweixin.error(err => {
				console.log('config fail:', err);
			});
		}
	})
}

export function checkTel(tel) {
	// console.log(this);
	let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
	if (!reg.test(tel)) {
		this.toast({
			title: '手机号码有误，请重填',
			icon: "none"
		})
		return false
	} else {
		// 验证通过
		return true
	}
}
export function toast(title, icon, image, mask) {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title,
			icon: icon || 'none',
			image: image || '',
			mask: mask ? mask : false,
			success: (res) => {
				res.errMsg === 'showToast:ok' ? resolve(true) : resolve(false)

			}
		})
	})
}

//图片压缩
export function compressImage(path) {
	return new Promise((resolve, reject) => {
		uni.compressImage({
			src: path,
			quality: 80,
			success: res => {
				resolve(res.tempFilePath)
			}
		})
	})
}

//  页面跳转
export function linkTo(name, params) {

	if (name.substr(0, 1) == '/') {
		let url = `${name}`;
	} else {
		let url = `/pages/${name}/${name}`;
	}
	if (typeof params == 'object') {
		let str = '?';
		let paramsArr = [];
		for (let k in params) {
			let temp = `${k}=${params[k]}`;
			paramsArr.push(temp)
		};

		str = str + paramsArr.join('&');
		url = url + str;
	}
	uni.reLaunch({
		url: url
	})
}

export function navigateTo(name, params) {
	if (name.substr(0, 1) == '/') {
		let url = `${name}`;
	} else {
		let url = `/pages/${name}/${name}`;
	}
	if (typeof params == 'object') {
		let str = '?';
		let paramsArr = [];
		for (let k in params) {
			let temp = `${k}=${params[k]}`;
			paramsArr.push(temp)
		};

		str = str + paramsArr.join('&');
		url = url + str;
	}
	uni.navigateTo({
		url: url
	})
}





//删除数组中指定的元素
export function removeByValue(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}

}

// 图片转base 64  连个参数1.图片资源路径 2.要赋值的变量

export function urlTobase64(url, name) {
	var toBase64Url;
	uni.request({
		url: url,
		method: 'GET',
		responseType: 'arraybuffer',
		success: async res => {
			let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
			toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
			this[name] = toBase64Url;
		}
	});
}


//吊起支付
export function pay(type, orderInfo) {
	let provider;
	if (type == 1) {
		//支付宝
		provider = "alipay"
	} else {
		//微信
		provider = "wxpay"
	}
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: provider,
			orderInfo: orderInfo, //微信、支付宝订单数据
			success: function(res) {
				resolve({
					result: true,
					data: res
				})
			},
			fail: function(err) {
				resolve({
					result: false,
					data: err
				})
			}
		});
	})
}


export function hideToast() {
	uni.hideToast()
}



export function hideLoading() {
	uni.hideLoading()
}

//显示加载中
export function showLoading(title = "加载中") {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: title,
			mask: true,
			success: () => {
				resolve(true);
			},
			fail: () => {
				resolve(false);
			}
		});
	})
}
// 弹出提示
export function modal(title, content, showCancel, cancelText, confirmText, cancelColor, confirmColor) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			content: content || '',
			showCancel: !showCancel ? showCancel : true,
			cancelText: cancelText || '取消',
			confirmText: confirmText || '确定',
			cancelColor: cancelColor,
			cancelColor: cancelColor,
			success: (res) => {
				res.confirm ? resolve(true) : resolve(false)
			},
		})
	})

}
/**
 * 图片上传，支持多图
 * @author nullfeng
 * @param Array <images> 本地路径数组
 * @param Function [complete] 回调函数()
 * @return Promise
 */
export function uploadFiles(images, type, data, complete) {
	let queue = [];
	images.forEach(image => {
		queue.push(new Promise((resolve, reject) => {
			uni.uploadFile({
				url: 'http://182.61.36.135:8083/?s=admin/api.plugs/plupload', //上传路径
				filePath: image, //上传路径
				name: 'file',
				fileType: type, //文件类型
				formData: data, //HTTP 请求中其他额外的 form data
				success: res => {
					let result = JSON.parse(res.data);
					if (result.uploaded) {
						resolve(result.url);
					} else {
						uni.showModal({
							content: result.message,
							showCancel: false
						});
					}
				},
				fail: err => {
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
					reject();
				}
			});
		}));
	});
	if (!queue.length) queue.push(new Promise((resolve, reject) => {
		resolve("")
	}));
	return new Promise((resolve, reject) => {
		Promise.all(queue).then(res => {
			complete && complete(res.join('|'));
			resolve(res.join('|'));
		}).catch(res => {
			reject();
		});
	});
}


// 验证身份证
export function checkID(id) {
	let reg = /^\d{15}|\d{18}$/
	if (!reg.test(id)) {
		this.toast({
			title: '身份证有误，请重填',
			icon: "none"
		})
		return false
	} else {
		// 验证通过
		return true
	}
}

// 生成随机数
function getRandom(n, m) {
	n = Number(n)
	m = Number(m)
	if (n > m) {
		var temp = n
		n = m
		m = temp
	}
	return Math.floor(Math.random() * (m - n) + n)
}

//根据经纬度计算距离
//开始地址 纬度 经度   结束地址 纬度 经度
export function getDistance($lat1, $lng1, $lat2, $lng2) {
	let $earthRadius = 6367000; //地球半径 单位m
	$lat1 = ($lat1 * Math.PI) / 180;
	$lng1 = ($lng1 * Math.PI) / 180;
	$lat2 = ($lat2 * Math.PI) / 180;
	$lng2 = ($lng2 * Math.PI) / 180;
	let $calcLongitude = $lng2 - $lng1;
	let $calcLatitude = $lat2 - $lat1;
	let $stepOne = Math.pow(Math.sin($calcLatitude / 2), 2) + Math.cos($lat1) * Math.cos($lat2) * Math.pow(Math.sin(
		$calcLongitude / 2), 2);
	let $stepTwo = 2 * Math.asin(Math.min(1, Math.sqrt($stepOne)));
	let $calculatedDistance = $earthRadius * $stepTwo;
	return Math.round($calculatedDistance);
}
// 选择系统相册

export function chooseImg(count = 1) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				resolve(res);
			}
		});
	})
}
// 生成图形随机验证码
export function getRandomCode() {
	var codeStr =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	var randomShowCode = ""
	for (var i = 0; i < 4; i++) {
		var ran = getRandom(0, 62)
		randomShowCode += codeStr.charAt(ran)
	}
	return randomShowCode

}

/**
 * 格式化时间
 */
export function formatDate(date, fmt) {
	if (typeof(date) == "string") {
		date = new Date(date.replace('年', '/').replace('月', '/').replace('日', '').replace(/-/g, '/'));
	}
	var o = {
		"m+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"i+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}



// 格式化时间  将秒格式成 00:00:00:00
export function formatTime(seconds) {
	// 小于等于0的话，结束倒计时
	seconds <= 0 && this.end();
	let [day, hour, minute, second] = [0, 0, 0, 0];
	day = Math.floor(seconds / (60 * 60 * 24));
	// 判断是否显示“天”参数，如果不显示，将天部分的值，加入到小时中
	// hour为给后面计算秒和分等用的(基于显示天的前提下计算)
	hour = Math.floor(seconds / (60 * 60)) - day * 24;
	// showHour为需要显示的小时
	let showHour = null;
	if (this.showDays) {
		showHour = hour;
	} else {
		// 如果不显示天数，将“天”部分的时间折算到小时中去
		showHour = Math.floor(seconds / (60 * 60));
	}
	minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
	second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
	// 如果小于10，在前面补上一个"0"

	showHour = showHour < 10 ? '0' + showHour : showHour;

	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;

	let obj = {
		"day": day,
		"hour": showHour,
		"minute": minute,
		"second": second
	}
	return obj
	// this.d = day;
	// this.h = showHour;
	// this.i = minute;
	// this.s = second;
}