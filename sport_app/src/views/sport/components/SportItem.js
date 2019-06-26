import React from 'react';
import './SportItem.less';

export default function(props) {
  return (
    <div className="sport-item">
      <div className="sport-time">
        <span><i className="iconfont icon-shijian1"></i></span>
        <span>{props.oClock}</span>
      </div>
      <div className="sport-msg">
        {
          props.sportData.map((item, index) => {
            return <div className="msg-item" key={item.value + index}>
              <span>{item.name}</span>
              <span>{Number(item.value).toFixed(1)}</span>
              <sub>{item.unit}</sub>
            </div>
          })
        }
      </div>
    </div>
  )
}