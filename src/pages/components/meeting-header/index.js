import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image } from '@tarojs/components'
import LogoImg from '../../../assets/images/logo.png'
import './index.scss'

export default class MeetingHeader extends Component {
  render() {
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
      <View className='header-content'>
        <View className='header-content__title'>{title}</View>
        <View className='header-content__desc'>{desc}</View>
        <View >
          <Image className='header-content__img' mode='widthFix' src={LogoImg} />
        </View>
      </View>
    )
  }
}

MeetingHeader.defaultProps = {
  title: '标题',
  desc: ''
}