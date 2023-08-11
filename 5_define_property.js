/**
 * @example
 *
 * ```js
    // defineProperty
    // - 1、Object.defineProperty 介绍
    // - - 通过 Object.defineProperty 定义属性，可以增加拦截器
    let obj = {}
    Object.defineProperty(obj, 'name', {
      value: 'hello'
    })
    console.log('obj:', obj) // 打印：obj: {}

    // - - 需要增加枚举配置项-enumerable
    let obj = {}
    Object.defineProperty(obj, 'name', {
      enumerable: true,
      value: 'hello'
    })
    delete obj.name
    // - - - 无法删除 name 属性，需增加删除配置项 configurable
    console.log('obj:', obj) // obj: { name: 'hello' }

    // - - 删除属性配置项-configurable
    let obj = {}
    Object.defineProperty(obj, 'name', {
      configurable: true,
      enumerable: true,
      value: 'hello'
    })
    Object.defineProperty(obj, 'age', {
      configurable: true,
      enumerable: true,
      value: 18
    })
    // 属性 age 无法重新，需增加是否重写配置项-writable
    obj.age = 100
    delete obj.name
    console.log('obj:', obj) // obj: { age: 18 }，已删除 name 属性

    // - - 增加是否重写配置项-writable
    let obj = {}
    Object.defineProperty(obj, 'age', {
      writable: true,
      configurable: true,
      enumerable: true,
      value: 18
    })
    // 属性 age 无法重新，需增加是否重写配置项-writable
    obj.age = 100
    console.log('obj:', obj) // obj: { age: 100 }

    // - 2、对象的 setter 和 getter
    let obj = {
      other: '123',
      get name() {
        return this.other
      },
      set name(val) {
        this.other = val
      }
    }
    obj.name = 456
    console.log('obj.name:', obj.name) // obj.name: 456

    // - 3、监听对象变动 observer
    // - - 定义监听函数，命名-observer
    function observer(data) {}
    // - - 定义更新方法，命名-update
    function update() {
      console.log('更新视图');
    }
    // - - observer 函数描述
    // - - - Object.defineProperty 只能用在对象上，数组也不识别，判断类型不为对象，直接返回，类型判断-typeof
    if (typeof data !== 'object') return data
    // - - - 使用 forin 遍历参数对象 data，抽离 defineProperty 逻辑为函数 defineReactive, 参数-(data, key, data[key])
    for(let key in data) {
      defineReactive(data, key, data[key])
    }
    // - - defineReactive 函数描述
    // - - - 调用 Object.defineProperty()，定义 setter 和 getter 方法
    Object.defineProperty(data, key, {
      get() {
        return value
      },
      set(val) {
        value = val
      }
    })
    // - - - 每次调用 defineReactive 时，内部首先需要监听参数 value
    observer(value)
    // - - - 每次 setter 时，需要监听参数 val，并调用更新视图函数-update
    observer(val)
    update()

    // - - 调用监听方法
    let data = {
      name: 'kft',
      age: 18,
      address: {
        location: '昌平'
      }
    }
    observer(data)
    data.address = [1, 2, 3] // 打印：更新视图
    data.address[2] = 100 // 打印：更新视图

    // - - 问题：对于数组方法无法监听
    // - - - 解决：使用面向切面编程修改数组的系统方法，方法-push, slice, pop, sort, reverse, unshift...
    // - - - 定义数组方法集合，命名 methods, ['push', 'slice', 'sort', 'reverse', 'unshift']
    const methods = ['push', 'slice', 'sort', 'reverse', 'unshift']
    // - - - 使用 forEach 遍历 methods，参数 method
    methods.forEach(method => {
      // - - - - 保存原有方法，命名 oldMethod, Array.prototype[method]
      const oldMethod = Array.prototype[method]
      Array.prototype[method] = function() {
        // - - - - 重写原有方法，内部调用 update 方法，并调用原有 oldMethod
        update()
        oldMethod.call(this, ...arguments)
      }
    })
 * ```
 * 
 */

/**
 *
 * @param {{[key: string]: object}} data - 需要监听的对象
 * @example
 *
 * ```js
    // 调用
    let data = {
      name: 'kft',
      age: 18,
      address: {
        location: '昌平'
      }
    }
    observer(data)
    data.address = [1, 2, 3] // 打印：更新视图
    data.address[2] = 100 // 打印：更新视图
    data.hobbys.push('游戏') // 更新视图，配合切面编程修改数组自有方法
 * ```
 * 
 */
function observer(data) {
  // - - - Object.defineProperty 只能用在对象上，数组也不识别，判断类型不为对象，直接返回，类型判断-typeof
  if (typeof data !== 'object') return data
  // - - - 使用 forin 遍历参数对象 data，抽离 defineProperty 逻辑为函数 defineReactive, 参数-(data, key, data[key])
  for (let key in data) {
    defineReactive(data, key, data[key])
  }
}
/**
 *
 * @param {{[key: string]: object}} data - 需要监听的对象
 * @param {string} key - 监听对象的键值
 * @param {object} value - 监听对象键值对应的值
 */
function defineReactive(data, key, value) {
  // - - - 每次调用 defineReactive 时，内部首先需要监听参数 value
  observer(value)
  // - - - 调用 Object.defineProperty()，定义 setter 和 getter 方法
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(val) {
      // - - - 每次 setter 时，需要监听参数 val，并调用更新视图函数-update
      observer(val)
      update()
      value = val
    },
  })
}

function update() {
  console.log('更新视图')
}

const methods = ['push', 'slice', 'sort', 'reverse', 'unshift']
// - - - 使用 forEach 遍历 methods，参数 method
methods.forEach(method => {
  // - - - - 保存原有方法，命名 oldMethod, Array.prototype[method]
  const oldMethod = Array.prototype[method]
  Array.prototype[method] = function() {
    // - - - - 重写原有方法，内部调用 update 方法，并调用原有 oldMethod
    update()
    oldMethod.call(this, ...arguments)
  }
})
