<!-- 
Copyright 2020.02.02 cxjfun. All Rights Reserved
-->
<template>
    <view class="verification-code">
        <view class="flex-box">
            <input v-model="inputValue" :type="input_type" :focus="autoFocus==true" :maxlength="itemNumber" class="hide-input" @input="getVal" />

            <view class="boxs">
                <view
                    v-for="(item, index) in ranges"
                    :key="index"
                    :class="['item', { active: codeIndex === index, middle: type === 'middle', line: type === 'line', box: type === 'box' }]"
                >
                    <view v-if="codeIndex === index && type != 'middle'" class="active-box" :style="{ 'border-color': focusColor }"></view>
                    <text v-if="codeIndex === index" class="box-text focus">|</text>
                    <text v-if="codeIndex < index && type === 'middle'" class="box-text">-</text>
                    <text v-if="codeIndex > index && ispassword" class="box-text">{{ passwordStyle }}</text>
                    <text v-if="codeIndex > index && !ispassword" class="box-text">{{ inputValue[index] }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'verification-code',
    data() {
        return {
            inputValue: [],
            codeIndex: 0,
            ranges: new Array(this.itemNumber),
            input_type: this.inputType,
            ispassword:this.isPassword
        };
    },
    props: {
        itemNumber: {
            type: [String, Number],
            default: 4
        },
        autoFocus: {
            type: [Boolean,String],
            default: 'false'
        },
        isPassword: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'box' 
        },
        inputType: {
            type: String,
            default: 'number'
        },
        passwordStyle: {
            type: String,
            default: '.'
        },
        focusColor: {
            type: String,
            default: '#00ff00'
        }
    },
    methods: {
        getVal(e) {
            var value = e.detail.value;
            if (this.codeIndex > this.inputValue.length) {
                this.codeIndex--;
            } else {
                if (typeof parseInt(value) == 'number' && this.ispassword == false) {
                    this.codeIndex++;
                } else if (this.ispassword == true) {
                    this.codeIndex++;
                }
                if(this.inputValue.length==this.itemNumber){
                    this.onConfirm()
                }
            }
        },
        onConfirm(){
            this.$emit('Confirm',this.inputValue);
        }
    },
    mounted() {
        if (this.ispassword) {
            this.input_type = 'password';
        }else if(this.inputType='password'){
            this.ispassword=true;
        }
    }
};
</script>

<style lang="scss" scoped>
@keyframes twinkling {
    0% {
        opacity: 0.2;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 0.2;
    }
}

.verification-code {
    width: 465.27rpx;
    height: 55.55rpx;
    text-align: center;
}

.flex-box {
    position: relative;
    width: 465.27rpx;
    height: 55.55rpx;
}

.flex-box .hide-input {
    position: absolute;
    opacity: 0;
    width: 465.27rpx;
    height: 55.55rpx;
    z-index: 9;
}
.flex-box .boxs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 465.27rpx;
    height: 55.55rpx;
    .item {
        display: flex;
        width: 55.55rpx;
        height: 55.55rpx;
        align-items: center;
        border-style: solid;
        border-color: #6f6f6f;
    }
}
.flex-box .boxs .item.active {
    border: none;
}
.flex-box .boxs .item.active .active-box {
    width: 55.55rpx;
    height: 55.55rpx;
    position: absolute;
    border-style: solid;
}
.flex-box .boxs .item .box-text {
    width: 55.55rpx;
    height: 55.55rpx;
    text-align: center;
}
.flex-box .boxs .item.active .focus {
    width: 55.55rpx;
    height: 55.55rpx;
    text-align: center;
    animation: twinkling 1s infinite ease;
}
.flex-box .boxs .item.middle {
    border: none;
}
.flex-box .boxs .item.box {
    border-width: 2.08rpx;
}
.flex-box .boxs .item.line {
    border-bottom-width: 2px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
}
.flex-box .boxs .item.line.active .active-box {
    border-bottom-width: 2px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
}
</style>
