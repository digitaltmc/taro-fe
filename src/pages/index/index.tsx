import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import MeetingHeader from '../components/meeting-header';
import TabBar from '../components/tab-bar'
import BookForm from '../components/book-form';
import requestWithLogin from '../../utils/requestsWithLogin'
import mockData from '../../utils/mockData'
import { client, QUERY_MEETING } from '../../utils/graphqlUtil'
export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      meetings: [],
      currentMeeting: null,
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
    navigationBarTitleText: '会议预订'
  }

  componentWillMount() {
    let meetings = this.getMeetings();
    let currentMeeting = meetings[0];
    let bookInfo = this.getBookInfo(currentMeeting);
    this.setState(
      {
        meetings: meetings,
        currentMeeting: currentMeeting,
        bookInfo: bookInfo
      }
    )
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getMeetings() {
    const meetingday = 2;
    const today = new Date();
    const startday = today;
    const week = today.getDay();
    if ( week <= meetingday ) {
      const dis = (meetingday - week);
      startday.setDate(today.getDate() + dis);
    } else {
      const dis = 7 - (week - meetingday)
      startday.setDate(today.getDate() + dis);
    }
    let meetings = new Array(4);
    for(let i=0; i<4; i++){
      meetings[i] = new Date();
      meetings[i].setHours(11);
      meetings[i].setMinutes(50);
      meetings[i].setSeconds(0);
      meetings[i].setDate(startday.getDate() + 7*i);
    }
    return meetings;
  }
  getBookInfo(meetingDate) {
    let bookInfos = new Array(mockData.roles.length);
    for (let i=0; i < mockData.roles.length; i++){
      bookInfos[i]["role"] = mockData.roles[i].role;
    }
    client.query({
      query: QUERY_MEETING,
      variables: {
          date: meetingDate
      }
    }).then((data)=>{
      debugger;
      const meeting = data.data.meeting;
      if (meeting !== null && meeting.agenda !== null) {
        
      }else{
        
      }
    }).catch((e) => {
      
      // this.setState({
      //   text: "系统出错"
      // });
    })
    //return mockData.bookInfos[meetingDate]
  }
  booking(user, role, operation) {
    let date = this.state.currentMeeting;
    let index = mockData.bookInfos[id].roles.findIndex((value, index, arr) => {
      return value.role == role
    })
    if (operation == "book") {
      mockData.bookInfos[id].roles[index].user = user
    } else if (operation == "cancel") {
      mockData.bookInfos[id].roles[index].user = null
    }
    let bookInfo = this.getBookInfo(id);
    this.setState({
      bookInfo: bookInfo
    })
  }

  onClickBooking(role, operation) {
    requestWithLogin.withLogin().then(userInfo => {
      if (userInfo) this.booking(userInfo, role, operation)
    })
  }

  onChange = e => {
    this.setState({
      currentMeeting: this.state.meetings[e.detail.value],
      bookInfo: mockData.bookInfos[this.state.meetings[e.detail.value].meetingId]
    })
  }
  render() {
    let bookItems = this.state.bookInfo;
    return (
      <View className='page'>
        {/* S Header */}
        <MeetingHeader title='Toastermaster 会议预订' desc=''></MeetingHeader>
        <View className='panel'>
          <View className='panel__content'>
            <Picker mode='selector' range={this.state.meetings} rangeKey="meetingDate" onChange={this.onChange}>
              <View className='demo-list-item'>
                <View className='demo-list-item__label'>会议时间</View>
                <View className='demo-list-item__value'>{this.state.currentMeeting.meetingDate}</View>
              </View>
            </Picker>
          </View>
          <View className='panel__content'>
            <BookForm bookItems={bookItems} onClickBooking={this.onClickBooking.bind(this)}> </BookForm>
          </View>
        </View>
        <TabBar currentPage="index" />
      </View>
    )
  }
}
