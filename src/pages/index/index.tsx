import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

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

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  testForm () {
    // // 跳转到目的页面，打开新页面
    // Taro.navigateTo({
    //   url: '/pages/page/path/name'
    // })

    // 跳转到目的页面，在当前页面打开
    Taro.redirectTo({
      url: '/pages/testForm/index'
    })
  }
  gotoLogin () {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <AtButton type='primary' onClick={this.gotoLogin}>测试登录</AtButton>
        <AtButton type='primary' onClick={this.testForm} >测试表单</AtButton>
      </View>
    )
  }
}
