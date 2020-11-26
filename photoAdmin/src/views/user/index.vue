<template>
  <div class="page">
    <!-- 搜索 -->
    <searchBar>
      <el-input placeholder="作品名、描述搜索" clearable v-model="params.key" />
      <el-button icon="el-icon-search" circle type="primary" @click="getList" />
      <el-button icon="el-icon-refresh" circle @click="reset" />
      <div slot="handler">
        <el-button
          icon="el-icon-plus"
          circle
          type="success"
          plain
          @click="editOrAdd(false)"
        />
      </div>
    </searchBar>
    <!-- 内容 -->
    <div class="container" v-loading="loading">
      <el-table :max-height="maxH" :data="tableData" v-if="init">
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="city" label="城市" align="center" />
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <img-preview :src="scope.row.avatarUrl" class="work-mask" />
          </template>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          width="140px"
          align="center"
          label="更新时间"
        >
          <template slot-scope="scope">
            <span v-format="scope.row.updatedAt"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              circle
              @click="editOrAdd(scope.row)"
              type="primary"
              plain
            />
            <el-button
              icon="el-icon-delete"
              circle
              @click="del(scope.row)"
              type="danger"
              plain
            />
          </template>
        </el-table-column>
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
    <FormSelf ref="form" @submit="submit" />
  </div>
</template>
<script>
import { list, del, edit, create } from '@/api/user';
import { cloneDeep } from '@/utils';
import FormSelf from './FormSelf';

const params = {
  size: 10,
  page: 1,
  key: '',
};

export default {
  components: { FormSelf },
  data() {
    return {
      tableData: [],
      params: cloneDeep(params),
      total: 0,
      maxH: 0,
      init: false,
      loading: false,
    };
  },
  methods: {
    async submit(form, isNew) {
      if (isNew) {
        await create(form);
      } else {
        await edit(form);
      }
      this.$refs.form.close();
      this.getList();
    },
    editOrAdd(row) {
      this.$refs.form.setData(row);
    },
    del(row) {
      this.$confirm('确定删除吗', '提示')
        .then(async () => {
          this.loading = true;
          await del(row.id);
          this.getList();
        })
        .catch(() => {});
    },
    async getList() {
      this.loading = true;
      const res = await list(this.params);
      this.tableData = res.records;
      this.total = res.total;
      this.loading = false;
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
.work-mask {
  cursor: pointer;
  height: 36px;
  object-fit: cover;
}
</style>
