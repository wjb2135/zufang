<template>
  <div class="container">
    <p class="title">{{articleTitle || '关于我们'}}</p>
    <div class="info">
      <span>发布时间: {{articleDetail.update_time || '暂无'}}</span>
      <span>来源: {{shop_title || '暂无'}}</span>
      <span> 浏览次数: {{articleDetail.click_count || '暂无'}}</span>
    </div>
    <div v-html="articleDetail.content"></div>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
export default {
  name: 'aboutUs',
  data() {
    return {
      articleTitle: '',
      articleDetail: {},
      shop_title: ''
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store }) {
    let res = await $axios.post('/api/index.php?ctl=article&id=940');
    let {article_detail, shop_title, nav_top, seo_title} = res
    store.commit('setBreadcrumbObj', nav_top)
    return {
      articleDetail: article_detail,
      shop_title: shop_title,
      seo_title: seo_title
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  font-weight: bolder;
  padding: 35px 0 15px 0;
  text-align: center;
  color: #666;
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
</style>