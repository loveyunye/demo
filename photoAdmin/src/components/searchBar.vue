<template>
  <div class="search-bar-wrapper">
    <div class="search">
      <slot />
    </div>
    <slot name="handler" />
  </div>
</template>
<style lang="less" scoped>
.search-bar-wrapper {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  height: 48px;
  border-radius: 4px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 12px;
  align-items: center;
  padding: 0 10px;
  /deep/ div.el-input {
    display: inline-block;
  }
  .search {
    display: flex;
    & > div,
    & > button {
      margin-right: 16px;
    }

    /deep/ .el-button + .el-button {
      margin-left: 0;
    }
  }
}
</style>
