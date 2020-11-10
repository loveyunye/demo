<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <transition name="side-fade">
      <div class="side-wrapper" v-if="sideStatus">
        <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in viewRouters"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
    </transition>
  </el-scrollbar>
</template>

<script>
import { mapState } from 'vuex';
import SidebarItem from './SidebarItem';
import viewRouters from '@/router/router';

export default {
  components: { SidebarItem },
  computed: {
    ...mapState('page', ['sideStatus']),
    activeMenu() {
      return this.$route.path;
    },
    viewRouters() {
      return viewRouters;
    },
  },
};
</script>
<style lang="less" scoped>
.side-wrapper {
  width: 200px;
  height: 100%;
  overflow-x: hidden;
  /deep/ .el-menu {
    border-right: none;
    // 文字大小
    .el-submenu__title,
    .el-menu-item {
      font-size: 13px;
    }

    // 右侧下拉按钮调整
    .el-submenu__icon-arrow {
      font-size: 14px;
      font-weight: 800;
      transform: rotate(270deg);
    }
    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
      transform: rotate(360deg);
    }

    // item背景、文字装饰线
    a {
      text-decoration: none;
    }
    .el-menu-item.is-active {
      background-color: rgba(102, 157, 255, 0.15);
    }

    // 展开样式
    .el-submenu.is-opened {
      & > .el-submenu__title,
      & > .el-submenu__title i {
        color: rgb(63, 126, 239);
      }
    }
  }
}
// 动画
.side-fade-enter-active,
.side-fade-leave-active {
  transition: width 0.4s;
}
.side-fade-enter,
.side-fade-leave-to {
  width: 0;
}
// 滚动侧边栏样式
/deep/ .scrollbar-wrapper {
  overflow-x: hidden !important;
}
.el-scrollbar__bar.is-vertical {
  right: 0px;
}
.el-scrollbar {
  height: 100%;
  padding: 10px 0;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
