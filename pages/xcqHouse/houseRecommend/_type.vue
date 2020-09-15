<template>
  <div>
    <div class="houseList" v-if="houseList && houseList.length > 0">
      <div class="houseItem" v-for="item in houseList" :key="item.id" @click="goDetail(item.id)">
        <div class="houseImg">
          <el-image style="width:280px;height:220px;" :src="item.image" fit="cover"></el-image>
        </div>
        <p class="houseText" :title="item.title">
          {{item.title}}
        </p>
      </div>
    </div>
    <div style="height:230px;line-height:230px;text-align:center;color:#999;border-bottom:1px solid #dcdcdc;" v-else>
      <p>Sorry!找不到相关的内容!</p>
    </div>
    <div v-if="totalNum != 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="totalNum"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="pageChange"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import utils from '@/utils/index'
import ENV from '@/env.js'
import { EventBus } from '@/eventBus.js'
import { mapActions } from "vuex";
export default {
  name: 'houseRecommend',
  props: {},
  data() {
    return {
      totalNum: 0,
      houseList: [],
      pageSize: 10,
      currentPage: 1,
      cateType: 0
    }
  },
  head() {
    return {
      title: this.seo_title
    }
  },
  async asyncData ({ $axios, deviceType, redirect, store, params, query }) {
    const { type } = params; // type: 1: 小产权房推荐 2: 二手小产权房推荐 3: 热销小产权楼盘 0: 全部
    if (deviceType && deviceType.type == 'mobile') {
      redirect(`/h5/mXcqHouse`)
    }
    let getXcqHouseList = async function(type, page = 1) {
      let res = await $axios.post(`/api/index.php?ctl=fuhuaqi&type=${type}&p=${page}`);
      let { house_list, total_num, page_size, nav_top, seo_title } = res;
      if (house_list && Array.isArray(house_list)) {
        house_list.map(item => {
          let {image} = item
          item.update_time = utils.formatDate(item.update_time + '000')
          item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
          return item
        })
      }
      store.commit('setBreadcrumbObj', nav_top)
      return {
        cateType: type,
        houseList: house_list,
        totalNum: parseInt(total_num),
        pageSize: parseInt(page_size),
        seo_title: seo_title
      }
    }
    switch (type) {
      case 'recommend':
        return getXcqHouseList(1);
        break;
      case 'second':
        return getXcqHouseList(2);
        break;
      case 'hot':
        console.log('ppppp')
        return getXcqHouseList(3);
        break;
      case 'cate':
        let {cateId, cateType} = query
        let API_URL;
        if (cateType === undefined || cateType === 'undefined') {
          API_URL = `/api/index.php?ctl=fuhuaqi&cate_id=${cateId}&p=1&type=${type}`;
        }
        else {
          API_URL = `/api/index.php?ctl=fuhuaqi&cate_id=${cateId}&p=1&type=0`;
        }

        let res = await $axios.post(API_URL);
        let {house_list, total_num, page_size, nav_top, seo_title} = res;
        if (house_list && Array.isArray(house_list)) {
          house_list.map(item => {
            let {image} = item
            item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
            return item
          })
        }
        store.commit('setBreadcrumbObj', nav_top)
        return {
          cateType: cateType,
          houseList: house_list,
          totalNum: parseInt(total_num),
          pageSize: parseInt(page_size),
          seo_title: seo_title
        }
        break;
    
      default:
        break;
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    ...mapActions(['setBreadcrumbObj']),
    init(type, page = 1) {
      window.scrollTo(0, 0)
      if (type === 'recommend') { // 小产权房推荐
        this.getXcqHouseList(1, page)
        this.cateType = 1
      } else if (type === 'second') { // 二手小产权房推荐
        this.getXcqHouseList(2, page)
        this.cateType = 2
      } else if (type === 'hot') { // 热销小产权楼盘
        this.getXcqHouseList(3, page)
        this.cateType = 3
      } else if (type === 'cate') {
        let {cateId, cateType} = this.$route.query
        if (cateType === undefined || cateType === 'undefined') {
          this.getCateHouse(cateId, page, this.cateType)
        } else {
          this.getCateHouse(cateId, page, 0)
        }
      }
    },
    getXcqHouseList(type, page = 1) {
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&type=${type}&p=${page}`)
        .then(res => {
          let { house_list, total_num, page_size, nav_top } = res.data
          if (house_list && Array.isArray(house_list)) {
            house_list.map(item => {
              let {image} = item
              item.update_time = utils.formatDate(item.update_time + '000')
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          
          vm.houseList = house_list
          vm.totalNum = parseInt(total_num)
          vm.pageSize = parseInt(page_size)
          // vm.$emit('refreshBreadcrumb', {nav_top})
          vm.setBreadcrumbObj(nav_top)
          console.log(1111)
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    pageChange(page) {
      const {type} = this.$route.params
      this.init(type, page)
    },
    getCateHouse(cateId, page = 1, type = 0) {
      // type: 1: 小产权房推荐 2: 二手小产权房推荐 3: 热销小产权楼盘 0: 全部
      const vm = this
      this.$axios
        .post(`/api/index.php?ctl=fuhuaqi&cate_id=${cateId}&p=${page}&type=${type}`)
        .then(res => {
          let {house_list, total_num, page_size, nav_top} = res
          if (house_list && Array.isArray(house_list)) {
            house_list.map(item => {
              let {image} = item
              item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
              return item
            })
          }
          
          vm.houseList = house_list
          vm.totalNum = parseInt(total_num)
          vm.pageSize = parseInt(page_size)
          // vm.$emit('refreshBreadcrumb', {nav_top})
          vm.setBreadcrumbObj(nav_top)
        })
        .catch(err => {
          console.log(err)
        })
    },
    goDetail(articleId, isToArticle = false) {
      // isToArticle.用判断是否跳转文章详情页面，true:文章详情页面，false:房子详情页面
      this.$router.push({path: '/xcqHouse/detail', query: {articleId, isToArticle, rondom: new Date().getTime()}})
    }
  },
  watch: {
    '$route.path': function(newVal, oldVal) {
      // recommend: 小产权房推荐
      // second: 二手小产权房推荐
      // hot: 热销小产权楼盘
      // konwledge: 购房知识
      // about: 关于我们
      this.currentPage = 1
      const {type} = this.$route.params
      this.init(type)
    },
    '$route.query.cateId': function(newVal, oldVal) {
      // cate，分类
      this.currentPage = 1
      const {type} = this.$route.params
      this.init(type)
    }
  }
}
</script>
<style lang="less" scoped>
.houseList {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 230px;
  .houseItem {
    width: 270px;
    padding: 0;
    margin: 8px 4px;
    overflow: hidden;
    &:hover {
      cursor: pointer;
    }
    .houseText {
      // height: 50px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow:ellipsis;
      word-wrap: break-word;
      // height: 28px;
      line-height: 1.5;
      // display: block;
      width: 100%;
      text-align: center;
      color: #555;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #33B371;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #33B371;
}
</style>