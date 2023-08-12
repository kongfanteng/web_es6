/**
 * @example
 *
 * ```js
    // Array-数组方法
    // - 1、数组 es5/es6/es7 新增方法
    // - - es5: forEach/reduce/map/filter/some/every
    // - - es6: find/findIndex
    // - - es7: includes

    // - 2、reduce-收敛
    // - -（1）求和函数，命名 r
    let r = [1, 2, 3, 4].reduce((a, b) => {
      return a + b
    })
    console.log('r:', r) // r: 10

    // - -（2）收敛对象为对象集合
    let r = [{ price: 100, count: 1 }, { price: 200, count: 2 }, { price: 300, count: 3 }].reduce((a, b) => { return a + b.price*b.count }, 0)
    console.log('r:', r) // r: 1400

    // - -（3）reduce 用法-多个数据变成一个数据
    let keys = ['name', 'age']
    let values = ['kft', 18]
    let obj = keys.reduce((memo, current, index) => {
      memo[current] = values[index]
      return memo
    }, {})
    console.log('obj:', obj) // obj: { name: 'kft', age: 18 }

    // - -（4）compose-组合方法
    // - - - 函数嵌套调用 
    const sum = (a, b) => a + b
    const toUpper = str => str.toUpperCase()
    const add = str => `***${str}***`
    console.log("add(toUpper(sum('kft', '_front_end'))):", add(toUpper(sum('kft', '_front_end')))) // add(toUpper(sum('kft', '_front_end'))): ***KFT_FRONT_END***
    // - - - 定义组合函数 compose 解决函数嵌套调用问题
    function compose(...fns) {
      return function(...args){
        let lastFn = fns.pop()
        return fns.reduceRight((a, b) => {
          return b(a)
        }, lastFn(...args))
      } 
    }
    console.log('compose(add, toUpper, sum):', compose(add, toUpper, sum)('kft', '_front_end')) // ***KFT_FRONT_END***

    // - - - 组合函数 compose 简写
    let compose = (...fns) => (...args) => {
        let lastFn = fns.pop()
        return fns.reduceRight((a, b) => b(a), lastFn(...args))
    }
    console.log('compose(add, toUpper, sum):', compose(add, toUpper, sum)('kft', '_front_end')) // compose(add, toUpper, sum): ***KFT_FRONT_END***

    // - - - 组合函数 compose 中 reduceRight 替换成 reduce
    function compose(...fns) {
      return fns.reduce((a, b) => {
        return (...args) => {
          return a(b(...args))
        }
      })
    }
    console.log('compose(add, toUpper, sum):', compose(add, toUpper, sum)('kft', '_front_end')) // ***KFT_FRONT_END***

    // - - - 组合函数 compose（reduce 版） 简写
    let compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))
    console.log('compose(add, toUpper, sum):', compose(add, toUpper, sum)('kft', '_front_end')) // ***KFT_FRONT_END***

    // - -（5）自定义 reduce
    Array.prototype.reduce = function(callback, prev) {
      // this 指向 [1, 2, 3]
      for(let i = 0; i < this.length; i++){
        let current = this[i]
        if (prev === undefined) {
          prev = callback(this[i], this[i+1], i + 1, this)
        } else {
          prev = callback(prev, this[i], i, this)
        }
      }
      return prev
    }
    let r = [1, 2, 3].reduce((a, b, index, current) => {
      return a + b
    }, 100)
    console.log('r:', r) // r: 106

    // - 3、map-映射; filter-筛选; some-是否含有某值; every-是否都符合计算; find-找到某值; includes-包含某值;
    let mapArr = [1, 2, 3].map(item => item * 2) // 循环每一项 * 2
    console.log('mapArr:', mapArr) // mapArr: [ 2, 4, 6 ]
    let filterArr = [1, 2, 3].filter(item => item != 2) // 删除 2，返回 true 表示留下
    console.log('filterArr:', filterArr) // filterArr: [ 1, 3 ]
    let someFlag = [1, 2, 3].some(item => item === 3) // 数组有值为 3 返回 true
    console.log('someFlag:', someFlag) // someFlag: true
    let everyFlag = [1, 2, 3].every(item => item === 1) // 数组每一个值比较 1，有一个值不等 1 返回 false
    console.log('everyFlag:', everyFlag) // everyFlag: false
    let findOne = [1, 2, 3].find(item => item === 2) // 数组每一个值比较 2，有一个值判断 true，返回当前值
    console.log('findOne:', findOne) // findOne: 2
    let includeFlag = [1, 2, 3].includes(2) // 数组是否包含值 2
    console.log('includeFlag:', includeFlag) // includeFlag: true

 * ```
 * 
 */