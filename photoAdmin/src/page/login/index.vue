<template>
  <div class="login-wrapper">
    <div class="form">
      <div class="form-heander">后台模板</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandler">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/**
 * 登录页
 */
import { login } from '@/api/login';
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      form: {
        password: '',
        account: 'admin',
      },
    };
  },
  methods: {
    ...mapMutations('user', ['setUser']),
    // 登录操作
    loginHandler() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          login(this.form)
            .then((res) => {
              this.setUser(res);
              this.$message.success('登录成功');
              setTimeout(() => {
                window.location.href = '/';
              }, 1000);
            })
            .catch(() => {
              this.$message.error('账号密码错误');
            });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-wrapper {
  height: 80vh;
  display: flex;
  align-items: center;
  .form-heander {
    height: 180px;
    line-height: 180px;
    text-align: center;
    font-weight: 500;
    font-size: 3rem;
  }
  .form {
    width: 400px;
    margin: auto;
    button {
      width: 100%;
    }
  }
  /deep/ .el-button--primary {
    background-color: #158bb8;
    border-color: #158bb8;
  }
}
</style>
