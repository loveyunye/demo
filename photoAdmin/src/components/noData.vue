<template>
  <div class="no-data" :style="{ width }">
    <span>{{ content }}</span>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: '暂无数据',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
};
</script>
<style lang="less" scoped>
.no-data {
  line-height: 60px;
  width: 100%;
  color: #909399;
  text-align: center;
}
</style>
