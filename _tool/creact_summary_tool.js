const fse = require('fs-extra')
const fs = require('fs')
const exec = require('child_process').exec

const path = `../Blog/2.build-vue-project-from-0-2022.md`

/**
 * 为一个 md 创建一个 目录
 *
 */
fs.readFile(path, (err, data) => {
  if (err) return console.error(err)
  const content = data.toString()
  const contentAry = content.split('\r\n')
  let j = 0
  let newC = ''
  contentAry.forEach((row, i) => {
    if (row.includes('##')) {
      let newRow = row.replace(/##\s/g, '')
      newRow = '* [' + j + '.' + newRow + '](#' + newRow + ')'
      console.log(newRow)
      j++
    }
  })
  // copyToClipboard(newC)
})


// 简单的复制文本到剪切板的函数，参数依次是文本，成功回调
function copyToClipboard (text, func = () => {}) {
  // 这种复制出来后最后有个换行符，不合要求
  // 'echo ' + text + ' | clip';
  // 这种复制出来最后有个空格，还将就
  // '<nul (set/p z=' + text + ') | clip';

  // 这种方式最完美，但最麻烦
  // 会生成一个批处理文件，一个文本文件，以批处理文件复制文件文件的内容，后又需要删除两个文件。
  let temp = 'txt_' + Date.now() + '.txt';

  let str = `@echo off
    <nul (set/p z=${text}) > ${temp} 
    clip < ${temp} 
    del ${temp}
`
// 这句加入批处理，会导致报错，虽然能执行(复制)成功。原因应该是，del批处理文件自身的时候，nodejs还在使用他
// 'del "%~f0"';
  let cmdFile = 'ttzkxlcjv.cmd';
  fs.writeFile(cmdFile, str, {}, () => {});
  exec(cmdFile, function (err, stdout, stderr) {
    if (err || stderr) return console.log(err, stdout, stderr);
    // 用nodejs删除文件
    fs.unlink(cmdFile, () => {});
    func(text, stdout);
  })
}
