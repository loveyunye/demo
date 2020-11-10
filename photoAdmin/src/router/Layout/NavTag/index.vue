<template>
  <div class="nav-tag-wrapper">
    <TriggerBtn />
    <NavTags class="nav-tags" />
  </div>
</template>
<script>
import NavTags from './NavTags';
import TriggerBtn from './TriggerBtn';

export default {
  name: 'nav-tag-container',
  components: {
    NavTags,
    TriggerBtn,
  },
};
</script>

<style lang="less" scoped>
.nav-tag-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  .nav-tags {
    width: calc(100% - 56px);
    // flex: 1;
  }
}
</style>
