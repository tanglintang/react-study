import Loki from 'lokijs'

// sql 查询 ，异步操作（连接、查询、返回结果），使用 Promise 封装

// db 句柄

// 建立数据库 基本配置
export const db = new Loki('notes', {
    autoload: true,
    autoloadCallback: databaseInitializa,
    autosave: true,
    autosaveInterval: 3000,
    persistenceMethod: 'localStorage'
})

// 初始化一个表 notes (collection => table)
function databaseInitializa () {
    // 获取表名
    const notes = db.getCollection('notes')
    if (notes == null) {
        db.addCollection('notes')
    }
}

// 加载表的记录 获取数据
export function loadCollection (collection) {
    return new Promise((resolve) => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(collection) || db.addCollection(collection)
            resolve(_collection)
        })
    })
}