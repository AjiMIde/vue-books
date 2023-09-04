## 一般错误及解决方案

* 路由报错: `history: RouterHistory} is not assignable to parameter type RouterOptions`
* 解决：加个断言 `as RouterOptions`
 
```ts
const router = createRouter({} as RouterOptions)
```



