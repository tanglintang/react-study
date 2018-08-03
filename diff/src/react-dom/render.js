/**
 * @param {vnode 虚拟 DOM} 
 * @return { 返回真实 DOM }
 */
import { setAttribute } from './dom.js'
import Component from '../react/component.js';

function _render (vnode) {
  // 1. 递归 将节点 转为 DOM， 子节点递归  出口是文本节点

  // 2. 节点类型 三种：
      // 文本节点 createTextNode()
      // 标签节点 createElement() 设置 attributes、children =》递归 _render()
      // component 内部实现 render() 方法 、 返回一段 jsx 需要实例化这个组件 获取 jsx和虚拟DOM 然后 render() 递归

  // 换行。。
  if (vnode === undefined || vnode === null || typeof vnode ==='boolean') {
    vnode = ''
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode)
    console.log(vnode)
  }

  // 文本节点
  if (typeof vnode === 'string') {
    // console.log(vnode)
    let textNode = document.createTextNode(vnode)
    console.log(textNode)
    return textNode
  }

  // 组件 不是正常标签 vnode.tag = function Counter() {}
  if (typeof vnode.tag === 'function') {
    // console.log(vnode)
    // return document.createTextNode('component')
    const component = createComponent(vnode.tag, vnode.attrs)
    setComponentProps(component, vnode.attrs)
    return component.base
  }

  // 标签
  const dom = document.createElement(vnode.tag)
  // console.log(dom)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      setAttribute(dom, key, value)
    })
  }

  // 递归子节点
  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom))
  }

  return dom

}

function createComponent(component, props) {
  // console.log(component) // transfrom 预编译出来的 function Counter()
  let inst
  if (component.prototype && component.prototype.render) {
    inst = new component(props)
  } else {
    inst = new Component(props)
    inst.constructor = component
    inst.render = function () {
      return this.constructor(props)
    }
  }
  // console.log(inst)  // js 对象形式
  return inst
}

function setComponentProps (component, props) {
  component.props = props
  renderComponent(component)
}

export function renderComponent (component) {
  // 将 component 里的 jsx 转为 DOM，还会在 setState 时调用
  let base  // jsx 对应的 DOM
  const renderer = component.render()  // component 的 jsx
  base = _render(renderer)
  // 非 第一次渲染
  if (component.base && component.base.parentNode) {
    // 旧节点 的父节点 替换掉
    component.base.parentNode.replaceChild(base, component.base)
  }
  component.base = base
}

export function render(vnode, container) {
  // console.log(vnode, container)
  return container.appendChild(_render(vnode))
}
