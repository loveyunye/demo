<template>
  <div class="page">
    <searchBar>
      <el-input placeholder="标题搜索"></el-input>
      <div slot="handler">添加</div>
    </searchBar>
    <div class="container">
      123333
    </div>
  </div>
</template>
<style lang="less" scoped>
.page {
  height: 100%;
  .container {
    height: calc(100% - 60px);
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }
}
</style>
