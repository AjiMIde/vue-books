// 下面封装了一个通用的 new Promise + wx.request方法
// 进行一些增删，就可以形成一个符合不同业务的 http 请求统一方法
//
export default {
  /**
   * @param data  object 请求参数
   * @param requestMethod 请求方法，常用 get/post，此外还有更多，小程序默认大写，这里大小写都行
   * @param needLoading
   * @returns {Promise<any>}
   * @private
   */
  _http (data, requestMethod, needLoading = true, needToastError = true, needShowNetworkError = true) {
    // 显示 loading，根据不同业务决定要不要显示
    // 如果你的业务是频率较少的 loading，建议 needLoading = false
    if (needLoading) {
      wx.showLoading({ title: '加载中...' }) // 这里只show 不hide，是因为如果 hide 了，后面如果有错误弹窗会出不来
    }

    // requestMethod 处理一下
    requestMethod = requestMethod.toLocaleUpperCase()

    // 签名，有些业务可能不需要，而有些业务可能更复杂
    const sign = this._getMD5(data)

    // 一般来讲，url 可能会有多个
    // 这个时间，要根据一些 judgement 来判断用哪些 url ，
    // 比如说，下单的，看订单的列表的, 用户中心的
    let url = ''
    let judgement = '1'
    let URL = _getUrl()
    if (judgement === 0) {
      url = URL_A + requestMethod
    } else if (judgement === 1) { // 获取运营商信息
      url = URL_B + requestMethod
    } else if (judgement === 2) { // 获取导航树的信息
      url = URL_C + requestMethod
    }

    // 这里还可以根据业务的不同、url的不同再处理一下，大部分情况是不用的
    const method = requestMethod

    // 返回一个 promise
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: method,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
          // 'content-type': 'application/json'
        },
        // 这里再进行封装一下，大部分请求，是需要一个
        data: Object.assign(data, {
          sign: sign
        }),
        success (res) {
          // 这里排除一下
          needLoading ? wx.hideLoading() : ''

          // 这里进行 resolve/reject 判断
          // res.data => 返回值
          // res.statusCode =>　http 状态码
          // res.header => response 头部
          const rep = res.data
          if (rep.success === true || rep.datas.length > 0) {
            resolve(res.data.datas, res)
          } else {
            // 这里再做一层判断，如果后台没有返回错误信息，那就只能使用通用错误信息
            let returnMsg = rep.returnMessage || '操作失败，请稍候重试。'
            if (needToastError) {
              wx.showToast({
                title: returnMsg,
                icon: 'none',
                duration: 2000
              })
            }
            reject(returnMsg, res)
          }
        },
        fail (error) {
          needLoading ? wx.hideLoading() : ''
          // 这里
          if (needShowNetworkError) {
            wx.showToast({
              title: '请求失败，请检查网络环境或稍候重试',
              icon: 'none',
              duration: 2000
            })
          }
          reject('请求失败，请检查网络环境或稍候重试', error)
        }
      })
    })
  },
}
