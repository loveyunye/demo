<template>
  <div class="pc-container">
    <!-- 地图 -->
    <div class="map">
      <Map />
    </div>
    <div class="pc-index-wrapper" ref="container" :style="`transform: scale(${scale}); top: ${whFlag ? -(2160 * (1 - scale)) / 2 : -((2160 * (1 - scale)) / 2 - (pcHeight - 2160 * scale) / 2)}px; left: ${whFlag ? -((3840 * (1 - scale)) / 2 - (pcWidth - 3840 * scale) / 2) : -(3840 * (1 - scale)) / 2}px;`">
      <div class="index-body">
        <div class="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Map from './Map';
import moment from 'moment';
import { mapState, mapActions} from 'vuex';
export default {
  data() {
    return {
      menuList: [
        {
          icon: 'shouye-xuanzhong',
          label: '首页',
          path: '',
        },
      ],
      activeMenu: '首页',
      userName: '文旅部·云栖君',
      date: '2019-08-16',
      week: '星期五',
      time: '12:20:00',

      pcWidth: 3840,
      pcHeight: 2160,
      scale: 1,
      whFlag: false,
    };
  },
  created() {
    this.getWHOfPc();
    this.onResize();
  },
  computed: {
    ...mapState(['scaleGlobal']),
  },
  methods: {
    ...mapActions(['setScale']),
    // 获取pc浏览器窗口的宽高
    getWHOfPc() {
      if (window) {
        this.pcWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        this.pcHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.whFlag = this.pcWidth / 3840 > this.pcHeight / 2160;
        this.scale = this.whFlag ? Math.round((this.pcHeight / 2160) * 10000) / 10000 : Math.round((this.pcWidth / 3840) * 10000) / 10000;
        this.setScale(this.scale);
      }
    },
    onResize() {
      // window.onresize = () => {
      //   this.getWHOfPc();
      // };
    },
  },
  components: {
    Map,
  },
};
</script>
<style lang="stylus" scoped>
.pc-container {
  height: 90vh;
  position: relative;
  div.map {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    // z-index: 555;
  }
}
.pc-index-wrapper {
  pointer-events: none;
  width: 3840px !important;
  height: 2160px !important;
  color: #fff;
  font-size: 30px;
  position: absolute;
  div.index-body {
    position: relative;
    display: flex;
    text-align: center;
    div.container {
      padding: 20px;
      flex: 1;
    }
  }
}
</style>
