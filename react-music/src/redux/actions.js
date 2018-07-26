import * as ActionTypes from './actionTypes'

// Action Creator 定义一个函数来生成 Action
export function changeSong (song) {
    return {
        type: ActionTypes.CHANGE_SONG,
        song
    }
}

export function showPlayer (showStatus) {
    return {
        type: ActionTypes.SHOW_PLAYER,
        showStatus
    }
}

export function setSongs (songs) {
    return {
        type: ActionTypes.SET_SONGS,
        songs
    }
}

export function removeSong(id) {
    return {
        type: ActionTypes.REMOVE_SONG_FROM_LIST,
        id
    }
}