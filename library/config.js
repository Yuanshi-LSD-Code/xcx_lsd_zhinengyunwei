import {
	environment
} from '../config/env.js'
const dev = true

const configObj = {};
if (environment == 'dev') {
	//configObj.url = 'https://mmp.rounston.com';
	//configObj.url = 'http://localhost:8083';
	configObj.url = 'http://192.168.1.111:8083';
	configObj.websocket = '';
} else if (environment == 'product') {
	//configObj.url = 'https://mmp.rounston.com';
	//configObj.url = 'http://localhost:8083';
	configObj.url = 'http://192.168.1.111:8083';
	configObj.websocket = 'ws://';
} else {
	console.error('错误')
}


configObj.imgUrl = 'http://oss-cdn.bangyaya.cn';
configObj.webUrl = configObj.url + '/';
configObj.apiUrl = configObj.webUrl + 'appapi/'
// oss上传配置
configObj.ossConfig = {
	//aliyun OSS config
	uploadImageUrl: 'http://bangyaya.oss-cn-beijing.aliyuncs.com/', // 默认存在根目录，可根据需求改   oss 上传图片
	imageUrl: 'http://oss-cdn.bangyaya.cn/', // 默认存在根目录，可根据需求改						  oss 给后端查看图片
	AccessKeySecret: 'MleEyJwSXysB7hFpAKZicmjYhXWAu8', // AccessKeySecret 去你的阿里云上控制台上找
	OSSAccessKeyId: 'LTAI4GFFcpGxjAcwokxSWSzC', // AccessKeyId 去你的阿里云上控制台上找
	timeout: 87600 //这个是上传文件时Policy的失效时间
};
configObj.android_media_id = 'dy_59634658'
configObj.android_appSecret = '2b80234c7e4126e469d925e0fc75cda5'
configObj.ios_media_id = 'dy_59634659'
configObj.ios_appSecret = '4e7e18ae21e4087fcba698c32d1f7d88'
export default configObj;
