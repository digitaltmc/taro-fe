import Taro from '@tarojs/taro'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"
export const base = "http://localhost:58080/";
export const HTTP_STATUS = {
    SUCCESS: 200,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
}

  // // 获取微信登录凭证
  // export const wxLogin = async () => {
  //   try {
  //     const res = await Taro.login()
  //     return res.code
  //   } catch (error) {
  //     console.log('微信获取临时凭着失败')
  //   }
  // }
  
  // export const userLogin = async () => {
  //   try {
  //     await Taro.checkSession()
  //     // if (!Taro.getStorageSync('token')) {
  //     //   throw new Error('本地没有缓存token')
  //     // }
  //   } catch (error) {
  //     const code = await wxLogin()
  //     //TO-DO
  //     console.log('用户登录')
  //   }
  // }

  // export const login = async() => {
  //   if (Taro.getEnv() == Taro.ENV_TYPE.WEAPP){
  //       // TO-DO
  //       const userInfo = await Taro.getUserInfo()
  //       await Taro.setStorage({
  //         key: "userInfo",
  //         data: res.userInfo
  //         //data: json.third_Session
  //       })
  //       return userInfo
  //   }else if(Taro.getEnv() == Taro.ENV_TYPE.WEB){
  //       return {}
  //     //TO-DO
  //   //   Taro.getStorage({key:'userInfo'}).then(rst => {   //从缓存中获取用户信息
  //   //     this.props.setBasicInfo(rst.data)
  //   //   })
  //   }
  // }

export default {
  async withLogin() {
    if (Taro.getEnv() == Taro.ENV_TYPE.WEAPP){
        // TO-DO
        try{
          const userInfo = await Taro.getUserInfo()
          Taro.setStorage({
            key: "userInfo",
            data: userInfo.userInfo
          })
          return {name: userInfo.userInfo.nickName, avatar: userInfo.userInfo.avatarUrl}
        }catch (error) {
          Taro.navigateTo({
            url: '/pages/register/register'
          })
          return null;
        }
    }else if(Taro.getEnv() == Taro.ENV_TYPE.WEB){
      if ( !this.isLogin() ){
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }
    }
  },
  isLogin(){
    const userInfo = this.getUserInfo()
    const token = this.getToken()
    //TO-DO add token check here
    return userInfo || token
  },
  logout() {
    Taro.removeStorageSync("userInfo")
    Taro.removeStorageSync("token")
  },
  getUserInfo() {
    return Taro.getStorageSync("userInfo")
  },
  getToken() {
    return Taro.getStorageSync("token")
  },
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    // let token = getApp().globalData.token
    // if (!token) login()
    console.log('params', params)
    let contentType = 'text/plain'
    contentType = params.contentType || contentType
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, /*'token': "aa"*/ },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.navigateTo({url: '/pages/login/login'})
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
//  login() {
//     if (Taro.getEnv() == Taro.ENV_TYPE.WEAPP){
//       // TO-DO
//       Taro.getUserInfo().then(res => {
//         Taro.setStorage({
//           key: "userInfo",
//           data: res.userInfo
//           //data: json.third_Session
//         })
//         return res
//       })
//     }else if(Taro.getEnv() == Taro.ENV_TYPE.WEB){
//       //TO-DO
//     //   Taro.getStorage({key:'userInfo'}).then(rst => {   //从缓存中获取用户信息
//     //     this.props.setBasicInfo(rst.data)
//     //   })
//     }
//   }
}
