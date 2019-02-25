import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.scss'

export default class TabBar extends Component {
  
  handleClick (e) {
    const { currentPage } = this.props
    if (e == 0 && currentPage != "index"){
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }
    if (e == 1 && currentPage != "profile"){
      Taro.redirectTo({
        url: '/pages/profile/profile'
      })
    }
  }
  render () {
    const { currentPage } = this.props
    let current = 0
    if (currentPage == "profile"){
      current = 1
    }
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '预定', iconType: 'bullet-list'},
          { title: '我的', iconType: 'user' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={current}
      />
    )
  }
}
TabBar.defaultProps = {
  currentPage: 'index'
}