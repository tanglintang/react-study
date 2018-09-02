import React, { Component } from 'react'

class CommentInput extends Component {

  constructor (props) {
    super (props)
    this.state = {
      username: props.username,
      content: ''
    }
  }

  componentDidMount () {
    this.textarea.focus()
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleContentChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({
        username,
        content,
        createdTime: +new Date() // + 将该元素转换Number类型
      })
    }
    this.setState({
      content: ''
    })
  }

  handleUsernameBlur = (e) => {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(e.target.value)
    }
  }

  render () {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名</span>
          <div className="comment-field-input">
            <input value={ this.state.username } onChange={ this.handleUsernameChange } onBlur={ this.handleUsernameBlur } />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容</span>
          <div className="comment-field-input">
            <textarea value={ this.state.content } onChange={ this.handleContentChange } ref={ (textarea) => this.textarea = textarea }/>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={ this.handleSubmit }>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
