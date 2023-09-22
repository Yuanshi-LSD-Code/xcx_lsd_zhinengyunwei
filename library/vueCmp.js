//给Vue注册一些全局组件 *** 2020/7/31 发现全局组件注册有bug
// import searchBar from '../components/uni-search-bar/uni-search-bar.vue'
// import loadMore from '../components/uni-load-more/uni-load-more.vue'
// import headerTop from '../cmp/headerTop/headerTop.vue'
// import redChecked from '../cmp/redChecked/redChecked.vue'
// import redBtn from '../cmp/redBtn/redBtn.vue'
// import redHeaderMain from '../cmp/redHeaderMain/redHeaderMain.vue'
// import top from '../cmp/top/top.vue'
// import home from 'pages/home/home.vue'
const map = new Map();   //set方法可以向Map对象添加新元素 方法给对象添加新元素,Key,value
// map.set('search-bar',searchBar);
// map.set('load-more',loadMore);
// map.set('header-top',headerTop);
// map.set('red-checked',redChecked);
// map.set('red-btn',redBtn);
// map.set('red-header-main',redHeaderMain);
// map.set('top',top);
// map.set('home',home);
function vueCmp(Vue){
	// Vue.component()
	for(var [key,value] of map){
		Vue.component(key,value);
	}
}

export default vueCmp;

