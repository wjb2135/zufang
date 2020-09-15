<template>
  <div>
    <div class="part">
      <div class="title">
        <i></i>
        <span>{{title}}</span>
      </div>
      <div class="list" v-if="articleListData && articleListData.length>0">
        <div class="item" v-for="item in articleListData" :key="item.id" @click="goDetailView(item.id)">
          <p>{{item.title}}</p>
          <span v-show="articleType === 3">点击：{{item.click_count}}次</span>
          <span v-show="articleType === 3">时间：{{item.update_time}}</span>
          <span v-show="articleType !== 3">{{item.update_time}}</span>
        </div>
        <!-- <div class="item">
          <p>龙华最近开盘的小产权房有哪些</p>
          <span>2020-2-17 10:48:46</span>
        </div>
        <div class="item">
          <p>龙华最近开盘的小产权房有哪些</p>
          <span>2020-2-17 10:48:46</span>
        </div> -->
      </div>
      <div v-else>
        <div style="height: 50px;line-height:50px;text-align:center;">暂无文章数据</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mArticleList',
  props: {
    title: {type: String, default: ''},
    articleType: { type: Number, default: 0}, // 1: 购房必读文章 2:购房政策文章,3: 小产权房推荐, 4: 购房必读里面的 小产权房推荐（跳转 房子详情页）
    articleData: {type: Array, default: () => []}
  },
  data() {
    return {
      articleListData: []
    }
  },
  created() {
    // this.init()
    this.articleListData = this.articleData
  },
  methods: {
    init() {
      const vm = this
      if (vm.articleType === 2) {
        vm.getHouseMarket()
      } else {
        vm.getMustRead()
      }
    },
    getMustRead() {
      const vm = this
      this.$http
        .post(`/index.php?ctl=article_cate&id=71`, {})
        .then(res => {
          if(res.status === 200){
            let artilce_list = res.data.artilce_list
            if (artilce_list && Array.isArray(artilce_list)) {
              artilce_list.map(item => {
                let {image} = item
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
                return item
              })
            }
            vm.articleListData = artilce_list
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getHouseMarket() {
      const vm = this
      this.$http
        .post(`/index.php?ctl=article_cate&id=70`, {})
        .then(res => {
          if(res.status === 200){
            let artilce_list = res.data.artilce_list
            if (artilce_list && Array.isArray(artilce_list)) {
              artilce_list.map(item => {
                let {image} = item
                item.image = vm.$rootAdress + vm.$util.toAbsoluteAddress(image)
                return item
              })
              vm.articleListData = artilce_list
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    goDetailView(id) {
      const vm = this
      if (vm.articleType === 4) { // 4: 购房必读 >> 小产权房推荐（跳转 房子详情页）
        this.$router.push({path: '/h5/mHouseDetail', query: {articleId: id, rondom: new Date().getTime()}})
      } else {
        this.$router.push({path: '/h5/mArticleDetail', query: {articleId: id, rondom: new Date().getTime()}})
      }
    }
  },
  watch: {
    articleData: function(newVal, oldVal) {
      this.articleListData = newVal
    }
  }
}
</script>
<style lang="less" scoped>
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
      // height: 52px;
      border-bottom: 1px dotted #e4e4e4;
      padding: 4px 0;
      margin-bottom: 4px;
      p {
        font-size: 16px;
        color: #333;
        // height: 20px;
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
</style>