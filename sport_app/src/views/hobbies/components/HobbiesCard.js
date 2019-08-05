import React from 'react';
import './HobbiesCard.less';

export default class HobbiesCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={`${this.props.classProps} card-wrapper`}>
        <div className="message">
          <div className="message-info">
            <div className="message-main">
              <div className="message-title">
                <span>{this.props.cardMess.title}</span>
              </div>
              <div className="message-description">
                <span>{this.props.cardMess.description}</span>
              </div>
              <div></div>
            </div>
            <div className="read-btn">
              <span>阅读</span>
            </div>
          </div>
        </div>
        <div className="img">
          <img src={this.props.cardMess.url} alt="暂无图片" height="100%" width="100%"/>
        </div>
      </div>
    )
  }
}