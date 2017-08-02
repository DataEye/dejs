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
              <dd><a target="_blank" href={`${host}/dmp.html`}>DMP</a></dd>
              <dd><a target="_blank" href={`${host}/dms.html`}>数据管家</a></dd>
              <dd><a target="_blank" href={`${host}/adve_v2.html`}>统计分析平台</a></dd>
            </dl>
            <dl>
              <dt>数据报告</dt>
              <dd><a target="_blank" href={`${host}/report?type=game`}>游戏分析报告</a></dd>
              <dd><a target="_blank" href={`${host}/report?type=automobile`}>汽车行业报告</a></dd>
              <dd><a target="_blank" href={`${host}/report?type=project`}>专题监测报告</a></dd>
            </dl>
            <dl>
              <dt>合作展示</dt>
              <dd><a target="_blank" href={`${host}/partners.html#games_module`}>案例合作游戏</a></dd>
              <dd><a target="_blank" href={`${host}/partners.html#users_module`}>合作客户</a></dd>
            </dl>
            <dl>
              <dt>关于我们</dt>
              <dd><a target="_blank" href={`${host}/about.html`}>公司简介</a></dd>
            </dl>
          </div>
          <div className="about">
            <span className="weixin"></span>
            <ul>
              <li><i className="fa fa-phone"></i>400-648-2833</li>
              <li>
                <i className="fa fa-qq"></i>
                <a href="http://wpa.qq.com/msgrd?v=3&uin=3173109221&site=qq&menu=yes" target="_blank">3173109221 </a>、
                <a href="http://wpa.qq.com/msgrd?v=3&uin=2030196706&site=qq&menu=yes" target="_blank">2030196706 </a>
              </li>
              <li><i className="fa fa-envelope"></i>support@dataeye.com</li>
            </ul>
          </div>
        </div>
        <div className="inner partner-inner">
          <p>
            <span>旗下品牌:</span><a href="https://www.splus.cn" target="_blank"><img src={`${host}/assets/img/splus_logo.png`} className="splus-logo" /></a>
          </p>
        </div>
        <div className="copyright">
          <a href="http://szcert.ebs.org.cn/cd987215-bdcd-4a5e-a936-cc59970970cd" target="_blank">
            <img src="http://szcert.ebs.org.cn/Images/govIcon.gif" title="深圳市市场监督管理局企业主体身份公示" alt="深圳市市场监督管理局企业主体身份公示" width="20" height="28" style={{borderWidth:'0px', border: 'none'}} />
          </a>
          <span className="security">
            Copyright &copy; {year} DataEye 深圳市慧动创想科技有限公司
            <a target="_blank" href="http://www.miitbeian.gov.cn/">粤ICP备13074195-1号</a>
          </span>
        </div>
      </div>
    )
  }
})
