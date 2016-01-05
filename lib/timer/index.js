'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn, duration) {
  var _this = this;

  /**
   * running期间多次调用会执行多次
   * 下个执行点为轮询执行完毕的duration之后
   */
  this.duration = duration;
  this.status = _const.RUNNING;
  this.timer = setTimeout(function () {
    return _this.run();
  }, this.duration);

  // 立即执行一次
  this.run = function () {
    if (_this.status === _const.CANCELLED) return;

    // 清除上次的定时器
    clearTimeout(_this.timer);
    attempt(fn);
    _this.timer = setTimeout(function () {
      return _this.run();
    }, _this.duration);
  };

  // 重新设置定时器的轮询周期
  this.reset = function (num) {
    if (_this.status === _const.CANCELLED) return;

    _this.stop();
    if (num) {
      _this.duration = num;
    }
    _this.run();
  };

  // 暂停
  this.stop = function () {
    _this.status = _const.STOPPED;
    clearTimeout(_this.timer);
  };

  // 永久停止timer防止被错误启动
  this.cancel = function () {
    this.status = _const.CANCELLED;
    clearTimeout(this.timer);
  };
};

var _const = require('./const.js');

function attempt(fn, context, args) {
  if (typeof fn !== 'function') return null;

  var result = null;
  try {
    result = fn.apply(context, args);
  } catch (e) {
    console.log(e);
  }

  return result;
} /**
   * a human oriented timer for javascript
   *
   * var timer = new Timer(func, 2000)
   * timer.run()
   * timer.stop()
   * timer.reset()
   * timer.reset(1000)
   * timer.cancel()
   */