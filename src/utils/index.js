import numeral from 'numeral'

export function isFunction(fn) {
  return fn && typeof fn === 'function'
}

export function tryExec(func, context, ...args) {
  return isFunction(func) ? func.apply(context, args) : func
}

export function tryTransform(func, context, item) {
  return isFunction(func) ? func.call(context, item) : item
}

export function tryGet(target, field) {
  return target && target[field]
}

// 把undefined和truthy转换为true
export function asBool(x, undefIsTrue = true) {
  return undefIsTrue ? (!!x || x === undefined) : !!x
}

// 随机获取颜色
export function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('')
  let color = '#'
  const HEX_LEN = 6
  const HEX_MAX = 16
  for (let i = 0; i < HEX_LEN; i++) {
    color += letters[Math.floor(Math.random() * HEX_MAX)]
  }
  return color
}

export function getExposedModule(mod) {
  return mod && mod.default ? mod.default : mod
}

// 转换为两位数的百分比
export function asPercentage(num) {
  return numeral(num || 0).format('(0.00%)')
}

// 转换为浮点数字形式，保留两位有效数字
export function asNumber(num) {
  return numeral(num || 0).format(`0,0.00`)
}

// 转换为数字，千分位
export function asInteger(num) {
  return numeral(num || 0).format(`0,0`)
}

// 转换为货币形式，保留两位小数点
export function asCurrency(num, currency = '￥') {
  return currency + asNumber(num)
}

export function parseUri(uri) {
  let parser = document.createElement('a')
  parser.href = uri

  return {
    protocol: parser.protocol,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    host: parser.host
  }
}
