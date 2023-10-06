<template>
	<view>
		<!-- <web-view title="hehe" :src="redirect_url"> </web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

				webviewStyles: {
					progress: {
						color: '#3e3adc'
					}
				},
				redirect_url: '',
			}
		},
		onLoad(option) {
			var item = JSON.parse(option.item);
			this.redirect_url = item.pdf_url
			// 微信下载文件需要在微信公众平台>开发>开发管理>服务器域名>downloadFile合法域名>配置白名单域名
			// #ifdef MP-WEIXIN
			uni.downloadFile({
				url: this.redirect_url,
				success: res => {
					console.log(res)
					if (res.statusCode === 200) {
						// 预览pdf文件
						uni.openDocument({
							filePath: res.tempFilePath,
							showMenu: true, // 右上角菜单，可以进行分享保存pdf
							success: function(file) {
								console.log("file-success", file)
							}
						})
					}
				}
			})
			// #endif
			// uni.setNavigationBarTitle({
			// 	title: '赛聚车友俱乐部'
			// })
		},
		methods: {



			// async come(item) {
			// 	let res = await this.$http('userCome');
			// 	console.log(33333)
			// 	console.log(res.data.data.redirect_url)
			// 	if (res.code == 200) {
			// 		this.redirect_url = res.data.data.redirect_url
			// 	}

			// }
		}
	}
</script>

<style>

</style>