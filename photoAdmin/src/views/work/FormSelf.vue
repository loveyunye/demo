<template>
  <el-drawer
    title="我是标题"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <span>我来啦!</span>
  </el-drawer>
</template>
<script>
export default {};
</script>
