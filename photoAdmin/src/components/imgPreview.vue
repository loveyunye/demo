<template>
  <img :src="src" alt="暂无图片" @click="privew" />
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      img: null,
      mask: null,
    };
  },
  methods: {
    privew() {
      this.visible = !this.visible;
      console.log(this.visible, this.visible ? 'display' : 'none');
      if (!this.src) {
        this.$message.error('图片资源无效');
        return;
      }
      const image = new Image();
      image.src = this.src;
      this.img.src = this.src;
      this.mask.style.display = this.visible ? 'block' : 'none';
      this.img.style.display = this.visible ? 'block' : 'none';
      // console.log(this.visible ? 'display' : 'none');
      // image.onload = () => {
      //   console.log(image.width);
      //   console.log(image.height);
      //   img.height = image.height + 'px';
      //   img.width = image.width + 'px';
      // };
    },
    init() {
      let mask = document.querySelector('#priview-mask');
      if (!mask) {
        mask = document.createElement('div');
        document.body.append(mask);
        mask.id = 'priview-mask';
      }
      this.mask = mask;
      if (!this.img) {
        this.img = document.createElement('img');
        mask.append(this.img);
      }
    },
  },
  mounted() {
    this.init();
    this.img.style.display = this.visible ? 'block' : 'none';
    this.mask.style.display = this.visible ? 'display' : 'none';
  },
};
</script>
<style lang="less">
body #priview-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
  img {
    position: absolute;
    // height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>
