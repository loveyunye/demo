<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in tagRoutes"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        :title="tag.meta.title"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <span class="label">{{ tag.meta.title }}</span>
        <i
          class="el-icon-close"
          v-if="!isAffix(tag)"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></i>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane';
import path from 'path';
import viewRouters from '@/router/router';

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      tagRoutes: [],
      routes: viewRouters,
    };
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
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
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
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
    initTags() {
      this.tagRoutes = this.filterAffixTags(viewRouters);
    },
    addTags() {
      const { name } = this.$route;
      if (name && this.tagRoutes.findIndex((item) => item.name === name) < 0) {
        this.tagRoutes.push(this.$route);
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            break;
          }
        }
      });
    },
    closeSelectedTag(view) {
      const { name, path } = view;
      const active = this.isActive(view);
      const closeIndex = this.tagRoutes.findIndex((item) => item.name === name);
      this.tagRoutes = this.tagRoutes.filter((item) => item.path !== path);
      if (active && this.tagRoutes.length > 0 && closeIndex > 0) {
        this.$router.push({
          path: this.tagRoutes[closeIndex - 1].path,
        });
      }
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
    },
    closeAllTags(view) {
      console.log(view);
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY / 2;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
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

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      color: #495060;
      background: #fff;
      padding: 0 10px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      span.label {
        display: inline-block;
        max-width: 200px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      .el-icon-close {
        width: 0;
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        overflow: hidden;
        height: 20px;
        transition: width 0.3s;
        transform-origin: center 100%;
      }
      &:hover .el-icon-close {
        width: 16px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          background-color: #3f7eef;
          height: 2px;
          width: 100%;
        }
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
