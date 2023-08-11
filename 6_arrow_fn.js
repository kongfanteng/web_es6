/**
 * @example
 *
 * ```js
    // 箭头函数-arrowFn
    // - 1、箭头，没有 this，没有 arguments
    function a() {}
    let a = function (x, y) {
      return { total: x + y }
    }
    a(1, 2)
    let a = (x, y) => ({ total: x + y })

    // - 箭头函数减少代码量
    let a = function(x) {
      return function(y) {
        return x + y
      }
    }
    a(1)(2)
    // - - 箭头函数替换
    let a = x => y => x + y

    // - 2、this 指向，前面是谁，this 就是谁
    let a = 1
    let obj = {
      a: 2,
      fn: function() {
        console.log(this.a)
      }
    }
    obj.fn() // 2, this 为 obj
    // - - setTimeout 导致 this 指向 window
    let a = 1
    let obj = {
      a: 2,
      fn: function() {
        setTimeout(function(){
          console.log(this.a)
        })
      }
    }
    obj.fn() // undefined，node 下 this 指向 Timeout，浏览器下 this 指向 window

    // - - 箭头函数无 arguments
    let a = 1
    let obj = {
      a: 2,
      fn: () => {
        setTimeout(() => {
          // obj 的大括号是表达普通对象的，不会形成作用域，this 并不会指向 obj
          // 浏览器下报错：ReferenceError: arguments is not defined
          console.log(arguments)
        })
      }
    }
    obj.fn()

 * ```
 * 
 */

