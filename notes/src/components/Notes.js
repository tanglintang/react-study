import React, { Component } from 'react'
import Note from './Note'
import { db, loadCollection } from '../database'

class Notes extends Component {
    constructor (props) {
        // 外界 props
        // super 执行父类 constructor => 即 Component
        super(props)
        this.getInitialData()
    }

    getInitialData () {
        loadCollection('notes')
            .then(collection => {
                // 插入数据
                // collection.insert([
                //     {
                //         text: 'hello ~ '
                //     },
                //     {
                //         text: 'halo ~ '
                //     }
                // ])
                // db.saveDatabase()

                // find 查找所有数据 根据 id($loki) 倒序 排序
                const entities = collection.chain().find().simplesort('$loki', 'isdesc').data()

                this.setState({
                    entities
                })
            })
    }

    // state => vue data
    state = {
        entities: []
    }

    createEntry () {
        loadCollection('notes').then(collection => {
            const entity = collection.insert({
                text: 'ssr'
            })
            db.saveDatabase()
            this.setState((prevState) => {
                const _entities = prevState.entities
                _entities.unshift(entity)
                return {
                    entities: _entities
                }
            })
        })        
    }

    destroyEntity (entity) {
        const _entities = this.state.entities.filter((_entity) => {
            // $loki 为数据库自动增长的 id
            return _entity.$loki !== entity.$loki
        })
        this.setState({
            entities: _entities
        })

        // 更新数据库
        loadCollection('notes')
            .then((collection)=> {
                collection.remove(entity)
                db.saveDatabase()
            })
    }

    render() {
        const entities = this.state.entities
        const noteItems = entities.map((entity) => 
            // <li key={index}>{entity}</li>
            <Note key={entity.$loki} entity={entity} destroyEntity={ this.destroyEntity.bind(this) } />
        )
        // 当你在map()方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的key。

        return (
            // react 独有的 jsx 模板引擎
            // 在 js 直接写 html 
            // className ：react 解析模板， html node 会编译称为 js ，class 是关键字
            <div className="ui container notes">
                <h4 className="ui horizontal divider header">
                    <i className="paw icon"></i>
                    Notes App _ React.js
                </h4>
                <button className="ui right floated basic violet button" onClick={ this.createEntry.bind(this) }>
                    添加笔记
                </button>
                <div className="ui divided items">
                    { noteItems }
                    { !entities.length && <span className="ui small disabled header">还没有笔记，请先添加</span> }
                </div>
            </div>
        )
    }
}

export default Notes
