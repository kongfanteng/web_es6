/**
 * @example
 *
 * ```js
    // set & map 介绍
    // - map weakMap set-集合 map-映射表
    // - 1、set 集合，不能放重复的东西，放了会覆盖掉
    let s = new Set([1, 2, 3, 4, 1, 2, 3, 4])
    console.log('s:', s) // s: Set(4) { 1, 2, 3, 4 }
    console.log('typeof s:', typeof s) // typeof s: object
    // - - 基础类型：string、number、boolean、undefined、object、symbol

    // - 2、set 集合含有 symbol.iterator，可以使用展开运算符 `...`
    let s = new Set([1, 2, 3, 4, 1, 2, 3, 4])
    let arr = [...s]
    console.log('arr:', arr) // arr: [ 1, 2, 3, 4 ]

    // - 3、set 集合方法：添加-add; 删除-delete; 遍历-foreach; 
    let s = new Set([1, 2, 3, 4, 1, 2, 3, 4])
    s.add('5')
    console.log('s:', s) // s: Set(5) { 1, 2, 3, 4, '5' }
    // 添加和删除无顺序限制
    s.delete('5')
    console.log('s:', s) // s: Set(4) { 1, 2, 3, 4 }

    // - 4、set 集合实现：并集-union; 交集-intersection; 差集-diff;
    // - -（1）求并集-union
    function union(s1, s2) {
      return [...new Set([...s1, ...s2])]
    }
    let s1 = new Set([1, 2, 3, 4, 5])
    let s2 = new Set([1, 2, 5, 6, 7])
    console.log('union:', union(s1, s2)) // union: [ 1, 2, 3, 4, 5, 6, 7 ]

    // - -（2）求交集-intersection
    function intersection(s1, s2) {
      return [...new Set(s1)].filter(function (item) {
        return new Set(s2).has(item)
      })
    }
    let s1 = new Set([1, 2, 3, 4, 5])
    let s2 = new Set([1, 2, 5, 6, 7])
    console.log('intersection:', intersection(s1, s2)) // intersection: [ 1, 2, 5 ]

    // - -（2）求差集-diff
    function diff(s1, s2) {
      return [...new Set(s1)].filter(function (item) {
        return !new Set(s2).has(item)
      })
    }
    let s1 = new Set([1, 2, 3, 4, 5])
    let s2 = new Set([1, 2, 5, 6, 7])
    console.log('diff:', diff(s1, s2)) // diff: [ 3, 4 ]

    // - 5、map 映射表，map 是有 key 值的，不能放重复的 key，后一个值会覆盖前一个值
    let m = new Map()
    m.set('name', 'kft')
    m.set('name', 'zs')
    console.log('m:', m) // m: Map(1) { 'name' => 'zs' }
    // - - map 的 key 可以为对象
    let m = new Map()
    let obj = { name: 1 }
    m.set(obj, '456')
    obj = null // 把 obj 清空，这个空间还是在的
    console.log('m:', m) // m: Map(1) { { name: 1 } => '456' }
    
    // - 6、使用 WeakMap 解决深拷贝 deepClone 循环引用问题
    // - - {@link file://./3_deep_clone.js}

 * ```
 * 
 */

/**
 * 求并集
 * @param {Set} s1 - set 集合 1
 * @param {Set} s2 - set 集合 2
 * @returns {Set} 返回两个 set 集合的并集结果
 * @example
 *
 * ```js
    // 调用
    let s1 = new Set([1, 2, 3, 4, 5])
    let s2 = new Set([1, 2, 5, 6, 7])
    console.log('union:', union(s1, s2)) // union: [ 1, 2, 3, 4, 5, 6, 7 ]
 * ```
 * 
 */
function union(s1, s2) {
  return [...new Set([...s1, ...s2])]
}

/**
 * 求交集
 * @param {Set} s1 - set 集合 1
 * @param {Set} s2 - set 集合 2
 * @returns {Set} 返回两个 set 集合的交集结果
 * @example
 *
 * ```js
    // 调用
    let s1 = new Set([1, 2, 3, 4, 5])
    let s2 = new Set([1, 2, 5, 6, 7])
    console.log('intersection:', intersection(s1, s2)) // intersection: [ 1, 2, 5 ] 
 * ```
 * 
 */
function intersection(s1, s2) {
  return [...new Set(s1)].filter(function (item) {
    return new Set(s2).has(item)
  })
}

/**
 * 求差集
 * @param {Set} s1 - set 集合 1
 * @param {Set} s2 - set 集合 2
 * @returns {Set} 返回两个 set 集合的差集结果
 * @example
 *
 * ```js
    // 调用
    let s1 = new Set([1, 2, 3, 4, 5])
    let s2 = new Set([1, 2, 5, 6, 7])
    console.log('diff:', diff(s1, s2)) // diff: [ 3, 4 ]
 * ```
 * 
 */
function diff(s1, s2) {
  return [...new Set(s1)].filter(function (item) {
    return !new Set(s2).has(item)
  })
}
