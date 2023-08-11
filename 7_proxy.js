/**
 * @example
 *
 * ```js
    // proxy-对象代理
    // - 1、Object.defineProperty 不支持数组的更新 push，slice 等数组方法，proxy 支持数组变化就能更新视图
    let arr = [1, 2, 3]
    let proxy = new Proxy(arr, {
      set() {
        console.log(arguments) // [Arguments] { '0': [ 1, 2, 3 ], '1': '0', '2': 100, '3': [ 1, 2, 3 ] }
      },
      get() { }
    })
    proxy[0] = 100
    // - - set & get 取值与赋值
    let arr = [1, 2, 3]
    let proxy = new Proxy(arr, {
      set(target, key, value) {
        target[key] = value
      },
      get(target, key) { 
        return target[key]
      }
    })
    proxy[0] = 100
    console.log('proxy[0]:', proxy[0]) // proxy[0]: 100

    // - 2、set & get 使用方法 Reflect 进行设置 set 与获取 get
    // - - 数组变化，会先改变数组的内容，还会改变数组的长度
    // - - 不要手动操作原数组，因为数组变化时，可能调用的是 push 方法，pop 这个时候会报错
    let arr = [1, 2, 3]
    let proxy = new Proxy(arr, {
      set(target, key, value) {
        return Reflect.set(target, key, value)
      },
      get(target, key) { 
        return Reflect.get(target, key)
      }
    })
    proxy[0] = 100
    console.log('proxy[0]:', proxy[0]) // proxy[0]: 100

    // - - 定义更新函数-update '更新视图'
    function update() {
      console.log('更新视图')
    }
    // - - set 时调用更新函数 update
    set(target, key, value) {
      update()
      return Reflect.set(target, key, value)
    }
    // - - 调用 push 时，会调用 update 两次，其中有一次是数组长度改变触发，排除 key === 'length'
    set(target, key, value) {
      if (key === 'length') return true
      update()
      return Reflect.set(target, key, value)
    }
    // - - proxy 可以监控到数组的变化和对象的变化
 * ```
 * 
 */

let arr = [1, 2, 3]
let proxy = new Proxy(arr, {
  set(target, key, value) {
    if (key === 'length') return true
    update()
    return Reflect.set(target, key, value)
  },
  get(target, key) {
    return Reflect.get(target, key)
  },
})
proxy[0] = 100
proxy.push(200)
// 调用两次 update
console.log('proxy[0]:', proxy[0]) // proxy[0]: 100

function update() {
  console.log('更新视图')
}
