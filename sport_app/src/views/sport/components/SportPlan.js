import React from 'react';

const sportPlan = [{
  icon: 'icon-icon_index_line',
  name: '月度趋势'
},{
  icon: 'icon-icon_compile',
  name: '运动清单'
},{
  icon: 'icon-icon_notice',
  name: '计划提醒'
},{
  icon: 'icon-icon_attestation',
  name: '完成达标'
}];

export default function(props) {
  return (
    <div className="sport-plan">
      {
        // props.sportPlan.map(item => {
        sportPlan.map(item => {
          return <div key={item.icon} className="plan-item">
            <span><i className={`iconfont ${item.icon}`}></i></span>
            <span>{item.name}</span>
          </div>
        })
      }
    </div>
  )
}