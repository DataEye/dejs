'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform2PieData = transform2PieData;
exports.transform2LineData = transform2LineData;
exports.getPieOptions = getPieOptions;
exports.getLineOptions = getLineOptions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

var _consts = require('./consts');

var _consts2 = _interopRequireDefault(_consts);

var _tooltip_formatter = require('./tooltip_formatter');

var _tooltip_formatter2 = _interopRequireDefault(_tooltip_formatter);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highcharts2.default.setOptions({
  colors: _consts2.default.COLORS,
  lang: {
    // TODO 多语言版本以及其它基本配置
    noData: '暂无数据'
  }
});

// 获取分组配置信息，未设置的在默认分组
// {male: ['y0', 'y1'], femail: ['y3']}
/**
 * highcharts配置生成辅助方法
 */
function stackParser(config, names) {
  if (!config) return null;
  var ret = {};
  var defaultGroupName = 'default';
  _lodash2.default.each(names, function (val, key) {
    ret[key] = defaultGroupName;
  });

  _lodash2.default.each(config, function (val, key) {
    _lodash2.default.each(val, function (name) {
      ret[name] = key;
    });
  });

  return ret;
}

// 转换原始接口数据为饼图数据
function transform2PieData(data) {
  return _lodash2.default.map(data.content, function (item) {
    return {
      name: item.x,
      y: item.y0
    };
  });
}

/**
 * 格式化函数的【共享】与【独占】
 * 共享表示全部曲线共用一个formatter
 * 独占表示每个曲线对应自己的格式化函数
 *
 * 配置说明：
 * categoryFormatter {Function} x轴格式化函数
 * onClick {Function} 图表点击事件
 * legendEnabled {Boolean} 是否展示图例，默认为true
 * yAxisFormatter {Function} 【独占】y轴value格式化函数，接收2个额外的参数（y轴value、曲线名称y0,y1等）
 * yAxisLabelsFormatter {Function} 【独占（左右两侧）】纵坐标格式化，接收2个额外的参数（曲线名称、曲线索引）
 * yAxisOppositeList {Array} 指定那些曲线位于右侧 ['y0', 'y1']
 * yAxisMultiple {Boolean} 是否允许多Y轴（每个曲线一个Y轴），默认只允许双Y轴
 * seriesNameList {Array<String>} 曲线名称
 * seriesTypeList {Array<String>} 曲线类型
 * seriesColorList {Array<String>} 曲线颜色
 * seriesVisibleList {Array<Boolean>} 设置指定曲线的显示与隐藏
 * seriesStack {Object} 分组配置，未指定的在默认分组
 * allowDecimals {Boolean} 是否允许y轴刻度出现小树
 * tooltipOrderList {Array<String>} tooltip排序字段允许加入自定义的数据
 * tooltipExtraData {Object} tooltip自定义数据{key: [name, value]}
 * tooltipValueFormatter {Function} 【独占】tooltip格式化y轴value，接收2个参数：value，name
 */
