import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import MeetingHeader from '../components/meeting-header';
import TabBar from '../components/tab-bar'
import BookForm from '../components/book-form';
import requestWithLogin from '../../utils/requestsWithLogin'
import mockData from '../../utils/mockData'
export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      meetings:[],
      currentMeeting:null,
      bookInfo: {}
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
    navigationBarTitleText: '预定会议角色'
  }

  componentWillMount() {
    let meetings = this.getMeetings();
    let currentMeeting = meetings[0];
    let bookInfo = this.getBookInfo(currentMeeting.meetingId);
    this.setState(
      { meetings: meetings,
        currentMeeting: currentMeeting,
        bookInfo: bookInfo
      }
    )
  }
  
  componentDidMount() { 
    console.log("componentDidMount")
  }

  componentWillUnmount() { }

  componentDidShow() { console.log("componentDidShow")}

  componentDidHide() { console.log("componentDidHide")}
  
  getMeetings() {
    // TO-DO
    return mockData.meetings
  }
  getBookInfo (meetingId) {
    return mockData.bookInfos[meetingId]
  }
  booking(user, role, operation) {
    let id = this.state.currentMeeting.meetingId;
    let index = mockData.bookInfos[id].roles.findIndex((value, index, arr) => {
      return value.role == role
    })
    if (operation == "book"){
      mockData.bookInfos[id].roles[index].user = user
    }else if (operation == "cancel"){
      mockData.bookInfos[id].roles[index].user = null
    } 
    let bookInfo = this.getBookInfo(id);
    this.setState({ 
        bookInfo: bookInfo
    })
  }

  onClickBooking(role, operation) {
      requestWithLogin.withLogin().then( userInfo => {
        if(userInfo)this.booking(userInfo, role, operation)
      })
  }

  onChange = e => {
    this.setState({
      currentMeeting: this.state.meetings[e.detail.value],
      bookInfo: mockData.bookInfos[this.state.meetings[e.detail.value].meetingId]
    })
  }
  render() { 
    let bookItems = this.state.bookInfo.roles;
    return (   
      <View className='page'>
        {/* S Header */}
        <MeetingHeader title='SAP Labs China Toastermaster' desc='regular meeting'></MeetingHeader>
        <View className='panel'>
          <View className='panel__title'>会议时间</View>
          <View className='panel__content'>
            <Picker mode='selector' range={this.state.meetings} rangeKey="meetingDate" onChange={this.onChange}>
            <View className='demo-list-item'>
                    <View className='demo-list-item__label'>选择会议时间</View>
                    <View className='demo-list-item__value'>{this.state.currentMeeting.meetingDate}</View>
                  </View>
            </Picker>
          </View>
          <View className='panel__title'>预定角色</View>
          <View className='panel__content'>
            <BookForm bookItems = {bookItems} onClickBooking={this.onClickBooking.bind(this)}> </BookForm>
          </View>
        </View>
        <TabBar currentPage = "index" />
      </View>
    )
  }
}
