/**
 * @example
 *
 * ```js
    // 装饰器
    // - 装饰器可以修饰类、类的属性、类原型上方法
    class Animal{
      name = 'xxx' // 实例属性，es7 新增
      say(){
        console.log('say')
      }
    }
    // - 1、修饰类的装饰器
    // - - {@link file://./file/2_decorators/index.js}
    @flag
    class Animal{
      name = 'xxx' // 实例属性，es7 新增
      say(){
        console.log('say')
      }
    }
    function flag(constructor){
      constructor.type = '哺乳类'
    }
    console.log('Animal.type:', Animal.type) // Animal.type: 哺乳类
    // - - 安装处理装饰器包 @babel/plugin-proposal-decorators
    sudo npm i @babel/plugin-proposal-decorators@7.22.10 -D
    // - - .babelrc 文件添加插件 @babel/plugin-proposal-decorators
    // - - - {@link file://./file/2_decorators/.babelrc}
    {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
        ["@babel/plugin-transform-class-properties", { "version": "2023-05" }]
      ]
    }
    // - - - 调用 npx babel index.js -o index_decompress.js -w
    // - - - 调试 index_decompress.js
    // - - - - {@link file://./file/2_decorators/index_decompress.js}
    // - - - - 修饰时，把这个类属性传递给修饰的函数

    // - 2、修饰类的静态属性
    // - - {@link file://./file/2_decorators/index.js}
    @readonly
    PI = 3.14
    // - - 查看参数，分别是 target, property, descriptor
    function readonly() {
      // [Arguments] {
      //   '0': {},
      //   '1': 'PI',
      //   '2': {
      //     configurable: true,
      //     enumerable: true,
      //     writable: true,
      //     initializer: [Function: initializer]
      //   }
      // }
      console.log(arguments)
    }
    // 另 PI 不可重写
    function readonly(target, property, descriptor) {
      descriptor.writable = false
    }
    let animal = new Animal()
    animal.PI = 3.15
    console.log('animal.PI:', animal.PI) // 报错：TypeError: Cannot assign to read only property 'PI' of object '#<Animal>'

    // - 3、修饰类实例方法
    @before
    say(){
      console.log('say')
    }
    function before(target, property, descriptor) {
      let oldSay = descriptor.value
      descriptor.value = function(){
        console.log('before')
        oldSay.call(target, ...arguments)
      }
    }
    let animal = new Animal()
    animal.say(1, 2, 3) // 分别打印 before, say

    // - 4、类修饰器传参
    // - - {@link file://./file/2_decorators/index.js}
    @flag('哺乳类')

    function flag(value) {
      return function(constructor) {
        constructor.type = value
      }
    }

    console.log('Animal.type:', Animal.type) // Animal.type: 哺乳类
    // - - 类修饰器传参使用参考：@connect 和 @withRoute

 * ```
 * 
 */