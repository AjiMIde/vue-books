## Command

#### Installation
```bash
npm install -g @vue/cli
vue create my-project
```

#### Usage
```bash
vue <command> [option] 命令基础用法
vue <command> --help 查看某个命令的基础用法

* 命令
create [options] <app-name>      
invoke <plugin> [pluginOptions]  从已存在的项目中调用一个可用插件
inspect [options] [paths...]     检查 webpack config 
serve [options] [entry]          serve a .js or .vue file in development mode with zero config
build [options] [entry]          build a .js or .vue file in production mode with zero config
init <template> <app-name>       通过远程模板生成一个项目 ，老接口
```


#### Create project
```bash
  -p, --preset <presetName>       使用预设，从而跳过提示
  -d, --default                   使用默认预计，从而跳过提示
  -i, --inlinePreset <json>       使用 Json 字符串来跳过提示
  -m, --packageManager <command>  使用指定的 npm client 当安装依赖时
  -r, --registry <url>            使用指定的 npm registry 当安装依赖时
  -f, --force                     覆盖当前目录，当目录已经存在时
  -h, --help                      output usage information
```

#### Preset 预设 
* 当你选择了一些设置时，可以将其保存起来，以便重复使用
* 可通过编辑 .vuerc 来完成。preset 由 JSON 格式形成
```json
{
  "useConfigFiles": true,
  "router": true,
  "vuex": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": ["save", "commit"]
    }
  }
```

* 插件生成器使用预设数据生成相应的项目文件。
* 除上述字段外，还可以为集成工具添加其他配置
```json
{
  "useConfigFiles": true,
  "plugins": {...},
  "configs": {
    "vue": {...},
    "postcss": {...},
    "eslintConfig": {...},
    "jest": {...}
  }
}
```

* 额外的配置顶会被 package.json 或对应的 config.js 文件合并进去，取决于 userConfigFiles 的值。
* 如当 "useConfigFiles": true, 则 `configs.vue` 会被合并到 `vue.config.js`

#### 预设插件版本
* 如配置插件的版本号。
* 这不是必须要做的，推荐的是，不做，让 vue-cli 自动选择最新的版本
```json
{
  "plugins": {
    "@vue/cli-plugin-eslint": {
      "version": "^3.0.0",
      // ... other options for this plugin
    }
  }
}
```

#### Remote Presets
* 在 git 上分享你的 preset 让别人使用（仓库中须包含 preset.json）
```bash
vue create --preset username/repo my-project

## GitLab and BitBucket are also supported. Make sure to use the --clone option if fetching from private repos:

vue create --preset gitlab:username/repo --clone my-project
vue create --preset bitbucket:username/repo --clone my-project
```


#### Zero-config Prototyping 0 配置原型
* 可快速地使用 `vue serve/vue build`命令来运行一个 vue 文件，但需要一个额外的插件
* 缺点是依赖全局的依赖文件(不同机器上)。因此只在快速原型上使用？
```bash
npm install -g @vue/cli-service-global

# vue serve
Usage: serve [options] [entry]
serve a .js or .vue file in development mode with zero config

Options:

  -o, --open  Open browser
  -h, --help  output usage information
```

* 所有你需要的，只是一个 `vue` 文件 
```bash
echo '<template><h1>Hello!</h1></template>' > App.vue
vue serve
```
* `vue serve` 使用与 `vue create` 创建项目的相同的配置(webpack/babel/postcss/eslint)。
* 它会在当前目录自动找到入口，可能会是main.js, index.js, App.vue 或 app.vue。也可自由指定：
```bash
vue serve MyComponent.vue
```
* 需要的话，可根据配置文件提供 index.html/package.json/安装包/本地依赖/配置好的babel/postcss/eslint

```bash
vue build
Usage: build [options] [entry]
build a .js or .vue file in production mode with zero config

Options:
  -t, --target <target>  Build target (app | lib | wc | wc-async, default: app)
  -n, --name <name>      name for lib or web-component (default: entry filename)
  -d, --dest <dir>       output directory (default: dist)
  -h, --help             output usage information
```
* 亦可将目标文件使用`vue build`编译成可部署的生产文件

```bash
vue build MyComponent.vue
```
`vue build` 提供了将 component 编译成 library 或 web component 功能，详看文档


#### Installing Plugins in an Existing Project
每一个带有生成器的 CLI 插件，和一个运行
* 每个 CLI 插件都附带一个生成器（创建文件）和一个运行时插件（可调整核心webpack配置并注入命令）
* 当你使用 `vue create` 创建项目时，一些插件会根据你的功能选择而被预先安装
* 如果你要在一起已创建的 `project` 文件中添加插件，可使用 `vue add`
* 建议在运行 `vue add` 之前提交你的项目状态，因为该命令会调用插件生成器并可能对文件造成影响 
```bash
vue add @vue/eslint  // 相当于 vue add @vue/cli-plugin-eslint
```

* 如果不加 `@vue` 前缀，则会下载安装第三方插件，如：
```bash
# installs and invokes vue-cli-plugin-apollo
vue add apollo
```

* 也可以指定其他后缀，如
```bash
vue add @foo/bar
```

* 当然，亦可传参
```bash
vue add @vue/eslint --config airbnb --lintOn save
```

* 如果插件已经安装好了，你可跳过安装过程，直接使用 `vue invoke` 调用生成器，参数同 `vue add`


#### 检查 webpack config
* 可使用 `vue inspect` 检查 `vue CLI`中的 `webpack config`，可看官方文档得更多


#### 使用 `vue.cli@2x` 的模板
* `vue-cli`使用着同一个库，如果想使用之前的 `vue init` 功能，可安装全局的
```bash
npm install -g @vue/cli-init
# vue init now works exactly the same as vue-cli@2.x
vue init webpack my-project
```


