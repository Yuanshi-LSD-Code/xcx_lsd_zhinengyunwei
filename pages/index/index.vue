<template>
	<main-layout>
		<view>


			<view v-if="factory_list.length>0">
				<view class="display_sb" style="height: 100rpx;" @click="djCount()">
					<view style="margin-left: 20rpx;">所有工厂</view>
					<u-icon name="arrow-right" size="20"></u-icon>
				</view>
				<u-line></u-line>
			</view>

			<view v-for="(item,index) in factory_list " :key="index">
				<view class="display_sb" style="height: 100rpx;" @click="linkTo(item,index)">
					<view style="margin-left: 20rpx;">{{item.title}}</view>
					<u-icon name="arrow-right" size="20"></u-icon>
				</view>
				<u-line></u-line>
			</view>



		</view>

	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				factory_list: [],
			}
		},
		created() {
			// setTimeout(() => {
			const app = getApp()
			console.log(app.globalData);
			if (!app.globalData.isLogin) {
				uni.$on('app', (data) => {
					// 处理接收到的数据
					console.log(data.msg); // 输出：'更新了'
					this.$http('djFactory').then((res) => {
						this.factory_list = res.data.factory_list;
						if (this.factory_list.length == 1) {
							this.$_navigateTo('factoryOne', {
								'item': this.factory_list[0];
							})
						}

					})
				})
			} else {
				this.$http('djFactory').then((res) => {
					this.factory_list = res.data.factory_list;

				})
			}


			// },1000);
			// this.$_reLaunch('factoryInfo');
		},

		onLoad(option) {


		},
		onShow() {
			// this.$_reLaunch('factoryInfo');
		},
		methods: {
			djCount(item, index) {
				this.$_navigateTo('factory', {
					'item': item
				})
			},
			linkTo(item, index) {
				this.$_navigateTo('factoryOne', {
					'item': item
				})
			},
		}



	}
</script>




<style scoped lang="scss">

</style>