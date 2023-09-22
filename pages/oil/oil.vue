<template>
	<view>
		<web-view title="hehe" :src="redirect_url"> </web-view>
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
			if (option.url) {
				this.redirect_url = option.url;
			} else {
				this.come();
			}
			uni.setNavigationBarTitle({
				title: '赛聚车友俱乐部'
			})
		},
		methods: {

			async come(item) {
				let res = await this.$http('userCome');
				console.log(33333)
				console.log(res.data.data.redirect_url)
				if (res.code == 200) {
					this.redirect_url = res.data.data.redirect_url
				}

			}
		}
	}
</script>

<style>

</style>
