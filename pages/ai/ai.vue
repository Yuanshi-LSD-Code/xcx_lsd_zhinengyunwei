<template>
	<main-layout>
	 <view>  <!-- 添加一个根元素 -->
	  <!--pages/index/index.wxml-->
	  <!-- 自定义导航栏 -->
	  <view class="custom-navbar" :style="{ height: navbarHeight + 'px' }">
		<view class="navbar-content" :style="{ height: '44px', marginTop: statusBarHeight + 'px' }">
		  <view class="navbar-left">
			<view class="nav-btn" @click="onHistoryTap">
			  <image class="nav-icon" src="../../static/image/history.png" mode="aspectFit"></image>
			</view>
			<view class="nav-btn" @click="onRefreshTap">
			  <image class="nav-icon" src="../../static/image/refresh.png" mode="aspectFit"></image>
			</view>
		  </view>
		  <view class="navbar-title">AI助手</view>
		  <view class="navbar-right"></view>
		</view>
	  </view>

	  <!-- 左侧历史记录悬浮层 -->
	  <view class="history-overlay" v-if="showHistoryPicker" @click="onHideHistoryPicker"></view>
	  <view
		class="history-picker-container"
		v-if="showHistoryPicker"
		:style="{ height: windowHeight + 'px', transform: showHistoryPicker ? 'translateX(0)' : 'translateX(-50%)' }"
	  >
		<scroll-view class="history-list" scroll-y>
		  <view
			v-for="item in historyList"
			:key="item.id"
			class="history-item"
			:data-id="item.id"
			@click="onHistoryItemTap"
		  >
			<text class="history-item-text">{{ item.name }}</text>
		  </view>
		  <view v-if="historyList.length === 0" class="empty-history">
			<text class="empty-text">暂无历史记录</text>
		  </view>
		</scroll-view>
	  </view>

	  <view class="container" :style="{ display: 'flex', flexDirection: 'column', paddingTop: navbarHeight + 20 + 'px' }">
		<!-- 聊天消息列表 -->
		<scroll-view
		  class="chat-list"
		  scroll-y
		  :scroll-into-view="scrollToBottom"
		  scroll-with-animation
		>
		  <!-- 初始提示文字 -->
		  <view class="empty-chat-tip" v-if="messageList.length === 0">
			<text class="empty-chat-text">今天有什么可以帮到您？</text>
		  </view>
		  <view
			v-for="item in messageList"
			:key="item.id"
			class="chat-message"
			:class="item.role === 'user' ? 'user-message' : 'assistant-message'"
		  >
			<view
			  class="message-bubble"
			  v-if="item.role === 'user'"
			  @click="onUserMessageTap"
			  :data-content="item.content"
			>
			  <text class="message-text">{{ item.content }}</text>
			</view>
			<view class="message-bubble" v-else>
			  <text class="message-text">{{ item.content }}</text>
			  <text v-if="item.duration" class="duration-text">{{ item.duration }}s</text>
			</view>
		  </view>
		  <view id="bottom"></view>
		</scroll-view>

		<!-- 文本输入框 -->
		<view class="textarea-container">
		  <textarea
			class="textarea"
			:placeholder="isTextareaDisabled ? '请先选择产品' : '请输入内容...'"
			:value="inputText"
			@input="onInput"
			maxlength="500"
			auto-height
			:disabled="isTextareaDisabled"
		  />
		</view>

		<!-- 左侧选择器 -->
		<picker
		  class="button-container"
		  mode="selector"
		  :range="selectorItems"
		  range-key="name"
		  :value="selectorIndex"
		  @change="onSelectorChange"
		>
		  <text class="button-text">{{ selectorItems[selectorIndex].name || '请选择产品' }}</text>
		</picker>

		<!-- 右侧圆形按钮 -->
		<view
		  class="circle-button"
		  :class="[isLoading ? 'loading' : '', !isButtonEnabled ? 'disabled' : '']"
		  @click="onCircleButtonTap"
		>
		  <text class="circle-button-text">{{ isLoading ? '...' : '↑' }}</text>
		</view>

		<!-- 底部提示文字 -->
		<view class="footer-notice">
		  内容由Ai生成，仅供参考
		</view>
	  </view>
	</view>
   	</main-layout>
</template>

<script>
const BASE_URL = 'https://ai.yuanshikeji.com';
//const BASE_URL = 'https://devai.yuanshikeji.com';

