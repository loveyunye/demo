<template>
  <div class="header-wrap">
    <div v-for="item in routerArr" :key="item.name">{{item.title}}</div>
    
  </div>
</template>
<script lang="ts">
import { Component,  Vue } from 'vue-property-decorator';
import { constantRouter } from '../../router';

@Component
class Header extends Vue {
  routerArr: any = constantRouter;
}

export default Header;
</script>
<style lang="less">
.header-wrap {
  color: #fff;
  height: 100%;
  width: 1160px;
  margin: 0 auto;
  display: flex;
  background-color: #ccc;

  @media screen and (max-width: 1200px) {
    & {
      width: calc(100% - 40px);
    }
  }

}
</style>
