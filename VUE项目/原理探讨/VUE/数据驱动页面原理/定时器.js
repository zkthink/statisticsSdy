let i = 0, j = 0
let timerHandle = 1

let callback = function() {
  // 这里模拟发送异步请求
  setTimeout(() => {
    i++;

    console.log('timerHandle', i)

    // if(!timerHandle) {
    //   return
    // }

    if(timerHandle) {
      clearTimeout(timerHandle)
      timerHandle = null
    }
    
    // 刷新数据周期
    timerHandle = setTimeout(callback, 2 * 1000)
  },  200);
}

timerHandle = setTimeout(callback, 0)

let intervalHandler = setInterval(() => {
  console.log(i)
  clearTimeout(timerHandle)
  clearInterval(intervalHandler)

  timerHandle = null
  intervalHandler = null
}, 1850);