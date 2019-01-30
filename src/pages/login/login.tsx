import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import './login.scss'

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
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  loginHandler() {
    Taro.login().then(res => {
      if (res.code) {
        //发起网络请求
        Taro.request({
          url: this.weburl + "auth",
          data: {
            code: res.code
          }
        }).then(res => {
          if (res.data) {
            //获取到用户凭证 存儲 3rd_session
            //var json = JSON.parse(res.data.Data)
            Taro.setStorage({
              key: "third_Session",
              data: res.data
              //data: json.third_Session
            })
            //getUserInfo()
          }
          else {

          }

        })
      }
    })
  }

  render() {
    return (

      <View className='doc-body'>

        <View className='panel'>
          <View className='panel__title'>注册</View>
          <View className='panel__content no-padding'>
            <View className='component-item'>
              <Input name='username' title='用户名' placeholder='邮箱' value={this.state.username} onChange={this.handleInput.bind(this, 'username')} />
              <Input name='password' title='密码' type='password' placeholder='密码不少于6位数' value={this.state.pwd} onChange={this.handleInput.bind(this, 'pwd')} />
              <Button type='primary' onClick={this.loginHandler}>登录</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
