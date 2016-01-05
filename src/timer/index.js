/**
 * a human oriented timer for javascript
 *
 * var timer = new Timer(func, 2000)
 * timer.run()
 * timer.stop()
 * timer.reset()
 * timer.reset(1000)
 * timer.cancel()
 */

import {STOPPED, CANCELLED, RUNNING} from './const.js'

function attempt(fn, context, args) {
  if (typeof fn !== 'function') return null

  let result = null
  try {
    result = fn.apply(context, args)
  } catch (e) {
    console.log(e)
  }

  return result
}

export default function(fn, duration) {
  /**
   * running期间多次调用会执行多次
   * 下个执行点为轮询执行完毕的duration之后
   */
  this.duration = duration
  this.status = RUNNING
  this.timer = setTimeout(() => this.run(), this.duration)

  // 立即执行一次
  this.run = () => {
    if (this.status === CANCELLED) return

    // 清除上次的定时器
    clearTimeout(this.timer)
    attempt(fn)
    this.timer = setTimeout(() => this.run(), this.duration)
  }

  // 重新设置定时器的轮询周期
  this.reset = (num) => {
    if (this.status === CANCELLED) return

    this.stop()
    if (num) {
      this.duration = num
    }
    this.run()
  }

  // 暂停
  this.stop = () => {
    this.status = STOPPED
    clearTimeout(this.timer)
  }

  // 永久停止timer防止被错误启动
  this.cancel = function() {
    this.status = CANCELLED
    clearTimeout(this.timer)
  }
}
