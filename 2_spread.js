/**
 * @example
 *
 * ```js
    // ... 展开运算符
    // - 1、把两个数组合并成一个数组
    let arr1 = [1, 2, 3]
    let arr2 = [4, 5, 6]
    let arr3 = [...arr1, ...arr2]
    console.log('arr3:', arr3) // arr3: [ 1, 2, 3, 4, 5, 6 ]
    
    let school = { name: 'js' }
    let my = { age: 18 }
    let all = { ...school, ...my }
    console.log('all:', all) // all: { name: 'js', age: 18 }

    // - 2、... 为浅拷贝（只能拷贝一层），问题如下
    let school = { name: 'js' }
    let my = { age: { count: 18 } }
    let all = { ...school, ...my }
    my.age.count = 100
    // 修改对象 my 的内部属性 count，all 中对应的 count 也会随之改变
    // all: { name: 'js', age: { count: 100 } }
    console.log('all:', all)

    // - - 解决浅拷贝方法一：
    // - - - 把原来的 my 放在新对象中 newMy，用一个新的 age 原来的 age 也拷贝一份
    let school = { name: 'js' }
    let my = { age: { count: 18 }, name: 'kft' }
    const newMy = { ...my, age: { ...my.age } }
    let all = { ...school, ...newMy }
    my.age.count = 100
    // all: { name: 'js', age: { count: 18 } }
    console.log('all:', all)

    // - - 解决浅拷贝方法二：
    // - - - 把对象通过 JSON.stringify() 转化成字符串，在通过 JSON.parse() 转化成对象
    // - - - 问题：无法转化函数、日期对象、正则对象、undefined、null 等数据类型
    let school = { name: 'js' }
    let my = { age: { count: 18 }, name: 'kft' }
    let all = JSON.parse( JSON.stringify({ ...school, ...my }))
    my.age.count = 100
    // all: { name: 'js', age: { count: 18 } }
    console.log('all:', all)

    // - - Object.assign()-浅拷贝
    let obj = { name: 'kft', age: 18 }
    let newObj = {}
    Object.assign(newObj, obj, { c: 19 })
    console.log('newObj:', newObj) // newObj: { name: 'kft', age: 18, c: 19 }

    // - - 解决浅拷贝方法三（终版）：深拷贝 deepClone
    // - - - {@link file://./3_deep_clone.js}
 * ```
 * 
 */