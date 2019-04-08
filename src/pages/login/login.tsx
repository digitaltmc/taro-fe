import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import './login.scss'
import { AtButton, AtInput, AtToast } from 'taro-ui'
import { client,QUERY_LOGIN } from '../../utils/graphqlUtil'

export default class Index extends Component {
  weburl: String = "http://digitaltmc-digitaltmc1.7e14.starter-us-west-2.openshiftapps.com/digitaltmc/";
  constructor() {
    super(...arguments)
    this.state = {
      email: '',
      pwd: '',
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
    navigationBarTitleText: '登录'
  }

  componentWillMount() {  
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleInputChange(name, value) {
    this.setState({
      text: null
    })
    this.setState({
      [name]: value
    });
  }

  loginHandler() {
    const { email, pwd } = this.state;
    if(email === ""|| email === null){
      this.setState({
        text: "* email不能为空"
      })
    }else if(pwd === ""||pwd === null){
      this.setState({
        text: "* 密码不能为空"
      })
    } else {
      this.setState({
        text: null
      });
      client.query({
          query: QUERY_LOGIN,
          variables: {
              user: email,
              password: pwd
          }
      }).then((data)=>{
        const userInfo = data.data.login;
        if (userInfo === null) {
          this.setState({
            text: "用户名或密码不正确"
          });
        }else{
          Taro.setStorage(
              {key: "userInfo", data: userInfo}
          ).then( () => {
              Taro.navigateBack()
          })
        }
      }).catch((e) => {
        this.setState({
          text: "系统出错"
        });
      })
    }
  }
  registerHandler() {
    Taro.redirectTo({
      url: '/pages/register/register'
    })
  }
  getUserInfo(userInfo){
    if(userInfo.detail.userInfo){
      const user= {
        name: userInfo.detail.userInfo.nickName,
        avatar: userInfo.detail.userInfo.avatarUrl
      }
      Taro.setStorage(
          {key: "userInfo", data: user}
      ).then( () => {
          Taro.navigateBack()
      }) 
    }
  }

  render() {
    let loginElement = null;
    //此页面目前只有h5需要登陆, 微信目前不会访问到此页面(微信只需注册)
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
                <AtInput name='email' title='邮箱' placeholder='邮箱' value={this.state.email} onChange={this.handleInputChange.bind(this, 'email')} />
                <AtInput name='password' title='密码' type='password' placeholder='密码不少于6位数' value={this.state.pwd} onChange={this.handleInputChange.bind(this, 'pwd')} />
                <AtButton type='primary' onClick={this.loginHandler.bind(this)}>登录</AtButton>
                <AtButton type='primary' onClick={this.registerHandler}>注册</AtButton>
            </View>
        )
    }
    return (
      <View className='doc-body'>
        <View className='panel'>
          <View className='panel__title'>登录</View>
          <View className='panel__content no-padding'>
            <AtToast isOpened={!!this.state.text} text={this.state.text} status="error"></AtToast>
            {loginElement}
          </View>
        </View>
      </View>
    )
  }
}
