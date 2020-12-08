<template>
  <div class="manage-wrapper">
    <div class="form-heander">管理员页面</div>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="账号" prop="account" v-show="false">
          <el-input v-model="form.account" placeholder="账号"/>
        </el-form-item>
        <el-form-item label="旧密码" prop="password">
          <el-input v-model="form.password" placeholder="旧密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" placeholder="新密码"/>
        </el-form-item>
        <el-form-item label="重复新密码" prop="newPasswordRepeat">
          <el-input v-model="form.newPasswordRepeat" placeholder="重复新密码"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="resetForm" style="width: 20%">
            重置
          </el-button>
          <el-button type="primary" @click="submitPassword" style="width: 20%">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {login, logout} from '@/api/login';
    import {updatePassword} from '@/api/updatePassword';
    import {mapMutations} from 'vuex';

    export default {
        name: 'changePassword',
        data() {
            return {
                rules: {
                    account: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
                    newPasswordRepeat: [{required: true, message: '请输入重复新密码', trigger: 'blur'}],
                },
                form: {
                    account: 'admin',
                    password: '',
                    newPassword: '',
                    newPasswordRepeat: '',
                    past: '',
                    now: '',
                    repeat: '',
                },
            };
        },
        methods: {
            ...mapMutations('user', ['setUser']),
            resetForm() {
                this.form.password = '';
                this.form.newPassword = '';
                this.form.newPasswordRepeat = '';
            },
            // 登录操作
            submitPassword() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const isPasswordCheck = this.form.newPassword === this.form.newPasswordRepeat;
                        if (!isPasswordCheck) {
                            this.$message.error('两次输入的密码不一致');
                            return;
                        }
                        login(this.form)
                            .then(() => {
                                // 变量重命名
                                this.form.past = this.form.password;
                                this.form.now =  this.form.newPassword;
                                this.form.repeat = this.form.newPasswordRepeat;

                                updatePassword(this.form).then(() => {
                                    this.$message.success('修改成功');
                                    logout();
                                    setTimeout(() => {
                                        window.location.href = '/';
                                    }, 1000);
                                }).catch(() => {
                                    this.$message.error('服务器异常');
                                });
                                ;
                            })
                            .catch(() => {
                                this.$message.error('旧密码错误');
                            });
                    }
                });
            },
        },
    };
</script>

<style lang="less" scoped>
  .manage-wrapper {
    height: 100%;
    min-height: 200px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;

    .form {
      width: 400px;
      margin: auto;
      margin-top: 10%;

      button {
        width: 100%;
      }
    }
  }
</style>
