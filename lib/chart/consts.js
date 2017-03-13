'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TOOLTIP_BASE_STYLE = '\n  width:15px;\n  margin:0 10px 0 0;\n  vertical-align: middle;\n  font-size: 0;\n  overflow: hidden;\n';

var TOOLTIP_LI_STYLE = '\n  list-style:none;\n  padding: 2px 0\n';

var TOOLTIP_UL_STYLE = '\n  padding: 0;\n  margin: 0;\n';

var TOOLTIP_SPAN_STYLE = '\n  display: inline-block;\n';

exports.default = {
  TOOLTIP_BASE_STYLE: TOOLTIP_BASE_STYLE,
  TOOLTIP_SPAN_STYLE: TOOLTIP_SPAN_STYLE,
  TOOLTIP_UL_STYLE: TOOLTIP_UL_STYLE,
  TOOLTIP_LI_STYLE: TOOLTIP_LI_STYLE,
  TOOLTIP_BASE_HEIGHT_ATTR: 'height: 12px;',
  TOOLTIP_SPLINE_HEIGHT_ATTR: 'height: 3px;',
  // 全部曲线的颜色
  COLORS: ['#4da1ff', '#f4533c', '#ffae00', '#1aba9b', '#e552b0', '#af6bcb', '#9aab4f', '#6673d1', '#3ebb43', '#2c81e1', '#dd4544', '#e49518', '#0c967b', '#bd3998', '#944cb2', '#7b8d43', '#4e5ab0', '#299e2e', '#1665bd', '#bd3b47', '#d97707', '#06715d', '#8f2e73', '#7b3499', '#69821c', '#4a498f', '#18851d'],
  DEFAULT_LINE_TYPE: 'spline',
  DEFAULT_LINE_OPTIONS: {
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
  },
  DEFAULT_PIE_OPTIONS: {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    legend: {
      itemStyle: {
        fontWeight: 'normal'
      }
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
            return this.point.name + ' ' + this.percentage.toFixed(2) + ' %';
          },
          style: {
            fontWeight: 'normal'
          }
        },
        showInLegend: true,
        size: 200
      }
    },
    credits: {
      enabled: false
    }
  }
};