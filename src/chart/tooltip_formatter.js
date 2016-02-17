import _ from 'lodash'
import CONST from './consts'

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
export function getSerieFromPoint(point) {
  if (!point) return null

  let originalSeries = point.series.chart.options.series
  let index = point.series.index
  return originalSeries[index]
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
export default function defaultTooltipFormatter(json, rowData, {tooltipOrderList, tooltipExtraData, tooltipValueFormatter}) {
  /**
  * 用户可能取消某些曲线的展示，这个时候points仅为部分数据
  * indexes为这些曲线各自的索引,用于判断某个曲线是否展示提示
  */
  let points = this.points || [this.point]
  let indexes = points.map((p) => p.series.index)
  let liList = ''

  /**
  * chart组件支持手动对提示框数据排序
  * 如果没有指定排序信息,需要把x和id等额外的数据信息排除
  * 另外提示框里面可能插入一些rowData不包含的数据
  * 这个时候需要把这些额外的数据通过tooltipExtraData传进来
  * 比如tooltipOrderList里面包含z0,但是rowData里面没有,那么这里要传入{z0: [名字,数值]}
  */
  let tooltipFields = tooltipOrderList || _.keys(rowData).sort().filter((k) => k !== 'id' && k !== 'x')
  _.each(tooltipFields, (key) => {
    let isExtra = !json.name[key]
    if (isExtra) {
      if (!tooltipExtraData) {
        throw new Error(`${key}找不到对于的tootip数据,请检查原始数据或者tooltipOrderList的配置是否正确`)
      }
      if (!tooltipExtraData[key] || tooltipExtraData[key].length !== 2) {
        throw new Error(`tooltipExtraData.${key}应该是一个长度为2的数组([strLabel, numValue])`)
      }
    }

    let fieldValue = isExtra ? tooltipExtraData[key][1] : rowData[key]
    let fieldLabel = isExtra ? tooltipExtraData[key][0] : json.name[key]

    /**
    * 只有y开头的曲线才会在y轴显示,其它都是辅助数据
    * 另外y开头的曲线可能被用户主动隐藏,这个时候要忽略掉
    */
    let keyIndex = key[0] === 'y' && parseInt(key.slice(1), 10)
    let pointSerieIndex = _.indexOf(indexes, keyIndex)
    if (key[0] === 'y' && pointSerieIndex === -1) return

    let series, serieTypeStyle
    /**
    * 目前提示框左侧的区分线只有两种:细线和粗线,颜色和曲线颜色相同
    * spline是细线其它都是粗线,后续这里按需扩展
    */
    if (pointSerieIndex !== -1) {
      series = points[pointSerieIndex].series
      serieTypeStyle = getSerieFromPoint(points[pointSerieIndex]).type === CONST.DEFAULT_LINE_TYPE ?
        CONST.TOOLTIP_SPLINE_HEIGHT_ATTR : CONST.TOOLTIP_BASE_HEIGHT_ATTR
    } else {
      // 可能显示z0或t0,这时返回一个包装的替代对象
      series = {
        color: '',
        name: fieldLabel
      }
      serieTypeStyle = CONST.TOOLTIP_BASE_HEIGHT_ATTR
    }

    // 对每个field都可以进行按key进行格式化
    let value = tooltipValueFormatter ? tooltipValueFormatter(fieldValue, key) : (fieldValue || 0)
    liList += `
      <li style="${CONST.TOOLTIP_LI_STYLE}">
        <span style="background: ${series.color};${serieTypeStyle + CONST.TOOLTIP_BASE_STYLE + CONST.TOOLTIP_SPAN_STYLE}}"></span>
        <span style="${CONST.TOOLTIP_SPAN_STYLE};min-width:84px;">${series.name}: </span>
        <span style="${CONST.TOOLTIP_SPAN_STYLE}">${value}</span>
      </li>
    `
  })

  return `
    <h5>${this.x}</h5>
    <div>
      <ul style="${CONST.TOOLTIP_UL_STYLE}">${liList}</ul>
    </div>
  `
}
