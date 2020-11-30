<template>
  <div class="img-container-wrapper" :style="{ maxHeight, width }">
    <div v-for="item in imgArr" :key="item.key" :style="{ height }">
      <img-preview :src="item.value" :style="{ height }" />
      <slot :slot-scope="item"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'img-container-wrapper',
  props: {
    height: {
      type: String,
      default: '100px',
    },
    maxHeight: {
      type: String,
      default: '200px',
    },
    width: {
      type: String,
      default: '90%',
    },
    imgs: {
      type: Array,
      default() {
        return [];
      },
    },
    attr: {
      type: Object,
      default() {
        return {
          key: 'id',
          value: 'path',
        };
      },
    },
  },
  computed: {
    imgArr() {
      return this.imgs.map((item) => ({
        ...item,
        key: item[this.attr.key],
        value: item[this.attr.value],
      }));
    },
  },
};
</script>
<style lang="less" scoped>
.img-container-wrapper {
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex-grow: 1;
    margin: 4px;
    position: relative;
    img {
      object-fit: cover;
      max-width: 100%;
      min-width: 100%;
      vertical-align: bottom;
      cursor: pointer;
    }
  }
}
</style>
