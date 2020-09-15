<template>
  <div class="container">
    <div class="defaultWidth">
      <div class="topSearch">
        <div class="breadcrumb"> <!-- 面包屑预留 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }" v-if="breadcrumbObj && breadcrumbObj.top">{{breadcrumbObj.top.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="breadcrumbObj && breadcrumbObj.list">{{breadcrumbObj.list.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="breadcrumbObj && breadcrumbObj.cate_child">{{breadcrumbObj.cate_child.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="breadcrumbObj && breadcrumbObj.article">{{breadcrumbObj.article.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>  
        <div class="search">
          <el-input size="mini" placeholder="请输入您要搜索的关键字" prefix-icon="el-icon-search" v-model="searchContent" @keyup.enter.native="goSearch"></el-input>
          <span>
            <el-button size="mini" type="success" @click="goSearch">搜索</el-button>
          </span>
        </div>
      </div>
      <!-- 搜索建议 -->
      <search-suggest :keywordData="keywordList" :activeIndex="activeIndex" :activeId="activeId"></search-suggest>
      <!-- 分类 -->
      <div class="xcqTipInfo">
        <p>深圳、东莞以及周边各地区、镇级区域小产权房情行、房价、政策细分详情介绍</p>
      </div>
      <loupan :cateData="shenzhen_cate" :activeIndex="activeIndex" :activeId="activeId" :cateType="cateType"></loupan>
      <!-- <div class="xcqTipInfo">
        <p>东莞以及周边各地区、镇级区域小产权房情行、房价、政策细分详情介绍</p>
      </div> -->
      <loupan :cateData="dongguan_cate" :activeIndex="activeIndex" :activeId="activeId" :cateType="cateType"></loupan>

      <div class="houseRealTime">
        <div class="houseSuggest">
          <router-view/>
        </div>
        <div class="mustRead">
          <el-image style="width: 100%;min-height: 80px;" :src="adv_index.image" fit="cover"></el-image>
          <article-list titleName="热销房源推荐" :articleData="hotHouse" :isToArticle="false" pathName="/xcqHouse/houseRecommend/hot"></article-list>
          <article-list titleName="小产权房推荐" :articleData="houseData" :isToArticle="false" pathName="/xcqHouse/houseRecommend/recommend"></article-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import searchSuggest from '@/components/searchSuggest'
import loupan from '@/components/loupan'
import articleList from '@/components/articleList'
import utils from '@/utils/index'
import ENV from '@/env.js'
import { mapState } from "vuex";
export default {
  name: 'xcqHouse',
  components: {searchSuggest, loupan, articleList },
  data() {
    return {
      houseData: [],
      hotHouse: [],
      searchContent: '',
      shenzhen_cate: [],
      dongguan_cate: [],
      adv_index: {},
      keywordList: [],
      activeId: '',
      activeIndex: '',
      cateType: 0
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, query }) {
    let { type, activeIndex, cateId } = query;
    let dataType;
    switch (type) {
      case 'recommend':
        dataType = 1;
        break;
      case 'second':
        dataType = 2;
        break;
      case 'hot':
        dataType = 3;
        break;
    
      default:
        dataType = 0;
        break;
    }

    let res = await $axios.post(`/api/index.php?clt=fuhuaqi&type=${dataType}`);
    let { small_house, shenzhen_cate, dongguan_cate, artilce_list, hot_house, adv_index, keyword_list } = res
    if (small_house && Array.isArray(small_house)) {
      small_house.map(item => {
        let {image} = item
        item.update_time = utils.formatDate(item.update_time + '000')
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    if (hot_house && Array.isArray(hot_house)) {
      hot_house.map(item => {
        let {image} = item
        item.update_time = utils.formatDate(item.update_time + '000')
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    
    return {
     keywordList: keyword_list,
     houseData: small_house,
     hotHouse: hot_house,
     shenzhen_cate: shenzhen_cate,
     dongguan_cate: dongguan_cate,
     adv_index: adv_index,
     activeIndex: activeIndex,
     activeId: cateId
    }
  },
  created () {
    this.$on('refreshBreadcrumb', ({ nav_top }) => {
      const vm = this
      vm.breadcrumbObj = nav_top
    })
  },
  mounted() {
    this.$on('refreshBreadcrumb', ({ nav_top }) => {
      const vm = this
      vm.breadcrumbObj = nav_top
    })
    // this.$nextTick(() => {
    //   EventBus.$on('refreshActive', ({ activeId, activeIndex }) => {
    //     const vm = this
    //     console.log(activeId, activeIndex)
    //     vm.activeId = activeId
    //     vm.activeIndex = activeIndex
    //   })
    // })
      window.scrollTo(0,0)
  },
  beforeDestroy () {
    EventBus.$off('refreshBreadcrumb')
    EventBus.$off('refreshActive')
  },
  methods: {
    goSearch() {
      let {searchContent} = this
      // this.$router.push({name: 'search', params: {keyword: searchContent}})
      this.$router.push({path: '/xcqHouse/search', query: {keyword: searchContent, rondom: new Date().getTime()}})
    },
    init(type) {
      if (type === 'recommend') { // 小产权房推荐
        this.getXcqHouseList(1)
        this.cateType = 1
      } else if (type === 'second') { // 二手小产权房推荐
        this.getXcqHouseList(2)
        this.cateType = 2
      } else if (type === 'hot') { // 热销小产权楼盘
        this.getXcqHouseList(3)
        this.cateType = 3
      } else {
        this.cateType = 0
        this.getXcqHouseList(0)
      }
    },
    getXcqHouseList(type = 0) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&type=${type}`, {})
        .then(res => {
          let { type, small_house, shenzhen_cate, dongguan_cate, artilce_list, hot_house, adv_index, keyword_list } = res
          if (small_house && Array.isArray(small_house)) {
            small_house.map(item => {
              let {image} = item
              item.update_time = utils.formatDate(item.update_time + '000')
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          if (hot_house && Array.isArray(hot_house)) {
            hot_house.map(item => {
              let {image} = item
              item.update_time = utils.formatDate(item.update_time + '000')
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          
          vm.keywordList = keyword_list
          vm.houseData = small_house
          vm.hotHouse = hot_house
          vm.shenzhen_cate = shenzhen_cate
          vm.dongguan_cate = dongguan_cate
          vm.adv_index = adv_index
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  },
  watch: {
    '$route.path': function(newVal, oldVal) {
      // recommend: 小产权房推荐
      // second: 二手小产权房推荐
      // hot: 热销小产权楼盘
      // konwledge: 购房知识
      // about: 关于我们
      const {type} = this.$route.params
      this.init(type)
    },
    '$route.query': function(newVal, oldVal) {
      let {activeIndex, cateId} = newVal
      this.activeIndex = activeIndex
      this.activeId = cateId
    }
  },
  computed: {
    ...mapState(['breadcrumbObj'])
  }
}
</script>
<style lang="less" scoped>
.topSearch {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  background-color: #f0f0f0;
  padding: 0 12px;
  .breadcrumb {
    height: 60px;
    padding-top: 20px;
  }
  .search {
    /deep/ .el-input {
      width: 220px;
      height: 30px;
    }
  }
}
.xcqTipInfo {
  height: 40px;
  line-height: 40px;
  background-color: #f0f0f0;
  padding: 0 12px;
  font-size: 14px;
  color: #888;
  margin: 12px 0;
}
.houseRealTime {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .houseSuggest {
    width: 850px;
  }
  .mustRead {
    width: 340px;
  }
}
</style>