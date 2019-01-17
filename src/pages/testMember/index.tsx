import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
// import withLogin from '../../utils/withLogin.js'

// @withLogin()
export default class TestMember extends Component {

  config: Config = {
    navigationBarTitleText: '登录才能看'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>恭喜你登录了</Text>
      </View>
    )
  }
}
