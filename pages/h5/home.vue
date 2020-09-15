<template>
  <div>
    <m-house-list title="小产权房源推荐" :houseType="100" :houseData="homePageData.small_house"></m-house-list>
    <m-house-list title="精品二手房推荐" :houseType="101" :houseData="homePageData.second_house"></m-house-list>
    <m-article-list title="购房政策文章" :articleType="2" :articleData="homePageData.article_property_list"></m-article-list>
    <m-article-list title="购房必读文章" :articleType="1" :articleData="homePageData.article_purchase_list"></m-article-list>
    <div class="bottomInfo" v-html="homePageData.index_footer_content"></div>
  </div>
</template>
<script>
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
      homePageData: ''
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store }) {
    if (deviceType && deviceType.type == 'pc') {
      redirect('/')
    }
    let res = await $axios.post('/api/index.php');
    let resData = res
    let otherData = {};
    resData.article_property_list.map((item,index) => {
      if (index === 0) {otherData.mainNewsTitle = item.uname}
      item.update_time = utils.formatDate(item.update_time + '000')
      return item
    })
    resData.article_purchase_list.map((item,index) => {
      item.update_time = utils.formatDate(item.update_time + '000')
      return item
    })
    resData.small_house.map((item,index) => {
      let {image} = item
      item.update_time = utils.formatDate(item.update_time + '000')
      item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
      return item
    })
    resData.second_house.map((item,index) => {
      let {image} = item
      item.update_time = utils.formatDate(item.update_time + '000')
      item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
      return item
    })
    return {
      homePageData: resData,
      mainNewsTitle: otherData.mainNewsTitle
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    getHomePageData() {
      const vm = this
      this.$http
        .post('/index.php', {})
        .then(res => {
          if(res.status === 200){
            let resData = res.data
            resData.article_property_list.map((item,index) => {
              if (index === 0) {vm.mainNewsTitle = item.uname}
              item.update_time = vm.$util.formatDate(item.update_time + '000')
              return item
            })
            resData.article_purchase_list.map((item,index) => {
              item.update_time = vm.$util.formatDate(item.update_time + '000')
              return item
            })
            resData.small_house.map((item,index) => {
              let {image} = item
              item.update_time = vm.$util.formatDate(item.update_time + '000')
              item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
              return item
            })
            resData.second_house.map((item,index) => {
              let {image} = item
              item.update_time = vm.$util.formatDate(item.update_time + '000')
              item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
              return item
            })
            vm.homePageData = resData
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
  }
}
</script>
<style lang="less" scoped>

.bottomInfo {
  background: #ff7575;
  margin:0 auto;
  line-height: 24px;
  font-size: 14px;
  color: #fff;
  font-family: '微软雅黑';
}
</style>