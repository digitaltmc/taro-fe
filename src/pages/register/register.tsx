import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import './register.scss'
import { AtButton, AtInput, AtToast } from 'taro-ui'
import requestWithLogin from '../../utils/requestsWithLogin'
export default class Index extends Component {
  weburl: String = "http://digitaltmc-digitaltmc1.7e14.starter-us-west-2.openshiftapps.com/digitaltmc/";
  constructor() {
    super(...arguments)
    this.state = {
      username: null,
      password: null,
      password2: null,
      email: null,
      mobile: null,
      text: null
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
    navigationBarTitleText: '注册'
  }

  componentWillMount() {  
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleInputChange(state, value) {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    this.setState({
      [state]: value,
      text: null
    });
  }

  registerHandler() {
    const { username, password, mobile, email } =  this.state
    if(username === ""||username === null){
      this.setState({
        text: "* 用户名不能为空"
      })
    }else if(this.state.password === ""||this.state.password === null){
      this.setState({
        text: "* 密码不能为空"
      })
    }else {
      this.setState({
          text: null
      });
      let person = {
        name: this.state.username,
        password: this.state.password,
        email: this.state.email,
        mobile: this.state.mobile
      }
      let query = { "query": "mutation {register(person:" + JSON.stringify(person) + ")}" }
      requestWithLogin.post('register', JSON.stringify(query))
    }
    
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
                <AtButton type='primary' open-type='getUserInfo' onGetUserInfo={this.getUserInfo}>微信注册</AtButton>
            </View>
        )
    }else if(Taro.getEnv() == Taro.ENV_TYPE.WEB){
        loginElement = (
            <View className='component-item'>
                <AtInput name='password' title='* 密码' type='password' placeholder='密码不少于6位数' value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')}/>
                <AtInput title='重复密码' type='password' placeholder='密码不少于6位数' value={this.state.password2} onChange={this.handleInputChange.bind(this, 'password2')}/>         
                <AtButton type='primary' onClick={this.registerHandler.bind(this)}>注册</AtButton>
            </View>
        )
    }
    return (
      <View className='doc-body'>
        <View className='panel'>
          <View className='panel__title'>注册</View>
          <View className='panel__content no-padding'>
            <View className='component-item'>
              <AtToast isOpened={!!this.state.text} text={this.state.text} status="error"></AtToast>
              <AtInput name='email' title='* 邮箱' type='text' placeholder='输入邮箱' value={this.state.email} onChange={this.handleInputChange.bind(this, 'email')} />
              <AtInput name='username' title='* 姓名' placeholder='姓名会显示在预定界面上' value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
              <AtInput name='mobile' title='手机' type='phone' placeholder='输入11位手机号码' value={this.state.mobile} onChange={this.handleInputChange.bind(this, 'mobile')} />            
            </View>
            {loginElement}
          </View>
        </View>
      </View>
    )
  }
}
