import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import './index.scss'
import BookItem from '../book-item'

export default class BookForm extends Component {
  render () {
    return (
      <View>
        {this.props.bookItems.map((singleItem) => (
          <BookItem role={singleItem.role} user={singleItem.user} onClickBooking={this.props.onClickBooking}></BookItem>
        ))}
      </View>
    )
  }
}
BookForm.defaultProps = {
  bookItems: [{role: "test", user:{userid: "test", name: "test", avatar: "test.jpg"}}]
}


