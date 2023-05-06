// 函数参数的预置  将函数的参数  进行一个保留（闭包）
// 闭包就是函数定义的作用域和执行的作用域不是同一个，此时就会产生闭包

// 函数的柯里化   偏函数  都是基于高阶函数来实现的

// 判断类型  有常见的4种方式
// typeof 可以判断基本类型，  typeof null === 'object'
// instanceof 可以判断某个类型是否属于谁的实例
// Object.prototype.toString 需要在对象的原型中找到方法
// constructor [].constructor Array {}.constructor Object

/**
function isType(typing, val) {
  return (Object.prototype.toString.call(val) === `[object ${typing}]`)
}
// 可不可以将参数预置到函数内部

  console.log(isType('Object', {}))
  console.log(isType('String', 'abc'))
  console.log(isType('Numver', 11))
*/

// 参数的预置

function isType(typing) {
  // Number
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`
  }
}

const isNumber = isType('Number')
const isString = isType('String')

const util = {}

;['Number', 'Boolean', 'String'].forEach((type) => {
  util[`is${type}`] = isType(type)
})

const a = util.isString('123')
const b = util.isNumber(11)
const c = util.isBoolean(false)
console.log(a)
console.log(b)
console.log(c)

// isType方法的范围比较大 -) 小范围isNumber
// (函数柯里化，将范围具体化，可以实现批量传递参数， 通用的函数柯里化的实现)
// 函数反柯里化 Object.prototype.toString.call(val) => toString()

// 高阶函数的作用  1） 可以扩展功能  2）可以对函数参数进行预置
