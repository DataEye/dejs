/**
 * DataEye 业务系统通用底部
 */

import React from 'react'

export default React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false
  },

  render() {
    const year = new Date().getUTCFullYear()
    const host = 'https://www.dataeye.com'
    return (
       <div id="footer">
        <div className="inner">
          <div className="footer-info">
            <dl>
              <dt>产品与服务</dt>
              <dd><a href={`${host}/adve.html`}>广告效果监测</a></dd>
              <dd><a href={`${host}/channel.html`}>移动应用统计分析</a></dd>
              <dd><a href={`${host}/product.html`}>移动游戏分析</a></dd>
              <dd><a href={`${host}/h5.html`}>HTML5分析</a></dd>
              <dd><a href={`${host}/dmp.html`}>泛娱乐DMP</a></dd>
            </dl>
            <dl>
              <dt>数据报告</dt>
              <dd><a href={`${host}/report.html#game`}>游戏分析报告</a></dd>
              <dd><a href={`${host}/report.html#ent`}>泛娱乐行业报告</a></dd>
              <dd><a href={`${host}/report.html#project`}>专题监测报告</a></dd>
            </dl>
            <dl>
              <dt>合作展示</dt>
              <dd><a href={`${host}/partners.html#games_module`}>案例合作游戏</a></dd>
              <dd><a href={`${host}/partners.html#companies_module`}>客户寄语</a></dd>
              <dd><a href={`${host}/partners.html#users_module`}>合作客户</a></dd>
            </dl>
            <dl>
              <dt>关于我们</dt>
              <dd><a href={`${host}/about.html`}>公司简介</a></dd>
              <dd><a href={`${host}/partners.html`}>企业文化</a></dd>
              <dd><a href={`${host}/job.html`}>招聘信息</a></dd>
            </dl>
          </div>
          <div className="about">
            <span className="weixin"></span>
            <ul>
              <li><i className="fa fa-phone"></i>400-648-2833</li>
              <li><i className="fa fa-qq"></i>400-648-2833</li>
              <li><i className="fa fa-envelope"></i>customer@dataeye.com</li>
            </ul>
          </div>
        </div>
        <div className="clear"></div>
        <div className="copyright">
          <span className="security">
            Copyright &copy; {year} DataEye 深圳市慧动创想科技有限公司
            <a target="_blank" href="http://www.miitbeian.gov.cn/">粤ICP备13074195-1号</a>
          </span>
          <a target="_blank" href="http://szcert.ebs.org.cn/6c5c8adf-2bec-43fc-b927-cc3d3a70f866">
            <img width="112" height="40" src="https://www.dataeye.com/assets/img/newGovIcon.gif" />
          </a>
        </div>
      </div>
    )
  }
})
