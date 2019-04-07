import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import './register.scss'
import { AtButton, AtInput, AtToast } from 'taro-ui'
import { client,MUTATION_REGISTER } from '../../utils/graphqlUtil'
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
    this.setState({
      [state]: value,
      text: null
    });
  }

  registerHandler() {
    const { username, password, password2, mobile, email } =  this.state
    if(username === ""||username === null){
      this.setState({
        text: "* 用户名不能为空"
      })
    }else if(password === ""||password === null){
      this.setState({
        text: "* 密码不能为空"
      })
    }else if(email === ""||email === null){
      this.setState({
        text: "* email不能为空"
      })
    }else if(password !== password2 ){
      this.setState({
        text: "两次密码不一致"
      })
    }else {
      this.setState({
        text: null
      });
      client.mutate({
        mutation: MUTATION_REGISTER,
        variables: {
            name: username,
            password: password,
            email: email,
            mobile: mobile
        }
      }).then((data)=>{
        const userid = data.data.register;
        if (userid === null) {
          this.setState({
            text: "该用户已注册"
          });
        }else{
          Taro.setStorage(
              {key: "userInfo", data: {'userid': userid}}
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
