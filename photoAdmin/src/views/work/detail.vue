<template>
  <div class="page">
    <!-- 搜索 -->
    <searchBar>
      <el-button icon="el-icon-back" circle type="primary" />
      <div slot="handler">
        hello
      </div>
    </searchBar>
    <!-- 内容 -->
    <div class="container" v-loading="loading">
      内容
    </div>
  </div>
</template>
<script>
import { cloneDeep } from '@/utils';

const params = {
  size: 50,
  page: 1,
  key: '',
  workId: '',
};

export default {
  name: '',
  data() {
    return {
      tableData: [],
      params: cloneDeep(params),
      total: 0,
      maxH: 0,
      loading: false,
    };
  },
  methods: {},
  mounted() {
    this.maxH = this.$el.clientHeight - 48 - 20 - 64; // all - search -padding - bottom
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
  }
}
</style>