// 生成简易 UUID（用于 agent 会话）
function generateUUID() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
}

// 将 ArrayBuffer 转为字符串（微信小程序不支持 TextDecoder）
function arrayBufferToString(buffer) {
  const bytes = new Uint8Array(buffer);
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return result;
}

export default {
  data() {
    return {
      inputText: '',
      isLoading: false,
      isButtonEnabled: false,
      // 控制文本输入框是否可用
      isTextareaDisabled: true,
      // 选择器数据（对象数组）
      selectorItems: [{ id: 'default', name: '请选择产品' }], // 初始选项
      selectorIndex: 0,
      // 存储从接口获取的助手列表，包含id和name
      assistantList: [],
      // 导航栏高度
      navbarHeight: 0,
      // 状态栏高度
      statusBarHeight: 0,
      // 历史记录相关
      showHistoryPicker: false,
      historyList: [
        { id: 1, name: '对话记录1' },
        { id: 2, name: '对话记录2' },
        { id: 3, name: '对话记录3' },
        { id: 4, name: '对话记录4' },
        { id: 5, name: '对话记录5' }
      ],
      historyPickerValue: [0],
      windowHeight: 0,
      // 轮询相关
      pollingTimer: null,
      pollingCount: 0,
      isPolling: false,
      loadingMessage: '正在搜索答案...',
      // Agent 流式请求任务
      agentRequestTask: null,
      // 对话消息列表（通用）
      messageList: [],
      // 用于滚动到底部
      scrollToBottom: '',
      // 是否从历史记录进入
      fromHistory: false,
      // 是否切换了助手（用于发送时清空）
      hasSwitchedAssistant: false,
      // 当前请求开始时间戳（用于计算耗时）
      currentStartTime: 0
    };
  },
  onLoad() {
    // 页面加载时执行
    // 初始化时按钮为失效状态
    this.isButtonEnabled = false;
    // 加载助手列表
    this.loadAssistantList();
    // 获取导航栏高度
    this.getNavbarHeight();
    // 获取窗口高度
    const systemInfo = uni.getSystemInfoSync();
    this.windowHeight = systemInfo.windowHeight;
    // 注意：不再在页面加载时加载历史记录，改为点击按钮时加载
  },
  onShow() {
    // 页面显示时执行
  },
  methods: {
    // 获取导航栏高度
    getNavbarHeight() {
      const systemInfo = uni.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight;
      // 自定义导航栏高度通常为 44px（iOS）或 48px（Android），这里取 44
      const navbarHeight = statusBarHeight + 44;
      this.navbarHeight = navbarHeight;
      this.statusBarHeight = statusBarHeight;
    },
    // 历史记录按钮点击
    onHistoryTap() {
      // 检查是否已登录
      const openid = uni.getStorageSync('openid');
      if (!openid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        // 跳转到登录页面
        uni.reLaunch({
          url: '/pages/login/login'
        });
        return;
      }
      // 显示加载提示
      uni.showLoading({
        title: '加载历史记录...',
      });
      // 先刷新历史记录列表
      this.loadHistoryList(() => {
        uni.hideLoading();
        // 然后显示选择器
        this.showHistoryPicker = true;
      });
    },
    // 隐藏历史记录选择器
    onHideHistoryPicker() {
      this.showHistoryPicker = false;
    },
    // 加载历史记录列表
    loadHistoryList(callback) {
      const openid = uni.getStorageSync('openid');
      if (!openid) {
        if (callback && typeof callback === 'function') {
          callback();
        }
        return;
      }
      const apiUrl = `${BASE_URL}/chat/history`;
      uni.request({
        url: apiUrl,
        method: 'GET',
        data: {
          openid: openid
        },
        success: (res) => {
          console.log('历史记录接口响应:', res);
          if (res.statusCode === 200) {
            // 假设接口返回的是数组
            let historyData = [];
            if (Array.isArray(res.data)) {
              historyData = res.data;
            } else if (res.data && Array.isArray(res.data.data)) {
              historyData = res.data.data;
            } else if (res.data && Array.isArray(res.data.list)) {
              historyData = res.data.list;
            }
            // 确保每个历史记录项都有 name 字段，如果没有，使用其他字段或默认值
            const historyList = historyData.map(item => {
              return {
                id: item.id || item.dialog_id || item.chat_id || '',
                name: item.name || item.dialog_name || item.title || '未命名对话'
              };
            });
            this.historyList = historyList;
            if (callback && typeof callback === 'function') {
              callback();
            }
          } else {
            uni.showToast({
              title: '获取历史记录失败',
              icon: 'none'
            });
            if (callback && typeof callback === 'function') {
              callback();
            }
          }
        },
        fail: (err) => {
          console.error('获取历史记录失败:', err);
          uni.showToast({
            title: '网络错误，无法加载历史记录',
            icon: 'none'
          });
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      });
    },
    // 历史记录项点击事件
    onHistoryItemTap(e) {
      const id = e.currentTarget.dataset.id;
      const historyList = this.historyList;
      const selectedItem = historyList.find(item => item.id === id);

      if (selectedItem) {
        console.log('选中历史记录:', selectedItem);
        // 显示加载提示
        uni.showLoading({
          title: '加载对话中...',
        });
        // 调用接口获取对话详情
        this.loadConversationDetail(selectedItem.id);
      } else {
        // 如果没有找到对应项，直接关闭悬浮层
        this.showHistoryPicker = false;
      }
    },
    // 加载对话详情
    loadConversationDetail(conversationId) {
      const apiUrl = `${BASE_URL}/chat/chatinfo/${conversationId}`;
      uni.request({
        url: apiUrl,
        method: 'GET',
        success: (res) => {
          uni.hideLoading();
          console.log('对话详情接口响应:', res);
          if (res.statusCode === 200) {
            const data = res.data;
            // 构建 messageList
            const messages = [];
            if (data.question) {
              messages.push({
                id: generateUUID(),
                role: 'user',
                content: data.question,
                timestamp: Date.now(),
                isStreaming: false
              });
            }
            if (data.reference) {
              messages.push({
                id: generateUUID(),
                role: 'assistant',
                content: data.reference,
                timestamp: Date.now(),
                isStreaming: false
              });
            }
            this.messageList = messages;
            this.scrollToBottom = 'bottom';
            this.fromHistory = true;
            this.hasSwitchedAssistant = false;

            // 更新左侧选择器
            const dialogId = data.dialog_id || '';
            const dialogName = data.dialog_name || '';
            if (dialogId) {
              const selectorItems = this.selectorItems;
              let foundIndex = -1;
              for (let i = 0; i < selectorItems.length; i++) {
                if (selectorItems[i].id === dialogId) {
                  foundIndex = i;
                  break;
                }
              }

              if (foundIndex !== -1) {
                // 如果找到，直接选中
                this.selectorIndex = foundIndex;
                this.isTextareaDisabled = false;
              } else {
                // 如果没有找到，添加到 selectorItems 中（在默认选项之后）
                const newSelectorItems = [...selectorItems];
                // 在第一个位置（默认选项之后）插入新选项
                newSelectorItems.splice(1, 0, { id: dialogId, name: dialogName || '未命名对话' });
                this.selectorItems = newSelectorItems;
                this.selectorIndex = 1;
                this.isTextareaDisabled = false;
              }
            }

            uni.showToast({
              title: '加载对话成功',
              icon: 'success'
            });
          } else {
            uni.showToast({
              title: '加载对话失败',
              icon: 'none'
            });
          }
          // 自动隐藏悬浮层
          this.showHistoryPicker = false;
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('加载对话详情失败:', err);
          uni.showToast({
            title: '网络错误，无法加载对话',
            icon: 'none'
          });
          // 自动隐藏悬浮层
          this.showHistoryPicker = false;
        }
      });
    },
    // 刷新按钮点击
    onRefreshTap() {
      // 显示加载提示
      uni.showLoading({
        title: '刷新中...',
      });

      // 清除所有缓存的 Agent 会话 ID
      const keys = uni.getStorageInfoSync().keys;
      keys.forEach(key => {
        if (key.startsWith('agent_session_')) {
          uni.removeStorageSync(key);
        }
      });

      // 重置页面数据到初始状态
      this.inputText = '';
      this.isLoading = false;
      this.isButtonEnabled = false;
      this.isTextareaDisabled = true;
      this.selectorIndex = 0;
      this.assistantList = [];
      this.messageList = [];
      this.agentRequestTask = null;
      this.scrollToBottom = '';
      this.selectorItems = [{ id: 'default', name: '请选择产品' }];
      this.fromHistory = false;
      this.hasSwitchedAssistant = false;

      // 重新加载助手列表
      this.loadAssistantList(() => {
        // 同时重新加载历史记录
        this.loadHistoryList();
        uni.hideLoading();
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        });
      });
    },
    // 加载助手列表
    loadAssistantList(callback) {
      const apiUrl = `${BASE_URL}/knowledge/api/assistants`;

      uni.request({
        url: apiUrl,
        method: 'GET',
        success: (res) => {
          console.log('助手列表响应:', res);
          if (res.statusCode === 200) {
            // 假设接口返回的是数组，直接使用
            const data = res.data;
            // 检查返回的数据格式
            let assistants = [];
            if (Array.isArray(data)) {
              assistants = data;
            } else if (data && Array.isArray(data.data)) {
              // 如果返回的是 { data: [...] } 格式
              assistants = data.data;
            } else if (data && Array.isArray(data.datasets)) {
              // 如果返回的是 { datasets: [...] } 格式
              assistants = data.datasets;
            }

            // 确保每个助理都有 type 字段，默认 chat
            assistants = assistants.map(item => ({
              ...item,
              type: item.type || 'chat'
            }));
            // 构建选择器对象数组
            const assistantItems = assistants.map(item => ({
              id: item.id,
              name: item.name || '未知产品'
            }));
            // 在数组开头添加默认选项
            const selectorItems = [{ id: 'default', name: '请选择产品' }, ...assistantItems];

            this.assistantList = assistants;
            this.selectorItems = selectorItems;
            this.selectorIndex = 0;
            // 数据设置完成后执行回调
            if (callback && typeof callback === 'function') {
              callback();
            }
          } else {
            // 处理失败响应
            uni.showToast({
              title: '获取助手列表失败',
              icon: 'none'
            });
            if (callback && typeof callback === 'function') {
              callback();
            }
          }
        },
        fail: (err) => {
          console.error('获取产品列表失败:', err);
          uni.showToast({
            title: '网络错误，无法加载助手产品列表',
            icon: 'none'
          });
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      });
    },
    // 文本输入
    onInput(e) {
      const value = e.detail.value;
      // 如果文本输入框被禁用，不更新按钮状态
      if (this.isTextareaDisabled) {
        this.inputText = value;
        this.isButtonEnabled = false;
        return;
      }
      // 根据输入内容是否为空来更新按钮状态
      const isEnabled = value.trim().length > 0;
      this.inputText = value;
      this.isButtonEnabled = isEnabled;
    },
    // 用户消息点击事件 - 复制到输入框
    onUserMessageTap(e) {
      const content = e.currentTarget.dataset.content;
      if (content) {
        this.inputText = content;
        this.isButtonEnabled = true;
        uni.showToast({
          title: '已复制到输入框',
          icon: 'success',
          duration: 1500
        });
      }
    },

    // 左侧选择器变化事件
    onSelectorChange(e) {
      const index = e.detail.value;
      const selectedItem = this.selectorItems[index];
      // 根据是否选择了有效选项来启用或禁用文本输入框
      const isTextareaDisabled = index === 0;
      this.selectorIndex = index;
      this.isTextareaDisabled = isTextareaDisabled;

      // 重置 fromHistory
      this.fromHistory = false;

      // 如果选择了有效的助理（不是默认选项），清除该助理的 Agent session ID
      if (index > 0 && selectedItem.id !== 'default') {
        const assistantId = selectedItem.id;
        if (assistantId) {
          const key = `agent_session_${assistantId}`;
          uni.removeStorageSync(key);
        }
        // 标记已切换助手
        this.hasSwitchedAssistant = true;
      }
    },
    // 右侧圆形按钮点击事件 - 调用新的API
    onCircleButtonTap() {
      // 首先检查是否已登录
      const openid = uni.getStorageSync('openid');
      if (!openid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        // 跳转到登录页面
        uni.reLaunch({
          url: '/pages/login/login'
        });
        return;
      }

      const { inputText, isButtonEnabled, isLoading, selectorIndex, assistantList, isTextareaDisabled, isPolling } =
this;

      // 如果按钮不可用或正在加载或正在轮询，则直接返回
      if (!isButtonEnabled || isLoading || isTextareaDisabled || isPolling) {
        return;
      }

      if (!inputText.trim()) {
        uni.showToast({
          title: '请输入问题',
          icon: 'none'
        });
        return;
      }

      // 检查是否选择了有效的助手（不是第一个选项）
      if (selectorIndex === 0) {
        uni.showToast({
          title: '请先选择一个产品',
          icon: 'none'
        });
        return;
      }

      // 获取选中的助手信息
      const selectedItem = this.selectorItems[selectorIndex];
      const selectedAssistant = assistantList.find(item => item.id === selectedItem.id);
      const assistantId = selectedAssistant ? selectedAssistant.id : '';
      const assistantName = selectedAssistant ? selectedAssistant.name : '';
      const assistantType = selectedAssistant ? selectedAssistant.type : 'chat';
      const { fromHistory, hasSwitchedAssistant } = this;

      // 决定是否清空消息列表
      let shouldClear = false;
      if (hasSwitchedAssistant) {
        // 切换助手后首次发送，清空消息列表
        shouldClear = true;
      } else if (assistantType === 'chat') {
        // chat 类型每次发送都清空
        shouldClear = true;
      } else if (assistantType === 'agent' && fromHistory) {
        // agent 类型从历史记录进入时首次发送清空
        shouldClear = true;
        // 同时删除对应的 agent session
        if (assistantId) {
          const key = `agent_session_${assistantId}`;
          uni.removeStorageSync(key);
        }
      }

      let baseMessageList = this.messageList;
      if (shouldClear) {
        baseMessageList = [];
      }

      // 添加用户消息到 messageList
      const userMessage = {
        id: generateUUID(),
        role: 'user',
        content: inputText.trim(),
        timestamp: Date.now(),
        isStreaming: false
      };
      const newMessageList = [...baseMessageList, userMessage];

      // 清空输入框，禁用按钮，设置加载状态
      this.inputText = '';
      this.isButtonEnabled = false;
      this.isLoading = true;
      this.isPolling = true;
      this.messageList = newMessageList;
      this.scrollToBottom = 'bottom';
      this.fromHistory = false;
      this.hasSwitchedAssistant = false;
      this.currentStartTime = Date.now();

      if (assistantType === 'agent') {
        // Agent 类型：使用流式接口
        this.startAgentStream(openid, assistantId, assistantName);
      } else {
        // Chat 类型：原有逻辑（创建任务 + 轮询）
        const createTaskUrl = `${BASE_URL}/chat/create_task`;
        uni.request({
          url: createTaskUrl,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            openid: openid,
            question: inputText.trim(),
            chat_id: assistantId,
            dialog_id: assistantId,
            dialog_name: assistantName
          },
          success: (res) => {
            console.log('创建任务响应:', res);
            if (res.statusCode === 200) {
              const taskId = res.data?.task_id;
              if (taskId) {
                // 开始轮询结果
                this.startPolling(taskId);
              } else {
                this.handlePollingError('未获取到任务ID');
              }
            } else {
              const errorMsg = res.data?.detail || `创建任务失败: ${res.statusCode}`;
              this.handlePollingError(errorMsg);
            }
          },
          fail: (err) => {
            console.error('创建任务失败:', err);
            this.handlePollingError('网络请求失败，请检查网络连接');
          }
        });
      }
    },

    // 开始轮询结果
    startPolling(taskId) {
      // 先清除可能存在的定时器
      this.clearPollingTimer();

      // 添加占位助手消息（isStreaming: true）
      const placeholderMsg = {
        id: generateUUID(),
        role: 'assistant',
        content: '正在思考中...',
        timestamp: Date.now(),
        isStreaming: true
      };
      const newMessageList = [...this.messageList, placeholderMsg];
      this.messageList = newMessageList;
      this.scrollToBottom = 'bottom';

      // 设置轮询定时器
      const pollingTimer = setInterval(() => {
        this.pollResult(taskId);
      }, 2000);

      this.pollingTimer = pollingTimer;
    },

    // 轮询结果
    pollResult(taskId) {
      const { pollingCount } = this;
      const maxPollingCount = 60;

      // 检查是否超过最大轮询次数
     // if (pollingCount >= maxPollingCount) {
     //   this.handlePollingError('请求超时，请稍后重试123123');
     //   return;
     // }

      // 更新轮询次数
      const newPollingCount = pollingCount + 1;
      this.pollingCount = newPollingCount;

      // 固定提示信息
      let displayMessage = '正在思考中...';

      // 更新占位消息的内容
      const messageList = this.messageList;
      const lastMsg = messageList[messageList.length - 1];
      if (lastMsg && lastMsg.isStreaming) {
        lastMsg.content = displayMessage;
        this.messageList = messageList;
        this.scrollToBottom = 'bottom';
      }

      const resultUrl = `${BASE_URL}/chat/result/${taskId}`;
      uni.request({
        url: resultUrl,
        method: 'GET',
        success: (res) => {
          console.log('轮询结果响应:', res);
          if (res.statusCode === 200) {
            const data = res.data;
            const status = data?.status;

            if (status === 'completed') {
              // 任务完成，显示答案
              const answer = data?.result?.answer || data?.answer || '未获取到答案';
              // 计算耗时
              const elapsed = ((Date.now() - this.currentStartTime) / 1000).toFixed(1);
              // 更新最后一条消息
              const messageList = this.messageList;
              const lastMsg = messageList[messageList.length - 1];
              if (lastMsg && lastMsg.isStreaming) {
                lastMsg.content = answer;
                lastMsg.isStreaming = false;
                lastMsg.duration = elapsed;
              }
              this.messageList = messageList;
              this.isLoading = false;
              this.isPolling = false;
              this.loadingMessage = '正在思考中...';
              this.scrollToBottom = 'bottom';
              this.clearPollingTimer();
              uni.showToast({
                title: '获取成功',
                icon: 'success'
              });
            } else if (status === 'failed') {
              const errorMsg = data?.error || '任务处理失败';
              this.handlePollingError(errorMsg);
            } else {
              // 状态为 pending 或 processing，继续轮询
            }
          } else {
            const errorMsg = res.data?.detail || `请求失败: ${res.statusCode}`;
            this.handlePollingError(errorMsg);
          }
        },
        fail: (err) => {
          console.error('轮询请求失败:', err);
          // 网络错误时不立即停止轮询，继续尝试直到达到最大次数
        }
      });
    },

    // 处理轮询错误
    handlePollingError(errorMsg) {
      // 更新最后一条消息为错误信息
      const messageList = this.messageList;
      const lastMsg = messageList[messageList.length - 1];
      if (lastMsg && lastMsg.isStreaming) {
        lastMsg.content = errorMsg;
        lastMsg.isStreaming = false;
      }
      this.messageList = messageList;
      this.isLoading = false;
      this.isPolling = false;
      this.loadingMessage = '正在思考中...';
      this.scrollToBottom = 'bottom';
      this.clearPollingTimer();
      uni.showToast({
        title: '请求失败',
        icon: 'none'
      });
    },

    // 获取或创建 Agent 会话 ID
    getOrCreateSessionId(assistantId) {
      const key = `agent_session_${assistantId}`;
      let sessionId = uni.getStorageSync(key);
      if (!sessionId) {
        sessionId = generateUUID();
        uni.setStorageSync(key, sessionId);
      }
      return sessionId;
    },

    // Agent 流式请求
    startAgentStream(openid, assistantId, assistantName) {
      const messageList = this.messageList;
      const lastUserMsg = messageList.filter(msg => msg.role === 'user').pop();
      const userQuery = lastUserMsg ? lastUserMsg.content : '';

      const sessionId = this.getOrCreateSessionId(assistantId);

      // 添加占位助手消息（isStreaming: true）
      const placeholderMsg = {
        id: generateUUID(),
        role: 'assistant',
        content: '正在思考中...',
        timestamp: Date.now(),
        isStreaming: true
      };
      const newMessageList = [...messageList, placeholderMsg];
      this.messageList = newMessageList;
      this.scrollToBottom = 'bottom';

      const streamUrl = `${BASE_URL}/api/agent/stream`;

      // 初始化缓冲区，用于处理跨 chunk 的 SSE 行（虽然不使用 enableChunked，但保留以防后续启用）
      this._agentBuffer = '';
      this._agentDone = false;

      const requestTask = uni.request({
        url: streamUrl,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          assistant_id: assistantId,
          query: userQuery,
          session_id: sessionId,
          user_id: openid,
          dialog_name: assistantName,
          stream: true
        },
        timeout: 120000, // 2 分钟超时
        // 不使用 enableChunked，改用 success 回调接收完整响应
        success: (res) => {
          console.log('Agent 流请求完成', res);
          // 检查 res.data 是否为字符串
          let responseText = '';
          if (typeof res.data === 'string') {
            responseText = res.data;
          } else if (res.data && typeof res.data === 'object') {
            // 如果返回的是 JSON 对象，尝试提取 data 字段或直接 JSON.stringify
            if (res.data.data && typeof res.data.data === 'string') {
              responseText = res.data.data;
            } else {
              responseText = JSON.stringify(res.data);
            }
          } else {
            responseText = '';
          }
          if (!responseText) {
            console.error('Agent 流响应数据为空');
            this.handlePollingError('Agent 响应数据为空');
            return;
          }
          // 按行解析 SSE
          const lines = responseText.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataContent = line.substring(6).trim();
              if (dataContent === '[DONE]') {
                // 流结束
                this._agentDone = true;
                // 计算耗时
                const elapsed = ((Date.now() - this.currentStartTime) / 1000).toFixed(1);
                // 更新最后一条消息
                const messageList = this.messageList;
                const lastMsg = messageList[messageList.length - 1];
                if (lastMsg && lastMsg.isStreaming) {
                  lastMsg.isStreaming = false;
                  lastMsg.duration = elapsed;
                }
                this.messageList = messageList;
                this.isLoading = false;
                this.isPolling = false;
                this.loadingMessage = '正在思考中...';
                this.scrollToBottom = 'bottom';
                this.agentRequestTask = null;
                return;
              }
              try {
                const parsed = JSON.parse(dataContent);
                // 提取 content
                let content = '';
                if (parsed.choices && parsed.choices.length > 0) {
                  const choice = parsed.choices[0];
                  if (choice.message && choice.message.content) {
                    content = choice.message.content;
                  } else if (choice.delta && choice.delta.content) {
                    content = choice.delta.content;
                  }
                }
                if (content) {
                  // 更新最后一条消息
                  const messageList = this.messageList;
                  const lastMsg = messageList[messageList.length - 1];
                  if (lastMsg && lastMsg.isStreaming) {
                    lastMsg.content = content;
                  }
                  this.messageList = messageList;
                  this.scrollToBottom = 'bottom';
                }
              } catch (e) {
                console.warn('解析 SSE 数据失败:', e, dataContent);
              }
            }
          }
          // 如果循环结束仍未收到 [DONE]，视为正常结束
          if (!this._agentDone) {
            this._agentDone = true;
            // 计算耗时
            const elapsed = ((Date.now() - this.currentStartTime) / 1000).toFixed(1);
            const messageList = this.messageList;
            const lastMsg = messageList[messageList.length - 1];
            if (lastMsg && lastMsg.isStreaming) {
              lastMsg.isStreaming = false;
              lastMsg.duration = elapsed;
            }
            this.messageList = messageList;
            this.isLoading = false;
            this.isPolling = false;
            this.loadingMessage = '正在思考中...';
            this.scrollToBottom = 'bottom';
            this.agentRequestTask = null;
          }
        },
        fail: (err) => {
          console.error('Agent 流请求失败:', err);
          // 区分超时错误
          let errorMsg = 'Agent 请求失败，请检查网络连接';
          if (err.errMsg && err.errMsg.indexOf('timeout') !== -1) {
            errorMsg = 'Agent 请求超时，请稍后重试';
          } else if (err.errMsg && err.errMsg.indexOf('fail') !== -1) {
            errorMsg = 'Agent 请求失败，请检查网络连接';
          }
          this.handlePollingError(errorMsg);
          this.agentRequestTask = null;
          this._agentDone = true;
        }
      });

      this.agentRequestTask = requestTask;
    },

    // 清除轮询定时器
    clearPollingTimer() {
      const { pollingTimer } = this;
      if (pollingTimer) {
        clearInterval(pollingTimer);
        this.pollingTimer = null;
      }
    },

    // 页面卸载时中止 Agent 请求
    onUnload() {
      // 页面卸载时清除轮询定时器
      this.clearPollingTimer();
      // 中止 Agent 流式请求
      const { agentRequestTask } = this;
      if (agentRequestTask) {
        agentRequestTask.abort();
        this.agentRequestTask = null;
      }
    },
  }
};
</script>

