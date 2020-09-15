<template>
  <div>
    <!-- 文章详情 -->
    <div class="articleBox">
      <p class="title">{{house_detail.title}}</p>
      <p class="info" v-show="house_detail.content">发布时间：{{house_detail.update_time}} 来源：{{homePageData.shop_title}} 浏览次数：{{house_detail.click_count}}</p>
      <div class="content" v-html="house_detail.content || '暂无文章详情'"></div>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import mArticleList from '@/components/mArticleList'
import mHouseList from '@/components/mHouseList'
import utils from "@/utils/index";
import ENV from '@/env.js'
export default {
  layout: 'h5',
  name: 'mHouseDetail',
  components: {mArticleList, mHouseList},
  data() {
    return {
      homePageData: '',
      currentKeyWord: '',
      house_detail: ''
    }
  },
  head() {
    title: this.seo_title
  },
  async asyncData ({ $axios, deviceType, redirect, store, query }) {
    let { articleId, isToArticle } = query;
    if (deviceType && deviceType.type == 'pc') {
      redirect(`/xcqHouse/detail?articleId=${articleId}&isToArticle=false`)
    }

    let res = await $axios.post(`/api/index.php?ctl=fuhuaqi_detail&id=${articleId}`);
    let resData = res
    let {hot_house, small_house, artilce_list, house_detail, seo_title} = resData
    house_detail.content = house_detail.content.replace(/\.\/public\/attachment/ig, `${ENV._APIROOT}/public/attachment`)
    if (hot_house && Array.isArray(hot_house)) {
      hot_house.map(item => {
        let {image} = item
        item.update_time = utils.formatTime(item.update_time + '000')
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    if (small_house && Array.isArray(small_house)) {
      small_house.map(item => {
        let {image} = item
        item.update_time = utils.formatTime(item.update_time + '000')
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    return {
      homePageData: resData,
      house_detail: house_detail,
      hotHouse: hot_house,
      smallHouse: small_house,
      articleList: artilce_list,
      seo_title: seo_title
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    EventBus.$emit('refreshHotHouse', { hotHouse: this.hotHouse })
    EventBus.$emit('refreshSmallHouse', { smallHouse: this.smallHouse })
    EventBus.$emit('refreshArticleList', { articleList: this.articleList })
  },
  methods: {
    getArticleDetail(articleId) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi_detail&id=${articleId}`, {})
        .then(res => {
          let resData = res
          vm.homePageData = resData
          vm.house_detail = resData.house_detail || ''
          let {hot_house, small_house, artilce_list} = resData
          if (hot_house && Array.isArray(hot_house)) {
            hot_house.map(item => {
              let {image} = item
              item.update_time = utils.formatTime(item.update_time + '000')
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          if (small_house && Array.isArray(small_house)) {
            small_house.map(item => {
              let {image} = item
              item.update_time = utils.formatTime(item.update_time + '000')
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          EventBus.$emit('refreshHotHouse', { hotHouse: hot_house })
          EventBus.$emit('refreshSmallHouse', { smallHouse: small_house })
          EventBus.$emit('refreshArticleList', { articleList: artilce_list })
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  },
  watch: {
    '$route.query.articleId': function(newVal, oldVal) {
      window.scrollTo(0, 0)
      this.getArticleDetail(newVal)
    }
  }
}
</script>
<style lang="less" scoped>
body,html {
  height: 100%;
  background-color: #eaeaea;
}
.Mcontainer {
  height: 100%;
  box-sizing: border-box;
  background-color: #eaeaea;
}
.topInfo {
  width: 100%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  background-color: #1bbc9b;
  z-index: 9;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  .topTitle {
    font-weight: bold;
  }
}
.main {
  height: 100%;
  overflow: auto;
  margin-top: 50px;
  margin-bottom: 60px;
  .lanmu {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    .lanmu-item {
      width: 25%;
      height: 38px;
      line-height: 38px;
      color: #fff;
      border-right: 1px solid #fff;
      text-align: center;
      font-size: 14px;
      &:last-child {
        border-right: 0;
      }
    }
  }
  .part {
    background-color: #fff;
    margin-bottom: 6px;
    .title {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 12px;
      i {
        border-left: 4px solid #1cb177;
        margin-right: 8px;
      }
    }
    .list {
      padding: 12px;
      .item {
        height: 48px;
        border-bottom: 1px dotted #e4e4e4;
        padding: 4px 0;
        margin-bottom: 4px;
        p {
          font-size: 16px;
          color: #333;
          height: 20px;
          line-height: 20px;
        }
        span {
          font-size: 12px;
          color: #999;
          height: 18px;
          line-height: 18px;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
  .part {
    .tagList {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0;
      .tagItem {
        width: calc( 25% - 1px );
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #eeeded;
        border-right: 1px solid #eeeded;
        display: block;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.contactsInfo {
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #fff;
  height: 60px;
  position: fixed;
  bottom: 0;
  p {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e5e5e5;
    &:last-child {
      border-bottom: 0;
    }
  }
}
.articleBox {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 12px;
  .info {
    font-size: 13px;
    margin-bottom: 10px;
    line-height: 26px;
    font-weight: bold;
  }
  /deep/ .title {
    width: 100%;
    display: block;
    font-weight: bolder;
    padding: 15px 0 15px 0;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 32px;
    float: left;
    max-height: 52px;
    overflow: hidden;
    display: block;
    color: #333;
  }
  /deep/ .content {
    img {
      width: 100%;
    }
  }
}
</style>