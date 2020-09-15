<template>
  <div>
    <m-house-list :title="'搜索“' + currentKeyWord + '”结果：'" :houseType="99"  :currentKeyWord="currentKeyWord" :houseData="houseData"></m-house-list>
    <!-- <m-article-list title="购房必读文章" :articleType="1" :articleData="articleData"></m-article-list> -->
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import mArticleList from '@/components/mArticleList'
import mHouseList from '@/components/mHouseList'
import utils from '@/utils/index'
import ENV from '@/env.js'
export default {
  layout: 'h5',
  name: 'mIndex',
  components: { mArticleList, mHouseList },
  data() {
    return {
      artilce_list: [],
      currentKeyWord: '',
      houseData: [],
      articleData: []
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, query }) {
    let { keyword } = query;
    if (deviceType && deviceType.type == 'pc') {
      redirect(`/xcqHouse/search?keyword=${keyword}`)
    }
    let res = await $axios.post(`/api/index.php?ctl=fuhuaqi&keyword=${keyword}`);
    let {house_list, article_purchase_list, seo_title} = res
    if (house_list && Array.isArray(house_list)) {
      house_list.map(item => {
        let {image} = item
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    if (article_purchase_list && Array.isArray(article_purchase_list)) {
      article_purchase_list.map((item,index) => {
        item.update_time = utils.formatDate(item.update_time + '000')
        return item
      })
    }
    return {
      articleData: article_purchase_list,
      houseData: house_list,
      currentKeyWord: keyword,
      seo_title: seo_title
    }
  },
  mounted() {
    let {index, isFromDetail} = this.$route.query
    if (isFromDetail) {
      EventBus.$emit('refreshSearchByKeyWord', { index })
    }
    window.scrollTo(0, 0)
  },
  methods: {
    searchByKeyWord(keyword = '') {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&keyword=${keyword}`, {})
        .then(res => {
          let {house_list, article_purchase_list} = res
          if (house_list && Array.isArray(house_list)) {
            house_list.map(item => {
              let {image} = item
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          if (article_purchase_list && Array.isArray(article_purchase_list)) {
            article_purchase_list.map((item,index) => {
              item.update_time = utils.formatDate(item.update_time + '000')
              return item
            })
          }
          
          vm.articleData = article_purchase_list
          vm.houseData = house_list
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  },
  watch: {
    '$route.query.keyword': function(newVal, oldVal) {
      window.scrollTo(0, 700)
      this.currentKeyWord = newVal
      this.searchByKeyWord(newVal)
    }
  }
}
</script>
<style lang="less" scoped>

.bottomInfo {
  background: #ff7575;
  margin:0 auto;
  padding: 15px;
  line-height: 24px;
  font-size: 14px;
  color: #fff;
  font-family: '微软雅黑';
}
</style>