<style scoped>
/* pages/index/index.wxss */
/* 自定义导航栏 */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 1000;
  border-bottom: 1rpx solid #f0f0f0;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  height: 44px;
  box-sizing: border-box;
}

.navbar-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
}

.nav-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  transition: transform 0.3s ease;
}

.nav-btn:active {
  transform: scale(0.9);
}

.nav-icon {
  width: 40rpx;
  height: 40rpx;
}

.navbar-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

/* 历史记录悬浮层 */
.history-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.history-picker-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  background-color: #ffffff;
  z-index: 1000;
  box-shadow: 2rpx 0 10rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.history-list {
  height: 100%;
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  margin-top:80px;
}

.history-item {
  padding: 10rpx 5rpx;
  border-bottom: 1rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  min-height: 80rpx;
  transition: background-color 0.3s;
}

.history-item:active {
  background-color: #f5f5f5;
}

.history-item-text {
  font-size: 32rpx;
  color: #333;
  line-height: 1.5;
  word-break: break-word;
  white-space: normal;
  width: 100%;
}

.empty-history {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

/* 容器使用 flex 布局 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

/* 聊天区域 */
.chat-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 15px 510rpx; /* 底部留出输入框区域的空间 */
  box-sizing: border-box;
}

/* 初始提示文字 */
.empty-chat-tip {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.empty-chat-text {
  color: #000000;
  font-size: 18px;
  text-align: center;
}

/* 消息容器 */
.chat-message {
  display: flex;
  margin-bottom: 10px;
}

/* 用户消息靠右 */
.user-message {
  justify-content: flex-end;
}

/* 助手消息靠左 */
.assistant-message {
  justify-content: flex-start;
}

/* 消息气泡 */
.message-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

/* 用户气泡颜色 */
.user-message .message-bubble {
  background-color: #DCF8C6;
}

/* 助手气泡颜色 */
.assistant-message .message-bubble {
  background-color: #E5E5E5;
}

/* 消息文本 */
.message-text {
  font-size: 15px;
  line-height: 1.5;
  color: #333;
}

/* 底部锚点 */
#bottom {
  height: 1px;
}

