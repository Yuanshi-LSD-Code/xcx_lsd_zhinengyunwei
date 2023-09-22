## 版本 1.0.0

### 属性
|  参数 | 类型  | 默认值  | 描述  |
| ------------ | ------------ | ------------ | ------------ |
|  itemNumber |  [String, Number] |  4 |  输入框个数 |
|  autoFocus |  [Boolean,String] |  false | 输入框是否自动聚焦  |
| isPassword  | Boolean  | false  |  输入框是否为密码框 |
| type  | String  |  box |  边框类型 |
| inputType  |  String |  number |  输入框类型 |
|  passwordStyle |  String | .  |  密码文本样式 |
|  focusColor |  String | #00ff00  |  聚焦时的边框颜色 |fda

### 方法
|  方法名 | 返回值类型   | 描述  |
| ------------ | ------------ | ------------ |
|  @Confirm |  string |  当输入框输入完成后的回调函数 |

### 引用方法
引入组件
```javascript
import verificationCode from '@/components/verification-code/verification-code.vue';

components: { verificationCode }
```
使用组件
```html
<verification-code @Confirm='onConfirm' inputType="password" passwordStyle="密" :itemNumber="6" class="activation-code" type="box"></verification-code>
```

### 注意：
1. 属性isPassword和inputType='password'同级，设置其中一个，另外一个也会生效