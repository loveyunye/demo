<template>
  <img src="" alt="暂无图片" @click="privew" />
</template>
<script>
export default {
  props: {
    scr: {
      type: String,
      required: true,
    },
  },
  methods: {
    privew() {
      if (!this.src) {
        this.$message.error('图片资源无效');
        return;
      }
    },
    getMask() {
      let mask = document.querySelector('#priview-mask');
      if (!mask) {
        mask = document.createElement('div');
        document.body.append(mask);
        mask.id = 'priview-mask';
      }
      return mask;
    },
  },
};
</script>
<style lang="less" scoped>
#priview-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
