import Taro from '@tarojs/taro'
//import isWeChatApp from './isWechatApp.js'
export const base = "https://dt-be.herokuapp.com/";
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

export function withLogin(target, name, descriptor) {
  var oldValue = descriptor.value;
  descriptor.value = function() {
    console.log('need login o');
    //TO-DO
    let userInfo = Taro.getStorageSync('userInfo')
    console.log('get login info in withlogin function');
    if(!userInfo){
      login()
    }
    return oldValue.apply(this,[arguments,userInfo]);
  };
  return descriptor;
}

function login() {
  if (Taro.getEnv() == Taro.ENV_TYPE.WEAPP){
    // 检查微信登录状况
    Taro.checkSession().catch( e => {
      wxLogin()
    })
    Taro.getUserInfo().then( userInfo => {
      console.log('get userinfo in login');
      Taro.setStorageSync('userInfo', userInfo.userInfo)
    }).catch( e => {
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    })
  }else if(Taro.getEnv() == Taro.ENV_TYPE.WEB){
      return {}
    //TO-DO
  //   Taro.getStorage({key:'userInfo'}).then(rst => {   //从缓存中获取用户信息
  //     this.props.setBasicInfo(rst.data)
  //   })
  }
}
function wxLogin(){
  Taro.login().then(res => {
    if (res.code) {
      //发起网络请求
      Taro.request({
          url: this.weburl + "graphql",
          data: {
            "query":"{hello}"
          }
        }).then(res => {
        })
                
      // Taro.request({
      //   url: this.weburl + "auth",
      //   data: {
      //     code: res.code
      //   }
      // }).then(res => {
      //   if (res.data) {
      //     //获取到该微信号从未注册过,跳转到注册界面
      //     if (1==1){
      //       Taro.navigateTo({
      //         url: '/pages/register/register'
      //       })
      //     }
      //     else{
      //       //获取到用户凭证和用户信息 存儲 3rd_session
      //       //var json = JSON.parse(res.data.Data)
      //       Taro.setStorage({
      //         key: "third_Session",
      //         data: res.data
      //         //data: json.third_Session
      //       })
      //     }
      //   }
      // }).catch (e => {
      //   console.log('网络请求失败')
      // })
    }
  }).catch (e => {
    console.log('微信获取临时凭着失败')
  })
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
// }
