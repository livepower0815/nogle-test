// Last price WebSocket API:
import { Ws } from '@/websocket/ws.js'
import { defineStore } from 'pinia'

export const lastPriceStore = defineStore({
  id: 'lastPrice',
  state: () => ({
    wsInstance: new Ws({
      url: 'wss://ws.btse.com/ws/futures',
      openFn: () => {
        const lastPrice = lastPriceStore()
        lastPrice.subscribeTradeHistory()
      },
      messageFn: event => {
        const lastPrice = lastPriceStore()
        const parseData = JSON.parse(event.data)
        if (parseData.topic === 'tradeHistoryApi') {
          lastPrice.priceHandler(parseData.data)
        }
      }
    }),
    price: '0',
    status: 'buy'
  }),
  actions: {
    subscribeTradeHistory() {
      this.wsInstance.send({ op: 'subscribe', args: ['tradeHistoryApi:BTCPFC'] })
    },
    priceHandler(data) {
      if (!Array.isArray(data) || data.length === 0) return

      this.price = data[0].price
      this.status = data[0].side.toLowerCase()
    }
  }
})
