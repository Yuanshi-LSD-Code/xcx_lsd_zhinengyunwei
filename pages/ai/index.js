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

Page({
  data: {
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
  },
  onLoad() {
    // 页面加载时执行
    // 初始化时按钮为失效状态
    this.setData({
      isButtonEnabled: false
    });
    // 加载助手列表
    this.loadAssistantList();
    // 获取导航栏高度
    this.getNavbarHeight();
    // 获取窗口高度
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowHeight: systemInfo.windowHeight
    });
    // 注意：不再在页面加载时加载历史记录，改为点击按钮时加载
  },
  onShow() {
    // 页面显示时执行
  },
  
  // 获取导航栏高度
  getNavbarHeight() {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight;
    // 自定义导航栏高度通常为 44px（iOS）或 48px（Android），这里取 44
    const navbarHeight = statusBarHeight + 44;
    this.setData({
      navbarHeight: navbarHeight,
      statusBarHeight: statusBarHeight
    });
  },
  // 历史记录按钮点击
  onHistoryTap() {
    // 检查是否已登录
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      // 跳转到登录页面
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return;
    }
    // 显示加载提示
    wx.showLoading({
      title: '加载历史记录...',
    });
    // 先刷新历史记录列表
    this.loadHistoryList(() => {
      wx.hideLoading();
      // 然后显示选择器
      this.setData({
        showHistoryPicker: true
      });
    });
  },
  // 隐藏历史记录选择器
  onHideHistoryPicker() {
    this.setData({
      showHistoryPicker: false
    });
  },
  // 加载历史记录列表
  loadHistoryList(callback) {
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      if (callback && typeof callback === 'function') {
        callback();
      }
      return;
    }
    const apiUrl = `${BASE_URL}/chat/history`;
    wx.request({
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
          this.setData({
            historyList: historyList,
          }, () => {
            if (callback && typeof callback === 'function') {
              callback();
            }
          });
        } else {
          wx.showToast({
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
        wx.showToast({
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
    const historyList = this.data.historyList;
    const selectedItem = historyList.find(item => item.id === id);
    
    if (selectedItem) {
      console.log('选中历史记录:', selectedItem);
      // 显示加载提示
      wx.showLoading({
        title: '加载对话中...',
      });
      // 调用接口获取对话详情
      this.loadConversationDetail(selectedItem.id);
    } else {
      // 如果没有找到对应项，直接关闭悬浮层
      this.setData({
        showHistoryPicker: false
      });
    }
  },
  // 加载对话详情
  loadConversationDetail(conversationId) {
    const apiUrl = `${BASE_URL}/chat/chatinfo/${conversationId}`;
    wx.request({
      url: apiUrl,
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
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
          this.setData({
            messageList: messages,
            scrollToBottom: 'bottom',
            fromHistory: true,
            hasSwitchedAssistant: false
          });
          
          // 更新左侧选择器
          const dialogId = data.dialog_id || '';
          const dialogName = data.dialog_name || '';
          if (dialogId) {
            const selectorItems = this.data.selectorItems;
            let foundIndex = -1;
            for (let i = 0; i < selectorItems.length; i++) {
              if (selectorItems[i].id === dialogId) {
                foundIndex = i;
                break;
              }
            }
            
            if (foundIndex !== -1) {
              // 如果找到，直接选中
              this.setData({
                selectorIndex: foundIndex,
                isTextareaDisabled: false
              });
            } else {
              // 如果没有找到，添加到 selectorItems 中（在默认选项之后）
              const newSelectorItems = [...selectorItems];
              // 在第一个位置（默认选项之后）插入新选项
              newSelectorItems.splice(1, 0, { id: dialogId, name: dialogName || '未命名对话' });
              this.setData({
                selectorItems: newSelectorItems,
                selectorIndex: 1,
                isTextareaDisabled: false
              });
            }
          }
          
          wx.showToast({
            title: '加载对话成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '加载对话失败',
            icon: 'none'
          });
        }
        // 自动隐藏悬浮层
        this.setData({
          showHistoryPicker: false
        });
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('加载对话详情失败:', err);
        wx.showToast({
          title: '网络错误，无法加载对话',
          icon: 'none'
        });
        // 自动隐藏悬浮层
        this.setData({
          showHistoryPicker: false
        });
      }
    });
  },
  // 刷新按钮点击
  onRefreshTap() {
    // 显示加载提示
    wx.showLoading({
      title: '刷新中...',
    });
    
    // 清除所有缓存的 Agent 会话 ID
    const keys = wx.getStorageInfoSync().keys;
    keys.forEach(key => {
      if (key.startsWith('agent_session_')) {
        wx.removeStorageSync(key);
      }
    });
    
    // 重置页面数据到初始状态
    this.setData({
      inputText: '',
      isLoading: false,
      isButtonEnabled: false,
      isTextareaDisabled: true,
      selectorIndex: 0,
      assistantList: [],
      messageList: [],
      agentRequestTask: null,
      scrollToBottom: '',
      selectorItems: [{ id: 'default', name: '请选择产品' }],
      fromHistory: false,
      hasSwitchedAssistant: false
    });
    
    // 重新加载助手列表
    this.loadAssistantList(() => {
      // 同时重新加载历史记录
      this.loadHistoryList();
      wx.hideLoading();
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    });
  },
  // 加载助手列表
  loadAssistantList(callback) {
    const apiUrl = `${BASE_URL}/knowledge/api/assistants`;
    
    wx.request({
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
          
          this.setData({
            assistantList: assistants,
            selectorItems: selectorItems,
            selectorIndex: 0
          }, () => {
            // 数据设置完成后执行回调
            if (callback && typeof callback === 'function') {
              callback();
            }
          });
        } else {
          // 处理失败响应
          wx.showToast({
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
        wx.showToast({
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
    if (this.data.isTextareaDisabled) {
      this.setData({
        inputText: value,
        isButtonEnabled: false
      });
      return;
    }
    // 根据输入内容是否为空来更新按钮状态
    const isEnabled = value.trim().length > 0;
    this.setData({
      inputText: value,
      isButtonEnabled: isEnabled
    });
  },
  // 用户消息点击事件 - 复制到输入框
  onUserMessageTap(e) {
    const content = e.currentTarget.dataset.content;
    if (content) {
      this.setData({
        inputText: content,
        isButtonEnabled: true
      });
      wx.showToast({
        title: '已复制到输入框',
        icon: 'success',
        duration: 1500
      });
    }
  },

  // 左侧选择器变化事件
  onSelectorChange(e) {
    const index = e.detail.value;
    const selectedItem = this.data.selectorItems[index];
    // 根据是否选择了有效选项来启用或禁用文本输入框
    const isTextareaDisabled = index === 0;
    this.setData({
      selectorIndex: index,
      isTextareaDisabled: isTextareaDisabled
    });
    
    // 重置 fromHistory
    this.setData({
      fromHistory: false
    });
    
    // 如果选择了有效的助理（不是默认选项），清除该助理的 Agent session ID
    if (index > 0 && selectedItem.id !== 'default') {
      const assistantId = selectedItem.id;
      if (assistantId) {
        const key = `agent_session_${assistantId}`;
        wx.removeStorageSync(key);
      }
      // 标记已切换助手
      this.setData({
        hasSwitchedAssistant: true
      });
    }
  },
  // 右侧圆形按钮点击事件 - 调用新的API
  onCircleButtonTap() {
    // 首先检查是否已登录
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      // 跳转到登录页面
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return;
    }
    
    const { inputText, isButtonEnabled, isLoading, selectorIndex, assistantList, isTextareaDisabled, isPolling } = this.data;
    
    // 如果按钮不可用或正在加载或正在轮询，则直接返回
    if (!isButtonEnabled || isLoading || isTextareaDisabled || isPolling) {
      return;
    }
    
    if (!inputText.trim()) {
      wx.showToast({
        title: '请输入问题',
        icon: 'none'
      });
      return;
    }
    
    // 检查是否选择了有效的助手（不是第一个选项）
    if (selectorIndex === 0) {
      wx.showToast({
        title: '请先选择一个产品',
        icon: 'none'
      });
      return;
    }
    
    // 获取选中的助手信息
    const selectedItem = this.data.selectorItems[selectorIndex];
    const selectedAssistant = assistantList.find(item => item.id === selectedItem.id);
    const assistantId = selectedAssistant ? selectedAssistant.id : '';
    const assistantName = selectedAssistant ? selectedAssistant.name : '';
    const assistantType = selectedAssistant ? selectedAssistant.type : 'chat';
    const { fromHistory, hasSwitchedAssistant } = this.data;
    
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
        wx.removeStorageSync(key);
      }
    }
    
    let baseMessageList = this.data.messageList;
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
    this.setData({
      inputText: '',
      isButtonEnabled: false,
      isLoading: true,
      isPolling: true,
      messageList: newMessageList,
      scrollToBottom: 'bottom',
      fromHistory: false,
      hasSwitchedAssistant: false,
      currentStartTime: Date.now()
    });
    
    if (assistantType === 'agent') {
      // Agent 类型：使用流式接口
      this.startAgentStream(openid, assistantId, assistantName);
    } else {
      // Chat 类型：原有逻辑（创建任务 + 轮询）
      const createTaskUrl = `${BASE_URL}/chat/create_task`;
      wx.request({
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
    const newMessageList = [...this.data.messageList, placeholderMsg];
    this.setData({
      messageList: newMessageList,
      scrollToBottom: 'bottom'
    });
    
    // 设置轮询定时器
    const pollingTimer = setInterval(() => {
      this.pollResult(taskId);
    }, 2000);
    
    this.setData({
      pollingTimer: pollingTimer
    });
  },
  
  // 轮询结果
  pollResult(taskId) {
    const { pollingCount } = this.data;
    const maxPollingCount = 60;
    
    // 检查是否超过最大轮询次数
   // if (pollingCount >= maxPollingCount) {
   //   this.handlePollingError('请求超时，请稍后重试123123');
   //   return;
   // }
    
    // 更新轮询次数
    const newPollingCount = pollingCount + 1;
    this.setData({
      pollingCount: newPollingCount
    });
    
    // 固定提示信息
    let displayMessage = '正在思考中...';
    
    // 更新占位消息的内容
    const messageList = this.data.messageList;
    const lastMsg = messageList[messageList.length - 1];
    if (lastMsg && lastMsg.isStreaming) {
      lastMsg.content = displayMessage;
      this.setData({
        messageList: messageList,
        scrollToBottom: 'bottom'
      });
    }
    
    const resultUrl = `${BASE_URL}/chat/result/${taskId}`;
    wx.request({
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
            const elapsed = ((Date.now() - this.data.currentStartTime) / 1000).toFixed(1);
            // 更新最后一条消息
            const messageList = this.data.messageList;
            const lastMsg = messageList[messageList.length - 1];
            if (lastMsg && lastMsg.isStreaming) {
              lastMsg.content = answer;
              lastMsg.isStreaming = false;
              lastMsg.duration = elapsed;
            }
            this.setData({
              messageList: messageList,
              isLoading: false,
              isPolling: false,
              loadingMessage: '正在思考中...',
              scrollToBottom: 'bottom'
            });
            this.clearPollingTimer();
            wx.showToast({
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
    const messageList = this.data.messageList;
    const lastMsg = messageList[messageList.length - 1];
    if (lastMsg && lastMsg.isStreaming) {
      lastMsg.content = errorMsg;
      lastMsg.isStreaming = false;
    }
    this.setData({
      messageList: messageList,
      isLoading: false,
      isPolling: false,
      loadingMessage: '正在思考中...',
      scrollToBottom: 'bottom'
    });
    this.clearPollingTimer();
    wx.showToast({
      title: '请求失败',
      icon: 'none'
    });
  },
  
  // 获取或创建 Agent 会话 ID
  getOrCreateSessionId(assistantId) {
    const key = `agent_session_${assistantId}`;
    let sessionId = wx.getStorageSync(key);
    if (!sessionId) {
      sessionId = generateUUID();
      wx.setStorageSync(key, sessionId);
    }
    return sessionId;
  },

  // Agent 流式请求
  startAgentStream(openid, assistantId, assistantName) {
    const messageList = this.data.messageList;
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
    this.setData({
      messageList: newMessageList,
      scrollToBottom: 'bottom'
    });

    const streamUrl = `${BASE_URL}/api/agent/stream`;

    // 初始化缓冲区，用于处理跨 chunk 的 SSE 行（虽然不使用 enableChunked，但保留以防后续启用）
    this._agentBuffer = '';
    this._agentDone = false;

    const requestTask = wx.request({
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
              const elapsed = ((Date.now() - this.data.currentStartTime) / 1000).toFixed(1);
              // 更新最后一条消息
              const messageList = this.data.messageList;
              const lastMsg = messageList[messageList.length - 1];
              if (lastMsg && lastMsg.isStreaming) {
                lastMsg.isStreaming = false;
                lastMsg.duration = elapsed;
              }
              this.setData({
                messageList: messageList,
                isLoading: false,
                isPolling: false,
                loadingMessage: '正在思考中...',
                scrollToBottom: 'bottom'
              });
              this.setData({ agentRequestTask: null });
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
                const messageList = this.data.messageList;
                const lastMsg = messageList[messageList.length - 1];
                if (lastMsg && lastMsg.isStreaming) {
                  lastMsg.content = content;
                }
                this.setData({
                  messageList: messageList,
                  scrollToBottom: 'bottom'
                });
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
          const elapsed = ((Date.now() - this.data.currentStartTime) / 1000).toFixed(1);
          const messageList = this.data.messageList;
          const lastMsg = messageList[messageList.length - 1];
          if (lastMsg && lastMsg.isStreaming) {
            lastMsg.isStreaming = false;
            lastMsg.duration = elapsed;
          }
          this.setData({
            messageList: messageList,
            isLoading: false,
            isPolling: false,
            loadingMessage: '正在思考中...',
            scrollToBottom: 'bottom'
          });
          this.setData({ agentRequestTask: null });
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
        this.setData({ agentRequestTask: null });
        this._agentDone = true;
      }
    });

    this.setData({ agentRequestTask: requestTask });
  },

  // 清除轮询定时器
  clearPollingTimer() {
    const { pollingTimer } = this.data;
    if (pollingTimer) {
      clearInterval(pollingTimer);
      this.setData({
        pollingTimer: null
      });
    }
  },

  // 页面卸载时中止 Agent 请求
  onUnload() {
    // 页面卸载时清除轮询定时器
    this.clearPollingTimer();
    // 中止 Agent 流式请求
    const { agentRequestTask } = this.data;
    if (agentRequestTask) {
      agentRequestTask.abort();
      this.setData({ agentRequestTask: null });
    }
  },
})
