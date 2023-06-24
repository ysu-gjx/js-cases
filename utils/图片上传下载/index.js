oBtn.addEventListener('click', () => {
  // #3 在事件回调中通过 oInput.click() 主动触发 input type=file 框的点击事件，这个时候会出现文件选择框，选择文件后会触发 oInput 的change 事件
  oInput.click()
})

const baseURL = 'http://localhost:8080/'
// #4 监听 oInput 的 change 事件
oInput.addEventListener('change', async (e) => {
  // #5 通过 e.target.files[0] 拿到当前文件信息
  const oFile = e.target.files[0]
  // #6 创建一个 FormData 实例
  const oFormData = new FormData()
  // #7 调用 FormData 实例的 append 方法添加文件信息
  oFormData.append('avatar', 'oFile')
  // #8 使用 axios 把整个 FormData 实例传递到后端
  // const r = await axios.post(baseURL + 'api/upload', oFormData)
  // #9.1 后端返回上传成功后的图片地址，我们把此地址赋值给图片的 src 属性进行预览
  // oImg.src = baseURL + r.data.files.avatar.newFilename

  // #9.2 通过 URL.createObjectURL 把文件信息生成 blobUrl, 并赋值给图片的src 进行预览
  const blobUrl = URL.createObjectURL(oFile)
  oImg.src = blobUrl

  // #9.3 通过 FileReader 把文件信息读为 base64 并赋值给图片的 src 进行预览
  const oFileReader = new FileReader()
  oFileReader.onload = function () {
    // oImg.src = this.result
  }
  oFileReader.readAsDataURL(oFile)
})
