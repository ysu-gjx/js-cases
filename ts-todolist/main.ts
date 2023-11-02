const oInput = <HTMLInputElement>document.querySelector('#oInput')
const oBtn = <HTMLButtonElement>document.querySelector('#oBtn')

const oList = <Element>document.querySelector('#oList')

function init() {
  bindEvent()
}

const EventMap = new Map([
  [oBtn, handleAdd],
  [oList, handleItemClick],
])
function bindEvent() {
  EventMap.forEach((handler, el) => {
    el.addEventListener('click', handler, false)
  })
}
function handleAdd() {
  const inputText = oInput.value

  if (!inputText.trim().length) return
}
function handleItemClick(e: Event) {}
