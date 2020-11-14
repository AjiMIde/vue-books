## Property and Function
* 由于 `router` 挂载到根实例，所有应用、页面、组件都有路由属性
* 因此可以使用 `route`, `router` 来获取属性与方法

#### property
```js
let id = this.$route.params.id        // 参数，一般为： /foo/:id
let query = this.$route.query         // 参数，一般为： /foo?query=xx
let n = this.$route                   // 属性，一般有 name/path... 等
```

#### function
```js
this.$router.go(-1)    // 历史回退 history.back()
this.$router.go(1)     // 历史前进 history.forward()

this.$router.push({    // 历史增加 
  name: 'foo',         // 一般， name/path 取一种即可
  path: '/foo',
  params: {            // 可选，一般，指定了 path，params 会被忽略
    id: 123
  },
  query: {             // 可选 
    name: foo
  }
}, () => {
  // onComplete 回调方法，可选 
  // do sth
}, () => {
  // onAbort  回调方法，被停止，可选 
  // do sth
})

this.$router.replace({  // 历史替换
  // 参数同 $router.push() 不赘述
})

```



