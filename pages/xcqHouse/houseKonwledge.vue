<template>
  <div class="container">
    <div class="newsBox">
      <ul class="newsUl" v-if="articleList && articleList.length>0">
        <li class="newsLi" v-for="item in articleList" :key="item.id">
          <el-link type="danger" @click="goDetail(item.id)">
            <img src="../../assets/images/redDot.png" style="width:6px"/>
            {{item.title}}
          </el-link>
          <span>{{item.update_time}}</span>
        </li>
      </ul>
      <div style="height:230px;line-height:230px;text-align:center;color:#999;border-bottom: 1px solid #dcdcdc;" v-else>
        <p>Sorry!找不到相关的内容!</p>
      </div>
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
import ENV from '@/env.js'
import utils from '@/utils/index'
export default {
  name: 'houseKonwledge',
  data() {
    return {
      articleList: [],
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
    if (deviceType && deviceType.type == 'mobile') {
      redirect(`/h5/mMustRead`)
    }

    let res = await $axios.post(`/api/index.php?ctl=article_cate&id=71&p=1`);
    let {artilce_list, hot_house, small_house, total_num, page_size, nav_top, seo_title } = res
    if (artilce_list && Array.isArray(artilce_list)) {
      artilce_list.map(item => {
        let {image} = item
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    // hot_house.map(item => {
    //   let {image} = item
    //   item.update_time = vm.$util.formatTime(item.update_time + '000')
    //   item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
    //   return item
    // })

    // small_house.map(item => {
    //   let {image} = item
    //   item.update_time = vm.$util.formatTime(item.update_time + '000')
    //   return item
    // })

    // vm.hotHouseData = hot_house
    // vm.smallHouseData = small_house
    store.commit('setBreadcrumbObj', nav_top)
    return {
      articleList: artilce_list,
      totalNum: parseInt(total_num),
      pageSize: parseInt(page_size),
      seo_title: seo_title
    }
  },
  methods: {
    getMustRead(page = 1) {
      const vm = this;
      this.$nuxt.$loading.start()
      this.$axios
        .post(`/api/index.php?ctl=article_cate&id=71&p=${page}`, {})
        .then(res => {
          this.$nuxt.$loading.finish()
          let {artilce_list, hot_house, small_house, total_num, page_size, nav_top} = res
            if (artilce_list && Array.isArray(artilce_list)) {
            artilce_list.map(item => {
              let {image} = item
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          // hot_house.map(item => {
          //   let {image} = item
          //   item.update_time = vm.$util.formatTime(item.update_time + '000')
          //   item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
          //   return item
          // })

          // small_house.map(item => {
          //   let {image} = item
          //   item.update_time = vm.$util.formatTime(item.update_time + '000')
          //   return item
          // })

          // vm.hotHouseData = hot_house
          // vm.smallHouseData = small_house
          vm.articleList = artilce_list

          vm.totalNum = parseInt(total_num)
          vm.pageSize = parseInt(page_size)
          this.$emit('refreshBreadcrumb', {nav_top})
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          console.log(err)
        })
    },
    pageChange(page) {
      this.getMustRead(page)
    },
    goDetail(articleId, isToArticle = true) {
      // isToArticle.用判断是否跳转文章详情页面，true:文章详情页面，false:房子详情页面
      this.$router.push({path: '/xcqHouse/detail', query: {articleId, isToArticle, rondom: new Date().getTime()}})
    }
  }
}
</script>
<style lang="less" scoped>

.container {
  // background-color: #f5f5f5;
  padding: 0 12px;
  margin-bottom: 8px;
}
.titleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  .titleText {
    .main {
      font-size: 20px;
      padding: 12px 0;
    }
    .sub {
      font-size: 16px;
      margin-left: 12px;
    }
  }
  .more {
    text-decoration: none;
    color: #ff7575;
    font-size: 14px;
    font-family: "微软雅黑";
    &:hover {
      cursor: pointer;
    }
  }
}
.newsBox {
  min-height: 230px;
}
.newsUl {
  .newsLi {
    height: 41px;
    line-height: 41px;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dotted #dcdcdc;
    a, span {
      font-size: 14px;
      font-family: "微软雅黑";
      color: #666;
    }
    a {
      display: inline-block;
      max-width: calc( 100% - 100px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #ff7575;
        cursor: pointer;
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