export default class Observer {
  constructor (value) {
    this.value = value
    this.walk(value)
  }

  walk (value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }

  convert(key, val) {
    defineReactive(this.value, key, val)
  }
}

export function defineReactive (obj, key, val) {
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      return val
    },
    set: newVal => {
      childOb = objserve(newVal)
    }
  })
}

export function observe (value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}

