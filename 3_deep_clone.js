/**
 * 深拷贝
 * @param {object} obj - 需要深拷贝的对象
 * @returns {void} 无返回值
 * @example
 *
 * ```js
    // 深拷贝
    // - 原理：递归拷贝，一层一层的拷贝
    // - 类型判断：typeof/instanceof/Object.prototype.toString.call/constructor
    // - 1、判断参数 {@link obj} 是 null 还是 undefined，停止拷贝，直接返回
    if (obj == null) return obj
    // - 2、非对象不拷贝：typeof obj !== 'object'，时间对象和正则对象不拷贝：Date/RegExp/
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== 'object') return obj
    // - 3、参数 {@link obj} 为对象或数组，获取参数 {@link obj} 的构造函数，new 出实例，命名-{@link cloneObj}，使用 forin 遍历赋值，返回实例 {@link cloneObj}
    const cloneObj = new obj.constructor
    for (let key in obj) {
      cloneObj[key] = obj[key]
    }
    return cloneObj
    // - 4、实现深拷贝-递归调用深拷贝函数 {@link deepClone}
    cloneObj[key] = deepClone(obj[key])
    // - 5、赋值通过 hasOwnProperty 判断为本对象属性继续执行
    if (obj.hasOwnProperty(key)){
      cloneObj[key] = deepClone(obj[key])
    }
    // - - 调试
    let obj = { age: { count: 18 } }
    let newObj = deepClone(obj)
    obj.age.count = 100
    console.log('newObj:', newObj) // newObj: { age: { count: 18 } }

    // - - 问题：
    // - - - 会有循环引用问题
    let obj = { age: { count: 18 } }
    obj.xx = obj
    deepClone(obj) // 报错：RangeError: Maximum call stack size exceeded
    // - - 解决：
    // - - - 通过 weakMap 判断为循环引用的对象，直接返回
    
    // - 6、set & map 介绍-{@link file://./4_set_map.js}

    // - 7、使用 WeakMap 解决深拷贝 deepClone 循环引用问题
    // - - 深拷贝函数 {@link deepClone} 定义第二个参数 hash, 默认值-new WeakMap();
    function deepClone(obj, hash = new WeakMap())
    // - - 递归调用处传入 {@link hash}
    cloneObj[key] = deepClone(obj[key], hash)
    // - - 每次遍历克隆对象 {@link cloneObj} 前，把克隆对象放到 hash 中，key 为 {@link obj}
    hash.set(obj, cloneObj)
    // - - 在定义克隆对象 {@link cloneObj} 前，判断 hash 中是否存在 key 键为 obj，存在直接返回对应值
    if (hash.has(obj)) return hash.get(obj)

    // - 8、调用 deepClone
    let obj = { age: { count: 18 } }
    obj.xx = obj // 循环引用
    const newObj = deepClone(obj)
    obj.age.count = 200 // 深层属性修改
    console.log('newObj:', newObj) // newObj: <ref *1> { age: { count: 18 }, xx: [Circular *1] }
 * ```
 * 
 */
function deepClone(obj, hash = new WeakMap()) {
  // - - 深拷贝函数 {@link deepClone} 定义第二个参数 hash, 默认值-new WeakMap();

  // - 1、判断参数 {@link obj} 是 null 还是 undefined，停止拷贝，直接返回
  if (obj == null) return obj
  // - 2、非对象不拷贝：typeof obj !== 'object'，时间对象和正则对象不拷贝：Date/RegExp/
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  // - - 在定义克隆对象 {@link cloneObj} 前，判断 hash 中是否存在 key 键为 obj，存在直接返回对应值
  if (hash.has(obj)) return hash.get(obj)
  // - 3、参数 {@link obj} 为对象或数组，获取参数 {@link obj} 的构造函数，new 出实例，命名-{@link cloneObj}，使用 forin 遍历赋值
  const cloneObj = new obj.constructor()
  // - - 每次遍历克隆对象 {@link cloneObj} 前，把克隆对象放到 hash 中，key 为 {@link obj}
  hash.set(obj, cloneObj)
  for (let key in obj) {
    // - 5、赋值通过 hasOwnProperty 判断为本对象属性继续执行
    if (obj.hasOwnProperty(key)) {
      // - 4、实现深拷贝-递归调用深拷贝函数 {@link deepClone}
      // - - 递归调用处传入 {@link hash}
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
