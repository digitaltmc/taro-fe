import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'

import './index.scss'

export default class MeetingHeader extends Component {
  render () {
    const { title, desc, /*img*/ } = this.props
    // if (img){
    //   let imgURL = require(img)
    //   return (
    //       <View className='img-header'>
    //         <img src={require(this.props.img)} />
    //         {this.props.img}
    //       </View>
    //   )
    // }
    return (
        <View className='doc-header'>
          <View className='doc-header__title'>{title}</View>
          <View className='doc-header__desc'>{desc}</View>
        </View>
    )
  }
}

MeetingHeader.defaultProps = {
  title: '标题',
  desc: '',
  //img: null
}