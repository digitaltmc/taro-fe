import Taro from '@tarojs/taro'
//import isWeChatApp from './isWechatApp.js'
export const base = "https://digitaltmc.herokuapp.com/";
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
  async login() {
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
      let userInfo = this.getUserInfo()
      if (!userInfo){
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }
      //TO-DO
    //   Taro.getStorage({key:'userInfo'}).then(rst => {   //从缓存中获取用户信息
    //     this.props.setBasicInfo(rst.data)
    //   })
    }
  },
  getUserInfo() {
    return Taro.getStorageSync("userInfo")
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
