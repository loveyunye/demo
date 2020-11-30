<template>
  <div class="page">
    <!-- 搜索 -->
    <searchBar>
      <el-button icon="el-icon-back" circle type="primary" @click="back" />
      <div slot="handler">
        <el-button
          icon="el-icon-upload2"
          circle
          type="primary"
          title="上传"
          plain
          @click="upload"
        />
        <el-button
          icon="el-icon-link"
          circle
          type="primary"
          plain
          @click="addLink"
        />
      </div>
    </searchBar>
    <!-- 内容 -->
    <div class="container" v-loading="loading">
      <div class="work">
        <div class="title">{{ work.name }}</div>
        <img-container :imgs="imgs" :maxHeight="maxH + 'px'" />
      </div>
      <div class="user">
        <div class="title">关联客户</div>
        <div class="user-list">
          <div class="user-container" v-for="item in users" :key="item.id">
            <div class="user-message">
              <img :src="item.avatarUrl" alt="" />
              <span>{{ item.name }}</span>
              <span style="margin-left:20px;" v-if="item.city">
                <i class="el-icon-location-outline"></i>
                {{ item.city }}
              </span>
              <el-button
                icon="el-icon-delete"
                circle
                @click="delLink(item)"
                type="danger"
                plain
              />
            </div>
            <div class="img">
              <img-container
                v-if="item.imgs.length"
                :imgs="item.imgs"
                maxHeight="100px"
                height="50px"
              />
              <no-data v-else content="未选择图片" width="90%" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <UploadZip ref="upload" @success="success" />
    <el-dialog
      title="关联"
      :visible.sync="visible"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form v-loading="loadLink" label-width="80px">
        <el-form-item label="用户">
          <el-select
            v-model="userId"
            placeholder="选择用户"
            clearable
            filterable
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in formUsers"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="visible = false">取消</el-button>
          <el-button :disabled="!userId" type="primary" @click="submit">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { detail } from '@/api/user';
import { link } from '@/api/work';
import { allUser } from '@/api/user';
import UploadZip from '../img/UploadZip';

export default {
  name: 'work-detail',
  components: { UploadZip },
  data() {
    return {
      id: null,
      loading: false,
      work: {},
      imgs: [],
      users: [],
      allUsers: [],
      formUsers: [],
      userId: '',
      maxH: 300,
      visible: false,
      loadLink: false,
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
    async submit() {
      this.loadLink = true;
      await link(this.id, this.userId);
      this.loadLink = false;
      this.visible = false;
      this.$message.success('绑定成功');
      this.getDetail();
    },
    delLink(item) {
      this.$confirm('确定解除关联吗', '提示')
        .then(async () => {
          this.loading = true;
          await link(this.id, item.id, false);
          this.getDetail();
        })
        .catch(() => {});
    },
    addLink() {
      this.formUsers = this.allUsers.filter(
        (item) => !this.users.some((i) => i.id === item.id),
      );
      this.visible = true;
      this.userId = '';
    },
    back() {
      this.$router.push('/work/index');
    },
    success() {
      this.getDetail();
    },
    async getDetail() {
      this.loading = true;
      const { imgs, users, work } = await detail(this.id);
      this.work = work;
      this.imgs = imgs;
      this.users = users.map((item) => {
        console.log(item.imgs);
        return {
          ...item,
          imgs: imgs.filter((i) => item.imgs.some((j) => j === i.id)),
        };
      });
      this.loading = false;
    },
    upload() {
      this.$refs.upload.open(this.id);
    },
  },
  async mounted() {
    const { id } = this.$route.query;
    this.id = id;
    this.getDetail();
    this.allUsers = await allUser();
    this.maxH = this.$el.clientHeight - 48 - 20 - 80 - 300 - 50; // all - search -padding - title - bottom
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

    .work {
      margin-bottom: 20px;
    }

    & > div {
      position: relative;
      z-index: 1;
      .work {
        margin-bottom: 20px;
      }
      .title {
        margin-bottom: 10px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
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

  .user-list {
    height: 300px;
    overflow-y: scroll;
  }
  .user-container {
    .user-message {
      padding: 4px 0;
      display: flex;
      align-items: center;
      width: 90%;
      position: relative;
      img {
        height: 30px;
        width: 30px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 10px;
      }
      .el-button {
        position: absolute;
        right: 0;
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
}
</style>
