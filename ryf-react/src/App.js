import React, { Component } from 'react'
// 对 react ui =》 阿里的 antd 部分引用
import { Table, Pagination, Input, Row, Button, Modal, Form } from 'antd'
import 'antd/dist/antd.css'
import './App.css'

const { Search } = Input
const FormItem = Form.Item
const { confirm } = Modal

class App extends Component {

    state = {
        visible: false,
        users: [
            {
                id: '1',
                name: '胡彦斌',
                age: '32',
                address: '西湖区湖底公园1号'
            },
            {
                id: '2',
                name: '吴彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }
        ]
    }

    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, row) => {
                return (
                    <div>
                        <Button type="primary" onClick={() => { this.showModal('edit', row) }}>编辑</Button>
                        <Button type="danger" style={{ marginLeft: 10 }} onClick={ () => this.removeRow(row) }>删除</Button>
                    </div>
                )
            }
        }
    ]

    removeRow (row) {
        const that = this
        confirm({
            title: '是否要删除该用户？',
            okText: '是',
            cancelText: '否',
            onOk () {
                const _users = that.state.users.filter(data => {
                    return data.id !== row.id
                })
                that.setState({
                    users: _users
                })
            }
        })
    }

    showModal (type, row) {
        this.setState({
            visible: true,
            id: null
        }, () => {
            this.props.form.resetFields()
            if (type === 'add') return
            this.props.form.setFieldsValue({
                name: row.name,
                age: row.age,
                address: row.address
            })
            this.setState({
                id: row.id
            })
        })
    }

    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, value) => {
            const id = this.state.id
            if (!err) {
                value.id = id ? id : Date.parse(new Date())
                const _users = [...this.state.users, value]
                if (id) {
                    this.state.users.forEach((data, index) => {
                        if (data.id === id) {
                            this.state.users[index] = value
                        }
                    })
                } else {
                    this.state.users = _users
                }
                this.setState({
                    visible: false,
                })
            }
        })
      }
    
    handleCancel = (e) => {
        this.setState({
            visible: false,
        })
    }

    render () {

        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }

        return (
            <div className="App">
                <Row>
                    <Search style={{ width: 300 }}></Search>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={ () => this.showModal('add') }>添加用户</Button>
                </Row>
                <Row style={{ paddingTop: 20 }}>
                    <Table dataSource={ this.state.users } columns={ this.columns } rowKey={ row => row.id } bordered pagination={false}/>
                </Row>
                <Modal title="添加用户" visible={ this.state.visible } onOk={ this.handleOk } onCancel={ this.handleCancel }>
                    <FormItem label="用户" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your username'
                                    }
                                ]
                            })
                            ( <Input placeholder="usename" /> )
                        }
                    </FormItem>
                    <FormItem label="年龄" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('age', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your age'
                                    }
                                ]
                            })
                            ( <Input placeholder="age" /> )
                        }
                    </FormItem>
                    <FormItem label="地址" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your address'
                                    }
                                ]
                            })
                            ( <Input placeholder="address" /> )
                        }
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

// 立即执行
export default Form.create()(App)
