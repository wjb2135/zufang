<template>
  <div>
    <div class="part">
      <div class="title">
        <i></i>
        <span>{{title}}</span>
      </div>
      <div class="list houseList" v-if="houseDataList && houseDataList.length>0">
        <div class="houseItem" v-for="item in houseDataList" :key="item.id" @click="goDetailView(item.id)">
          <div class="img">
            <el-image
              style="width: 110px; height: 70px"
              :src="item.image"
              fit="cover"></el-image>
          </div>
          <div class="info">
            <p>{{item.title}}</p>
            <span v-show="houseType !== 3">{{item.update_time}}</span>
            <span v-show="houseType === 3">点击：{{item.click_count}}次</span>
            <span v-show="houseType === 3">时间：{{item.update_time}}</span>
          </div>
        </div>
        <!-- <div class="houseItem">
          <div class="img">
            <el-image
              style="width: 110px; height: 70px"
              src="http://www.szxcqfw.com/upfile/pic/2020314/202031401449102.jpg"
              fit="cover"></el-image>
          </div>
          <div class="info">
            <p>龙华最近开盘的小产</p>
            <span>2020-2-17 10:48:46</span>
          </div>
        </div>
        <div class="houseItem">
          <div class="img">
            <el-image
              style="width: 110px; height: 70px"
              src="http://www.szxcqfw.com/upfile/pic/2020314/202031401449102.jpg"
              fit="cover"></el-image>
          </div>
          <div class="info">
            <p>龙华最近开盘的小</p>
            <span>2020-2-17 10:48:46</span>
          </div>
        </div> -->
      </div>
      <div class="list houseList" v-else>
        <div style="height: 50px;line-height:50px;text-align:center;">暂无房源数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from '@/env.js'
import utils from '@/utils/index'
export default {
  name: 'mHouseList',
  props: {
    title: {type: String, default: ''},
    /**
     * 100: 小产权房源推荐 (首页)
     * 101: 精品二手房推荐 （首页）
     * 1: 小产权房推荐
     * 2: 精品二手房源
     * 3：热销房推荐
     * 98: 深圳/东莞 分类小产权房
     * 99: 搜索结果
     */
    houseType: { type: Number, default: 0},
    currentKeyWord: { type: String, default: ''},
    houseData: {type: [Array, Object], default: ()=>[]},
    cateId: { type: [String,Number], default: ''},
  },
  data() {
    return {
      houseDataList: []
    }
  },
  created() {
    // this.init()
    this.houseDataList = this.houseData
  },
  methods: {
    init() {
      const vm = this
      if (vm.houseType === 99) { // 99: 搜索结果
        vm.searchByKeyWord(vm.currentKeyWord)
      } else if (vm.houseType === 1) {
        vm.getXcqHouseList(1)
      } else if (vm.houseType === 2) {
        vm.getXcqHouseList(2)
      } else if (vm.houseType === 3) {
        vm.getXcqHouseList(3)
      } else if (vm.houseType === 100) {
        vm.getSmallHouse()
      } else if (vm.houseType === 101) {
        vm.getSecondHouse()
      } else if (vm.houseType === 98) {
        vm.getCateHouse(vm.cateId)
      }
    },
    getCateHouse(cateId) {
      const vm = this
      this.$http
        .post(`/index.php?ctl=fuhuaqi&cate_id=${cateId}`, {})
        .then(res => {
          if(res.status === 200){
            let house_list = res.data.house_list
            if (house_list && Array.isArray(house_list)) {
              house_list.map(item => {
                let {image} = item
                item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
                return item
              })
              vm.houseDataList = house_list
            }
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    getSmallHouse() {
      const vm = this
      this.$http
        .post('/index.php', {})
        .then(res => {
          if(res.status === 200){
            let small_house = res.data.small_house
            if (small_house && Array.isArray(small_house)) {
              small_house.map(item => {
                let {image} = item
                item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
                return item
              })
              vm.houseDataList = small_house
            }
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    getSecondHouse() {
      const vm = this
      this.$http
        .post('/index.php', {})
        .then(res => {
          if(res.status === 200){
            let second_house = res.data.second_house
            if (second_house && Array.isArray(second_house)) {
              second_house.map(item => {
                let {image} = item
                item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
                return item
              })
              vm.houseDataList = second_house
            }
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    getXcqHouseList(type) {
      const vm = this
      this.$http
        .post(`/index.php?ctl=fuhuaqi&type=${type}`, {})
        .then(res => {
          if(res.status === 200){
            let house_list = res.data.house_list
            if (house_list && Array.isArray(house_list)) {
              house_list.map(item => {
                let {image} = item
                item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
                return item
              })
              vm.houseDataList = house_list
            }
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    searchByKeyWord(keyword = '') {
      const vm = this
      this.$http
        .post(`/index.php?ctl=fuhuaqi&keyword=${keyword}`, {})
        .then(res => {
          if(res.status === 200){
            let house_list = res.data.artilce_list
            if (house_list && Array.isArray(house_list)) {
              house_list.map(item => {
                let {image} = item
                item.image = ENV._APIROOT + '/' + utils.toAbsoluteAddress(image)
                return item
              })
              vm.houseDataList = house_list
            }
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    goDetailView(id, isToArticle = false) {
      const vm = this
      // if (vm.houseType === 99) { // 99: 搜索结果
      //   this.$router.push({path: '/mArticleDetail', query: {articleId: id, rondom: new Date().getTime()}})
      // } else {
        this.$router.push({path: '/h5/mHouseDetail', query: {articleId: id, rondom: new Date().getTime()}})
      // }
    }
  },
  watch: {
    currentKeyWord: function(newVal, oldVal) {
      // this.searchByKeyWord(newVal)
    },
    houseType: function(newVal, oldVal) {
      // this.init()
    },
    // cateId: function(newVal, oldVal) {
    //   this.getCateHouse(newVal)
    // },
    houseData: function(newVal, oldVal) {
      console.log('hh====', newVal)
      this.houseDataList = newVal
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
    .houseItem {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px dotted #e4e4e4;
      &:last-child {
        border-bottom: 0;
      }
      .img {
        margin-right: 6px;
      }
      .info {
        width: 65%;/*写给不支持calc()的浏览器*/ 
        // width:-moz-calc(100% - 24px ); 
        // width:-webkit-calc(100% - 24px ); 
        // width: calc(100% - 24px );
      }
      p {
        font-size: 16px;
        color: #333;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow:ellipsis;
        word-wrap: break-word;
        text-align: left;
        width: 100%;
      }
      span {
        font-size: 12px;
        color: #999;
        height: 18px;
        line-height: 18px;
      }
    }
  }
}
</style>