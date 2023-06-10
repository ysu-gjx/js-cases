// 车
class Car {
  constructor(num) {
    this.num = num
  }
}

// 车位
class Place {
  constructor(isEmpty) {
    this.isEmpty = isEmpty
  }
  carIn () {
    this.isEmpty = false
  }
  carOut () {
    this.isEmpty = true
  }
}

// 层
class Floor {
  constructor(index, places) {
    this.places = places || []
    this.index = index
  }
  emptyPlaceNum() {
    return this.places.filter((place) => {
      return place.isEmpty
    }).length
  }
}

// 停车场
class Park {
  constructor(floors, carList) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = carList || []
  }
  // 进入前
  showEmptyNum () {
    let res = this.floors.map((floor) => {
      return floor.emptyPlaceNum()
    })
    console.log(`进入前：${res}`)
  }
  // 进入时
  carIn (car) {
    this.camera.shot(car)
    this.carList.push({
      num: car.num,
      inTime: Date.now()
    })
  }
  // 出去时
  carOut (car) {
    let t = this.carList.find(x => x.num === car.num)
    let i = this.carList.findIndex(x => x.num === car.num)
    this.screen.showInfo(t)
    this.carList.splice(i, 1)
  }
}
// 摄像头
class Camera {
  shot(car) {
    console.log(`车辆信息已记录，车牌号：${car.num}`)
  }
}

// 显示器
class Screen {
  showInfo(car) {
    let now = Date.now()
    console.log(`车辆驶出，车牌号：${car.num},时间：${now - car.inTime}`)
  }
}

//  测试

function createFloor() {
  let places = []
  for (let i = 0; i < 100; i++) {
    places.push(new Place(true))
  }
  return places
}

let f1 = new Floor(0, createFloor())
let f2 = new Floor(1, createFloor())
let f3 = new Floor(2, createFloor())

let park = new Park([f1,f2,f3])

let car1 = new Car('京1111111')
let car2 = new Car('冀2222222')

// 第一辆车进入
park.showEmptyNum()
park.carIn(car1)
park.floors[1].places[33].carIn()

// 第二辆车进入
park.showEmptyNum()
park.carIn(car2)
park.floors[1].places[24].carIn()

// 第一辆车 出去
setTimeout(() => {
  park.floors[1].places[33].carOut()
  park.carOut(car1)
}, 3000)
