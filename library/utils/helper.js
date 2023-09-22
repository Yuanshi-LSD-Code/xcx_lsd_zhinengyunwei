// 工具类
// import storage from '../storage.js';
const app = getApp();

class Helper {
	constructor() {

	}

	//按照宽度的适配，传入设计稿的数值，得到实际的px数值，设计稿标准750
	upx(num) {
		//按照750来适配
		const {
			windowWidth
		} = uni.getSystemInfoSync();
		const r = 750 / Number(num);
		const x = windowWidth / r;
		return x;
		// windowWidth/750=x/num
		// x=windowWidth/750/num
	}
	formatDate(date, fmt) {
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
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
					.length)));
		return fmt;
	}
	getDateDiff(data) {
		console.log(data)
		// this.formatDate(data,'yyyy-MM-dd h:m:s')
		var result = ''
		//var str = data;
		//将字符串转换成时间格式
		var timePublish = new Date(data);
		// var timePublish=data
		console.log(timePublish)
		var timeNow = new Date();
		console.log(timeNow)
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var month = day * 30;
		var diffValue = timeNow - timePublish;
		var diffMonth = diffValue / month;
		var diffWeek = diffValue / (7 * day);
		var diffDay = diffValue / day;
		var diffHour = diffValue / hour;
		var diffMinute = diffValue / minute;

		if (diffValue < 0) {
			alert("错误时间");
		} else if (diffMonth > 3) {
			result = timePublish.getFullYear() + "-";
			result += timePublish.getMonth() + "-";
			result += timePublish.getDate();
			// alert(result);
		} else if (diffMonth > 1) {
			result = parseInt(diffMonth) + "月前";
		} else if (diffWeek > 1) {
			result = parseInt(diffWeek) + "周前";
		} else if (diffDay > 1) {
			result = parseInt(diffDay) + "天前";
		} else if (diffHour > 1) {
			result = parseInt(diffHour) + "小时前";
		} else if (diffMinute > 1) {
			result = parseInt(diffMinute) + "分钟前";
		} else {
			result = "刚刚";
		}
		return result;
	}
	//获取节点信息
	getDomInfo(vm, select) {
		return new Promise((resolve, reject) => {
			uni.createSelectorQuery().in(vm).select(select).boundingClientRect(result => {
				if (result) {
					resolve(result);
				} else {
					this.getDescBox()
				}
			}).exec()
		})
	}
	alert(content = "", title = "提示", ) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title,
				content,
				success: function(res) {
					if (res.confirm) {
						resolve(true)
					} else {
						resolve(false)
					}
				}
			});
		})
	}
	//
	toast(title = "", icon = "none") {
		uni.showToast({
			title,
			icon
		})
	}
	switchTo(name) {
		let url = `/pages/${name}/${name}`;
		uni.switchTab({
			url: url
		});
	}
	redirectTo(name) {
		let url = `/pages/${name}/${name}`;
		uni.redirectTo({
			url: url
		});
	}
	linkTo(name, params) {
		let url = `/pages/${name}/${name}`;
		if (typeof params == 'object') {
			let str = '?';
			let paramsArr = [];
			for (let k in params) {
				if (typeof params[k] == 'object') {
					let val = JSON.stringify(params[k]);
					var temp = `${k}=${val}`; 
				} else {
					var temp = `${k}=${params[k]}`;
				}
				paramsArr.push(temp)
			};
			str = str + paramsArr.join('&');
			url = url + str;
		}
		uni.navigateTo({
			url: url,
			success: () => {

			},
			fail: (err) => {
				// utils.alert("页面跳转失败,请重启APP")
				// utils.toast("err")
				// utils.alert(JSON.stringify(err))
				// uni.showToast({
				// 	title:JSON.stringify(err),
				// 	icon:'none'
				// })
			}
		})
	}
	// 判断是否有token，没有就到登陆页,如果传入一个false,就不跳
	judgeLink(is_jump = true) {
		const token = storage.getTokenData();
		if (token) {
			return true;
		} else {
			utils.toast("请先登录哦!")
			if (is_jump) {
				setTimeout(() => {
					utils.linkTo('login');
				}, 1000)
			} else {
				return false;
			}
		}
	}
	//显示加载中
	showLoading(title = "加载中") {
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
	//隐藏加载中,延迟一段时间
	hideLoading(duration = 350) {
		setTimeout(function() {
			uni.hideLoading();
		}, duration);
	}
	// toast(title){
	// 	uni.showToast({
	// 	    title: title,
	// 	    duration: 2000,
	// 		icon:'none'
	// 	});
	// }
	chooseImg(count = 1, type = ['album']) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: count,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: type, //从相册选择 
				success: function(res) {
					resolve(res);
				}
			});
		})
	}
	//延迟返回
	backForDuration(duration = 300) {
		duration = +duration
		setTimeout(() => {
			uni.navigateBack();
		}, duration)
	}
	// 获取上一个页面的实例vm
	getBeforePageVm(before = 1) {
		if (typeof before != 'number') {
			return new Error('传入的不是数字类型')
		}
		const pages = getCurrentPages();
		const beforePage = pages[pages.length - (before + 1)]; //获取上一个页面的实例
		if (!beforePage) {
			return false;
		}
		return beforePage.$vm;
	}
	//进行上一个页面的刷信息刷新
	refreshBeforePageInfo() {
		//需要在对应页面的vue实例中定义一个标准的refresh方法
		const bpage = utils.getBeforePageVm();
		if (!bpage) {
			return;
		}
		if (typeof bpage.refresh == 'function') {
			bpage.refresh(...arguments);
		}
	}
	// 复制数据（字符串）
	copyData(str) {
		//数字的话会闪退
		str = str + "";
		return new Promise((resolve, reject) => {
			uni.setClipboardData({
				data: str,
				success: function() {
					resolve(true);
				},
				fail: function() {
					resolve(false);
				}
			});
		})
	}
	//保存网络图片到本地
	async savePicToAlbum(path) {
		const tempFilePath = await api.downloadFile(path);
		return new Promise((resolve, reject) => {
			uni.saveImageToPhotosAlbum({
				filePath: tempFilePath,
				success: () => {
					utils.toast("保存成功", "success");
					resolve(true);
				},
				fail: () => {
					utils.toast("保存失败", "fail");
					resolve(false)
				}
			})
		})
	}
	//打开外部链接
	openUrl(url) {
		url = url.toLowerCase();
		var reg = /^http/;
		if (!reg.test(url)) {
			url = "http://" + url;
		}
		return new Promise((resolve, reject) => {
			plus.runtime.openURL(url, function(res) {
				resolve(res);
			});
		})
	}
	//吊起支付
	pay(type, orderInfo) {
		let provider;
		if (type == 1) {
			//支付宝
			provider = "alipay"
		} else {
			//微信
			provider = "wxpay"
		}
		return new Promise((resolve, reject) => {
			console.log(orderInfo);
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
	// 跳转QQ
	openQQ(qq) {
		if (uni.getSystemInfoSync().platform == 'ios') {
			plus.runtime.launchApplication({
				action: 'mqq://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web'
			}, function(e) {
				utils.toast("打开失败");
				console.log('Open system default browser failed: ' + e.message);
			});
		} else {
			plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web '); /*  */
			// plus.runtime.openURL('http://wpa.qq.com/msgrd?v=3&uin=&site='+ 746932095+'&menu=yes');/*  */
		}
	}

	//检查链接是否为网络链接
	link_check(url, is_reg = false) {
		console.log(323);
		if (is_reg == false) {
			//匹配是否为网络链接
			var reg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
		} else {
			//匹配是协议名
			var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
		}
		var data = reg.test(url);
		return data ? data : false;
	}

}

export default Helper;
