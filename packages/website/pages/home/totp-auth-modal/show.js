import component from './component.js'
import { render, createVNode } from 'vue'

export function show (instance, props) {
  const el = document.createElement('span')
  document.body.appendChild(el)

  const unmount = () => {
    render(null, el)
    el.remove()
  }

  const vnode = createVNode(component, {
    ...props,
    onHidden () {
      unmount()
    }
  })
  vnode.appContext = { ...instance.appContext }
  render(vnode, el)

  const { componentInstance } = vnode
  componentInstance.show()
  return componentInstance
}
