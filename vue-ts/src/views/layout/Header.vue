<template>
  <div class="header-wrap">
    <!-- 头像 / 导航 -->
    <div class="header-nav">
      <div class="avatar" @click="routerHandler">
        <div class="avatar-img"></div>
        <div class="avatar-descript">
          <div>KABUTONG</div>
          <div>社区论坛</div>
        </div>
      </div>
      <div class="nav-list" v-show="!isMobile">
        <router-link v-for="item in routerArr" :key="item.name" :to="item.path">
          <i :class="`iconfont ${item.icon}`"></i><span>{{item.title}}</span>
        </router-link>
      </div>
    </div>
    <!-- 登录块 -->
    <div class="header-login">
      登录
    </div>
    <!-- 侧标兰 -->
    <div class="side-nav nav-list" v-show="isMobile&&showSideNav" @click="showSideNav=false">
      <div class="block-nav"></div>
      <router-link v-for="item in routerArr" :key="item.name" :to="item.path">
        <i :class="`iconfont ${item.icon}`"></i><span>{{item.title}}</span>
      </router-link>
      <div class="block-nav"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component,  Vue, Prop } from 'vue-property-decorator';
import { constantRouter } from '../../router';

@Component
export default class Header extends Vue {
  private routerArr: any = constantRouter;
  private isMobile: boolean = false;
  private showSideNav: boolean = false;
  // 路由操作 / 打开|隐藏侧边导航栏
  public routerHandler(): void {
    if ( this.isMobile ) {
      this.showSideNav = !this.showSideNav;
    } else {
      this.$router.push({ path: '/find' });
    }
  }
  // 判断页面宽度
  public jodgeMobild(): void {
    if ( document.body.clientWidth < 700 ) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
      if ( this.showSideNav ) {
        this.showSideNav = false;
      }
    }
  }
  // 组件实例挂载完成
  public mounted(): void {
    this.jodgeMobild();
    window.addEventListener('resize', this.jodgeMobild);
  }
  // 组件实例刚创建
  public destroy(): void {
    window.removeEventListener('resize', this.jodgeMobild);
  }
}

</script>
<style lang="less">
.header-wrap {
  color: #fff;
  height: 100%;
  width: 1160px;
  margin: 0 auto;
  display: flex;
  // background-color: #aaa;
  box-sizing: border-box;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  // 头像 / 导航栏
  .header-nav {
    display: flex;
    align-items: center;
    & > div {
      display: flex;
    }
    div.avatar {
      cursor: pointer;
      div.avatar-img {
        width: 40px;
        height: 40px;
        background-image: url('http://47.102.192.173/HeadPortrait.jpg');
        background-size: cover;
        border-radius: 50%;
        margin-right: 10px;
      }
      div.avatar-descript {
        line-height: 1.6rem;
        font-size: 1.2rem;
      }
      margin-right: 40px;
    }
    
  }
  // 侧标兰
  .side-nav {
    position: fixed;
    top: 52px;
    left: 0;
    a {
      background-color: #499ef3;
      display: block;
      width: 48px;
      padding: 0 20px;
      &.active {
        padding-right: 40px;
      }
      &:hover {
        padding-right: 40px;
      }
    }
    .block-nav {
      height: 10px;
      background-color: #499ef3;
      width: 88px;
    }
  
  }
  // 导航栏
  div.nav-list {
    a {
      color: #fff;
      display: block;
      padding: 0 20px;
      text-decoration: none;
      height: 52px;
      line-height: 52px;
      span {
        margin-left: 4px;
      }
      &.active {
        background-color: #4dabff;
      }
      &:hover {
        background-color: #4dabff;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    & {
      width: calc(100% - 40px);
    }
  }

}
</style>
