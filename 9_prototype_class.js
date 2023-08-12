/**
 * @example
 *
 * ```js
    // 原型链和类
    // - 1、es6 类 es5 构造函数
    // - - 构造函数
    function Animal(name) {
      // 属性分为两种，实例属性和公共属性
      this.name = name
      this.arr = [1, 2, 3]
    }
    Animal.prototype.address = { location: '昌平' }
    let a1 = new Animal('猴子')
    let a2 = new Animal('小鸡')
    console.log('a1.arr === a2.arr:', a1.arr === a2.arr) // a1.arr === a2.arr: false，arr 实例属性属于私有属性
    console.log('a1.address === a2.address:', a1.address === a2.address) // a1.address === a2.address: true，address 为公有属性

    // - 2、原型链
    // - -（1）每个实例都有一个 __proto__ 指向所属的原型
    // - - - a1.__proto__ === Animal.prototype: true
    console.log('a1.__proto__ === Animal.prototype:', a1.__proto__ === Animal.prototype) 
    console.log('a1.constructor === Animal:', a1.constructor === Animal)
    // - - - a1.constructor === Animal: true
    console.log('a1.constructor === Animal:', a1.constructor === Animal) 
    // - - - Animal.__proto__ === Function.prototype: true
    console.log('Animal.__proto__ === Function.prototype:', Animal.__proto__ === Function.prototype)
    // - - - a1.__proto__.__proto__ === Object.prototype: true
    console.log('a1.__proto__.__proto__ === Object.prototype:', a1.__proto__.__proto__ === Object.prototype)
    // - - - Object.prototype.__proto__: null
    console.log('Object.prototype.__proto__:', Object.prototype.__proto__)

    // - 3、类的继承
    function Animal(name) {
      // 属性分为两种，实例属性和公共属性
      this.name = name
      this.arr = [1, 2, 3]
      this.eat = '吃肉'
    }
    Animal.prototype.address = { location: '昌平' }
    function Tiger(name) {
      this.name = name
      this.age = 10
    }
    Tiger.prototype.say = function () {
      console.log('说话')
    }

    // - -（1）call+prototype 继承
    // - - - Tiger 构造函数调用 call 继承实例属性
    function Tiger(name) {
      this.name = name
      this.age = 10
      Animal.call(this)
    }
    const tiger = new Tiger('老虎')
    console.log('tiger.eat:', tiger.eat) // tiger.eat: 吃肉
    // - - - 继承公有属性 address
    // - - - - 第一种：继承父类的公有属性/方法
    Tiger.prototype.__proto__ = Animal.prototype
    // - - - - - 问题：污染 Tiger 原型链
    // - - - - 第二种：调用 es5 的 Object.create() 方法
    Tiger.prototype = Object.create(Animal.prototype)
    console.log('Tiger.address:', tiger.address) // Tiger.address: { location: '昌平' }

    // -（2）自定义 Object.create()，命名-create
    function create(parentPrototype) {
      let Fn = function(){}
      Fn.prototype = parentPrototype
      return new Fn()
    }
    Tiger.prototype = create(Animal.prototype)
    console.log('Tiger.address:', tiger.address) // Tiger.address: { location: '昌平' }
    // - - - Object.create() Tiger 构造函数仍是父类的构造函数，传入构造函数参数 { constructor: { value: Tiger } }
    console.log('tiger.constructor:', tiger.constructor) // tiger.constructor: [Function: Animal]
    Tiger.prototype = Object.create(Animal.prototype, { constructor: { value: Tiger } })
    console.log('tiger.constructor:', tiger.constructor) // tiger.constructor: [Function: Animal]

    // -（3）Object.setPrototypeOf(Tiger.prototype, Animal.prototype)-es7 create 方法
    // - - - 错误继承方法：Tiger.prototype = new Animal() // 无法给父类传递参数
    // - - - 向父类传递参数
    Animal.call(this, ...arguments) // 等价于 Animal.apply(this, arguments)

    // - 4、class-es6 类
    class Animal {
      constructor(name) {
        this.name = name
        this.eat = '吃肉'
      }
      say(){
        console.log('say')
      }
    }
    // - - 1）es6 原型方法 say 单独调用，this 不存在
    say(){
      console.log(this)
    }
    const animal = new Animal('老虎')
    const say = animal.say
    say() // 打印 undefined

    // - - 2）es7 支持静态属性，命名 flag，es6 只支持静态方法，命名 flagFn; 关键词 static
    static flag(){
      return 123 
    }
    console.log(Animal.flag()); // 123

    // - - 3）extends-继承
    class Tiger extends Animal {
      constructor(name){
        super(name) // 等同于 Animal.call(this, name)
      }
    }

    // - - 4）{@link https://babeljs.io/repl} 解析 es6 为 es5
    // - - - es5 代码继承逻辑-_inheritLoose
    function _inheritLoose(subClass, superClass) {
      // 继承公共属性
      subClass.prototype = Object.create(superClass.prototype)
      // 改造构造函数指向
      subClass.prototype.constructor = subClass
      // 继承静态属性、方法
      subClass.__proto__ = superClass
    }
    // - - - 使用 _inheritLoose 继承
    var Tiger = function(_Animal) {
      // 继承
      _inheritLoose(Tiger, _Animal)
      function Tiger(name) {
        // 继承父类实例上属性
        return _Animal.call(this,name) || this
      }
      return Tiger
    }(Animal)

    // - 5、es6/es7 通过 @babel/cli 转换为 es5
    // - - {@link file://./file/1_babel/1_class.js}
    class Animal {
      constructor(name) {
        this.name = name
        this.eat = '吃肉'
      }
      say(){
        console.log('say')
      }
    }
    class Tiger extends Animal {
      constructor(name){
        super(name) // 等同于 Animal.call(this, name)
      }
    }
    // - - 初始化-npm init -y
    // - - 旧版本 babel: babel-cli; 新版本 babel: @babel/cli;
    // - - 安装 @babel/cli @babel/core --dev; --dev 为开发安装，上线不会使用;
    // - - 安装 @babel/preset-env; 转化已经定案的标准
    sudo npm i @babel/cli @babel/core @babel/preset-env -D
    // - - {@link file://./file/1_babel/.babelrc}
    {
      "presets": [
        "@babel/preset-env"
      ]
    }
    // - - 安装 @babel/plugin-proposal-class-properties 主要的作用是用来转换类的属性
    sudo npm i @babel/plugin-proposal-class-properties -D
    // - - - {@link file://./file/1_babel/.babelrc}
    {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties"
      ]
    }
    // - - 调试 1_class.js 为 1_class_decompress.js，命令行如下
    npx babel 1_class.js -o 1_class_decompress.js -w
 * ```
 * 
 */

class Animal {
  constructor(name) {
    this.name = name
    this.eat = '吃肉'
  }
  say() {
    console.log(this)
  }
}

class Tiger extends Animal {
  constructor(name){
    super(name)
  }
}