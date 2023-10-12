<template>
	<view style="margin-left: 20px;margin-right: 20px;">

		<view class="display_sb" style="height: 40px;">
			<view>检修组件</view>
			<view class="display">
				<view>{{item.bar_title}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>

		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修分类</view>
			<view class="display">
				<view>{{item.repair_title}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修结果</view>
			<view class="display">
				<view>{{item.status_title}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修人员</view>
			<view class="display">
				<view>{{item.uname}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>


		<view class="display_sb" style="height: 40px;">
			<view>现场拍照</view>
			<view class="display">
				
				<image :src="item.url" style="width: 50rpx;height: 50rpx;"></image>
				
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>计划检修时间</view>
			<view class="display">
				<view>{{item.repair_date}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>实际检修时间</view>
			<view class="display">
				<view>{{item.item.repair_true_date}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view class="display_sb" style="height: 40px;">
			<view>检修说明</view>
			<view class="display">
				<view>{{item.item.remark}}</view>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<u-line></u-line>

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
				item: {},

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
			this.item = JSON.parse(option.item);

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