<template>
  <img
    src="@/assets/image/icon/slide.svg"
    :class="className"
    @click="setStatus"
  />
</template>
<script>
import { mapState, mapMutations } from 'vuex';

/**
 * 触发side图片组件
 */
export default {
  name: 'trigger-img',
  computed: {
    ...mapState('page', ['sideStatus']),
    className() {
      return {
        'trigger-img': true,
        active: this.sideStatus,
      };
    },
  },
  methods: {
    ...mapMutations('page', ['setSideStatus']),
    setStatus() {
      this.setSideStatus(!this.sideStatus);
    },
  },
};
</script>
<style lang="less" scoped>
.trigger-img {
  padding: 0 20px;
  transition: all 0.4s;
  cursor: pointer;

  &:not(.active) {
    transform: rotate(90deg);
  }
}
</style>
