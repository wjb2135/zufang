<template>
<div class="flexBlock defaultWidth">
  <div>
    <img :src="head_logn" />
  </div>
  <div>
    <el-menu :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#33B371">
      <el-menu-item :index="item.url" v-for="item in homePageData.nav_list" :key="item.id">{{item.name}}</el-menu-item>
      <!-- <el-menu-item index="/xcqHouse/houseRecommend/recommend" >小产权房推荐</el-menu-item>
      <el-menu-item index="/xcqHouse/houseRecommend/second" >二手小产权房推荐</el-menu-item>
      <el-menu-item index="/xcqHouse/houseRecommend/hot" >热销小产权楼盘</el-menu-item>
      <el-menu-item index="/xcqHouse/houseKonwledge" >购房知识</el-menu-item>
      <el-menu-item index="/xcqHouse/aboutUs" >关于我们</el-menu-item> -->
    </el-menu>
  </div>
</div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import utils from '@/utils/index'
import ENV from '@/env.js'
export default {
  name: 'headerMenu',
  data() {
    return {
      activeIndex: '/home',
      navList: []
    }
  },
  mounted() {
    let { pathname } = window.location
    this.activeIndex = pathname
  },
  methods: {
    handleSelect(index, indexPath) {}
  },
  computed: {
    ...mapState(['homePageData']),
    head_logn() {
      return ENV._APIROOT + '/' + utils.toAbsoluteAddress(this.homePageData.head_logn)
    }
  }
}
</script>
<style lang="less" scoped>
.flexBlock {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>