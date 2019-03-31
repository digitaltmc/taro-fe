import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import './profile.scss'
import { AtButton, AtInput, AtAvatar } from 'taro-ui'
import TabBar from '../components/tab-bar'
import requestWithLogin from '../../utils/requestsWithLogin'
export default class Index extends Component {
  weburl: String = "http://digitaltmc-digitaltmc1.7e14.starter-us-west-2.openshiftapps.com/digitaltmc/";
  constructor() {
    super(...arguments)
    this.state = {
      userInfo: null,
      islogin: false
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
    navigationBarTitleText: '用户中心'
  }

  componentWillMount() { 
    const userInfo = requestWithLogin.getUserInfo()
    if (userInfo){
      this.setState({
        userInfo: userInfo,
        islogin: true
      })
    }else{
      this.setState({
        islogin: false
      })
    }
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { 
    const userInfo = requestWithLogin.getUserInfo()
    if (userInfo){
      this.setState({
        userInfo: userInfo,
        islogin: true
      })
    }else{
      this.setState({
        islogin: false
      })
    }
  }

  componentDidHide() { }

  handleLogin(){
    requestWithLogin.login().then( rst => {
      this.setState({
        islogin: true
      })
    })
  }

  handleLogout(){
    requestWithLogin.logout()
    this.setState({
      islogin: false
    })
  }

  render() {
    return (
      <View className='page'>
      {this.state.islogin?
        <View className='panel'>
          <View className='avatar_panel'>
            <AtAvatar className='avatar-panel__avatar' circle size="large" image={this.props.userInfo.avatarUrl }></AtAvatar>
          </View>
          <View className='panel__title'>用户信息</View>
          <View className='panel__content'>
            <View className='component-item'>
              <AtInput name='username' title='姓名' type='text' value={this.state.userInfo.nickName} />
              <AtInput name='phone' title='手机' type='phone' value={this.state.phone} />
            </View>
          </View>
          <View className='panel__content'>
            <View className='component-item'>
            <AtButton type='primary' onClick={this.handleLogout}>登出</AtButton>
            </View>
          </View>
        </View>
        :
        <View className='panel'>
          <View className='avatar-panel'>
            <AtAvatar className='avatar-panel__avatar' circle size="large" text="登陆"></AtAvatar>
          </View>
          <View className='panel__title'>用户信息</View>
          <View className='panel__content'>
            <View className='component-item'>
              <AtButton type='primary' onClick={this.handleLogin}>登陆</AtButton>
            </View>
          </View>
        </View>
      }
       
        <TabBar currentPage = "profile" />
      </View>
    )
  }
}
