'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var ChartHelpers = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof Highcharts === 'undefined') {
  throw new Error('Highcharts is not bundled by default, load highcharts script by yourself.');
}

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
  componentDidMount: function componentDidMount() {
    var chartConfig = this.props.config.chart;
    var isPie = chartConfig && chartConfig.type === 'pie';
    this.renderChart(isPie ? this.getPieOptions() : this.getOptions());
  },
  render: function render() {
    return _react2.default.createElement('div', { ref: 'chart' });
  },
  renderChart: function renderChart(config) {
    config.chart.renderTo = this.refs.chart;
    // 外部组件使用
    this.chart = new Highcharts.Chart(config);
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