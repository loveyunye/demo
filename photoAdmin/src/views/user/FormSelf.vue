<template>
  <el-dialog
    :title="titleEnum[status]"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
  >
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input style="width: 200px" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="name">
        <el-input style="width: 200px" v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input style="width: 200px" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width: 200px" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender">
          <el-option label="女" :value="0" />
          <el-option label="男" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type">
          <el-option label="普通" value="normal" />
          <el-option label="运营" value="mobile-admin" />
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="avatarUrl">
        <el-upload
          v-if="!link"
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          accept="image/*"
          name="image"
        >
          <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-else v-model="form.mask"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="textarea" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { cloneDeep } from '@/utils';

const formTmp = {
  name: '',
  avatarUrl: '',
  gender: 0,
  city: '',
  password: null,
  type: 'normal',
  phone: '',
  email: '',
  address: '',
};

export default {
  data() {
    return {
      visible: false,
      link: false,
      loading: false,
      status: 'add',
      titleEnum: { add: '新增', edit: '修改' },
      form: cloneDeep(formTmp),
      rules: {
        name: [{ required: true, message: '请输入作品名', trigger: 'blur' }],
        avatarUrl: [{ required: true, message: '请上传头像', trigger: 'blur' }],
      },
    };
  },
  methods: {
    setData(form) {
      this.status = form ? 'edit' : 'add';
      this.form = form ? { ...form } : cloneDeep(formTmp);
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    close() {
      this.loading = false;
      this.visible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$emit('submit', this.form, this.status === 'add');
        } else {
          return false;
        }
      });
    },
    handleSuccess(res) {
      this.form.avatarUrl = res.url;
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
  },
};
</script>
