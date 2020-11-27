<template>
  <el-dialog
    title="上传"
    :visible.sync="visible"
    width="400px"
    :close-on-click-modal="false"
  >
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传zip文件，只包含图片文件且不超过100mb
      </div>
      <div class="el-upload__tip" slot="tip">
        此过程较慢，请耐心等待
      </div>
    </el-upload>
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
    setData() {
      this.visible = true;
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
