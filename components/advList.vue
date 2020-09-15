<template>
  <el-carousel height="170px">
    <el-carousel-item v-for="item in homePageData.adv_list" :key="item.id">
      <img :src="item.img" style="width:100%;" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(['homePageData'])
  }
}
</script>

