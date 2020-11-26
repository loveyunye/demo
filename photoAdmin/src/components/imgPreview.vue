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
    screen: {
      type: Number,
      default: 0.8,
    },
    noZoom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      img: null,
      mask: null,
      image: null, // 图片对象
      zoom: 1,
    };
  },
  methods: {
    privew() {
      const image = new Image();
      image.src = this.src;
      if (!this.src || image.width === 0 || image.height === 0) {
        this.$message.error('图片资源无效');
        return;
      }
      const img = this.init(this.src);
      this.setZoom(image, img);
    },
    // 设置zoom
    setZoom(image, img) {
      const hRatio = image.height / document.body.clientHeight;
      const wRatio = image.width / document.body.clientWidth;

      const ratio = hRatio > wRatio ? hRatio : wRatio;
      this.zoom = this.screen / ratio;

      img.style.height = image.height * (this.noZoom ? 1 : this.zoom) + 'px';
      img.style.width = image.width * (this.noZoom ? 1 : this.zoom) + 'px';
    },
    // 初始化 img
    init(src) {
      let mask = document.querySelector('#priview-mask');
      if (!mask) {
        mask = document.createElement('div');
        document.body.append(mask);
        mask.id = 'priview-mask';
      }
      let img = mask.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        mask.append(img);
      }
      img.src = src;
      mask.style.display = 'block';
      img.style.display = 'block';
      if (!window.priviewImgClickListener) {
        window.priviewImgClickListener = true;
        img.addEventListener('click', () => {
          mask.style.display = 'none';
          img.style.display = 'none';
        });
      }
      return img;
    },
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
