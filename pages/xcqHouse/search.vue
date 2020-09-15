<template>
  <div class="container">
    <div class="articleList" v-if="houseListData && houseListData.length > 0">
      <div class="articleItem" v-for="item in houseListData" :key="item.id" @click="goDetail(item.id, false)">
        <div class="leftImg">
          <el-image style="width: 220px; height: 180px;" :src="item.image" fit="cover"></el-image>
        </div>
        <div class="desc">
          <p class="summary">{{ item.title }}</p>
          <p class="detail">{{ item.brief }}</p>
        </div>
      </div>
    </div>
    <div style="height:230px;line-height:230px;text-align:center;color:#999;border-bottom:1px solid #dcdcdc;" v-else>
      <p>Sorry!找不到相关的内容!</p>
    </div>
    <el-pagination
      v-if="totalNum != 0"
      background
      layout="total, prev, pager, next"
      :total="totalNum"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="pageChange"
      >
    </el-pagination>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import utils from '@/utils/index'
import ENV from '@/env.js'
export default {
  name: 'search',
  data() {
    return {
      houseListData: [],
      currentKeyWord: '',
      totalNum: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, query }) {
    let keyword = String(query.keyword);
    let res = await $axios.post(`/api/index.php?ctl=fuhuaqi&keyword=${keyword}&p=1`);
    let {house_list, article_purchase_list, total_num, page_size, nav_top, seo_title} = res
    if (house_list && Array.isArray(house_list)) {
      house_list.map(item => {
        let {image} = item
        item.image = ENV.APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    return {
      houseListData: house_list,
      totalNum: parseInt(total_num),
      pageSize: parseInt(page_size),
      nav_top: nav_top,
      seo_title: seo_title
    }
  },
  mounted () {
    this.$emit('refreshBreadcrumb', this.nav_top)
  },
  methods: {
    pageChange(page) {
      const {currentKeyWord} = this
      this.searchByKeyWord(currentKeyWord, page)
    },
    searchByKeyWord(keyword = '', page = 1) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&keyword=${keyword}&p=${page}`, {})
        .then(res => {
          let {house_list, article_purchase_list, total_num, page_size, nav_top} = res
          if (house_list && Array.isArray(house_list)) {
            house_list.map(item => {
              let {image} = item
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          
          // article_purchase_list.map((item,index) => {
          //   item.update_time = vm.$util.formatDate(item.update_time + '000')
          //   return item
          // })
          // vm.articleData = article_purchase_list
          vm.houseListData = house_list
          vm.totalNum = parseInt(total_num)
          vm.pageSize = parseInt(page_size)
          this.$emit('refreshBreadcrumb', {nav_top})
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    goDetail(articleId, isToArticle = true) {
      // isToArticle.用判断是否跳转文章详情页面，true:文章详情页面，false:房子详情页面
      this.$router.push({path: '/xcqHouse/detail', query: {articleId, isToArticle, rondom: new Date().getTime()}})
    }
  },
  watch: {
    '$route.query.keyword': function(newVal, oldVal) {
      this.currentKeyWord = newVal
      this.searchByKeyWord(newVal)
    },
    '$route.params.keyword': function(newVal, oldVal) {
      this.currentKeyWord = newVal
      this.searchByKeyWord(newVal)
    }
  }
}
</script>
<style lang="less" scoped>

.articleList {
  .articleItem {
    display: flex;
    justify-content: flex-start;
    padding: 12px 0;
    .leftImg {
      width: 240px;
      height: 180px;
      margin-right: 12px;
      text-align: center;
      overflow: hidden;
    }
    .desc {
      width: calc(100% - 232px);
      .summary {
        font-weight: bold;
        display: block;
        margin-bottom: 15px;
        font-size: 16px;
        text-decoration: none;
        color: #555;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .detail {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
        text-overflow:ellipsis;
        word-wrap: break-word;
        font-size: 14px;
        letter-spacing: 1px;
      }
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #33B371;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #33B371;
}
</style>