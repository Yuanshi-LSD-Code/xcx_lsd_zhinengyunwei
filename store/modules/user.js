// import user from '../../core/user.js';

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
	
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}