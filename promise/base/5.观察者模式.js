// 观察者模式 观察者和被观察者 是有关联的 观察者需要将自己放到被观察者之上,当被观察者状态发生变化 ，需要通知所有的观察者

// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.observers = []
    this.state = '初始状态'
  }
  attach(ob) {
    // 订阅 on     需要将注册者放到自己的身上
    this.observers.push(ob)
  }
  setState(newState) {
    this.state = newState // 更新被观察者的状态

    // 宝宝状态变化了，会通知观察者更新，将自己传入过去
    // 发布   //emit
    this.observers.forEach((o) => {
      o.update(this)
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }

  update(s) {
    // 等会被观察者的状态发生变化会调用这个方法
    console.log(this.name + ':' + s.name + s.state)
  }
}

const s = new Subject('baobao') //创建一个被观察者
const o1 = new Observer('father')
const o2 = new Observer('mother')

// 订阅
s.attach(o1)
s.attach(o2)
s.setState('new State')

// 发布订阅，用户要手动订阅，手动触发
// 观察者模式，是基于发布订阅的，主动的  状态变化  主动通知
