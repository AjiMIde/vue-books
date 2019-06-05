## Guards and Others
* 由于 `router` 挂载到根实例，所有应用、页面、组件都有路由属性
* 因此可以使用 `route`, `router` 来获取属性与方法

#### 全局守卫
```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
  // next ()         // 执行 to 导航，next 是一定要被执行的
  // next (false)    // 中断导航
  // next ('/') or next ({path: '/'})  or  next({replace: true/false, name: foo})    // 根据条件导航到别处去
  // next (error)    // error 实例，传递错误给 router.onError()
})

router.beforeResolve()      // 查看官方文档

```

#### 组件守卫 components Guards
```js
let foo = {
  watch: {
    '$route' (to, from) {
      // do sth
    }
  },
  beforeEnter (to, from, next) {
    // 这里无法获取 到 this 实例，因为组件未创建
    next(vm => {
      // 只能通过 vm 来访问组件实例
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 当前路由变化，但组件是被复用的情况下，调用此方法
    // 通常用在，路径是带参数的情况下，且参数变化
    // 可访问 this
    next()
  },
  beforeRouteLeave () {
    // 可访问 this
    next()
  }
}
```

#### transition
* 使用，请参考：https://cn.vuejs.org/v2/guide/transitions.html

```html
<transition>
  <router-view></router-view>
</transition>
```