function transform2LineData(data, extraOptions) {
  // x轴的值
  var categories = _lodash2.default.map(data.content, function (item) {
    return {
      data: item,
      // 重写tostring，将data对象在tooltip中可以直接获取不需要JSON.parse
      toString: function toString() {
        return utils.tryTransform(extraOptions.categoryFormatter, null, item.x);
      }
    };
  });
  // x轴为时间序列，只有一条数据是否展示点
  var markerEnabled = categories.length === 1;
  // x轴步长
  var STEP_LEN = 12;
  var tickInterval = Math.ceil(categories.length / STEP_LEN);
  // 有点击事件鼠标样式为cursor
  var cursor = !!extraOptions.onClick;
  // 是否展示图例，大部分情况默认为true
  var legendEnabled = utils.asBool(extraOptions.legendEnabled);
  var tooltipFomatter = function tooltipFomatter() {
    return _tooltip_formatter2.default.call(this, data, this.x.data, extraOptions);
  };
  var seriesStack = stackParser(extraOptions.seriesStack);
  // 是否堆叠
  var stacking = !!seriesStack;
  var yAxisKeys = _lodash2.default.keys(data.name).sort().filter(function (i) {
    return i[0] === 'y';
  });
  var yAxisList = _lodash2.default.map(yAxisKeys, function (key, i) {
    return _lodash2.default.map(data.content, function (row, j) {
      var value = row[key] || 0;
      if (!extraOptions.yAxisFormatter) return value;

      // 根据不同曲线名称来进行不同的格式化
      // 这里的值必须返回数值，主要用于百分比格式化
      var transformed = extraOptions.yAxisFormatter(value, key);
      if (typeof transformed !== 'number') {
        throw new Error('y\u8F74\u8FD4\u56DE\u503C\u5FC5\u987B\u4E3A\u6570\u5B57\uFF1A\n\u539F\u59CB\u503C:' + row[key] + '\n\u66F2\u7EBF\u540D\u79F0:' + key + '\n\u4F4D\u7F6E\u7D22\u5F15' + j);
      }
      return transformed;
    });
  });
  var series = [];
  var yAxis = [];
  var defaultSerieType = extraOptions.chart && extraOptions.chart.type || _consts2.default.DEFAULT_LINE_TYPE;
  _lodash2.default.each(yAxisList, function (item, i) {
    /**
     * yAxisIndex 用于指定曲线在哪个Y轴
     * 如果要多Y轴那么yAxisIndex只需指定不同的值即可
     * 如果只允许两个Y轴，一个0，一个1即可
     */
    var yAxisIndex = 0;
    var opposite = false;
    if (_lodash2.default.isArray(extraOptions.yAxisOppositeList)) {
      opposite = _lodash2.default.includes(extraOptions.yAxisOppositeList, yAxisKeys[i]);
      var targetIndex = extraOptions.yAxisMultiple ? i : 1;
      yAxisIndex = opposite ? targetIndex : 0;
    }
    // y轴格式化，额外传递当前曲线的全部数据，以及曲线的对应的name，index
    var yAxisLabelsFormatter = extraOptions.yAxisLabelsFormatter && function () {
      return extraOptions.yAxisLabelsFormatter.call(this, yAxisKeys[i], i);
    };

    series.push({
      data: item,
      // 如果重新定义了则优先取配置，不然自动获取name属性配置
      name: utils.tryGet(extraOptions.seriesNames, i) || data.name['y' + i],
      type: utils.tryGet(extraOptions.seriesTypeList, i) || defaultSerieType,
      color: utils.tryGet(extraOptions.seriesColorList, i),
      visible: utils.tryGet(extraOptions.seriesVisibleList, i) || true,
      stack: seriesStack && seriesStack['y' + i],
      yAxis: yAxisIndex,
      events: {
        click: extraOptions.onClick
      }
    });

    yAxis.push({
      title: {
        text: ''
      },
      opposite: opposite,
      min: 0,
      gridLineColor: '#E0E0E0',
      gridLineDashStyle: 'Dash',
      //是否允许刻度有小数
      allowDecimals: !!extraOptions.allowDecimals,
      labels: {
        style: {
          fontFamily: 'Arial, "微软雅黑", "宋体"',
          // 多Y轴才展示颜色，不然颜色和曲线对不上
          color: extraOptions.yAxisMultiple && _consts2.default.COLORS[i]
        },
        formatter: yAxisLabelsFormatter
      }
    });
  });

  return {
    categories: categories, markerEnabled: markerEnabled, stacking: stacking,
    tickInterval: tickInterval, cursor: cursor, legendEnabled: legendEnabled,
    tooltipFomatter: tooltipFomatter, yAxis: yAxis, series: series
  };
}

// 生成饼图基本配置
function getPieOptions(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _lodash2.default.merge({
    series: [{
      innerSize: '40%',
      data: transform2PieData(data)
    }]
  }, options);
}

// 生成曲线图、柱状图等配置
function getLineOptions(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var lineData = transform2LineData(data, options);
  return _lodash2.default.merge({}, options, {
    series: lineData.series,
    chart: {
      // 图表类型，混合图的时候不需要指定type，在series里面指定type
      type: _consts2.default.DEFAULT_LINE_TYPE
    },
    legend: {
      enabled: lineData.legendEnabled
    },
    xAxis: {
      categories: lineData.categories,
      // tickInterval: lineData.tickInterval,
      labels: {
        // x轴的步长
        // step: lineData.tickInterval,
        style: {
          fontFamily: 'Arial, Microsoft YaHei'
        }
      }
    },
    yAxis: lineData.yAxis,
    tooltip: {
      formatter: lineData.tooltipFomatter
    },
    plotOptions: {
      areaspline: {
        marker: {
          enabled: lineData.markerEnabled
        }
      },
      spline: {
        marker: {
          enabled: lineData.markerEnabled
        }
      },
      area: {
        stacking: lineData.stacking,
        marker: {
          enabled: lineData.markerEnabled
        }
      },
      bar: {
        stacking: lineData.stacking
      },
      column: {
        cursor: lineData.cursor,
        stacking: lineData.stacking
      }
    }
  });
}

// 自定义饼图legend的symbol画图函数
_highcharts2.default.seriesTypes['pie'].prototype.drawLegendSymbol = function (legend, item) {
  item.legendSymbol = this.chart.renderer.rect(0, //方块的左上角点的x坐标
  legend.baseline - 5, //方块的左上角点的y坐标
  legend.options.symbolWidth || 16, // 这个就是chart初始化参数中legend里设置的symbolWidth属性，是方块的宽
  legend.options.symbolHeight || 2, // 方块的高
  legend.options.symbolRadius || 2 // 圆角的半径
  ).attr({
    zIndex: 3
  }).add(item.legendGroup);
};