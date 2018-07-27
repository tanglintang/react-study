import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { getAlbumInfo } from '@/api/recommend'
import { CODE_SUCCESS } from '@/api/config'
import * as AlbumModel from '@/model/album'
import * as SongModel from '@/model/song'
import MusicHeader from '@/common/header/Header'
import Loading from '@/common/loading/Loading'
import './album.styl'

class Album extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      show: true
    })
    getAlbumInfo(this.props.match.params.id).then(res => {
      console.log(res)
      if (res) {
        if (res.code === CODE_SUCCESS) {
          console.log(res.data)
          let album = AlbumModel.createAlbumByDetail(res.data)
          console.log(album)
          album.desc = res.data.desc
          let songList = res.data.list
          let songs = []
          songList.forEach(item => {
            let song = SongModel.createSong(item)
          })

          this.setState({
            album,
            songs,
            loading: false
          })
        }
      }
    })
  }

  render() {
    const album = this.state.album
    return (
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="music-album">
          <MusicHeader title="周杰伦" ref="header"></MusicHeader>
          {/* <div style={{ position: "relative" }}>
            <div ref="albumBg" className="album-img" style={{ backgroundImage: `url(${album.img})` }}>
              <div className="filter"></div>
            </div>
            <div ref="albumFixedBg" className="album-img fixed" style={{ backgroundImage: `url(${album.img})` }}>
              <div className="filter"></div>
            </div>
            <div className="play-wrapper" ref="playButtonWrapper">
              <div className="play-button" onClick={this.playAll}>
                <i className="icon-play"></i>
                <span>播放全部</span>
              </div>
            </div>
          </div> */}
          <Loading title="正在加载中..." show={this.state.loading}></Loading>
        </div>
      </CSSTransition>
    )
  }
}

export default Album
