'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PIE_OPTIONS = exports.DEFAULT_LINE_OPTIONS = undefined;
exports.defaultTooltipFormatter = defaultTooltipFormatter;
exports.transform2PieData = transform2PieData;
exports.transform2LineData = transform2LineData;
exports.getPieOptions = getPieOptions;
exports.getLineOptions = getLineOptions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * highcharts配置生成辅助方法
 */

var COLORS = ['#4da1ff', '#f4533c', '#ffae00', '#1aba9b', '#e552b0', '#af6bcb', '#9aab4f', '#6673d1', '#3ebb43', '#2c81e1', '#dd4544', '#e49518', '#0c967b', '#bd3998', '#944cb2', '#7b8d43', '#4e5ab0', '#299e2e', '#1665bd', '#bd3b47', '#d97707', '#06715d', '#8f2e73', '#7b3499', '#69821c', '#4a498f', '#18851d'];

Highcharts.setOptions({
  colors: COLORS,
  lang: {
    // TODO 多语言版本以及其它基本配置
    noData: '暂无数据'
  }
});

// 获取分组配置信息，未设置的在默认分组
// {male: ['y0', 'y1'], femail: ['y3']}
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

var DEFAULT_LINE_OPTIONS = exports.DEFAULT_LINE_OPTIONS = {
  chart: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  title: {
    text: ''
  },
  legend: {
    borderWidth: 0,
    margin: 0,
    maxHeight: 50,
    itemStyle: {
      color: '#636A7C',
      fontWeight: 'normal'
    }
  },
  xAxis: {
    tickmarkPlacement: 1,
    gridLineColor: '#E8EBF2',
    gridLineWidth: 1,
    labels: {
      // x轴旋转角度
      //rotation: 30,
      //限定用多少行来显示轴轴标签自动地的避免某些标签的重叠。设置为1表示禁用重叠检测
      maxStaggerLines: 1,
      //useHTML: true,
      style: {
        fontSize: 12
      }
    }
  },
  tooltip: {
    shared: true,
    valueSuffix: '',
    backgroundColor: 'rgba(41, 55, 69, 0.8)',
    borderColor: '#010202',
    borderRadius: 5,
    shadow: true,
    hideDelay: 10, //提示框隐藏延时。当鼠标移出图标后，数据提示框会在设定的延迟时间后消失。
    style: {
      zIndex: -1,
      color: '#FFFFFF',
      'pointer-events': 'none'
    },
    crosshairs: { //控制十字线
      width: 1,
      color: '#39B54A',
      dashStyle: 'shortdot'
    },
    useHTML: true
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    areaspline: {
      fillOpacity: 0.08,
      lineWidth: 2,
      //shadow: true,//是否为曲线加阴影
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: 'white',
        lineColor: null,
        lineWidth: 1
      }
    },
    spline: {
      fillOpacity: 0.08,
      lineWidth: 2,
      //shadow: true,//是否为曲线加阴影
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: 'white',
        lineColor: null,
        lineWidth: 1
      }
    },
    area: {
      fillOpacity: 0.7,
      lineWidth: 2,
      //shadow: true,//是否为曲线加阴影
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: 'white',
        lineColor: null,
        lineWidth: 1
      }
    },
    bar: {
      dataLabels: {
        enabled: true
      }
    },
    column: {}
  }
};

var DEFAULT_PIE_OPTIONS = exports.DEFAULT_PIE_OPTIONS = {
  chart: {
    type: 'pie'
  },
  title: {
    text: ''
  },
  tooltip: {
    backgroundColor: 'rgba(41, 55, 69, 0.8)',
    borderColor: '#010202',
    borderRadius: 5,
    shadow: true,
    style: {
      color: '#FFFFFF'
    },
    formatter: function formatter() {
      return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + '%' + '(' + this.y + ')';
    },
    percentageDecimals: 1
  },
  // legend: {
  //   borderWidth: 0,
  //   // layout: 'vertical',
  //   verticalAlign: 'center',
  //   align: 'center',
  //   x: -10,
  //   y: 0,
  //   itemMarginTop: 5,
  //   itemMarginBottom: 5,
  //   enabled: true
  // },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      depth: 35,
      dataLabels: {
        enabled: true,
        color: '#000000',
        connectorColor: '#000000',
        formatter: function formatter() {
          return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
        }
      },
      showInLegend: true,
      size: 200
    }
  },
  credits: {
    enabled: false
  }
};

