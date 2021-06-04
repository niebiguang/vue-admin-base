/*
 * @Author: niebiguang
 * @Date: 2020-10-14 14:55:04
 * @LastEditTime: 2020-11-12 15:43:09
 * @LastEditors: niebiguang
 * @Description: 
 * @FilePath: \gouxiao-manage-fd\src\config\index.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'In Cash',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   * 如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   * 用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  downUrl: 'http://dev.51gouxiao.com/',
  baseUrl: {
    // dev: 'http://test.debt.yishengwangluokeji.com',
    dev: 'http://dev.51gouxiao.com/',
    pro: ''
  },
  baseWsUrl: {
    dev: 'ws://dev.51gouxiao.com/',
    // dev: 'http://192.168.111.39:8081/',
    pro: 'wss://console-in-cash.51veryrich.com'
  },
  downloadUrl: {
    dev: 'http://dev.51gouxiao.com/',
    // dev: 'http://192.168.111.39:8081/',
    pro: ''
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'index',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }

}
