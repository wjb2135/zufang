<template>
  <div class="container">
    <div class="titleBox">
      <div class="titleText">
        <span class="main">{{ mainTitle }}</span>
        <span class="sub">{{ subTitle }}</span>
      </div>
      <el-link type="danger" class="more" @click="gotoViewByPath('/xcqHouse/houseRecommend/recommend')">更多>></el-link>
    </div>
    <div class="articleList">
      <div class="articleItem" v-for="item in houseListData" :key="item.id" @click="goDetail(item.id)">
        <div class="leftImg">
          <el-image style="width: 220px; height: 180px;" :src="item.image" fit="cover"></el-image>
        </div>
        <div class="desc">
          <p class="summary">{{ item.title }}</p>
          <p class="detail">{{ item.brief }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'houseSuggest',
  props: {
    mainTitle: { type: String, default: '标题文字' },
    subTitle: { type: String, default: '副标题文字' },
    houseData: { type: Array, default: () => [] }
  },
  data() {
    return {
      houseListData: ''
    }
  },
  created() {
    this.houseListData = this.houseData
  },
  methods: {
    gotoViewByPath(path) {
      this.$router.push({path})
    },
    goDetail(articleId, isToArticle = false) {
      // isToArticle.用判断是否跳转文章详情页面，true:文章详情页面，false:房子详情页面
      this.$router.push({path: '/xcqHouse/detail', query: {articleId, isToArticle, rondom: new Date().getTime()}})
    }
  },
  watch: {
    houseData: function(newVal, oldVal) {
      this.houseListData = newVal
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
}
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
    text-decoration: none;
    color: #ff7575;
    font-size: 14px;
    font-family: '微软雅黑';
    &:hover {
      cursor: pointer;
    }
  }
}
.articleList {
  .articleItem {
    display: flex;
    justify-content: flex-start;
    padding: 12px 0;
    &:hover {
      cursor: pointer;
    }
    .leftImg {
      width: 240px;
      height: 180px;
      margin-right: 12px;
      text-align: center;
      overflow: hidden;
    }
    .desc {
      width: calc(100% - 232px);
      .summary {
        width: 500px;
        padding-top: 10px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          text-decoration: underline;
        }
      }
      .detail {
        color: #ff7575;
        line-height: 22px;
        font-weight: bold;
        margin-top: 15px;
        font-size: 15px;
        height: 150px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
    }
  }
}
</style>