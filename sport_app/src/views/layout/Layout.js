import React from 'react';
import Dynamic from '../dynamic/DynamicPage';
import Person from '../person/PersonPage';
import Sport from '../sport/SportPage'
import Hobbies from '../hobbies/HobbiesPage'
import { TabBar } from 'antd-mobile';


export default class IndexPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'hobbies',
      hidden: false,
      fullScreen: true,
      navRouters: [
        {
          title: '动态',
          key: 'dynamic',
          icon: 'icon-icon_community_line',
          page(){
            return <Dynamic/>
          }
        },
        {
          title: '运动',
          key: 'sport',
          icon: 'icon-icon_sport',
          page(){
            return <Sport/>
          }
        },
        {
          title: '攻略',
          key: 'hobbies',
          icon: 'icon-hobbies',
          page(){
            return <Hobbies/>
          }
        },
        {
          title: '我的',
          key: 'person',
          icon: 'icon-icon_signal',
          page(){
            return <Person/>
          }
        },
      ]
    };
  }
  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#aaa"
          tintColor="#07b68d"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          {
            this.state.navRouters.map((item) => {
              return <TabBar.Item
                icon={
                  <div className={`iconfont ${item.icon}`} style={{fontSize:'2rem', width: '22px', height: '22px', color: '#aaa'}} />
                }
                selectedIcon={
                  <div className={`iconfont ${item.icon}`} style={{fontSize:'2rem', width: '22px', height: '22px', color: '#07b68d'}} />
                }
                title={item.title}
                key={item.key}
                selected={this.state.selectedTab === item.key}
                onPress={() => {
                  this.setState({
                    selectedTab: item.key,
                  });
                }}
              >
                {
                  item.page()
                }
              </TabBar.Item>
            })
          }
        </TabBar>
      </div>
    );
  }
};
