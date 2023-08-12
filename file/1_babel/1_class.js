class Animal {
  xx = '测试类实例属性'
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
const tiger = new Tiger('老虎')
console.log('tiger.xx:', tiger.xx) // tiger.xx: 测试类实例属性