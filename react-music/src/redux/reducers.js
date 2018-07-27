// 返回状态的函数
import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

const initialState = {
    song: {},
    songs: [],
    showStatus: false
}

// reducer =》 纯函数 : 同样的输入，必定得到同样的输出
// 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
// Reducer 函数里面不能改变 State，必须返回一个全新的对象
function song (song = initialState.song, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_SONG:
            return action.song
        default:
            return song
    }
}

function songs (songs = initialState.songs, action) {
    switch (action.type) {
        case ActionTypes.SET_SONGS:
            return action.songs
        case ActionTypes.REMOVE_SONG_FROM_LIST:
            return songs.filter(song => song.id !== action.id)
        default:
            return songs
    }
}

function showStatus (showStatus = initialState.showStatus, action) {
    switch (action.type) {
        case ActionTypes.SHOW_PLAYER:
            return action.showStatus
        default:
            return showStatus
    }
}

const reducers = combineReducers({
    song, songs, showStatus
})

export default reducers
