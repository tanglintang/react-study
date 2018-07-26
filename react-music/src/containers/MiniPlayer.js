import MiniPlayer from '../components/play/MiniPlayer'
import { connect } from 'react-redux'
import { changeSong } from '../redux/actions'

const mapStateToProps = (state) => ({
    currentSong: state.song,
    playSongs: state.songs
})

const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch(changeSong(song))
    }
})

// connect 将React组件连接到Redux存储, 返回一个新的，连接的组件类
// state actions => props
export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)
