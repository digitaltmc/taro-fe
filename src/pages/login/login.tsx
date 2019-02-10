import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import './login.scss'
import { AtButton } from 'taro-ui'
export default class Index extends Component {
  weburl: String = "http://digitaltmc-digitaltmc1.7e14.starter-us-west-2.openshiftapps.com/digitaltmc/";
  constructor() {
    super(...arguments)
    this.state = {
      username: '',
      pwd: ''
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录'
  }

  componentWillMount() {  
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  loginHandler() {
    // //TO-DO 根据后端内容需要调整
    // Taro.login().then(res => {
    //   if (res.code) {
    //     //发起网络请求
    //     Taro.request({
    //       url: this.weburl + "auth",
    //       data: {
    //         code: res.code
    //       }
    //     }).then(res => {
    //       if (res.data) {
    //         //获取到用户凭证 存儲 3rd_session
    //         //var json = JSON.parse(res.data.Data)
    //         Taro.setStorage({
    //           key: "third_Session",
    //           data: res.data
    //           //data: json.third_Session
    //         })
    //         //getUserInfo()
    //       }
    //     })
    //   }
    // })
  }
  getUserInfo(userInfo){
    if(userInfo.detail.userInfo){
        Taro.setStorage(
            {key: "userInfo", data: userInfo.detail.userInfo}
        ).then( () => {
            Taro.navigateBack()
        }) 
    }
  }

  render() {
    let loginElement = null;
    if (Taro.getEnv() == Taro.ENV_TYPE.WEAPP){
        loginElement = (
            <View className='component-item'>
                <Text className='component-item__text'>申请获取你的公开信息（昵称、头像等）</Text>
                <AtButton type='primary' open-type='getUserInfo' onGetUserInfo={this.getUserInfo}>微信登录</AtButton>
            </View>
        )
    }else if(Taro.getEnv() == Taro.ENV_TYPE.WEB){
        loginElement = (
            <View className='component-item'>
                <Input name='username' title='用户名' placeholder='邮箱' value={this.state.username} onChange={this.handleInput.bind(this, 'username')} />
                <Input name='password' title='密码' type='password' placeholder='密码不少于6位数' value={this.state.pwd} onChange={this.handleInput.bind(this, 'pwd')} />
                <AtButton type='primary' onClick={this.loginHandler}>登录</AtButton>
            </View>
        )
    }
    return (
      <View className='doc-body'>
        <View className='panel'>
          <View className='panel__title'>登录</View>
          <View className='panel__content no-padding'>
            {loginElement}
          </View>
        </View>
      </View>
    )
  }
}