/**
 * TODO 数据过多时的处理方式（分组还有其他逻辑？）
 */
function defaultTooltipFormatter(json, rowData, config) {
  var points = this.points || [this.point];
  var html = '';
  // 如果没有手动指定排序，则展示行数据的所有yN,zN,tN
  var tooltipFields = config.tooltipOrderList || _lodash2.default.keys(rowData).sort().filter(function (key) {
    return key !== 'x';
  });
  _lodash2.default.each(tooltipFields, function (key) {
    // 检查是否插入了自定义的数据，确认自定义数据已经配置
    var isExtra = !json.name[key];
    if (isExtra && (!config.tooltipExtraData || !config.tooltipExtraData[key][0])) {
      throw new Error('key:' + key + '不存在对应的名称，没有配置tooltipExtraData?');
    }

    var rawValue = isExtra ? config.tooltipExtraData[key][1] : rowData[key];
    // 只有yN才会在y轴显示
    var index = key[0] === 'y' && key.slice(1);
    // 可能显示z0或t0
    var series = index ? points[index].series : {
      color: '',
      type: 'empty',
      name: json.name[key] || config.tooltipExtraData[key][0]
    };

    // y轴value格式化函数
    var value = config.tooltipValueFormatter ? config.tooltipValueFormatter(rawValue, key) : rawValue || 0;
    html += '\n    <li>\n      <span style="background: ' + series.color + '" class="' + series.type + '"></span>\n      ' + series.name + ':\n      <span>' + value + '</span>\n    </li>\n    ';
  });

  return '\n    <h5 class="tip-title">' + this.x + '</h5>\n    <div class="tip-content">\n      <ul class="tip-list">' + html + '</ul>\n    </div>\n  ';
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
    return defaultTooltipFormatter.call(this, data, this.x.data, extraOptions);
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
        throw new Error('y轴返回值必须为数字：\n原始值:' + row[key] + '\n曲线名称:' + key + '\n位置索引' + j);
      }
      return transformed;
    });
  });
  var series = [];
  var yAxis = [];
  var defaultSerieType = extraOptions.chart && extraOptions.chart.type || 'line';
  _lodash2.default.each(yAxisList, function (item, i) {
    // 使用哪个y轴（仅双或多y轴时有效）
    var index = 0;
    // 是否在右侧的y轴
    var opposite = false;
    if (_lodash2.default.isArray(extraOptions.yAxisOppositeList)) {
      opposite = _lodash2.default.contains(extraOptions.yAxisOppositeList, yAxisKeys[i]);
      index = i;
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
      yAxis: index,
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
      allowDecimals: !!utils.tryGet(extraOptions.allowDecimals, i),
      labels: {
        style: {
          fontFamily: 'Arial, "微软雅黑", "宋体"'
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
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return _lodash2.default.merge({
    series: [{
      innerSize: '40%',
      data: transform2PieData(data)
    }]
  }, options);
}

// 生成曲线图、柱状图等配置
function getLineOptions(data) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var lineData = transform2LineData(data, options);
  return {
    series: lineData.series,
    chart: {
      // 图表类型，混合图的时候不需要指定type，在series里面指定type
      type: 'line'
    },
    legend: {
      enabled: lineData.legendEnabled
    },
    xAxis: {
      categories: lineData.categories,
      // x轴的步长
      tickInterval: lineData.tickInterval
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
  };
}