<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <transition name="side-fade">
      <div class="side-wrapper" v-if="sideStatus">
        <el-menu
          :default-active="activeMenu"
          :unique-opened="false"
          :collapse-transition="false"
          mode="vertical"
          :v-if="sideStatus"
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
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
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
  .el-menu {
    border-right: none;
  }
}
.side-fade-enter-active,
.side-fade-leave-active {
  transition: width 0.4s;
}
.side-fade-enter,
.side-fade-leave-to {
  width: 0;
}

/deep/ .scrollbar-wrapper {
  overflow-x: hidden !important;
}

.el-scrollbar__bar.is-vertical {
  right: 0px;
}

.el-scrollbar {
  height: 100%;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
}
</style>