/* 原有样式保留（但不再使用 .text-display-container 等） */
.text-display-container,
.display-text,
.user-input-display-container,
.user-input-display-text {
  display: none;
}

.textarea-container {
  position: fixed;
  left: 50rpx;
  right: 50rpx;
  bottom: 240rpx; /* 为按钮留出空间：按钮高度50rpx + 下边距80rpx + 间距10rpx */
  min-height: 200rpx;
  z-index: 100;
}

.textarea {
  width: 100%;
  min-height: inherit;
  background-color: #f0f0f0; /* 浅灰色填充 */
  border-radius: 25rpx; /* 圆弧倒角，高度的一半 */
  padding: 30rpx;
  font-size: 32rpx; /* 8号字体 */
  color: #000000; /* 黑色 */
  font-family: "SimSun", "宋体", sans-serif; /* 宋体 */
  border: 1rpx solid #cccccc; /* 灰色细框 */
  box-sizing: border-box;
}

.button-container {
  position: fixed;
  left: 50rpx;
  bottom: 180rpx;
  width: 550rpx;
  height: 50rpx;
  background-color: #f0f0f0;
  border-radius: 25rpx;
  border: 1rpx solid #cccccc;
  display: block;
  z-index: 100;
  overflow: visible;
  pointer-events: auto;
  padding: 0;
  margin: 0;
}


