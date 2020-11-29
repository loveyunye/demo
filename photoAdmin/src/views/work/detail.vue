<template>
  <div class="page">
    <!-- 搜索 -->
    <searchBar>
      <el-button icon="el-icon-back" circle type="primary" @click="back" />
    </searchBar>
    <!-- 内容 -->
    <div class="container" v-loading="loading">
      <img v-if="work.mask" :src="work.mask" alt="" class="bg" />
      <div class="work">
        <div class="title">{{ work.name }}</div>
        <div
          class="img-container"
          :style="{ maxHeight: maxH + 'px', width: '90%' }"
          v-if="imgs.length"
        >
          <div v-for="item in imgs" :key="item.id">
            <img-preview :src="item.path" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { detail } from '@/api/work';

export default {
  name: '',
  data() {
    return {
      id: null,
      loading: false,
      work: {},
      imgs: [],
      users: [],
      maxH: 300,
    };
  },
  computed: {
    backgroud() {
      return {
        backgroundImage: this.work.mask || 'none',
      };
    },
  },
  methods: {
    back() {
      this.$router.push('/work/index');
    },
    async getDetail() {
      const { imgs, users, work } = await detail(this.id);
      this.work = work;
      this.users = users;
      this.imgs = imgs;
      this.loading = false;
    },
  },
  mounted() {
    this.loading = true;
    const { id } = this.$route.query;
    this.id = id;
    this.getDetail();
  },
};
</script>
<style lang="less" scoped>
.page {
  height: 100%;
  .container {
    height: calc(100% - 60px);
    min-height: 200px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    position: relative;

    & > div {
      position: relative;
      z-index: 1;
      .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #333;
        position: relative;
        padding-left: 16px;
        &::before {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          content: ' ';
          background-color: #158bb8;
          width: 8px;
          height: 16px;
          margin-right: 20px;
          border-radius: 2px;
        }
      }
    }
  }
  img.bg {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: 0.1;
    z-index: 0;
  }

  .img-container {
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    & > div {
      flex-grow: 1;
      margin: 4px;
      height: 120px;
      position: relative;
      img {
        height: 120px;
        object-fit: cover;
        max-width: 100%;
        min-width: 100%;
        vertical-align: bottom;
        cursor: pointer;
      }
    }
  }
}
</style>
