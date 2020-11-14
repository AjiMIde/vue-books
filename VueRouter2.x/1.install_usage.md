## Installation and Usage

#### Installation
```bash
npm i vue-router
```

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.user(VueRouter)
```


#### Usage
##### html navigator
```html
* 路径形式
<router-link to="/foo">Go to foo</router-link>

* 对象形式
<router-link to="{name: 'foo', params: {id: '123'}">Go to foo</router-link>
```

##### route config
* 组件是路由元素不可少的组成
* 可通过  Object 对象指定一个，可通过 `import` 引入，推荐的还是通过 `require.ensure` 引入
```javascript 1.8
import foo from '@/app/foo'
const foo = {template: '<div>foo</div>'}


let router = [{
  path: '/foo',
  name: 'foo',      // 命名路由，给这个路由一个身份
  component: foo
}, {
  path: '/foo',
  component: r => require.ensure([], () => r(require('@/app/course/_course.vue')), '')
}]

// 带参路由
let r = [{
  path: '/foo/:id'              // 带参，匹配 /foo/123, /foo/234 and so on
}, {
  path: '/foo/:id/bar/:name'    // 多参，多匹配: /foo/123/bar/456
}, {
  path: '/foo/:id?'             // 带（或不带）参：匹配：/foo, /foo/123
}]

// 嵌套路由
let r = [{
  path: '/foo',                 // 嵌套路由，注意，此时，需要在 foo 组件中，使用 <router-view></router-view>
  component: foo,
  children: [{
    path: '',                   // 匹配无更多路由： /foo
    component: index
  }, {                          // 匹配 /foo/bar
    path: 'bar',
    component: bar
  }, {
    path: 'home',               // 匹配 /foo/home
    component: home
  }]
}]

// 路由重定向与别名
let r = [{
  path: '/foo',
  redirect: '/b',                // 重定向
  redirect: {name: 'foo'},        // object 重定向
  redirect: to => {
    // 方法接收 目标路由 作为参数
    // return 重定向的 字符串路径/路径对象
  }
}]

export default new Router({
  routes: r
})
```



