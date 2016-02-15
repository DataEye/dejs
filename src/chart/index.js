import React, {PropTypes} from 'react'
import NoData from '../no-data'
import _ from 'lodash'
import Immutable from 'immutable'
import * as ChartHelpers from './utils'
import Highcharts from 'highcharts'

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
          type: ChartHelpers.DEFAULT_LINE_TYPE
        }
      }
    }
  },

  /**
   * 第一次mount的时候初始化数据肯定为空
   * 数据一般都是通过ajax请求更新
   */
  componentDidMount() {
    if (this.props.datalist.length) {
      this.renderChart()
    }
  },

  componentWillUnmount() {
    this.chart = null
  },

  /**
   * render之后如果数据不为空则绘图
   * 绘图仍然需要比较前后数据是否一致
   * 只在数据真正变化的时候绘图
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.datalist.length) {
      let current = Immutable.fromJS(this.props)
      let next = Immutable.fromJS(prevProps)
      if (!Immutable.is(current, next)) {
        this.renderChart()
      }
    }
  },

  render() {
    // 清除上一次highcharts引用
    if (!this.props.datalist.length) {
      this.chart = null
      return <NoData />
    }

    return <div ref="chart" style={{minHeight: '360px'}}></div>
  },

  renderChart() {
    let chartConfig = this.props.config.chart
    let isPie = chartConfig && chartConfig.type === 'pie'
    let config = isPie ? this.getPieOptions() : this.getOptions()
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
