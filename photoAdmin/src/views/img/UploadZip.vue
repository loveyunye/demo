<template>
  <el-dialog
    title="上传"
    :visible.sync="visible"
    width="400px"
    :close-on-click-modal="false"
    v-loading="loading"
  >
    <el-upload
      class="upload-demo"
      drag
      :action="action"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      name="file"
      accept="application/zip"
      v-if="visible"
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
export default {
  data() {
    return {
      visible: false,
      loading: false,
      workId: '',
    };
  },
  computed: {
    action() {
      return `/api/imgs/upload/${this.workId}`;
    },
  },
  methods: {
    open(workId) {
      this.workId = workId;
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
      this.$message.success(`成功上传，新增${res}张图片`);
      this.loading = false;
      this.visible = false;
      this.$emit('success');
    },
    beforeUpload(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isLt100M) {
        this.$message.error('图片大小不能超过 100MB!');
      }
      this.loading = true;
      return isLt100M;
    },
  },
};
</script>
