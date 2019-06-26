import React, { Component }  from 'react';
import { WingBlank, WhiteSpace, Tabs} from 'antd-mobile';
import SportItem from './components/SportItem.js';
import SportLine from './components/SportLine.js';
import SportPlan from './components/SportPlan.js';
import './SportPage.less';

const tabs = [
  { title: '运动' },
  { title: '体重' },
  { title: '体脂率' },
];
export default class DynamicPage extends Component{
  state = {
    date: '',
    str: '数据来源：您的日间运动时间总合',
    sportData: [],
    allSportData: [
      {
        date: '06-11',
        item: [
          {
            oClock: '08:00',
            time: 30,
            weight: 67,
            fatRate: 12.6
          },
          {
            oClock: '18:00',
            time: 40,
            weight: 64.3,
            fatRate: 12
          }
        ]
      },
      
      {
        date: '06-12',
        item: [
          {
            oClock: '14:10',
            time: 45,
            weight: 65,
            fatRate: 12
          }
        ]
      },
      {
        date: '06-13',
        item: [
          {
            oClock: '7:00',
            time: 32,
            weight: 62,
            fatRate: 12
          },
          {
            oClock: '13:00',
            time: 35,
            weight: 62,
            fatRate: 11.3
          },
          {
            oClock: '21:00',
            time: 20,
            weight: 66,
            fatRate: 12
          }
        ]
      },
      {
        date: '06-14',
        item: [
          {
            oClock: '07:25',
            time: 23,
            weight: 62,
            fatRate: 12.4
          },
          {
            oClock: '19:09',
            time: 39,
            weight: 61,
            fatRate: 10.9
          }
        ]
      },
      {
        date: '06-15',
        item: [
          {
            oClock: '08:20',
            time: 35,
            weight: 62,
            fatRate: 10.1
          },
          {
            oClock: '18:43',
            time: 52,
            weight: 62,
            fatRate: 9.8
          }
        ]
      },
      {
        date: '06-16',
        item: [
          {
            oClock: '07:20',
            time: 34,
            weight: 64,
            fatRate: 10.5
          },
          {
            oClock: '19:32',
            time: 57,
            weight: 64,
            fatRate: 10.5
          }
        ]
      }

    ]
  }

  // 设置下方 每次运动时间/体重/体脂率
  setItem = (itemData) => {
    let sportData;
    let str;
    switch(itemData.name) {
      case '体脂率':
        sportData = itemData.data.map(i => {
          return {
            oClock: i.oClock,
            data:[
              { unit: '%', name: '体脂率',value: i.fatRate},
              { unit: '分钟', name: '运动',value: i.time}
            ]
          }
        });
        str = '数据来源：您的日间平均体脂率';
      break;
      case '运动':
        sportData = itemData.data.map(i => {
          return {
            oClock: i.oClock,
            data:[
              { unit: '分钟', name: '运动',value: i.time},
              { unit: 'kg', name: '体重',value: i.weight}
            ]
          }
        });
        str = '数据来源：您的日间运动时间总合';
      break;
      default :
        sportData = itemData.data.map(i => {
          return {
            oClock: i.oClock,
            data:[
              { unit: 'kg', name: '体重',value: i.weight},
              { unit: '%', name: '体脂率',value: i.fatRate}
            ]
          }
        });
        str = '数据来源：您的日间平均体重值';
    }


    this.setState({
      sportData: sportData,
      str: str,
      date: itemData.date
    });
  }
  
  // tab 切换
  tabChange = (tab) => {
    if(this.state.allSportData.length) {
      this.setItem({
        date: this.state.allSportData[this.state.allSportData.length-1].date,
        name: tab.title,
        data: this.state.allSportData.map(item => item.item)[this.state.allSportData.length-1]
      })
    }
  }

  render() {
    const tabData = [
      {
        unit: '分钟',
        name: '运动',
        data: this.state.allSportData.map(item => {
          return {
            date: item.date,
            value : item.item.map(i =>i.time).reduce((all, i) => all + i),
            item: item.item
          }
        })
      },
      {
        unit: 'kg',
        name: '体重',
        data: this.state.allSportData.map(item => {
          return {
            date: item.date,
            value : Number(Number(item.item.map(i =>i.weight).reduce((all, i) => all + i)/item.item.length).toFixed(2)),
            item: item.item
          }
        })
      },
      {
        unit: '%',
        name: '体脂率',
        data: this.state.allSportData.map(item => {
          return {
            date: item.date,
            value : Number(Number(item.item.map(i =>i.fatRate).reduce((all, i) => all + i)/item.item.length).toFixed(2)),
            item: item.item
          }
        })
      },
    ]


    return (
      <div className="sport-container">
        <div className="sport-title">
          <span>运动</span>
        </div>
        <div className="tab-container">
          <Tabs tabs={tabs}
            initialPage={0}
            useOnPan={false}
            tabBarActiveTextColor={'#13cb9b'}
            // tabBarInactiveTextColor={'#13cb9b'}
            tabBarUnderlineStyle={{
              borderColor: '#13cb9b'
            }}
            onChange={this.tabChange}
          >
            {
              tabData.map((item) => {
                return <div style={{ height: '200px', backgroundColor: '#fff' }} key={item.name}>
                  <SportLine data={item.data} unit={item.unit} name={item.name} showItem={this.setItem}/>
                </div>
              })
            }
          </Tabs>
        </div>
        <div className="notice">
          <WingBlank>
            <span>!</span> {this.state.str} <span>{this.state.date}</span>
          </WingBlank>
        </div>
        
        <WhiteSpace/>
        {/* <SportPlan sportPlan={this.state.sportPlan}/> */}
        <SportPlan/>

        <WingBlank>
          {
            this.state.sportData.map((item, index) => {
              return <SportItem key={item.oClock + index} oClock={item.oClock} sportData={item.data}/>
            })
          }
        </WingBlank>
      </div>
    )
  }

  componentDidMount() {
    if(this.state.allSportData.length) {
      this.setItem({
        date: this.state.allSportData[this.state.allSportData.length-1].date,
        name: '运动',
        data: this.state.allSportData.map(item => item.item)[this.state.allSportData.length-1]
      })
    }
  }
};