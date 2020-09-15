<template>
  <div class="container">
    <div class="defaultWidth">
      <ul class="loupanUl">
        <li class="loupanLi" :class="{activeLi: activeIndex === index && activeId === item.id}" v-for="(item, index) in keywordList" :key="item.id" @click="goSearch(item.keyword, item.id, index)">
          <a :title="item.name">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchSuggest',
  props: {
    keywordData: {type: Array, default: () => []},
    activeIndex: {type: [String,Number], default: ''},
    activeId: {type: [String,Number], default: ''}
  },
  data() {
    return {
      keywordList: [],
      searchActive: ''
    }
  },
  created() {},
  methods: {
    goSearch(keyword, cateId, index) {
      this.searchActive = index
      // this.$router.push({name: 'search', params: {keyword, cateId, activeIndex: index}})
      this.$router.push({path: '/xcqHouse/search', query: {keyword, cateId, activeIndex: index, rondom: new Date().getTime()}})
    },
  },
  watch: {
    keywordData: function(newVal, oldVal) {
      this.keywordList = newVal
    }
  }
}
</script>
<style lang="less" scoped>
.loupanUl {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
  .loupanLi {
    list-style-type: none;
    margin: 1px;
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: #FFF;
    font-size: 14px;
    font-family: "微软雅黑";
    display: block;
    background-color: #ff7575;
    text-align: center;
    &:hover {
      background-color:#000;
      cursor: pointer;
    }
  }
  .activeLi {
    background-color:#000;
  }
}
</style>