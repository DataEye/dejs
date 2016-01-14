import React, {PropTypes} from 'react'
import _ from 'lodash'
import * as ChartHelpers from './utils'

if (typeof Highcharts === 'undefined') {
  throw new Error('Highcharts is not bundled by default, load highcharts script by yourself.')
}

export default React.createClass({
  propTypes: {
    // 原始数据源
    datalist: PropTypes.arrayOf(Object).isRequired,
    // 曲线名
    seriesNames: PropTypes.object.isRequired,
    // 用户配置
    config: PropTypes.object
  },

  getDefaultProps() {
    return {
      datalist: [],
      seriesNames: {},
      config: {
        chart: {
          type: 'line'
        }
      }
    }
  },

  componentDidMount() {
    let chartConfig = this.props.config.chart
    let isPie = chartConfig && chartConfig.type === 'pie'
    this.renderChart(isPie ? this.getPieOptions() : this.getOptions())
  },

  render() {
    return <div ref="chart"></div>
  },

  renderChart(config) {
    config.chart.renderTo = this.refs.chart
    // 外部组件使用
    this.chart = new Highcharts.Chart(config)
  },

  getOptions() {
    let options = ChartHelpers.getLineOptions({
      content: this.props.datalist,
      name: this.props.seriesNames
    }, this.props.config)
    // NOTE Object.assign会导致tootip的this为空
    return _.merge({}, ChartHelpers.DEFAULT_LINE_OPTIONS, options)
  },

  // 饼图配置比较简单
  getPieOptions() {
    let options = ChartHelpers.getPieOptions({
      content: this.props.datalist,
      name: this.props.seriesNames
    }, this.props.config)
    return _.merge({}, ChartHelpers.DEFAULT_PIE_OPTIONS, options)
  }
})
