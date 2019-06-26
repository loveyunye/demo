import React, { Component }  from 'react';
import { withRouter } from 'react-router-dom'

import './PersonCss.less';

@withRouter
class PersonPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      manageArr: [{
        icon: 'icon-banjichengyuan',
        name: '成员管理'
      }, {
        icon: 'icon-icon_shakehands',
        name: '亲友管理'
      }, {
        icon: 'icon-rice2',
        name: '膳食管理'
      }],
      myFunction: [{
        icon: 'icon-icon_little_taget',
        name: '我的目标'
      }, {
        icon: 'icon-icon_community_line',
        name: '我的动态'
      }, {
        icon: 'icon-icon_star',
        name: '我的收藏'
      },  {
        icon: 'icon-icon_certificate_fil',
        name: '我的徽章'
      }],
    }
  }
  exit = () => {
    this.props.history.push('/login');
  }
  render() {
    return (
      <div className="person-container">
        <div className="person-header">
          <div className="person-title">
            <span>我的</span>
          </div>
          <div className="person-me">
            <div className="avatar-me">
              <div className="avatar"></div>
              <div className="msg">
                <span>kabutong</span>
                <span>0 粉丝</span>
                <span>1 粉丝</span>
              </div>
            </div>
            <div className="person-main">
              个人主页
            </div>
          </div>
          <div className="person-manage">
            <div className="container">
              {
                this.state.manageArr.map((item) => {
                  return <div key={item.icon}>
                    <div><i className={`iconfont ${item.icon}`}></i></div>
                    <span>{item.name}</span>
                  </div>
                })
              }
            </div>
          </div>
        </div>

        <div className="my-function">
          <div className="function-group">
            {
              this.state.myFunction.map((item) => {
                return <div key={item.icon} className="function-item">
                  <span>
                    <i className={`iconfont ${item.icon}`}></i>
                  </span>
                  <span>{item.name}</span>
                </div>
              })
            }
          </div>

          <div className="function-group">
            <div  className="function-item" onClick={this.exit}>
              <span>
                <i className={`iconfont icon-tuichu`}></i>
              </span>
              <span>退出</span>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
};

export default PersonPage;