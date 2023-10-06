// import user from '../../core/user.js';
import Vue from 'vue';
const state = {
	accessToken: null,
	info: null,
	showLoginModal: false,
	sign: {
		mobile: '',
		pic_captcha: '',
		sms_captcha: '',
		validate_code_id: -1
	},
	isSign: false

};

const getters = {
	accessToken(state) {
		return state.accessToken;
	},
	info(state) {
		return state.info;
	},
	showLoginModal(state) {
		return state.showLoginModal;
	},

	sign(state) {
		return state.sign;
	},
	isSign(state) {
		return state.isSign;
	}
};

const mutations = {
	accessToken(state, data) {
		state.accessToken = data;
	},
	info(state, data) {
		state.info = data;
	},
	showLoginModal(state, data) {
		state.showLoginModal = data;
	},

	sign(state, data) {
		state.sign = data;
	},
	isSign(state, data) {
		state.isSign = data;
	},
};

const actions = {
	sign(context, data) {
		context.commit('sign', data);
	},
	isSign(context, data) {
		context.commit('isSign', data);
	},
	accessToken(context) {
		if (!user.isLogin()) {
			context.commit('accessToken', null);
		}
		user.getAccessToken().then(accessToken => {
			context.commit('accessToken', accessToken);
		});
	},
	info(context, data) {
		context.commit('info', data);
	},
	refreshInfo(context) {
		context.commit('accessToken', null);
	},
	refresh(context) {
		if (!user.isLogin()) {
			context.commit('accessToken', null);
		}
		user.getAccessToken().then(accessToken => {
			context.commit('accessToken', accessToken);
			user.getInfo({
				refresh: true,
			}).then(data => {
				context.commit('info', data);
			}).catch(e => {});
		}).catch(e => {});
	},

	logout(context) {
		context.commit('accessToken', null);
		user.loginByToken(null);
	},

	login(context) {
		if (state.info) {
			return state.info;
		}
		return new Promise((r, j) => {
			uni.login({
				success: async (loginInfo) => {
					let res = await Vue.prototype.$http('loginCode', {
						code: loginInfo.code
					}).then((res) => {
						if (res.code == 200) {
							console.log(88888)
							console.log(res)

							this.globalData.token = res.data.token
							this.globalData.platform = res.data.platform
							this.globalData.id = res.data.id
							this.globalData.uid = res.data.uid
							this.globalData.tel = res.data.tel
							this.globalData.nickname = res.data.nickname
							this.globalData.avatar = res.data.avatar
							this.globalData.wx_mini_openid = res.data.wx_mini_openid

							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('platform', res.data.platform)
							uni.setStorageSync('id', res.data.id)
							uni.setStorageSync('uid', res.data.uid)
							uni.setStorageSync('tel', res.data.tel)
							uni.setStorageSync('nickname', res.data.nickname)
							uni.setStorageSync('avatar', res.data.avatar)
							uni.setStorageSync('wx_mini_openid', res.data.wx_mini_openid)
							uni.setStorageSync('isLogin', true)
							// this.globalData.isLogin = true
							Vue.prototype.$storage.setTokenData(res.data);

							context.commit('info', res.data);

						}
					});


					//  else {
					// 	uni.setStorageSync('isLogin', false)
					// 	this.globalData.isLogin = false
					// }

					r(res)
				}
			})
		})
	},

};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}