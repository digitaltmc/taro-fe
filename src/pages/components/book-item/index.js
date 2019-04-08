import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import './index.scss'

export default class BookItem extends Component {
  handleBooking = e => {
    this.props.onClickBooking(this.props.role, "book" )
  }
  handleCancel = e =>{
    this.props.onClickBooking(this.props.role, "cancel" )
  }
  
  render () {
    let currentUser = Taro.getStorageSync('userInfo')
    let bookElement = null
    if (!this.props.user) {
      bookElement = (<AtButton type='primary' onClick={this.handleBooking}>预定</AtButton>)
    }
    //TO-DO 需要根据后端如何返回结果来调整判断是否为当前用户
    else if (currentUser != null && currentUser != undefined && currentUser.id == this.props.user.id ){
      bookElement = (<AtButton type='primary' onClick={this.handleCancel} >取消</AtButton>)
    }
    else{
      bookElement = (<AtButton type='primary' disabled>预定</AtButton>)
    }
    return (
      <View className='at-row'>
        <View className='at-col at-col-3 role'>{this.props.role}</View>
        <View className='at-col at-col-2'>
        { this.props.user?<AtAvatar circle size="small" image={this.props.user.avatar}></AtAvatar>:""}
        </View>
        <View className='at-col at-col-4'>{this.props.user? this.props.user.name: "暂无预定"}</View> 
        <View className='at-col at-col-3'>{bookElement}</View>
      </View>
    )
  }
}

BookItem.defaultProps = {
  role: "TMD",
  user: null
}


