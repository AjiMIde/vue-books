## vue cmd 命令在 windows cmd/powershell 中使用的问题

* 一般来讲，安装了`vue-cli3`之后，就能在`cmd`中使用`vue-cli`的相关命令
* 但有时在`windows powershell`中无法正常使用（这给在当使用右键--window powershell命令时带来不便）
* keys: 无法将“vue”项识别为 cmdlet、函数、脚本文件或可运行程序的名称' 或 'vue不是内部或外部命令'
* 解决方法

```bash
# 使用`Everything`查找`vue.cmd`文件在`windows`中的位置
# 亦可在`window盘--users--AppData/Local/Locallow-`等文件中查找
# 将其路径添加到`环境变量--系统变量path/用户变量path`中即可
```
