import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
// 引用时区
import 'moment/locale/zh-cn'
moment.locale('zh_CN')

class Note extends Component {

    state = {
        entity: this.props.entity,
        text: this.props.entity.text,
        // 公开？false
        open: false,
        // 更新时间 || 创建时间
        updated: this.props.entity.meta.updated || this.props.entity.meta.created,
        destroyEntity: this.props.destroyEntity
    }

    updated () {
        return moment(this.state.updated).fromNow()
        // return moment(this.state.updated).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }

    toggle () {
        // setState 函数方式
        this.setState(prevState => {
            return {
                open: !prevState.open
            }
        })
    }

    header () {
        // truncate 前后空格 限制长度
        return _.truncate(this.state.text, { length: 30 }) || '新建笔记'
    }

    words () {
        return this.state.text.length
    }

    render () {
        return (
            <div className="item">
                <div className="meta">
                    { this.updated() }
                </div>
                <div className="content">
                    <div className="header" onClick={ this.toggle.bind(this) }>
                        { this.header() }
                    </div>
                    <div className="extra">
                        { this.words() }字
                        { this.state.open && <i className="right floated trash icon" onClick={ () => this.state.destroyEntity(this.state.entity) }></i> }
                    </div>
                </div>
            </div>
        )
    }
}

export default Note