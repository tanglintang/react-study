export function setAttribute (dom, name, value) {
    if (name === 'className')  name = 'class'

    if (/^on\w+/.test(name)) {
        name = name.toLowerCase()
        // console.log(name)
        dom[name] = value || ''
    } else if (name == 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (const name in value) {
                dom.style[name] = typeof value[name] === 'number' ? value + 'px' : value[name]
            }
        }
    } else {
        if (value) {
            dom.setAttribute(name, value)
        } else {
            dom.removeAttribute(name, value)
        }
    }
    console.log(dom[name])
}