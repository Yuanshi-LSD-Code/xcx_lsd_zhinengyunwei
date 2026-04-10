<template>

	<main-layout>
		<view>
			<view style="height: 100px;margin-left: 20rpx;margin-top: 20rpx;">
				{{item.content}}
			</view>

			<view style="display: flex;justify-content: flex-end;margin-right: 20rpx;">
				{{item.add_time}}
			</view>
			
			<!-- 新增多行文本框 -->
			<view style="margin: 20rpx;">
				<view style="margin-bottom: 10rpx; font-weight: bold;">处理意见：</view>
				<textarea v-model="processingOpinion" placeholder="请输入处理意见" rows="4" style="width: 100%; padding: 10rpx; box-sizing: border-box;"></textarea>
			</view>
			
			<!-- 处理人和处理时间 -->
			<view v-if="item.status === 2" style="margin: 20rpx;">
				<view style="margin-bottom: 10rpx; font-weight: bold;">处理人：</view>
				<view>{{commentByName}}</view>
			</view>
			
			<view v-if="item.status === 2" style="margin: 20rpx;">
				<view style="margin-bottom: 10rpx; font-weight: bold;">处理时间：</view>
				<view>{{item.look_time}}</view>
			</view>
						
			<view style="width: 110px;margin: 40rpx auto;">
				<u-button text="确认" size="normal" type="primary"  @click="handleMessage"></u-button>				
			</view>
		</view>

	</main-layout>
</template>

<script>
	export default {
		data() {
			return {
				item: {}, // status=1, status=2
				processingOpinion: '' ,// 定义处理意见
				commentByName: '', // 处理人的姓名
			}
		},

		// watch: {
		// 	tabCurrent(onew, old) {
		// 		this.loadList();
		// 	}
		// },
		onLoad(option) {
			
			var item = JSON.parse(option.item);
			this.item = item;
			// 初始化 processingOpinion
			this.processingOpinion = item.comment || '';
			
			// 查询处理人的姓名
			if (item.comment_by) {
			    this.getCommentByName(item.comment_by);
			}

		},
		onShow() {

		},

		methods: {

			handleMessage(){
				this.$http('factoryNoticeLook', {
					'id': this.item.id,
					'comment': this.processingOpinion ,
				}).then((r)=>{
					console.log(r);
					this.$utils.toast("操作成功", "success");
					setTimeout(() => {
						this.$_refreshBeforePageInfo();
					}, 500);
				})
				
			},
			
			getCommentByName(commentById) {
            // 假设你有一个 API 可以通过 comment_by 查询 uname
            this.$http('getAdminById', { 
				id: commentById ,
			}).then(response => {
                this.commentByName = response.data.uname || ''; // 获取 uname 并赋值
            }).catch(error => {
                console.error('Error fetching commentByName:', error);
                this.commentByName = '未知'; // 处理错误情况
            });
        },

			
			


		}



	}
</script>

<style>
	.sticky-container {
		position: fixed;
		/* position: sticky; */
		top: 0;
		z-index: 99;
		width: 100%;
	}
	textarea {
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
		resize: vertical; /* 允许用户调整高度 */
	}
</style>