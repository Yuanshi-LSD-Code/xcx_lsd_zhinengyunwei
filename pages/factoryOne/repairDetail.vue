<template>
	<view style="margin-left: 20px;margin-right: 20px;">

		<view class="display_sb">
			<view>检修组件</view>
			<view>定子</view>
		</view>
		<view class="display_sb">
			<view>检修分类</view>
			<view>日常</view>
		</view>
		<view class="display_sb">
			<view>检修组件</view>
			<view>定子</view>
		</view>
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
				item: '',

				model1: {
					userInfo: {
						name: '楼兰',
						sex: '',
						birthday: ''
					},
					radiovalue1: '苹果',
					checkboxValue1: [],
					intro: '',
					code: ''
				},
			}
		},
		onLoad(option) {
			var item = JSON.parse(option.item);

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