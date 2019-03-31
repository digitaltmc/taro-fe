import Taro from '@tarojs/taro'
import { Form, Input, Button } from '@tarojs/components'

export default class Index extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }
  render() {
    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        <Input
          name='value'
          title='文本'
          type='text'
          placeholder='单行文本'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <Button formType='submit'>提交</Button>
        <Button formType='reset'>重置</Button>
      </Form>
    )
  }
}
