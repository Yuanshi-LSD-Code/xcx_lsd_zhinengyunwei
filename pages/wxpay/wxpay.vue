<template>
  <div></div>
</template>
<script>
export default {
  name: 'wxpay',
  data() {
    return {
      resultUrl: '',
      result: {},
    }
  },
  onLoad(data) {
    this.result = data
    this.getResult()
  },
  methods: {
    getResult() {
      uni.showLoading({
        title: '正在支付中', //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
      })
	
      const { provider,timeStamp, nonceStr, signType, paySign, return_url } = this.result
      if (!timeStamp && !nonceStr && !signType && !paySign) {
        return
      }
      let bundle = {
        provider:'wxpay',
        timeStamp: decodeURIComponent(this.result.timeStamp),
        nonceStr: decodeURIComponent(this.result.nonceStr),
        package: decodeURIComponent(this.result.package),
        signType: decodeURIComponent(this.result.signType),
        paySign: decodeURIComponent(this.result.paySign)
      }
      uni.requestPayment({
        ...bundle,
        success(res) {
          if (res.errMsg == 'requestPayment:ok') {
            uni.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 100,
              success(res) {
                if (res.errMsg == 'showToast:ok') {
                  setTimeout(() => {
                    uni.navigateTo({ url: '/pages/oil/oil?url=' + return_url })
                  }, 1000)
                }
              },
            })
          }
        },
        fail(err) {
          if (err.errMsg == 'requestPayment:fail cancel') {
            uni.showToast({
              title: '订单尚未支付，请尽快支付',
              icon: 'none',
              success(res) {
                if (res.errMsg == 'showToast:ok') {
                  setTimeout(() => {
                    uni.navigateBack()
                  }, 1000)
                }
              },
            })
          }
        },
      })
    },
  },
}
</script>
