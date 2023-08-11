/**
 * @example
 *
 * ```js
    // let 介绍
    // - 1、var 声明的变量（污染全局环境）
    var a = 1
    console.log(window.a) // 浏览器打印 1，node 环境无 window 报错

    // - 2、使用 var 导致变量提升的问题
    console.log(a) // undefined
    var a = 2
    console.log(b) // 报错：ReferenceError: Cannot access 'b' before initialization
    let b = b

    // - 3、var 可以被重复声明，let 可以解决重复定义的问题
    var a = 1;
    var a = 2;
    var a = 3;
    console.log('a:', a) // a: 3
    let b = 1;
    let b = 2;
    let b = 3;
    console.log('b:', b) // 报错：SyntaxError: Identifier 'b' has already been declared

    // - 4、var 作用域的问题（常见作用域-全局作用域、函数作用域）
    {
      var a = 1
    }
    console.log('a:', a) // a: 1
    {
      let b = 1
    }
    console.log('b:', b) // 报错：ReferenceError: b is not defined
    let c = 100
    {
      // 暂存死区
      // 报错：ReferenceError: Cannot access 'c' before initialization
      console.log('c:', c) 
      let c = 200
    }

    // - 5、解决 for 循环中的 i 为最后一位值的问题
    for(var i = 0; i < 10; i++){
      setTimeout(function() {
        console.log('i:', i) // 打印十次，全部为 10
      })
    }
    // - - 非 let 解决
    for(var i = 0; i < 10; i++){
      ((i) => {
        setTimeout(function() {
          console.log('i:', i) // 打印十次，分别 0-9
        })
      })(i)
    }
    // - - let 解决
    for(let i = 0; i < 10; i++){
      setTimeout(function() {
        console.log('i:', i) // 打印十次，分别 0-9
      })
    }

    // const 介绍
    // - 1、const 常量，不会变的量（地址不变即可）
    const NAME = 'kft'
    NAME = 'zs' // 报错：TypeError: Assignment to constant variable.
    const PI = { r: 3.14 }
    PI.r = 3.15
    console.log('PI.r:', PI.r) // 正常打印：PI.r: 3.15
 * ```
 * 
 */