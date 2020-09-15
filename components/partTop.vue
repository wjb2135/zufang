<template>
  <div>
    <div class="part" v-if="homePageData.keyword_list && homePageData.keyword_list.length > 0">
      <div class="title">
        <i></i>
        <span>深圳综合房产</span>
      </div>
      <div class="list tagList">
        <div class="tagItem" :class="{activeItem: index === searchIndex}" v-for="(item,index) in homePageData.keyword_list" :key="item.id" @click="searchByKeyWord(item.keyword, index)">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="part">
      <div class="title">
        <i></i>
        <span>深圳小产权房</span>
      </div>
      <div class="list tagList">
        <div class="tagItem" :class="{activeItem: index === shenzhenIndex}" v-for="(item, index) in homePageData.shenzhen_cate" :key="item.id" @click="searchByCateId(item.title, item.id, index, true)">
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="part">
      <div class="title">
        <i></i>
        <span>东莞小产权房</span>
      </div>
      <div class="list tagList">
        <div class="tagItem" :class="{activeItem: index === dongguanIndex}" v-for="(item, index) in homePageData.dongguan_cate" :key="item.id" @click="searchByCateId(item.title, item.id, index, false)">
          {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['shenzhenIndex', 'dongguanIndex', 'cateType', 'SearchIndex'],
  methods: {
    searchByCateId(title, id, index, isShenZhen) {
      const vm = this
      if (isShenZhen) {
        vm.$emit('setShenzhenIndex', index)
        vm.$emit('setDongguanIndex', '')
        vm.$emit('setSearchIndex', '')
      }else {
        vm.$emit('setShenzhenIndex', '')
        vm.$emit('setDongguanIndex', index)
        vm.$emit('setSearchIndex', '')
      }
      vm.$router.push({ path: '/h5/mCateHouse', query: { title, id, cateType: vm.cateType } })
    },
    searchByKeyWord(keyword, index) {
      const vm = this
      vm.$emit('setShenzhenIndex', '')
      vm.$emit('setDongguanIndex', '')
      vm.$emit('setSearchIndex', index)
      vm.$router.push({ path: '/h5/mSearch', query: { keyword } })
    }
  },
  computed: {
    ...mapState(['homePageData'])
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
</style>

