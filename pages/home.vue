<template>
  <div>
    asd
  </div>
</template>
<script>
import loupan from '@/components/loupan'
import houseSuggest from '@/components/houseSuggest'
import articleList from '@/components/articleList'
import utils from '@/utils/index'
export default {
  name: 'home',
  metaInfo () {
    return {
      title: this.seo_title,
      meta: [
        {
          name: 'keywords',
          content: this.seo_keyword
        },
        {
          name: 'description',
          content: this.seo_description
        }
      ]
    }
  },
  components: { loupan, articleList, houseSuggest },
  data() {
    return {
      searchContent: '',
      homePageData: {},
      mainNewsTitle: '',
      mainNewsId: '',
      seo_title: '',
      seo_description: '',
      seo_keyword: ''
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store }) {

    // if (deviceType && deviceType.type == 'mobile') {
    //   redirect('/h5/funds/match')
    // }
    
    let resData = await $axios.get('index.php'); // 订单信息

    let objData = {}
    console.log(resData)
    if (resData.article_property_list && Array.isArray(resData.article_property_list)) {
      resData.article_property_list.map((item,index) => {
        if (index === 0) {
          objData.mainNewsTitle = item.title
          objData.mainNewsId = item.id
        }
        item.update_time = objData.formatDate(item.update_time + '000')
        return item
      })
    }
    if (resData.hot_house && Array.isArray(resData.hot_house)) {
      resData.hot_house.map((item,index) => {
        item.update_time = utils.formatDate(item.update_time + '000')
        return item
      })
    }
    if (resData.small_house && Array.isArray(resData.small_house)) {
      resData.small_house.map((item,index) => {
        item.update_time = utils.formatDate(item.update_time + '000')
        return item
      })
    }
    if (resData.article_purchase_list && Array.isArray(resData.article_purchase_list)) {
      resData.article_purchase_list.map((item,index) => {
        item.update_time = utils.formatDate(item.update_time + '000')
        return item
      })
    }
    if (resData.second_house && Array.isArray(resData.second_house)) {
      resData.second_house.splice(0, 2)
      resData.second_house.map((item,index) => {
        item.update_time = utils.formatDate(item.update_time + '000')
        return item
      })
    }
    return {
      homePageData: resData,
      seo_title: resData.seo_title,
      seo_description: resData.seo_description,
      seo_keyword: resData.seo_keyword,
      mainNewsTitle: objData.mainNewsTitle,
      mainNewsId: objData.mainNewsId
    }
  },
  // created() {
  //   this.getHomePageData()
  // },
  mounted() {},
  methods: {
    goSearch() {
      let {searchContent} = this
      // this.$router.push({name: 'search', params: {keyword: searchContent}})
      this.$router.push({path: '/xcqHouse/search', query: {keyword: searchContent, rondom: new Date().getTime()}})
    },
    gotoViewByPath(path) {
      this.$router.push({path})
    },
    getHomePageData() {
      const vm = this
      this.$http
        .get('/index.php', {})
        .then(res => {
          if(res.status === 200){
            let resData = res.data
            if (resData.article_property_list && Array.isArray(resData.article_property_list)) {
              resData.article_property_list.map((item,index) => {
                if (index === 0) {
                  vm.mainNewsTitle = item.title
                  vm.mainNewsId = item.id
                }
                item.update_time = vm.$util.formatDate(item.update_time + '000')
                return item
              })
            }
            if (resData.hot_house && Array.isArray(resData.hot_house)) {
              resData.hot_house.map((item,index) => {
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(item.image)
                item.update_time = vm.$util.formatDate(item.update_time + '000')
                return item
              })
            }
            if (resData.small_house && Array.isArray(resData.small_house)) {
              resData.small_house.map((item,index) => {
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(item.image)
                item.update_time = vm.$util.formatDate(item.update_time + '000')
                return item
              })
            }
            if (resData.article_purchase_list && Array.isArray(resData.article_purchase_list)) {
              resData.article_purchase_list.map((item,index) => {
                item.update_time = vm.$util.formatDate(item.update_time + '000')
                return item
              })
            }
            if (resData.second_house && Array.isArray(resData.second_house)) {
              resData.second_house.splice(0, 2)
              resData.second_house.map((item,index) => {
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(item.image)
                item.update_time = vm.$util.formatDate(item.update_time + '000')
                return item
              })
            }
            vm.homePageData = resData
            this.seo_title = resData.seo_title
            this.seo_description = resData.seo_description
            this.seo_keyword = resData.seo_keyword
            // document.getElementsByTagName("title")[0].innerText = vm.homePageData.shop_title
            // document.title = resData.seo_title
            // let keywordsMeta = document.createElement('meta')
            // keywordsMeta.setAttribute('name', 'keywords')
            // keywordsMeta.setAttribute('content', resData.seo_keyword)
            // document.head.appendChild(keywordsMeta)
            // let descriptionMeta = document.createElement('meta')
            // descriptionMeta.setAttribute('name', 'description')
            // descriptionMeta.setAttribute('content', resData.seo_description)
            // document.head.appendChild(descriptionMeta)
            // document.getElementById('bannerBox').style.backgroundImage  = `url(${vm.homePageData.adv_index[0].image})`
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    goDetail(articleId, isToArticle = true) {
      // isToArticle.用判断是否跳转文章详情页面，true:文章详情页面，false:房子详情页面
      this.$router.push({path: '/xcqHouse/detail', query: {articleId, isToArticle, rondom: new Date().getTime()}})
    }
  }
}
</script>
<style lang="less" scoped>
.bannerBox {
  height: 500px;
  overflow: hidden;
  width: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-image: url('../assets/images/banner.jpg');
  background-attachment: fixed;
  margin-bottom: 12px;
  .flexBlock {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .titleFirst {
      font-size: 30px;
      margin-top: 80px;
      margin-bottom: 15px;
      color: #fff;
      font-weight: bold;
    }
    .titleSecond {
      font-size: 20px;
      letter-spacing: 4px;
      color: #fff;
      font-weight: bold;
    }
    .search {
      display: block;
      width: 600px;
      height: 60px;
      background-color: rgba(0,0,0,0.6);
      padding: 30px;
      color: #CA0606;
      font-weight: bold;
      font-size: 20px;
      margin: 60px auto;
      border-radius: 5px;
      display: flex;
      align-items: center;
      span {
        margin-left: 8px;
      }
    }
  }
}
.carouselBox {
  width: 450px;
  height: 322px;
}
.topNews {
  width: calc( 100% - 460px);
  background-color: #f5f5f5;
  margin-left: 8px;
  padding: 8px;
  .titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 36px;
    border-bottom: 1px solid #dcdcdc;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 12px 0;
    }
    .more {
      color: #ff7575;
      font-size: 14px;
      font-family: "微软雅黑";
      &:hover {
        cursor: pointer;
      }
    }
  }
  .mainNewsTitle {
    color: #ff7575;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin: 20px auto;
    span {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .newsBox {
    height: 190px;
    overflow: auto;
    .newsUl {
      .newsLi {
        height: 34px;
        line-height: 34px;
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
  }
}
.hotHouse {
  box-sizing: border-box;
  width: 100%;
  background-color: #f5f5f5;
  padding: 8px;
  margin-bottom: 8px;
  .titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 36px;
    border-bottom: 1px solid #dcdcdc;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 12px 0;
    }
    .more {
      color: #ff7575;
      font-size: 14px;
      font-family: "微软雅黑";
      &:hover {
        cursor: pointer;
      }
    }
  }
  .houseList {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0 0;
    .houseItem {
      width: 20%;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // /deep/ .el-image {
      //   margin-bottom: 4px;
      // }
      &:hover {
        cursor: pointer;
      }
      .houseText {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        word-wrap: break-word;
        width: 100%;
        text-align: center;
        color: #ff7575;
        font-size: 14px;
        font-weight: bold;
        padding: 0 4px;
        cursor: pointer;
        line-height: 1.5;
        height: 50px;
        margin: 4px 0;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.houseRealTime {
  display: flex;
  justify-content: space-between;
  .houseSuggest {
    width: 850px;
  }
  .mustRead {
    width: 340px;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.boutiqueHouse {
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
        font-weight: bold;
        padding: 12px 0;
      }
      .sub {
        font-size: 16px;
        margin-left: 12px;
      }
    }
    .more {
      color: #ff7575;
      font-size: 14px;
      font-family: "微软雅黑";
      &:hover {
        cursor: pointer;
      }
    }
  }
  .houseList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 12px;
    .houseItem {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
      .houseText {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        word-wrap: break-word;
        text-align: center;
        color: #ff7575;
        font-size: 14px;
        font-weight: bold;
        padding: 0 4px;
        cursor: pointer;
        line-height: 1.5;
        height: 42px;
        margin: 4px 0;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>