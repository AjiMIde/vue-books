## Component Provide / Inject

* 这两个属性用得不算多，但是也有场景可以用
* `provide` 是父组件提供给子组件（们）的一个注入依赖，子组件可按需引入 (`inject`)
* `inject` 来引入父组件注入的依赖

```ecmascript 6
// 父
export default {
  provide: {
    id: '123'
  }
}

// 子

export default {
  template: '<div>{{id}}</div>',
  inject: ['id']
}
```

* 实际使用中，父组件的数据命名或许会与子组件冲突，故一般可以使用 `key-valu`进行改写

```ecmascript 6
// 子
export default {
  template: '<div>{{fatherId}}</div>',
  inject: {
    fatherId: 'id'    // 注意，此时 fatherId 不是 === 'id'，而是 '123'
  }
}
```

* 也可以指定成如 `props` 类型的形式，在没有注入依赖时，设置缺省值 

```ecmascript 6
// 子
export default {
  template: '<div>{{fatherId}}</div>',
  inject: {
    fatherId: {
      from: 'id',
      default: '111'    // 当父组件没有提供 id 时，fatherId: 111
    }
  }
}
```

#### 总结

* 从上面的描述来看，`provide/inject`提供的效果跟 `props` 的作用相近（可能会有一些区别）
* 使用场景因人而异，而看看官方的文档是怎么描述的：

> provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。






