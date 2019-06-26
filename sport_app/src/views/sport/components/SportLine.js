import React from 'react';
import F2 from '@antv/f2';
import './SportLine.less';
// const F2 = require('@antv/f2');

export default class SportLine extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: `mountNode${parseInt( Math.random()*100000)}`
    }
  }
  render() {

    return (
      <div className="chart-wrapper">
        <canvas id={this.state.id}></canvas>
        <div className="chart-unit">单位：{this.props.unit}</div>
      </div>
    )
  }

  chartRender = (  data, fun ) => {
    const widthCanvas =  document.body.clientWidth - 10;
    const vm = this;
    // 创建 Chart 图表对象
    const chart = new F2.Chart({
      id: vm.state.id,
      pixelRatio: window.devicePixelRatio,
      width: ''+widthCanvas,
      height: '200',
    });
    const defs = {
      value: {
        tickCount: 4
      }
    };
    chart.axis('value', {
      label: null
    });
    
    chart.source(data, defs);
    chart.tooltip({
      showCrosshairs: true,
      custom: true,
      crosshairsStyle: {
        stroke: '#2DC67F',
        lineWidth: 1,
      },
      onChange(obj) {
        // 处理回调函数
        fun(obj.items[0].origin.date);
      },
      showXTip: true,
    });

    data.forEach(function(obj) {
      chart.guide().text({
        position: [obj.date, obj.value],
        content: obj.value,
        style: {
          textBaseline: 'bottom',
          textAlign: 'center',
          color:'#2DC67F',
          fontSize: '14',
        },
        offsetY: -8,
        offsetX: -4
      });
    });
    chart.line().position('date*value').shape('smooth').color('#2DC67F');
    chart.point().position('date*value').color('#177147').style('medalType', {
      lineWidth: 1.5,
      fill: '#fff',
      stroke: function stroke(val) {
        return '#2DC67F'
      }
    });
    chart.area().position('date*value').shape('smooth').color('l(-90) 0.03:#fff 1:#177147');
    chart.render();
  }

  showItem = (date)  => {
    // 传给父组件
    this.props.showItem({
      date: date,
      name: this.props.name,
      unit: this.props.unit,
      data: this.props.data.find(item => item.date === date).item
    })
  }


  componentDidMount() {
    const data = this.props.data.map(item => {
      return {
        date: item.date,
        value: item.value
      }
    });
    this.chartRender(data, this.showItem);
  }
}