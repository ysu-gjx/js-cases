class Product {
  constructor (name) {
    this.name = name
  }
  init() {
    console.log('init success')
  }
  fn1() {
    console.log('fn1 has been called')
  }
  fn2() {
    console.log('fn2 has been called')
  }
}

class Creator {
  create (name) {
    return new Product(name)
  }
}

//test
let creator = new Creator()
let p = creator.create('p1')

p.init()
p.fn1()