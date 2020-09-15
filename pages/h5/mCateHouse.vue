<template>
  <div>
    <m-house-list :title="cateTitle" :houseType="98" :cateId="cateId" :houseData="houseData"></m-house-list>
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
  name: 'mCateHouse',
  components: { mArticleList, mHouseList },
  data() {
    return {
      cateId: '',
      cateTitle: '小产权房',
      articleData: [],
      houseData: []
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, query }) {
    let { title, id, cateType } = query;
    if (deviceType && deviceType.type == 'pc') {
      redirect(`/xcqHouse/houseRecommend/cate?cateId=${id}`)
    }
    let res = await $axios.post(`/api/index.php?ctl=fuhuaqi&cate_id=${id}&type=${cateType}`);
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
      cateTitle: title + '小产权房',
      cateId: id,
      seo_title: seo_title
    }
  },
  mounted() {
    let {index, isShenZhen, isFromDetail, cateType} = this.$route.query
    if (isFromDetail) {
      EventBus.$emit('refreshSearchByCateId', { index, isShenZhen })
    }
    window.scrollTo(0,0)
  },
  methods: {
    getCateHouse(cateId, type) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&cate_id=${cateId}&type=${type}`, {})
        .then(res => {
          let house_list = res.house_list
          if (house_list && Array.isArray(house_list)) {
            house_list.map(item => {
              let {image} = item
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          vm.houseData = house_list
          vm.articleData = res.artilce_list
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    '$route.query': function(newVal, oldVal) {
      window.scrollTo(0, 700)
      let {title, id, cateType} = newVal
      this.cateId = id
      this.cateTitle = title + '小产权房'
      this.getCateHouse(id, cateType)
    }
  }
}
</script>
<style lang="less" scoped>
</style>