<template>
  <div class="topInfo">
    <span class="homePage" @click="goView('/h5/home')">首页</span>
    <span class="topTitle">{{homePageData.shop_title}}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    goView(path) {
      this.$emit('goView', path)
    }
  },
  computed: {
    ...mapState(['homePageData'])
  }
}
</script>
