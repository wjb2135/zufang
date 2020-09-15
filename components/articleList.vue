<template>
  <div class="container">
    <div class="titleBox">
      <div class="titleText">
        <span class="main">{{titleName}}</span>
        <!-- <span class="sub">实时更新房源</span> -->
      </div>
      <el-link type="danger" class="more" @click="gotoView">更多>></el-link>
    </div>
    <div class="newsBox">
      <ul class="newsUl">
        <li class="newsLi" v-for="item in articleList" :key="item.id" @click="goDetail(item.id, isToArticle)">
          <el-link type="danger">
            <img src="../assets/images/redDot.png" style="width:6px"/>
            {{item.title}}
          </el-link>
          <span>{{item.update_time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articleList',
  props: {
    titleName: {type: String, default: '购房必读'},
    articleData: {type: Array, default: () => []},
    pathName: {type:String, default: ''},
    isToArticle: {type:Boolean, default: true}
  },
  data() {
    return {
      articleList: []
    }
  },
  created() {
    this.articleList = this.articleData
  },
  mounted() {},
  methods: {
    gotoView() {
      this.$router.push({path: this.pathName})
    },
    goDetail(articleId, isToArticle = true) {
      // isToArticle.用判断是否跳转文章详情页面，true:文章详情页面，false:房子详情页面
      this.$router.push({path: '/xcqHouse/detail', query: {articleId, isToArticle, rondom: new Date().getTime()}})
    }
  },
  watch: {
    articleData: function(newVal, oldVal) {
      this.articleList = newVal
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 0 12px;
  margin-bottom: 8px;
  border: 1px solid #dcdcdc;
  margin-top: 12px;
}
.titleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  height: 36px;
  line-height: 36px;
  .titleText {
    .main {
      font-size: 20px;
      padding: 0 12px;
      border-left: 4px solid #33B371;
    }
    .sub {
      font-size: 16px;
      margin-left: 12px;
    }
  }
  .more {
    text-decoration: none;
    color: #ff7575;
    font-size: 14px;
    font-family: "微软雅黑";
    &:hover {
      cursor: pointer;
    }
  }
}
.newsBox {
  min-height: 300px;
}
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
</style>