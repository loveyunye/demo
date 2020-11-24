<template>
  <div class="header-wrapper">
    <!-- <span>昆-摄影</span> -->
    <span>模板</span>
    <div>
      <i class="el-icon-switch-button" @click="logout"></i>
    </div>
  </div>
</template>
<script>
import { logout } from '@/api/login';
import { mapMutations } from 'vuex';

export default {
  name: 'project-header',
  methods: {
    ...mapMutations('user', ['removerUser']),
    logout() {
      this.$confirm('确定登出吗', '提示')
        .then(async () => {
          await logout();
          this.removerUser();
          this.$router.push('/login');
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  span,
  i {
    color: #158bb8;
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
