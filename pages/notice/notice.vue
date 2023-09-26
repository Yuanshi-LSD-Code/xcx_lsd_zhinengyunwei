<template>
	
	<main-layout>
		<view>
			<u-subsection :list="list" :current="current" mode="button" @change="sectionChange"></u-subsection>
			
			<view>
				<view>
					<view class="display_sb" style="height: 80rpx;" @click="linkTo()">
						<view style="margin-left: 20rpx;">1122</view>
						<u-icon name="arrow-right" size="20"></u-icon>
					</view>
					<u-line ></u-line>
				</view>
				
				<view>
					<view class="display_sb" style="height: 80rpx;" @click="linkTo()">
						<view style="margin-left: 20rpx;">1122</view>
						<u-icon name="arrow-right" size="20"></u-icon>
					</view>
					<u-line ></u-line>
				</view>
			</view>
			
		</view>
		
	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				list: ['全部', '未读', '已读'],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 0
			}
		},
		
		onLoad(option) {
		
			
		},
		onShow() {
			
		},
		methods: {
			linkTo(item, index) {
				this.$_linkTo('factory', {
					'item': item
				})
			},
			
			sectionChange(index) {
							this.current = index;
							this.list= ['全部5', '未读3', '已读2']
			}
		}
		
		
	
	}
</script>

<style>
</style>