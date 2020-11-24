<template>
  <div class="work-wrapper page">
    <!-- 搜索 -->
    <searchBar>
      <el-input placeholder="作品名、描述搜索" clearable v-model="params.key" />
      <el-button icon="el-icon-search" circle type="primary" @click="getList" />
      <el-button icon="el-icon-refresh" circle @click="reset" />
      <div slot="handler">
        <el-button icon="el-icon-plus" circle />
      </div>
    </searchBar>
    <!-- 内容 -->
    <div class="container">
      <el-table :max-height="maxH" :data="tableData" v-if="init">
        <el-table-column prop="name" label="作品名" align="center" />
        <el-table-column prop="choose" label="客户可选数" align="center" />
        <el-table-column prop="mask" label="姓名" align="center" />
        <el-table-column prop="describe" label="描述" align="center" />
        <el-table-column prop="address" label="操作" align="center" />
      </el-table>
      <div class="bottom">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="params.size"
          :current-page="params.page"
          @current-change="currentChange"
        />
      </div>
    </div>
    <!-- 抽屉 -->
  </div>
</template>
<script>
import { list } from '@/api/work';
import { cloneDeep } from '@/utils';

const params = {
  size: 10,
  page: 1,
  key: '',
};

export default {
  name: 'work-wrapper',
  data() {
    return {
      tableData: [],
      params: cloneDeep(params),
      total: 0,
      maxH: 0,
      init: false,
    };
  },
  methods: {
    async getList() {
      const res = await list(this.params);
      this.tableData = res.records;
      this.total = res.total;
    },
    currentChange(page) {
      this.params.page = page;
      this.getList();
    },
    reset() {
      this.params = cloneDeep(params);
      this.getList();
    },
  },
  mounted() {
    this.getList();
    this.maxH = this.$el.clientHeight - 48 - 20 - 64; // all - search -padding - bottom
    this.init = true;
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
    // overflow-y: scroll;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .bottom {
      text-align: center;
      padding: 16px 0;
    }
  }
}
</style>
