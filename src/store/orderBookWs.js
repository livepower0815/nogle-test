// OrderBook WebSocket API
import { Ws } from '@/websocket/ws.js'
import { defineStore } from 'pinia'

export const orderBookStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: 'orderBook',
  state: () => ({
    wsInstance: new Ws({
      url: 'wss://ws.btse.com/ws/oss/futures',
      openFn: () => {
        const ob = orderBookStore()
        ob.subscribeOrderBook()
      },
      messageFn: event => {
        const ob = orderBookStore()
        const parseData = JSON.parse(event.data)
        if (parseData.topic === 'update:BTCPFC') {
          switch (parseData.data.type) {
            case 'snapshot':
              ob.snapshotHandler(parseData.data)
              break
            case 'delta':
              ob.deltaHandler(parseData.data)
              break
          }
        }
      }
    }),
    asksMap: [...Array(8)].reduce((obj, _, i) => { obj[i] = '0'; return obj }, {}),
    bidsMap: [...Array(8)].reduce((obj, _, i) => { obj[i] = '0'; return obj }, {})
  }),
  getters: {
    asksArray() {
      return Object.keys(this.asksMap).map(key => [key, this.asksMap[key]])
    },
    // Show max 8 quotes for sell.
    max8Asks() {
      const max8 = this.asksArray.sort((a, b) => a[0] - b[0]).slice(0, 8)
      const sumTotal = max8.reduce((arr, item, index) => {
        const sum = index === 0 ? item[1] : Number(item[1]) + Number(arr[index - 1][2])
        arr[index] = [...item, sum.toString()]
        return arr
      }, [])

      // reverse to sort big to small
      return sumTotal.reverse()
    },
    bidsArray() {
      return Object.keys(this.bidsMap).map(key => [key, this.bidsMap[key]])
    },
    // Show max 8 quotes for both buy.
    max8Bids() {
      const max8 = this.bidsArray.sort((a, b) => b[0] - a[0]).slice(0, 8)
      const sumTotal = max8.reduce((arr, item, index) => {
        const sum = index === 0 ? item[1] : Number(item[1]) + Number(arr[index - 1][2])
        arr[index] = [...item, sum.toString()]
        return arr
      }, [])

      return sumTotal
    }
  },
  actions: {
    subscribeOrderBook() {
      this.wsInstance.send({ op: 'unsubscribe', args: ['update:BTCPFC'] })
      window.setTimeout(() => {
        this.wsInstance.send({ op: 'subscribe', args: ['update:BTCPFC'] })
      }, 200)
    },
    // for init
    snapshotHandler(data) {
      // reset first
      this.asksMap = {}
      this.bidsMap = {}
      data.asks.forEach(item => {
        this.asksMap[item[0]] = item[1]
      })
      data.bids.forEach(item => {
        this.bidsMap[item[0]] = item[1]
      })
    },
    // for update
    deltaHandler(data) {
      data.asks.forEach(item => {
        if (item[1] === '0') delete this.asksMap[item[0]]
        else this.asksMap[item[0]] = item[1]
      })
      data.bids.forEach(item => {
        if (item[1] === '0') delete this.bidsMap[item[0]]
        else this.bidsMap[item[0]] = item[1]
      })
    }
  }
})
