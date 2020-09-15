<template>
  <div>
    <m-article-list title="购房必读文章" :articleType="1" :articleData="mustReadData"></m-article-list>
    <m-article-list title="小产权房推荐" :articleType="4" :articleData="smallHouseData"></m-article-list>
    <m-house-list title="热销房源推荐" :houseType="3" :houseData="hotHouseData"></m-house-list>
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
  name: 'mMustRead',
  components: { mArticleList, mHouseList },
  data() {
    return {
      mustReadData: [],
      smallHouseData: [],
      hotHouseData: []
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, query }) {
    if (deviceType && deviceType.type == 'pc') {
      redirect(`/xcqHouse/houseKonwledge`)
    }
    let res = await $axios.post('/api/index.php?ctl=article_cate&id=71');
    let {artilce_list, hot_house, small_house, seo_title} = res
      if (artilce_list && Array.isArray(artilce_list)) {
        artilce_list.map(item => {
          let {image} = item
          item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
          return item
        })
      }
      
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
          return item
        })
      }
      return {
        hotHouseData: hot_house,
        mustReadData: artilce_list,
        smallHouseData: small_house,
        seo_title: seo_title
      }
  },
  mounted() {
    window.scrollTo(0,0)
    EventBus.$emit('refreshCateType', {cateType: 0})
  },
  methods: {
    getMustRead() {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=article_cate&id=71`, {})
        .then(res => {
          if(res.status === 200){
            let {artilce_list, hot_house, small_house} = res.data
            if (artilce_list && Array.isArray(artilce_list)) {
              artilce_list.map(item => {
                let {image} = item
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
                return item
              })
            }
            
            if (hot_house && Array.isArray(hot_house)) {
              hot_house.map(item => {
                let {image} = item
                item.update_time = vm.$util.formatTime(item.update_time + '000')
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
                return item
              })
            }
            
            if (small_house && Array.isArray(small_house)) {
              small_house.map(item => {
                let {image} = item
                item.update_time = vm.$util.formatTime(item.update_time + '000')
                return item
              })
            }

            vm.hotHouseData = hot_house
            vm.mustReadData = artilce_list
            vm.smallHouseData = small_house
            EventBus.$emit('refreshCateType', {cateType: 0})
          }
        })
        .catch(err => {
          console.log(err)
        })
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