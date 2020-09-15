<template>
  <div class="container">
    <div class="defaultWidth">
      <ul class="loupanUl">
        <li 
          class="loupanLi" 
          :class="{activeLi: activeIndex === index && activeId === item.id}" 
          v-for="(item, index) in cateList" 
          :key="item.id" 
          @click="goCateHouse(item.id, index)"
        >
          <a :title="item.title">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/eventBus.js'
export default {
  name: 'loupan',
  props: {
    cateData: {type: Array, default: () => []},
    activeIndex: {type: [String,Number], default: ''},
    activeId: {type: [String,Number], default: ''},
    cateType: {type: [String,Number], default: 0}
  },
  data() {
    return {
      cateList: []
    }
  },
  created() {
    this.cateList = this.cateData
  },
  methods: {
    goCateHouse(cateId, index) {
      // EventBus.$emit('refreshActive', {activeId: cateId, activeIndex: index})
      // this.$emit('setActive', {activeId: cateId, activeIndex: index})
      this.$router.push({path: '/xcqHouse/houseRecommend/cate', query: {cateId, activeIndex: index, rondom: new Date().getTime()}})
    }
  },
  watch: {
    cateData: function(newVal, oldVal) {
      this.cateList = newVal
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 12px 0;
}
.loupanUl {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  .loupanLi {
    list-style-type: none;
    margin: 1px;
    width: calc( 100% / 9 - 2px);
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