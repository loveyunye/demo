import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import './DynamicCss.less';

class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 180,
      pictureLeft: [
        {
          url: 'http://47.102.192.173/banner_03.png',
          praise: 18,
          isPraise: false,
          title: '运动时刻',
          publisher: '徐秋明'
        },
        {
          url: 'http://47.102.192.173/banner_12.png',
          praise: 54,
          title: '称重打卡',
          isPraise: true,
          publisher: '方珂珂'
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
          praise: 14,
          title: '称重打卡',
          isPraise: false,
          publisher: '王自如'
        },
        {
          url: 'http://47.102.192.173/banner_05.png',
          praise: 89,
          title: '运动时刻',
          isPraise: false,
          publisher: '杭伟军'
        }
      ],
      pictureRight: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png',
          praise: 34,
          title: '称重打卡',
          isPraise: true,
          publisher: '李红霞'
        },
        {
          url: 'http://47.102.192.173/banner_14.png',
          praise: 23,
          title: '运动时刻',
          isPraise: false,
          publisher: '王自如'
        },
        {
          url: 'http://47.102.192.173/banner_13.png',
          praise: 64,
          title: '运动时刻',
          isPraise: true,
          publisher: '方珂珂'
        },
        
        {
          url: 'http://47.102.192.173/banner_07.png',
          praise: 14,
          title: '称重打卡',
          isPraise: false,
          publisher: '杜宾'
        }
      ]
    }
  }
  
  praiseHandler = (str, index) => {
    const dynamicArr = this.state[`picture${str}`].map(item => Object.assign({},item));
    dynamicArr[index].isPraise ? dynamicArr[index].praise-- : dynamicArr[index].praise++;
    dynamicArr[index].isPraise = !dynamicArr[index].isPraise;
    if(str === 'Left') {
      this.setState({
        pictureLeft: dynamicArr
      });
    } else {
      this.setState({
        pictureRight: dynamicArr
      });
    }
  }

  render() {
    return (
      <div className="dynamic-container">
        <div className="dynamic-header">
          <div className="dynamic-title">
            <span>动态</span>
          </div>
          <WingBlank>
            <Carousel
              autoplay={true}
              infinite
            >
              {this.state.data.map(val => (
                <div className="carousel-block" key={val}>
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                  />
                </div>
              ))}
            </Carousel>
            <div className="dynamic-title-list">
              <span>精选动态</span>
            </div>
          </WingBlank>
        </div>

        <div className="dynamic-list">
          <WingBlank>
            <div className="picture-wall">
              <div className="picture-wall-list">
                {
                  this.state.pictureLeft.map((item,index) => {
                    return <div key={item.publisher+index} className="picture-item">
                      <img src={item.url} alt="暂无" width="100%"/>
                      <div className="picture-msg">
                        <span>#{item.title}</span>
                        <div className="msg-bottom">
                          <div className="msg-avatar">
                            <div className="avatar"></div>
                            <span>{item.publisher}</span>
                          </div>
                          <div className="praise-msg" onClick={this.praiseHandler.bind(this, 'Left', index)}>
                            <i className={`iconfont ${item.isPraise?'icon-icon_likegood_fill': 'icon-icon_likegood'}`}></i> {item.praise}
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
              <div className="picture-block"></div>
              <div className="picture-wall-list">
                {
                  this.state.pictureRight.map((item,index) => {
                    return <div key={item.publisher+index} className="picture-item">
                      <img src={item.url} alt="暂无" width="100%"/>
                      <div className="picture-msg">
                        <span>#{item.title}</span>
                        <div className="msg-bottom">
                          <div className="msg-avatar">
                            <div className="avatar"></div>
                            <span>{item.publisher}</span>
                          </div>

                          <div className="praise-msg" onClick={this.praiseHandler.bind(this, 'Right', index)}>
                            <i className={`iconfont ${item.isPraise?'icon-icon_likegood_fill': 'icon-icon_likegood'}`}></i> {item.praise}
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </WingBlank>
        </div>
      </div>
        
    );
  }
}
export default Dynamic