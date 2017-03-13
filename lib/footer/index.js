'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'footer',
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render: function render() {
    var year = new Date().getUTCFullYear();
    var host = 'https://www.dataeye.com';
    return _react2.default.createElement(
      'div',
      { id: 'footer' },
      _react2.default.createElement(
        'div',
        { className: 'inner' },
        _react2.default.createElement(
          'div',
          { className: 'footer-info' },
          _react2.default.createElement(
            'dl',
            null,
            _react2.default.createElement(
              'dt',
              null,
              '\u4EA7\u54C1\u4E0E\u670D\u52A1'
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/dmp.html' },
                'DMP'
              )
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/dms.html' },
                '\u6570\u636E\u7BA1\u5BB6'
              )
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/adve_v2.html' },
                '\u7EDF\u8BA1\u5206\u6790\u5E73\u53F0'
              )
            )
          ),
          _react2.default.createElement(
            'dl',
            null,
            _react2.default.createElement(
              'dt',
              null,
              '\u6570\u636E\u62A5\u544A'
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/report?type=game' },
                '\u6E38\u620F\u5206\u6790\u62A5\u544A'
              )
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/report?type=automobile' },
                '\u6C7D\u8F66\u884C\u4E1A\u62A5\u544A'
              )
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/report?type=project' },
                '\u4E13\u9898\u76D1\u6D4B\u62A5\u544A'
              )
            )
          ),
          _react2.default.createElement(
            'dl',
            null,
            _react2.default.createElement(
              'dt',
              null,
              '\u5408\u4F5C\u5C55\u793A'
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/partners.html#games_module' },
                '\u6848\u4F8B\u5408\u4F5C\u6E38\u620F'
              )
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/partners.html#users_module' },
                '\u5408\u4F5C\u5BA2\u6237'
              )
            )
          ),
          _react2.default.createElement(
            'dl',
            null,
            _react2.default.createElement(
              'dt',
              null,
              '\u5173\u4E8E\u6211\u4EEC'
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'a',
                { target: '_blank', href: host + '/about.html' },
                '\u516C\u53F8\u7B80\u4ECB'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'about' },
          _react2.default.createElement('span', { className: 'weixin' }),
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-phone' }),
              '400-648-2833'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-qq' }),
              _react2.default.createElement(
                'a',
                { href: 'http://wpa.qq.com/msgrd?v=3&uin=3173109221&site=qq&menu=yes', target: '_blank' },
                '3173109221 '
              ),
              '\u3001',
              _react2.default.createElement(
                'a',
                { href: 'http://wpa.qq.com/msgrd?v=3&uin=2030196706&site=qq&menu=yes', target: '_blank' },
                '2030196706 '
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-envelope' }),
              'support@dataeye.com'
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'inner partner-inner' },
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            '\u65D7\u4E0B\u54C1\u724C:'
          ),
          _react2.default.createElement(
            'a',
            { href: 'https://www.splus.cn', target: '_blank' },
            _react2.default.createElement('img', { src: host + '/assets/img/splus_logo.png', className: 'splus-logo' })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'copyright' },
        _react2.default.createElement(
          'a',
          { href: 'http://szcert.ebs.org.cn/cd987215-bdcd-4a5e-a936-cc59970970cd', target: '_blank' },
          _react2.default.createElement('img', { src: 'http://szcert.ebs.org.cn/Images/govIcon.gif', title: '\u6DF1\u5733\u5E02\u5E02\u573A\u76D1\u7763\u7BA1\u7406\u5C40\u4F01\u4E1A\u4E3B\u4F53\u8EAB\u4EFD\u516C\u793A', alt: '\u6DF1\u5733\u5E02\u5E02\u573A\u76D1\u7763\u7BA1\u7406\u5C40\u4F01\u4E1A\u4E3B\u4F53\u8EAB\u4EFD\u516C\u793A', width: '20', height: '28', border: '0', style: { borderWidth: '0px', border: 'none' } })
        ),
        _react2.default.createElement(
          'span',
          { className: 'security' },
          'Copyright \xA9 ',
          year,
          ' DataEye \u6DF1\u5733\u5E02\u6167\u52A8\u521B\u60F3\u79D1\u6280\u6709\u9650\u516C\u53F8',
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'http://www.miitbeian.gov.cn/' },
            '\u7CA4ICP\u590713074195-1\u53F7'
          )
        )
      )
    );
  }
}); /**
     * DataEye 业务系统通用底部
     */