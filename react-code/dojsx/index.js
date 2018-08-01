// 创建命名空间 React
const React = {
  createElement
};

const ReactDOM = {
  render: (vnode, container) => {
    return render(vnode, container)
  }
}

// 标签、属性、子节点
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

const element = (
  <div>
    hello
        <span>world</span>
  </div>
)
// console.log(element)

ReactDOM.render(
  <h1>Hello world
    <i>child node</i>
  </h1>,
  document.getElementById('root')
)

function render (vnode, container) {
  // console.log(vnode)
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      if (key === 'className') key = 'class' 
      dom.setAttribute(key, vnode.attrs[key])
    })
  }

  const dom = document.createElement(vnode.tag)
  vnode.children.forEach(child => render(child, dom))

  return container.appendChild(dom)
}