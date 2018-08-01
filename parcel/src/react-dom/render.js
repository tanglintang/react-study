import { setAttribute } from './dom'

function _render(vnode) {
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)
        return textNode
    }

    if (typeof vnode.tag === 'function') {
        // 在jsx内 标签  <Counter />
        // 普通标签就会来到 _render
        // 是 function 
        // 实例化， 在生命周期内 调用render 方法
        // console.log(vnode)
        const  component = createComponent(vnode.tag, vnode.attrs)
        setComponentProps(component, vnode.attrs)
        return component.base
    }

    const dom = document.createElement(vnode.tag)

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key]
            setAttribute(dom, key, value)
        })
    }

    vnode.children.forEach(child => render(child, dom))

    return dom
}

function createComponent (component, props) {
    let inst
    if (component.prototype && component.prototype.render) {
        inst = new component(props)
    }
    return inst
}

function setComponentProps (component, props) {
    renderComponent(component)
}

export function renderComponent (component) {
    let base
    const renderer = component.render()
    base = _render(renderer)
    component.base = base
}

export function render(vnode, container) {
    return container.appendChild(_render(vnode))
}
