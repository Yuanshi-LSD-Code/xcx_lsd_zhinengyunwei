import http from './http.js';
import api from './api.js';
//封装一个分页加载的类
class PageLoad {
	constructor(options) {
	    this.url = options.url;
		if(typeof options.success == 'function'){
			this.success = options.success;
		}else{
			this.success = (res)=>{
				
			}
		}
		this.list = options.list || [];
		this.limit = options.limit || 10;
		this.page = 1;
		this.lock = true;
		this.noMore = false;
		this.datas=options.datas || {};
	}
	// 加载方法
	async load(mdata,flag='no'){
		
		if(!this.lock){
			return;
		}
		if(this.noMore){
			return;
		}
		this.lock = false;
		let data;
		if(mdata){
			data = {...mdata};
		}else{
			data = {};
		}
		data.page = this.page;
		data.limit = this.limit;
		
		// if(flag == 'reset'){
		// 	this.clearList();
		// }
		const res = await http(this.url,data);
		
		if(flag == 'reset'){
			console.log(111112222);
			this.clearList();
		}
		
		if(res.result){
			// console.log(res.data);
			res.data.list.forEach(ele=>{
				this.list.push(ele)
			});
			
			this.datas.first_id=res.data.first_id
			this.datas.last_id=res.data.last_id
			this.datas.count=res.data.count
			
			this.page++;
			this.success(res,this);
			this.openLock();
			let len = res.data.list.length;
			if(len<this.limit){
				this.noMore = true;
			}
		}else{
			
		}
	}
	openLock(){
		this.lock = true;
	}
	//清空列表
	clearList(){
		const len = this.list.length;
		this.list.splice(0,len);
	}
	// 重置列表和状态
	reset(){
		this.lock = false;
		this.clearList();
		this.noMore = false;
		this.page = 1;
		this.lock = true;
	}
	//重置列表并加载 即刷新
	refresh(mdata){
		
		// this.clearList();
		this.list.length=0;
		this.lock = false;
		this.noMore = false;
		this.page = 1;
		this.lock = true;
		this.load(mdata,'reset')
	}
	//
	// 删除列表对应项，单个
	delItem(index){
		this.list.splice(index,1);
	}
	//替换对应项
	replaceItem(item,index){
		this.list.splice(index,1,item);
	}
	//对于list的
}
export default PageLoad;