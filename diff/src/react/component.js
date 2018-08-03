import { renderComponent } from "../react-dom/render";

class Component {
  constructor(props = {}) {
    this.isReactComponent = true
    this.state = {}
    this.props = props
  }

  setState(stateChange) {
    // console.log(stateChange)
    Object.assign(this.state, stateChange)
    // 重新渲染
    console.log(this)
    renderComponent(this)
  }
}

export default Component
