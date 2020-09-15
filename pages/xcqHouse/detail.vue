<template>
  <div class="container">
    <p class="title" v-show="articleDetail.title">{{articleDetail.title || '加载中...'}}</p>
    <div class="info">
      <span>发布时间: {{articleDetail.update_time || '暂无'}}</span>
      <span>来源: {{shop_title || '暂无'}}</span>
      <span> 浏览次数: {{articleDetail.click_count || '暂无'}}</span>
    </div>
    <div class="content-box" v-html="articleDetail.content" v-if="articleDetail.content"></div>
    <div style="height:230px;line-height:230px;text-align:center;color:#999;border-bottom:1px solid #dcdcdc;" v-else>
      <p>Sorry!找不到相关的内容!</p>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import ENV from '@/env.js'
import { mapState, mapActions } from "vuex";
export default {
  layout: 'default',
  name: 'detail',
  data() {
    return {
      articleTitle: '',
      articleDetail: '',
      shop_title: '',
      isToArticle: false
    }
  },
  head () {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, query, params }) {
    let articleId = query.articleId
    let isToArticle = query.isToArticle
    if (deviceType && deviceType.type == 'mobile') {
      if ((typeof isToArticle == 'string' && isToArticle !== 'false') || (typeof isToArticle != 'string' && Boolean(isToArticle))) {
        redirect(`/h5/mArticleDetail?articleId=${articleId}`)
      }
      else {
        redirect(`/h5/mHouseDetail?articleId=${articleId}`)
      }
    }
    if ((typeof isToArticle == 'string' && isToArticle !== 'false') || (typeof isToArticle != 'string' && Boolean(isToArticle))) {
      let res = await $axios.post(`/api/index.php?ctl=article&id=${articleId}`);
      let { article_detail, shop_title, nav_top, seo_title } = res
      article_detail.content = article_detail.content.replace(/\.\/public\/attachment/ig, `${ENV._APIROOT}/public/attachment`)
            console.log('store');
      console.log(store);
      store.commit('setBreadcrumbObj', nav_top)
      return {
        articleDetail: article_detail,
        shop_title: shop_title,
        isToArticle: isToArticle,
        seo_title: seo_title
      }

      
    } else {
      // this.getHouseDetail(articleId)const vm = this
      let res = await $axios.post(`/api/index.php?ctl=fuhuaqi_detail&id=${articleId}`);
      let { house_detail, shop_title, nav_top, seo_title } = res
      house_detail.content = house_detail.content.replace(/\.\/public\/attachment/ig, `${ENV._APIROOT}/public/attachment`);
      store.commit('setBreadcrumbObj', nav_top)
      return {
        articleDetail: house_detail,
        shop_title: shop_title,
        seo_title: seo_title
      }
    }
  },
  mounted() {
    // this.$emit('refreshBreadcrumb', this.nav_top)
    // vm.setBreadcrumbObj(nav_top)
  },
  methods: {
    ...mapActions(['setBreadcrumbObj']),
    getHouseDetail(articleId) {
      let vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi_detail&id=${articleId}`, {})
        .then(res => {
          let { house_detail, shop_title, nav_top } = res
          house_detail.content = house_detail.content.replace(/\.\/public\/attachment/ig, `${ENV._APIROOT}/public/attachment`)
          vm.articleDetail = house_detail
          vm.shop_title = shop_title
          EventBus.$emit('refreshBreadcrumb', {nav_top})
          vm.setBreadcrumbObj(nav_top)
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    getArticleDetail(articleId) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=article&id=${articleId}`, {})
        .then(res => {
          let { article_detail, shop_title, nav_top } = res
          article_detail.content = article_detail.content.replace(/\.\/public\/attachment/ig, `${vm.$rootAdress}public/attachment`)
          vm.articleDetail = article_detail
          vm.shop_title = shop_title
          EventBus.$emit('refreshBreadcrumb', {nav_top})
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  },
  watch: {
    '$route.query.articleId': function(newVal, oldVal) {
      console.log(111)
      let {isToArticle} = this.$route.query
      if (isToArticle) {
        this.getArticleDetail(newVal)
      } else {
        this.getHouseDetail(newVal)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  font-weight: bolder;
  padding: 35px 0 15px 0;
  text-align: center;
  color: rgb(179, 57, 57);
  font-size: 2em;
}
.info {
  font-weight: normal;
  color: #777;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
  border-left: none;
  border-right: none;
  padding-bottom: 14px;
  width: 844px;
  padding: 15px;
  span {
    margin: 0 4px;
  }
}
.content-box {
  overflow: hidden;
  /deep/ img {width: 80%;}
}
</style>