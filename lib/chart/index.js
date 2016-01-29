'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noData = require('../no-data');

var _noData2 = _interopRequireDefault(_noData);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('./utils');

var ChartHelpers = _interopRequireWildcard(_utils);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'chart',

  propTypes: {
    // 原始数据源
    datalist: _react.PropTypes.arrayOf(Object).isRequired,
    // 曲线名
    seriesNames: _react.PropTypes.object.isRequired,
    // 用户配置
    config: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      datalist: [],
      seriesNames: {},
      config: {
        chart: {
          type: 'line'
        }
      }
    };
  },

  /**
   * 第一次mount的时候初始化数据肯定为空
   * 数据一般都是通过ajax请求更新
   */
  componentDidMount: function componentDidMount() {
    if (this.props.datalist.length) {
      this.renderChart();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.chart = null;
  },

  /**
   * render之后如果数据不为空则绘图
   * 绘图仍然需要比较前后数据是否一致
   * 只在数据真正变化的时候绘图
   */
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.props.datalist.length) {
      var current = _immutable2.default.fromJS(this.props);
      var next = _immutable2.default.fromJS(prevProps);
      if (!_immutable2.default.is(current, next)) {
        this.renderChart();
      }
    }
  },
  render: function render() {
    // 清除上一次highcharts引用
    if (!this.props.datalist.length) {
      this.chart = null;
      return _react2.default.createElement(_noData2.default, null);
    }

    return _react2.default.createElement('div', { ref: 'chart', style: { minHeight: '360px' } });
  },
  renderChart: function renderChart() {
    var chartConfig = this.props.config.chart;
    var isPie = chartConfig && chartConfig.type === 'pie';
    var config = isPie ? this.getPieOptions() : this.getOptions();
    config.chart.renderTo = this.refs.chart;
    // 外部组件使用
    this.chart = new _highcharts2.default.Chart(config);
  },
  getOptions: function getOptions() {
    var options = ChartHelpers.getLineOptions({
      content: this.props.datalist,
      name: this.props.seriesNames
    }, this.props.config);
    // NOTE Object.assign会导致tootip的this为空
    return _lodash2.default.merge({}, ChartHelpers.DEFAULT_LINE_OPTIONS, options);
  },

  // 饼图配置比较简单
  getPieOptions: function getPieOptions() {
    var options = ChartHelpers.getPieOptions({
      content: this.props.datalist,
      name: this.props.seriesNames
    }, this.props.config);
    return _lodash2.default.merge({}, ChartHelpers.DEFAULT_PIE_OPTIONS, options);
  }
});