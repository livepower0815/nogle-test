export class Ws {
  // 要连接的URL
  url
  // WebSocket 实例
  ws
  // 重連的 timer id
  reConnectTimeId = null
  // 是否為手動關閉
  isCustomClose = false

  // callback functions
  openFn
  messageFn

  constructor({ url, openFn, messageFn }) {
    this.url = url
    this.openFn = openFn
    this.messageFn = messageFn
    this.createWs()
  }

  createWs() {
    if ('WebSocket' in window) {
      this.ws = new WebSocket(this.url)
      // 监听事件
      this.onopen()
      this.onerror()
      this.onclose()
      this.onmessage()
    } else {
      console.log('你的浏览器不支持 WebSocket')
    }
  }

  // 监听成功
  onopen() {
    if (this.openFn) this.ws.onopen = this.openFn
    else this.ws.onopen = () => { console.log('WS opened!!') }
  }

  // 接收 WebSocket 消息
  onmessage() {
    if (this.messageFn) this.ws.onmessage = this.messageFn
    else this.ws.onmessage = event => { console.log('event:::', event) }
  }

  // post message
  send(data) {
    this.ws.send(JSON.stringify(data))
  }

  // 监听错误
  onerror() {
    this.ws.onerror = err => {
      console.log(err, 'onerror')
      this.reconnection()
    }
  }

  // 监听关闭
  onclose() {
    this.ws.onclose = () => {
      if (this.isCustomClose) {
        // 關閉連線錯誤提示
      } else {
        console.log('onclose')
        this.reconnection()
      }
    }
  }

  // 重连
  reconnection() {
    this.reConnectTimeId && window.clearTimeout(this.reConnectTimeId)
    this.reConnectTimeId = window.setTimeout(() => {
      this.createWs()
    }, 3000)
  }

  // 销毁
  destroy() {
    this.reConnectTimeId && window.clearTimeout(this.reConnectTimeId)
    this.isCustomClose = true
    this.ws.close()
    this.ws = null
  }
}
