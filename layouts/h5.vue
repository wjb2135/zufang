<template>
  <div class="Mcontainer">
    <topInfo v-on:goView="goView"></topInfo>
    <m-search></m-search>
    <section class="main">
      <advList></advList>
      <div class="lanmu">
        <p class="lanmu-item" style="background-color: #00bb9c;" @click="goView('/h5/mXcqHouse')">小产权推荐</p>
        <p class="lanmu-item" style="background-color: #97a3f5;" @click="goView('/h5/mSecondHouse')">精品二手房</p>
        <p class="lanmu-item" style="background-color: #5fcaf9;" @click="goView('/h5/mHotHouse')">热销房推荐</p>
        <p class="lanmu-item" style="background-color: #d88bfb;" @click="goView('/h5/mMustRead')">购房必须读</p>
      </div>"
      <partTop :searchIndex="searchIndex" :shenzhenIndex="shenzhenIndex" :dongguanIndex="dongguanIndex" :cateType="cateType" v-on:setShenzhenIndex="setShenzhenIndex" v-on:setDongguanIndex="setDongguanIndex"></partTop>
      <router-view/>
      <partBottom :searchIndex="searchIndex" :shenzhenIndex="shenzhenIndex" :dongguanIndex="dongguanIndex" :cateType="cateType" v-on:setShenzhenIndex="setShenzhenIndex" v-on:setDongguanIndex="setDongguanIndex"></partBottom>
    </section>
    <div class="contactsInfo">
      <p class="tel">看房热线：<a style="color: #ff0000;text-decoration: none;" :href="'tel:' + homePageData.contact_phone">{{homePageData.contact_phone}}</a> （点击拨打） </p>
      <p class="name">联系经理：{{homePageData.contact_name}}</p>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
import mSearch from '@/components/mSearch'
import topInfo from '@/components/topInfo'
import advList from '@/components/advList'
import partTop from '@/components/partTop'
import partBottom from '@/components/partBottom'
import { mapState } from "vuex";
export default {
  name: 'mhome',
  components: { mSearch, topInfo, advList, partTop, partBottom },
  head () {
    return {
      title: this.homePageData.seo_title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.homePageData.seo_description, },
        { hid: 'keywords', name: 'keywords', content: this.homePageData.seo_keyword, }
      ]
    }
  },
  data() {
    return {
      currentKeyWord: '',
      searchIndex: '',
      shenzhenIndex: '',
      dongguanIndex: '',
      cateType: 0
    }
  },
  mounted() {
    // this.getHomePageData()
    EventBus.$on('refreshSearchByCateId', ({ index, isShenZhen }) => {
      const vm = this
      if (isShenZhen) {
        vm.searchIndex = ''
        vm.shenzhenIndex = index
        vm.dongguanIndex = ''
      }else {
        vm.searchIndex = ''
        vm.shenzhenIndex = ''
        vm.dongguanIndex = index
      }
    })
    EventBus.$on('refreshSearchByKeyWord', ({ index }) => {
      const vm = this
      vm.searchIndex = index
      vm.shenzhenIndex = ''
      vm.dongguanIndex = ''
    })
    EventBus.$on('refreshCateType', ({ cateType }) => {
      this.cateType = cateType
    })
  },
  beforeDestroy () {
    EventBus.$off('refreshSearchByCateId')
    EventBus.$off('refreshSearchByKeyWord')
    EventBus.$off('refreshCateType')
  },
  methods: {
    goView(path) {
      this.searchIndex = ''
      this.shenzhenIndex = ''
      this.dongguanIndex = ''
      this.$router.push({path, query: {rondom: new Date().getTime()}})
    },
    getHomePageData() {
      const vm = this
      this.$http
        .post('/api/index.php')
        .then(res => {
          let resData = res.data
          vm.homePageData = resData
          // document.getElementsByTagName("title")[0].innerText = homePageData.shop_title
          document.title = resData.seo_title
          let keywordsMeta = document.createElement('meta')
          keywordsMeta.setAttribute('name', 'keywords')
          keywordsMeta.setAttribute('content', resData.seo_keyword)
          document.head.appendChild(keywordsMeta)
          let descriptionMeta = document.createElement('meta')
          descriptionMeta.setAttribute('name', 'description')
          descriptionMeta.setAttribute('content', resData.seo_description)
          document.head.appendChild(descriptionMeta)
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    searchByKeyWord(keyword, index) {
      const vm = this
      vm.searchIndex = index
      vm.shenzhenIndex = ''
      vm.dongguanIndex = ''
      vm.$router.push({ path: '/mhome/mSearch', query: { keyword } })
    },
    setShenzhenIndex(data) {
      this.shenzhenIndex = data;
    },
    setDongguanIndex(data) {
      this.dongguanIndex = data;
    }
  },
  computed: {
    ...mapState(['homePageData']),
    footer_logn() {
      return ENV._APIROOT + '/' + utils.toAbsoluteAddress(this.homePageData.footer_logn)
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
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .activeItem {
        background-color: #126b48b0;
        color: #fff;
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
.main {
  width: 100%;
}
</style>