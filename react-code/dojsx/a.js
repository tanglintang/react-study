'use strict';

// 创建命名空间 React
var React = {
  createElement: createElement
};

var ReactDOM = {
  render: function render(vnode, container) {
    return _render(vnode, container);
  }

  // 标签、属性、子节点
};function createElement(tag, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

var element = React.createElement(
  'div',
  null,
  'hello',
  React.createElement(
    'span',
    null,
    'world'
  )
);
// console.log(element)

ReactDOM.render(React.createElement(
  'h1',
  null,
  'Hello world',
  React.createElement(
    'i',
    null,
    'child node'
  )
), document.getElementById('root'));

function _render(vnode, container) {
  // console.log(vnode)
  if (typeof vnode === 'string') {
    var textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(function (key) {
      if (key === 'className') key = 'class';
      dom.setAttribute(key, vnode.attrs[key]);
    });
  }

  var dom = document.createElement(vnode.tag);
  vnode.children.forEach(function (child) {
    return _render(child, dom);
  });

  return container.appendChild(dom);
}
