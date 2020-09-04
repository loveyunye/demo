<template>
  <div class="login-wrapper">
    <div class="form">
      <div class="form-heander">后台模板</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="账号" />
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
export default {
  name: 'login',
  data() {
    return {
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      form: {
        password: '',
        username: '',
      },
    };
  },
  methods: {
    // 登录操作
    loginHandler() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(valid);
        } else {
          return false;
        }
      });
    },
  },
  mounted() {},
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
}
</style>
