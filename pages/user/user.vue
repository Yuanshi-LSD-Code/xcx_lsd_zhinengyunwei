<template>
	<main-layout>
		<view>
			<view style="height: 204rpx;width: 100%;background-color:rgb(30 110 205) ;">
				<view class="display_a" style="padding-top: 60rpx;padding-left: 30rpx;">
					<image :src="userInfo.avatar" style="width: 80rpx;height: 80rpx;"></image>
					<view style="margin-left: 30rpx;display: flex;flex-direction: column;">
						<view>
							{{userInfo.nickname}}
						</view>
						<view>
							openid:<view @click="copyClick">{{userInfo.wx_mini_openid}}</view>
						</view>
					</view>
				</view>
			</view>



		</view>

	</main-layout>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				src: '../../static/image/tab/user_yes.png',
				nickname: '',
				avatar: '',
				wx_mini_openid: '',
			}
		},

		created() {
			console.log(2323);



		},

		computed: {
			...mapState({
				userInfo: state => state.user.info,
			})
		},

		onLoad(option) {


		},
		onShow() {

		},
		methods: {
			copyClick() {
				let title = userInfo.wx_mini_openid;
				let copy = this.$utils.copyData(title);
				if (copy) {
					this.$utils.toast('复制成功');
				} else {
					this.$utils.toast('复制失败');
				}
			},
			linkTo(item, index) {
				this.$_linkTo('factory', {
					'item': item
				})
			},
		}



	}
</script>




<style scoped lang="scss">

</style>