/* 确保 picker 内部的 text 元素占满整个容器 */
.button-container .button-text {
  width: 100%;
  height: 100%;
  display: block;
  font-size: 32rpx;
  color: #000000;
  font-family: "SimSun", "宋体", sans-serif;
  text-align: center;
  line-height: 50rpx; /* 与 .button-container 的 height 相同 */
  padding: 0 20rpx;
  box-sizing: border-box;
}

.button-container:active {
  opacity: 0.8;
}

.button-text {
  font-size: 32rpx; /* 8号字体 */
  color: #000000; /* 黑色 */
  font-family: "SimSun", "宋体", sans-serif; /* 宋体 */
}

.circle-button {
  position: fixed;
  right: 50rpx; /* 右侧距离屏幕右边50rpx */
  bottom: 180rpx; /* 下边距离屏幕下边80rpx */
  width: 50rpx; /* 直径 */
  height: 50rpx; /* 直径 */
  background-color: #87CEEB; /* 天蓝色 */
  border-radius: 50%; /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.circle-button:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.circle-button.loading {
  opacity: 0.7;
  background-color: #5bc0de;
}

.circle-button.disabled {
  background-color: #cccccc;
  opacity: 0.5;
  pointer-events: none;
}

.circle-button-text {
  font-size: 40rpx;
  color: white;
  font-weight: bold;
  line-height: 1;
}

/* 耗时文字样式 */
.duration-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 6rpx;
  display: block;
}

/* 底部提示文字样式 */
.footer-notice {
  position: fixed;
  bottom: 120rpx;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 26rpx;
  color: #999999; /* 灰色 */
  z-index: 1;
}
</style>