<template>
  <div class="page">
    <!-- 搜索 -->
    <searchBar>
      <el-input placeholder="图片名搜索" clearable v-model="params.key" />
      <el-select
        v-model="params.workId"
        placeholder="作品"
        clearable
        filterable
      >
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="item in works"
          :key="item.id"
        />
      </el-select>
      <el-button icon="el-icon-search" circle type="primary" @click="getList" />
      <el-button icon="el-icon-refresh" circle @click="reset" />
      <div slot="handler">
        <el-button
          icon="el-icon-upload2"
          circle
          type="primary"
          plain
          @click="upload"
        />
        <el-button
          icon="el-icon-plus"
          circle
          type="success"
          plain
          @click="add"
        />
      </div>
    </searchBar>
    <!-- 内容 -->
    <div class="container" v-loading="loading">
      <div
        class="img-container"
        :style="{ height: maxH + 'px' }"
        v-if="tableData.length"
      >
        <div v-for="item in tableData" :key="item.id">
          <img-preview :src="item.path" />
          <div class="handler">
            <el-button
              icon="el-icon-edit"
              circle
              @click="editOrAdd(item)"
              type="primary"
              plain
            />
            <el-button
              icon="el-icon-delete"
              circle
              @click="del(item)"
              type="danger"
              plain
            />
          </div>
        </div>
      </div>
      <no-data :style="{ height: maxH + 'px' }" v-else />
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
    <!-- 弹窗 -->
    <FormSelf ref="form" @submit="submit" />
    <UploadZip ref="upload" @success="success" />
  </div>
</template>
<script>
import { list, del, edit, create, allWork } from '@/api/img';
import { cloneDeep } from '@/utils';
import FormSelf from './FormSelf';
import UploadZip from './UploadZip';

const params = {
  size: 50,
  page: 1,
  key: '',
  workId: '',
};

export default {
  name: '',
  components: { FormSelf, UploadZip },
  data() {
    return {
      tableData: [],
      params: cloneDeep(params),
      total: 0,
      maxH: 0,
      init: false,
      loading: false,
      works: [],
    };
  },
  methods: {
    success() {
      this.params.page = 1;
      this.getList();
    },
    async submit(form, isNew) {
      if (isNew) {
        await create(form);
      } else {
        await edit(form);
      }
      this.$refs.form.close();
      this.params.page = 1;
      this.getList();
    },
    upload() {
      if (!this.params.workId) {
        this.$message.warning('请先选择作品');
        return;
      }
      this.$refs.upload.open(this.params.workId);
    },
    add() {
      if (!this.params.workId) {
        this.$message.warning('请先选择作品');
        return;
      }
      this.$refs.form.setData(false, { workId: this.params.workId });
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
  async created() {
    this.works = await allWork();
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    .bottom {
      text-align: center;
      padding: 16px 0;
    }
  }
}
.img-container {
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex-grow: 1;
    margin: 4px;
    height: 180px;
    position: relative;
    img {
      height: 180px;
      object-fit: cover;
      max-width: 100%;
      min-width: 100%;
      vertical-align: bottom;
      cursor: pointer;
    }
    .handler {
      padding: 4px 10px;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: right;
      background-color: rgba(0, 0, 0, 0.4);
      display: none;
    }
    &:hover .handler {
      display: block;
    }
  }
}
</style>
