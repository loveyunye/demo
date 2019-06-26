import React, { Component }  from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'antd-mobile';

import './LoginCss.less';
@withRouter
class LoginPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      account: '',
      password: '',
      isPassword: true,
      moreLogin: [
        'icon-qq', 'icon-weixin', 'icon-weibo'
      ]
    }
  }
  goLogin = () => {
    if(!this.state.account || !this.state.password) {
      this.setState({
        errorMsg: '登录信息有误！'
      })
      return false;
    }
    this.props.history.push('/main');
  }

  accountChange = (event) => {
    this.setState({
      account: event.target.value
    })
  }

  passwordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  setPassword = () => {
    this.setState({
      isPassword: !this.state.isPassword
    })
  }

  clearPassword = (str) => {
    this.setState({
      password: ''
    })
  }

  clearAccount = (str) => {
    this.setState({
      account: ''
    })
  }

  render() {
    return (
      <div className="container" >
        <div className="login-block-container">
          <div>
            <div className="login-msg">
              <span>登录</span>
              <span>账号密码登录</span>
              <span>{this.state.errorMsg}</span>
            </div>
            
            <form>
              <div className="form-item">
                <input value={this.state.account} onChange={this.accountChange} placeholder="账号"/>
                <span>
                  {
                    this.state.account.length > 0?<i className="iconfont icon-Closewithcircle" onClick={this.clearAccount}></i>: ''
                  }
                </span>
              </div>
              <div className="form-item">
                <input type={this.state.isPassword?'password':'text'} value={this.state.password} onChange={this.passwordChange} placeholder="密码"/>
                <span>
                  {
                    this.state.password.length > 0?<i className="iconfont icon-biyan" onClick={this.setPassword}></i>: ''
                  }
                  {
                    this.state.password.length > 0?<i className="iconfont icon-Closewithcircle" onClick={this.clearPassword}></i>: ''
                  }
                </span>
              </div>
              <Button onClick={this.goLogin} loading={false}>登录</Button>
            </form>
          </div>
          
        </div>
        <div className="more-login">
          <div className="more-login-title">
            <span>or</span>
          </div>
          <div className="more-login-container">
            {
              this.state.moreLogin.map((item) => {
                return <div key={item}>
                  <i className={`iconfont ${item}`} ></i>
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
};

export default LoginPage;