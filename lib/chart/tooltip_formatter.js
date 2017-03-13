'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSerieFromPoint = getSerieFromPoint;
exports.default = defaultTooltipFormatter;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _consts = require('./consts');

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 从point中获取serie相关信息
 * 主要用于在tooltip弹出时获取该点相关曲线类型
 * 参考格式:
 * _colorIndex: 2, data: Array[5],events: Object, name: "yuanlin2",
 * yAxis: 0, visible: true, type: "spline", stack: null
 *
 * @param point {Object} Highcharts在tootip.formatter中获取到的point数据
 * @return {Object} 当前点所属的曲线的数据
 */
function getSerieFromPoint(point) {
  if (!point) return null;

  var originalSeries = point.series.chart.options.series;
  var index = point.series.index;
  return originalSeries[index];
}

/**
 * 默认的tooltip formatter
 *
 * @param json {Object} 服务器返回的图表相关的json数据
 * @param rowData {Object} 当前提示框包含的行数据信息,为Highcharts内部数据(this.x.data)
 * @param config.tooltipOrderList {Array} 提示框排序信息['y1', 'y0', 'z0']
 * @param config.tooltipExtraData {Object} 提示框附带的额外的数据
 * @return {String} 返回提示框字符串
 *
 * TODO 数据过多提示框无法完全容纳时的处理方式,分栏?滚动条?参考游戏分析2.0的处理
 */
function defaultTooltipFormatter(json, rowData, _ref) {
  var tooltipOrderList = _ref.tooltipOrderList;
  var tooltipExtraData = _ref.tooltipExtraData;
  var tooltipValueFormatter = _ref.tooltipValueFormatter;

  /**
  * 用户可能取消某些曲线的展示，这个时候points仅为部分数据
  * indexes为这些曲线各自的索引,用于判断某个曲线是否展示提示
  */
  var points = this.points || [this.point];
  var indexes = points.map(function (p) {
    return p.series.index;
  });
  var liList = '';

  /**
  * chart组件支持手动对提示框数据排序
  * 如果没有指定排序信息,需要把x和id等额外的数据信息排除
  * 另外提示框里面可能插入一些rowData不包含的数据
  * 这个时候需要把这些额外的数据通过tooltipExtraData传进来
  * 比如tooltipOrderList里面包含z0,但是rowData里面没有,那么这里要传入{z0: [名字,数值]}
  */
  var tooltipFields = tooltipOrderList || _lodash2.default.keys(rowData).sort().filter(function (k) {
    return k !== 'id' && k !== 'x';
  });
  _lodash2.default.each(tooltipFields, function (key) {
    var isExtra = !json.name[key];
    if (isExtra) {
      if (!tooltipExtraData) {
        throw new Error(key + '\u627E\u4E0D\u5230\u5BF9\u4E8E\u7684tootip\u6570\u636E,\u8BF7\u68C0\u67E5\u539F\u59CB\u6570\u636E\u6216\u8005tooltipOrderList\u7684\u914D\u7F6E\u662F\u5426\u6B63\u786E');
      }
      if (!tooltipExtraData[key] || tooltipExtraData[key].length !== 2) {
        throw new Error('tooltipExtraData.' + key + '\u5E94\u8BE5\u662F\u4E00\u4E2A\u957F\u5EA6\u4E3A2\u7684\u6570\u7EC4([strLabel, numValue])');
      }
    }

    var fieldValue = isExtra ? tooltipExtraData[key][1] : rowData[key];
    var fieldLabel = isExtra ? tooltipExtraData[key][0] : json.name[key];

    /**
    * 只有y开头的曲线才会在y轴显示,其它都是辅助数据
    * 另外y开头的曲线可能被用户主动隐藏,这个时候要忽略掉
    */
    var keyIndex = key[0] === 'y' && parseInt(key.slice(1), 10);
    var pointSerieIndex = _lodash2.default.indexOf(indexes, keyIndex);
    if (key[0] === 'y' && pointSerieIndex === -1) return;

    var series = void 0,
        serieTypeStyle = void 0;
    /**
    * 目前提示框左侧的区分线只有两种:细线和粗线,颜色和曲线颜色相同
    * spline是细线其它都是粗线,后续这里按需扩展
    */
    if (pointSerieIndex !== -1) {
      series = points[pointSerieIndex].series;
      serieTypeStyle = getSerieFromPoint(points[pointSerieIndex]).type === _consts2.default.DEFAULT_LINE_TYPE ? _consts2.default.TOOLTIP_SPLINE_HEIGHT_ATTR : _consts2.default.TOOLTIP_BASE_HEIGHT_ATTR;
    } else {
      // 可能显示z0或t0,这时返回一个包装的替代对象
      series = {
        color: '',
        name: fieldLabel
      };
      serieTypeStyle = _consts2.default.TOOLTIP_BASE_HEIGHT_ATTR;
    }

    // 对每个field都可以进行按key进行格式化
    var value = tooltipValueFormatter ? tooltipValueFormatter(fieldValue, key) : fieldValue || 0;
    liList += '\n      <li style="' + _consts2.default.TOOLTIP_LI_STYLE + '">\n        <span style="background: ' + series.color + ';' + (serieTypeStyle + _consts2.default.TOOLTIP_BASE_STYLE + _consts2.default.TOOLTIP_SPAN_STYLE) + '}"></span>\n        <span style="' + _consts2.default.TOOLTIP_SPAN_STYLE + ';min-width:84px;">' + series.name + ': </span>\n        <span style="' + _consts2.default.TOOLTIP_SPAN_STYLE + '">' + value + '</span>\n      </li>\n    ';
  });

  return '\n    <h5 style="margin-bottom: 8px;margin-top: 0;">' + this.x + '</h5>\n    <div style="border-top:1px solid rgba(122, 128, 138, 0.6);padding-top: 5px;">\n      <ul style="' + _consts2.default.TOOLTIP_UL_STYLE + '">' + liList + '</ul>\n    </div>\n  ';
}