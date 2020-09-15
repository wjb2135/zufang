<template>
  <div>
    <m-house-list title="小产权房推荐" :houseType="1" :houseData="houseData"></m-house-list>
    <m-article-list title="购房必读文章" :articleType="1" :articleData="articleData"></m-article-list>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import mArticleList from '@/components/mArticleList'
import mHouseList from '@/components/mHouseList'
import ENV from '@/env.js'
import utils from '@/utils/index'
export default {
  layout: 'h5',
  name: 'mXcqHouse',
  components: { mArticleList, mHouseList },
  data() {
    return {
      houseData: [],
      articleData: []
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store }) {
    if (deviceType && deviceType.type == 'pc') {
      redirect('/xcqHouse/houseRecommend/recommend')
    }
    let res = await $axios.post(`/api/index.php?ctl=fuhuaqi&type=1`);
    let house_list = res.house_list
    let seo_title = res.seo_title
    if (house_list && Array.isArray(house_list)) {
      house_list.map(item => {
        let {image} = item
        item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
        return item
      })
    }
    return {
      houseData: house_list,
      articleData: res.artilce_list,
      cateType: res.type,
      seo_title: seo_title
    }
  },
  mounted() {
    window.scrollTo(0,0)
    EventBus.$emit('refreshCateType', {cateType: this.cateType})
  },
  methods: {
    getXcqHouseList(type) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&type=1`, {})
        .then(res => {
          if(res.status === 200){
            let house_list = res.data.house_list
            if (house_list && Array.isArray(house_list)) {
              house_list.map(item => {
                let {image} = item
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
                return item
              })
            }
            
            vm.houseData = house_list
            vm.articleData = res.data.artilce_list
            EventBus.$emit('refreshCateType', {cateType: res.data.type})
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