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
      <el-form-item label="作品名" prop="name">
        <el-input style="width: 200px" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="可选数量" prop="choose">
        <el-input-number style="width: 200px" v-model="form.choose" :min="1" />
      </el-form-item>
      <el-form-item label="封面" prop="mask">
        <div>
          <el-switch v-model="link" active-text="上传" inactive-text="链接" />
        </div>
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
          <img v-if="form.mask" :src="form.mask" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-else v-model="form.mask"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
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
  id: '',
  name: '',
  choose: 20,
  mask: '',
  describe: '',
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
        mask: [{ required: true, message: '请上传封面', trigger: 'blur' }],
        choose: [{ required: true, message: '请填写可选数', trigger: 'blur' }],
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
      this.form.mask = res.url;
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
