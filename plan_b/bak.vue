<template>
  <div class="map-wrapper">
    <div class="map-main" ref="map"></div>
    <TagNav
      @setType="
        selectType = $event;
        closeMarker();
      "
    />
  </div>
</template>
<script>
import TagNav from './TagNav';
// 旧图标
import oldMarker from './assets/old.png';
import oldActive from './assets/old_active.png';
// 新图标
import newMarker from './assets/new.png';
import newActive from './assets/new_active.png';
// 活动图标
import hotMarker from './assets/hot.png';
import hotActive from './assets/hot_active.png';
// 音乐图标
import MusicMarker from './assets/music.png';
// import MusicActive from './assets/music_active.png';
// 数据
import MapData from './json/view';
import { MusicData } from './json/view';
// 音乐喷泉数据
import { findGuestInfo } from '../../api/cockpit';
import { mapState } from 'vuex';

const AMap = global.AMap || window.AMap;

export default {
  name: 'map-container',
  components: {
    TagNav,
  },
  computed: {
    ...mapState(['scaleGlobal']),
  },
  data() {
    return {
      map: null,
      markerData: MapData.map((item, index) =>
        Object.assign(item, { id: index + 1 }),
      ),
      container: [],
      selectId: 0,
      selectType: 1,
      musicMarker: null,
    };
  },
  mounted() {
    // 创建地图实例
    document.body.onload = this.initMap();
    console.log(this.scaleGlobal);
  },
  methods: {
    // 初始化
    initMap() {
      console.log(this.scaleGlobal);
      this.map = new AMap.Map(this.$refs.map, {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 14.6,
        viewMode: '3D',
        center: [120.145422, 30.245642],
        pitch: 60,
        mapStyle: 'amap://styles/cc32bd2d0a26b93f407f869c3f8e2f70',
        // zoomEnable:false,
      });
      this.setMarker();
      this.setMusic();
      this.setGeoJson();
      this.closeMarker();
    },
    // 设置音乐喷泉景点
    setMusic() {
      findGuestInfo().then((res) => {
        let number = 0;
        const { success, data } = res;
        if (success) {
          number = data.yypqAreaList.map((item) => item.kpiValue).slice(-1)[0];
        }
        // 设置label
        const content = `<div class="music-marker" style="transform:scale(${this.scaleGlobal})">
            <div class="music-lable">
              <div>音乐<br/>喷泉</div>
              <div></div>
              <div>
                <div class="music-item">
                  <span>喷放时间</span>
                  <span class="time">19:00、20:00</span>
                </div>
                <div class="music-item">
                  <span>实时客流</span>
                  <span class="visit">${number}</span>
                </div>
              </div>
            </div>
            <div class="mark-img"><img src="${MusicMarker}" /></div>
          </div>
          `;
        const musicMaker = new AMap.Marker({
          offset: new AMap.Pixel(-360, -100),
          content,
          position: MusicData.position,
        });
        musicMaker.setMap(this.map);
      });
    },
    // 根据类型关闭marker
    closeMarker() {
      this.container.forEach((item) => {
        if (item.type === this.selectType) {
          item.marker.show();
          // item.marker.setLabel(this.getLable(item, false));
          // item.marker.setContent(this.getContent(item.type, false));
        } else {
          item.marker.hide();
          // item.marker.setLabel(this.getLable(item, false));
        }
      });
      this.map.setCenter([120.145422, 30.245642]);
    },
    // 设置marker
    setMarker() {
      const vm = this;
      this.markerData.forEach((item) => {
        const markerItem = new AMap.Marker({
          content: vm.getContent2(item, false),
          position: item.position,
          offset: new AMap.Pixel(-20, -100),
          anchor:'center', 
        });
        markerItem.setMap(this.map);
        // markerItem.setLabel(this.getLable(item, false));
        // 点击事件 暂时隐藏
        markerItem.on('click', function() {
          //   if (item.id !== vm.selectId && vm.selectId !== 0) {
          //     const pre = vm.container.find((i) => i.id === vm.selectId);
          //     pre.marker.setContent(vm.getContent(pre.type, false));
          //     pre.marker.setLabel(vm.getLable(pre, false));
          //   }
          //   vm.selectId = item.id;
          // markerItem.setContent(vm.getContent(item.type, true));
          // 暂时去除实时客流
          // markerItem.setLabel(vm.getLable(item, true));
          vm.map.setCenter(item.position);
        });
        vm.container.push({
          marker: markerItem,
          name: item.name,
          id: item.id,
          type: item.type,
        });
      });
    },
    // 设置边界
    setGeoJson() {
      const jsonData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            propertie: {
              stroke: '#3196fa',
              'stroke-width': 1,
              'stroke-opacity': 0.1,
              fill: '#3196fa',
              'fill-opacity': 0.1,
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [120.1468276977539, 30.20567424070585],
                  [120.15867233276367, 30.206861065952626],
                  [120.16708374023438, 30.211608223816906],
                  [120.17309188842773, 30.21709683961305],
                  [120.1703453063965, 30.2227334776473],
                  [120.17017364501952, 30.225255026929723],
                  [120.16210556030273, 30.227628190725536],
                  [120.1636505126953, 30.22881475114686],
                  [120.16674041748047, 30.229259707613494],
                  [120.16897201538085, 30.230446248347235],
                  [120.1703453063965, 30.232522660176947],
                  [120.16811370849608, 30.233709161533643],
                  [120.16845703125, 30.235933812981585],
                  [120.1694869995117, 30.237713497892038],
                  [120.1710319519043, 30.238455023761645],
                  [120.17017364501952, 30.239641453517258],
                  [120.16931533813477, 30.239048240429582],
                  [120.16674041748047, 30.239641453517258],
                  [120.16416549682616, 30.24038296484201],
                  [120.16038894653319, 30.234302406842193],
                  [120.15798568725586, 30.235933812981585],
                  [120.15935897827148, 30.238158414085085],
                  [120.15850067138673, 30.24038296484201],
                  [120.15901565551756, 30.24245916678936],
                  [120.16176223754884, 30.246166561171986],
                  [120.16090393066405, 30.24839093066276],
                  [120.16313552856445, 30.25091182187644],
                  [120.15781402587892, 30.259067203213018],
                  [120.15798568725586, 30.260698198224393],
                  [120.15729904174805, 30.26158782045005],
                  [120.15541076660156, 30.260549927069945],
                  [120.15214920043945, 30.261736090037477],
                  [120.14837265014647, 30.266035810687686],
                  [120.1471710205078, 30.267666689956158],
                  [120.13412475585936, 30.26336704072365],
                  [120.13086318969728, 30.259808567939697],
                  [120.13086318969728, 30.25699135220581],
                  [120.13103485107422, 30.253877493432157],
                  [120.12863159179688, 30.25521201642245],
                  [120.12931823730467, 30.25699135220581],
                  [120.12519836425781, 30.25817755815378],
                  [120.12399673461914, 30.257287905035877],
                  [120.12279510498045, 30.257139628732773],
                  [120.11970520019533, 30.25788100800988],
                  [120.11730194091797, 30.258325832889938],
                  [120.11695861816405, 30.25921547660607],
                  [120.11850357055664, 30.25921547660607],
                  [120.11884689331053, 30.260549927069945],
                  [120.11678695678711, 30.262773970881057],
                  [120.11901855468751, 30.264701434772807],
                  [120.12090682983397, 30.2657392842738],
                  [120.12399673461914, 30.268111470509464],
                  [120.12262344360352, 30.270631855582238],
                  [120.12004852294922, 30.271521387805628],
                  [120.11695861816405, 30.271966150894535],
                  [120.1138687133789, 30.26974231529823],
                  [120.11026382446288, 30.266184073558826],
                  [120.10665893554688, 30.26351530762463],
                  [120.10374069213866, 30.263070506250088],
                  [120.10168075561522, 30.260698198224393],
                  [120.09756088256836, 30.25936374977526],
                  [120.09498596191406, 30.25654652128185],
                  [120.09429931640625, 30.254025774659755],
                  [120.09361267089844, 30.250466963421193],
                  [120.08983612060545, 30.25031867682182],
                  [120.0864028930664, 30.251060107580553],
                  [120.07919311523438, 30.250466963421193],
                  [120.0750732421875, 30.24661143909856],
                  [120.07747650146483, 30.239789756229758],
                  [120.07266998291016, 30.232967599863763],
                  [120.06374359130858, 30.23356084964715],
                  [120.06168365478514, 30.22881475114686],
                  [120.06340026855469, 30.221398513619437],
                  [120.06649017333984, 30.216058476325074],
                  [120.06271362304688, 30.21101484160756],
                  [120.06134033203125, 30.199146446037616],
                  [120.06580352783203, 30.18787014479982],
                  [120.0702667236328, 30.179560465036428],
                  [120.07919311523438, 30.173921354584916],
                  [120.08743286132811, 30.17303093922411],
                  [120.09326934814452, 30.175702161170722],
                  [120.09910583496092, 30.171250084367482],
                  [120.10391235351564, 30.174218157917355],
                  [120.1142120361328, 30.179857251383535],
                  [120.1186752319336, 30.18965069926306],
                  [120.12176513671875, 30.190837717688126],
                  [120.12416839599608, 30.19054096442316],
                  [120.12863159179688, 30.191134470058895],
                  [120.14030456542969, 30.198552988693212],
                  [120.14579772949217, 30.198552988693212],
                  [120.15026092529297, 30.200630073747245],
                  [120.1471710205078, 30.203300547277813],
                  [120.1468276977539, 30.20567424070585],
                ],
              ],
            },
          },
        ],
      };
      const geoJson = new AMap.GeoJSON({
        geoJSON: jsonData,
        getPolygon: (geojson, lnglats) =>
          new AMap.Polygon({
            path: lnglats,
            fillOpacity: 0.1,
            strokeColor: '#3196fa',
            strokeOpacity: 0.4,
            strokeWidth: 2,
            fillColor: '#3196fa',
          }),
      });
      geoJson.setMap(this.map);
    },
    // 添加marker
    addMarker(marker) {
      marker.setMap(this.map);
    },
    // marker 和 lable 写在一起
    getContent2(item, select) {
      let markerImage = null;
      let lableClass = '';
      switch (item.type) {
        case 1:
          markerImage = select ? oldActive : oldMarker;
          lableClass = 'old';
          break;
        case 2:
          markerImage = select ? newActive : newMarker;
          lableClass = 'new';
          break;
        case 3:
          markerImage = select ? hotActive : hotMarker;
          lableClass = 'hot';
          break;
      }
      let content = '';
      console.log(this.scaleGlobal);
      const markerContent = `<div class="mark-img"><img src="${markerImage}" /></div>`;
      if (select) {
        content = `<div style="transform:scale(${this.scaleGlobal})">
          <div class='mark-lable detail ${lableClass}'>
            <span>${item.name}</span>
            <span></span>
            <span>实时客流</span>
            <span>${item.num}</span>
          </div>
          ${markerContent}
        </div>`;
      } else {
        content = `<div class="marker-noSelect" style="transform:scale(${this.scaleGlobal})">
          <div class='mark-lable ${lableClass}'>${item.name}</div>
          ${markerContent}
        </div>`;
      }

      return content;
    },
    // 获取content 由于getContent 和 getLabel位置会出现 随机的bug
    getContent(type, select) {
      let markerImage = null;
      switch (type) {
        case 1:
          markerImage = select ? oldActive : oldMarker;
          break;
        case 2:
          markerImage = select ? newActive : newMarker;
          break;
        case 3:
          markerImage = select ? hotActive : hotMarker;
          break;
      }
      return `<div class="mark-img"><img src="${markerImage}" /></div>`;
    },
    // 获取lable
    getLable(item, select) {
      let lableClass = '';
      switch (item.type) {
        case 1:
          lableClass = 'old';
          break;
        case 2:
          lableClass = 'new';
          break;
        case 3:
          lableClass = 'hot';
          break;
      }
      let content = '';
      if (select) {
        content = `<div class='mark-lable detail ${lableClass}'>
          <span>${item.name}</span>
          <span></span>
          <span>实时客流</span>
          <span>${item.num}</span>
        </div>`;
      } else {
        content = `<div class='mark-lable ${lableClass}'>${item.name}</div>`;
      }
      return {
        offset: new AMap.Pixel(select ? 140 : 0, -5), // 设置文本标注偏移量
        content, // 设置文本标注内容
        direction: 'top', //设置文本标注方位
      };
    },
  },
};
</script>
<style lang="stylus">
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 100%;

  .map-main {
    width: 100%;
    height: 100%;
  }

  .mark-img {
    display: flex;

    img {
      height: 3.5rem;
    }
  }

  // 音乐marker
  .music-marker {
    .mark-img {
      justify-content: flex-end;
      padding-right: 26px;
      margin-top: 10px;
    }
  }

  // 音乐喷泉
  .music-lable {
    background-image: url('./assets/music_dialog2.png');
    height: 6.4rem;
    width: 21rem;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    color: #EF4864;
    padding: 0 1rem 0.5rem;
    font-size: 1.5rem;

    & > div {
      height: 3.2rem;
      line-height: 1.6rem;
    }

    & > div:nth-child(1) {
      line-height: 1.6rem;
      font-weight: 600;
    }

    & > div:nth-child(2) {
      margin: 0 0.5rem;
      width: 0.1rem;
      background-color: #ccc;
      opacity: 0.5;
    }

    & > div:nth-child(3) {
      flex: 1;
      height: 4rem;
    }

    .music-item {
      display: flex;
      line-height: 2rem;
      justify-content: space-between;

      span:nth-child(1) {
        font-size: 1.2rem;
        color: #ccc;
      }

      .time {
        color: #fff;
      }

      .visit {
        font-weight: 600;
        font-size: 2rem;
      }
    }
  }

  .marker-noSelect {
    text-align: center;

    img {
      margin: 0 auto;
    }
  }

  // maker-lable
  .mark-lable {
    // 新增样式
    margin-bottom: 10px;
    font-size: 1rem;
    width: 7rem;
    height: 2.4rem;
    line-height: 2.4rem;
    text-align: center;
    background-size: 100% 100%;

    &.old {
      color: #3196FA;
      background-image: url('./assets/lable_old.png');

      &.detail {
        background-image: url('./assets/old_dialog.png');
      }
    }

    &.new {
      color: #5FC6D7;
      background-image: url('./assets/lable_new.png');

      &.detail {
        background-image: url('./assets/new_dialog.png');
      }
    }

    &.hot {
      color: #FFC154;
      background-image: url('./assets/lable_new.png');

      &.detail {
        background-image: url('./assets/hot_dialog.png');
      }
    }

    &.detail {
      text-align: left;
      background-repeat: round;
      height: 4.4rem;
      width: 18.3rem;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
      font-size: 1.5rem;
      border: none;
      display: flex;
      align-items: center;

      span {
        display: inline-block;

        &:nth-child(2) {
          margin: 0 0.3rem;
          height: 1.5rem;
          width: 0.1rem;
          background-color: #ccc;
          opacity: 0.5;
        }

        &:nth-child(3) {
          color: #CCCCCC;
          font-size: 1.2rem;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
