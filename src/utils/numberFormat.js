export function formatMoneyInt(val) {
  try {
    var parts = val.toString().split('.')[0]
    parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts
  } catch (e) {
    return ''
  }
}

export const toFixed = (value, offset = 2) => {
  // 為什麼要多創一個toFixed?
  // 因為原生的toFixed 的四捨五入有bug
  // console.log((1.235).toFixed(2)) // 1.24, 預期為1.24 V
  // console.log((1.2345).toFixed(3)) // 1.234, 預期為1.235 X

  const number = Number(value)
  if (isNaN(number)) {
    console.warn('toFixed: 傳入的value 轉成數字失敗!')
    return value
  }
  if (typeof offset !== 'number') {
    console.warn('toFixed: 傳入的offset 僅可是數字!')
    return value
  }
  const rate = Math.pow(10, offset)

  return (Math.round(number * rate) / rate).toFixed(offset)
}

export const formatMoney = (value, { defaultValue = '-' } = {}) => {
  const number = Number(value)
  if (isNaN(number)) {
    console.warn('formatMoney: 傳入的value 轉成數字失敗!')
    return defaultValue
  }

  const [intNumber, floatNumber = ''] = value.toString().split('.')
  const hasDot = floatNumber ? '.' : ''
  return `${Number(intNumber).toLocaleString()}${hasDot}${floatNumber}`
}

// 整數加上逗號並截取小數點第 n 位數
export const formatNumberWithFixed = (number, fixed = 1) => {
  const validNumber = Number(number)
  if (Number.isNaN(validNumber)) {
    // console.warn('formatNumberWithFixed 傳入的資料無法轉換成數字格式，請檢查')
    return number
  }

  if (fixed < 1) {
    // console.error('formatNumberWithFixed 第二個參數請大於 0')
    return formatMoneyInt(validNumber)
  }

  const numberFixed = toFixed(validNumber, fixed)
  const decimal = numberFixed.split('.')[1]
  return formatMoneyInt(numberFixed) + '.' + decimal
}
