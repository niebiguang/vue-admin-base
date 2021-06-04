<!--
 * @Author: niebiguang
 * @Date: 2020-10-14 14:55:04
 * @LastEditTime: 2020-10-16 16:08:10
 * @LastEditors: niebiguang
 * @Description: 
 * @FilePath: \gouxiao-manage-fd\src\views\dashboard\index.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">Welcome!</div>
     -->
     <img src="../../assets/index_title.png" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    if (!this.hasPerm('index:list')) {
        return 
      }
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  width: calc(100vw - 210px);
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/index_bg.jpg');
}
.dashboard {
  &-container {
    // margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
