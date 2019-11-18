#### 添加`EsLint`规则

* 通常来讲，使用 `vue-cli` 会搭配 `EsLint` 来做代码质量维持工作及提前编译（预知错误），而正常来讲，会搭配
* 如像 `airbnb` 或 `js-standard` 等规则库进行代码校验，不过即使这样，用户仍有自己想要设定的规则，
* 则可修改文件：`.eslintrc.js`添加 `rules`规则

```js
const config = {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-trailing-spaces': 'off',
      'no-multiple-empty-lines': 'off',
      'no-multi-spaces': 'off',
    }
}
```
 
 
#### 添加`styles`

* 一般会根据项目的需要，来添加想要的`ui`组件库，而一般的`ui`组件库会包含了诸如`css reset`，
* **国际化**，**常用组件**（如：flexbox/buttons/popup/swiper等等）。
* 常用的`ui`框架有`vux`，`ele-ui`等，大同小异
* 下面使用 `bee-mui`

#### bee-mui 使用

```bash
# yarn add bee-mui
# yarn upgrade bee-mui
```

* 引用 `style reset: @import "~bee-mui/src/styles/bee.reset";`
* 引用 `flex/button/eg.. @import ~bee-mui/src/styles/bee.flex`
* 更多引用请参考文档：xxx

#### 添加统一的 http 请求

#### 添加全局的 icon-font 字体图标

* 使用 `iconfont svg` 字体图标有很多好处，比如像：可自定义颜色、体积小且无限放大时不失真，易于管理等
* 下面简述一下简单的使用方法: 
* 打开 [iconfont](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1393579)挑选自己需要的`icon`添加到自定义的项目里面；
* 下载，得到`iconfont.js`文件；
* 引入到项目中去（使用 `require()`，在`App.vue`或`main.js`引入都行
* 添加统一覆盖样式：`your-proj-name-icon: { width: 1em; height: 1em; vertical-align: -0.15em; fill: currentColor; overflow: hidden;}`
* 在需要引入的地方使用：`<svg class="your-proj-name-icon" aria-hidden="true" color="#fff"> <use xlink:href="#icon-the-icon-name"></use> </svg>`
* 通常也在全局下面注册一个全局的 `component` 来引入`icon`，这样书写起来更方便，下面以`bee-mui`为例子


```js

```

```vue
<template>

</template>
<script>

</script>

```

