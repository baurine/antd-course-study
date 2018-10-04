import React from 'react'
import { Table, Modal, Button, Form, Input } from 'antd'
import { connect } from 'dva'
import SampleChart from '../../components/SampleChart';

const FormItem = Form.Item

function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList']
  }
}

class List extends React.Component {
  columns = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'desc'
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>
    }
  ]

  state = {
    modalVisible: false,
    statisticVisible: false
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList'
    })
  }

  showModal = () => {
    this.setState({modalVisible: true})
  }

  handleCancel = () => {
    this.setState({modalVisible: false})
  }

  handleOk = () => {
    const { dispatch, form: { validateFields }} = this.props
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'cards/addOne',
          payload: values
        })
        this.setState({modalVisible: false})
      }
    })
  }

  showStatistic = () => {
    this.setState({statisticVisible: true})
  }

  hideStatistic = () => {
    this.setState({statisticVisible: false})
  }

  render() {
    const { cardsList, cardsLoading, form: { getFieldDecorator } } = this.props
    const { modalVisible, statisticVisible } = this.state

    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={cardsList}
          loading={cardsLoading}
          rowKey="name"/>
        <Button onClick={this.showModal}>新建</Button>
        <Button onClick={this.showStatistic}>图表</Button>
        <Modal title='新建记录'
               visible={modalVisible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}>
          <Form>
            <FormItem label="名称">
              {
                getFieldDecorator('name', {rules: [{required: true}]})(<Input/>)
              }
            </FormItem>
            <FormItem label="描述">
              {
                getFieldDecorator('desc')(<Input/>)
              }
            </FormItem>
            <FormItem label="链接">
              {
                getFieldDecorator('url', {rules: [{type: 'url'}]})(<Input/>)
              }
            </FormItem>
          </Form>
        </Modal>
        <Modal visible={statisticVisible} onCancel={this.hideStatistic}>
          <SampleChart/>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Form.create()(List))
