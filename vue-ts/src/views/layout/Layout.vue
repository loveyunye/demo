<template>
  <div class="layout-wrap">
    <nav>
      <Header/>
    </nav>
    <div class="body">
      <router-view></router-view>
    </div>
    <footer>
      Copyright © 2019·YUNYE
    </footer>
  </div>
</template>
<script lng="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class Layout extends Vue {}
</script>


<style lang="less" scoped>
  .layout-wrap {
    // display: flex;
    // flex-direction: column;
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
    nav {
      // flex-basis: 52px;
      height: 52px;
      background-color: #499ef3;
    }
    div.body {
      width: 1000px;
      margin: 0 auto;
      flex: 1;
      background-color: #fff;
    }

    @media screen and (max-width: 1100px) {
      div.body {
        width: calc(100% - 40px);
        background-color: #fff;
      }
    }

    footer {
      text-align: center;
      line-height: 80px;
    }
  }
</style>
