@flag('哺乳类')
class Animal{
  @readonly
  PI = 3.14
  name = 'xxx' // 实例属性，es7 新增
  @before
  say(){
    console.log('say')
  }
}
function flag(value) {
  return function(constructor) {
    constructor.type = value
  }
}
function readonly(target, property, descriptor) {
  descriptor.writable = false
}
function before(target, property, descriptor) {
  let oldSay = descriptor.value
  descriptor.value = function(){
    console.log('before')
    oldSay.call(target, ...arguments)
  }
}
console.log('Animal.type:', Animal.type) // Animal.type: 哺乳类