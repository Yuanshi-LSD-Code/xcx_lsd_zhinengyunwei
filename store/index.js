import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mallConfig from './modules/mallConfig.js';
import user from './modules/user.js';

const store = new Vuex.Store({
	modules: {
	    mallConfig,
	    user,
	}
	
})

export default store
