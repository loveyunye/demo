<template>
  <div class="layout-wrapper">
    <header>
      <HeaderA />
    </header>
    <div class="container">
      <SideMeun />
      <div class="main">
        <div class="page-nav">
          <NavTag />
        </div>
        <div class="page-wrapper">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMeun from './SideMeun';
import HeaderA from './HeaderA';
import NavTag from './NavTag';

export default {
  name: 'layout-wrapper',
  components: {
    SideMeun,
    NavTag,
    HeaderA,
  },
};
</script>

<style lang="less" scoped>
.layout-wrapper {
  header {
    height: 44px;
    line-height: 44px;
    background-color: #3f7eef;
  }
  .container {
    height: calc(100vh - 44px);
    display: flex;

    & > div {
      height: 100%;
    }

    & > .main {
      flex: 1;
      overflow: hidden;
      .page-nav {
        height: 40px;
      }
      .page-wrapper {
        height: calc(100% - 40px);
        background-color: #f0f2f5;
        padding: 10px;
      }
    }
  }
}
</style>
