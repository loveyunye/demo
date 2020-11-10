<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-tabs
      v-model="activePath"
      @tab-click="tagClick"
      @tab-remove="tagClose"
      @contextmenu.prevent.native="handleContextmenu"
    >
      <el-tab-pane
        v-model="activePath"
        v-for="tag in tagRoutes"
        :key="tag.path"
        :name="tag.path"
        :closable="!isAffix(tag)"
        :label="tag.meta.title"
      />
    </el-tabs>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags()">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import path from 'path';
import viewRouters from '@/router/router';

export default {
  data() {
    return {
      visible: false,
      top: 30,
      left: 0,
      selectedTag: {},
      affixTags: [],
      tagRoutes: [],
      activePath: '',
    };
  },
  watch: {
    $route() {
      this.addTags();
      this.activePath = this.$route.path;
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
    this.activePath = this.$route.path;
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    // 过滤
    filterAffixTags(routes, basePath = '/') {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    // 点击标签
    tagClick(item) {
      const tags = this.tagRoutes.filter((i) => i.path === item.name);
      if (tags.length === 1) {
        this.$router.push({
          path: tags[0].path,
          query: tags[0].query,
          fullPath: tags[0].fullPath,
        });
      }
    },
    // 右击事件
    handleContextmenu(event) {
      let target = null;
      if (event.target.className.indexOf('el-tabs__item') > -1) {
        target = event.target;
      } else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = event.target.parentNode;
      }
      if (target) {
        const path = target.getAttribute('aria-controls').slice(5);
        const tag = this.tagRoutes.find((i) => i.path === path);
        if (!tag.meta.affix) {
          this.openMenu(tag, event.clientX);
        }
      }
    },
    initTags() {
      this.affixTags = this.filterAffixTags(viewRouters);
      this.tagRoutes = [...this.affixTags];
    },
    addTags() {
      const { name } = this.$route;
      if (name && this.tagRoutes.findIndex((item) => item.name === name) < 0) {
        this.tagRoutes.push(this.$route);
      }
    },
    // 关闭
    tagClose(path) {
      const active = path === this.$route.path;
      const closeIndex = this.tagRoutes.findIndex((item) => item.path === path);
      this.tagRoutes = this.tagRoutes.filter((item) => item.path !== path);
      if (active && this.tagRoutes.length > 0 && closeIndex > 0) {
        this.$router.push({
          path: this.tagRoutes[closeIndex - 1].path,
        });
      }
    },
    // 关闭其他
    closeOthersTags() {
      this.tagRoutes = [...this.affixTags, this.selectedTag];
      const active = this.selectedTag.path === this.$route.path;
      if (!active) {
        this.$router.push({
          path: this.selectedTag.path,
        });
      }
    },
    // 关闭所有
    closeAllTags() {
      this.tagRoutes = [...this.affixTags];
      this.$router.push({
        path: this.tagRoutes[0].path,
      });
    },
    // 打开菜单
    openMenu(tag, clientX) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = clientX - offsetLeft; // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.visible = true;
      this.selectedTag = tag;
    },
    // 关闭菜单
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.tags-view-container {
  height: 100%;
  width: 100%;
  background: #fff;
  position: relative;

  /deep/ .el-tabs {
    user-select: none;
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }

    .el-tabs__item {
      transform-origin: border-bottom-color 0.3s;
      border-bottom-width: #ffffff;
      color: #ccc;
      &.is-active {
        border-bottom: 2px solid #409eff;
        color: #333;
      }
      &:last-child {
        padding-right: 20px;
      }

      &.is-top:nth-child(2) {
        padding-left: 20px;
      }
    }
  }
  .contextmenu {
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
