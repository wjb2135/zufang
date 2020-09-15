<template>
  <div class="container">
    <div class="flexBlock defaultWidth">
      <div class="websiteInfo">
        <!-- <div class="friendLink" v-if="homePageData.links && homePageData.links.length>0">
          <span class="title">友情连接：</span>
          <el-link type="danger" class="linkItem" :href="item.url" target="_blank" v-for="(item, index) in homePageData.links" :key="index">{{item.name}}</el-link>
        </div> -->
        <p class="contactInfo">Email：{{homePageData.emaile || ''}}</p>
        <p class="contactInfo">联系方式：{{homePageData.contact_phone || ''}}</p>
        <p class="contactInfo">版权所有 {{homePageData.copyright || ''}}</p>
        <p class="contactInfo">备案号 {{homePageData.icp_license || ''}}</p>
        <p class="contactInfo">{{homePageData.descrtption}}</p>
        <!-- <span class="contactInfo wap" @click="toMoble" style="cursor: pointer;">手机端</span> -->
      </div>
      <div class="cateBox">
        <p class="cateTitle">深圳区域</p>
        <div class="cate">
          <span class="cateItem" :class="{cateActive: activeShenZhen === index}" v-for="(item, index) in homePageData.shenzhen_cate" :key="item.id" @click="goCateHouse(item.id, index, true)">{{ item.title }}</span>
        </div>
      </div>
      <div class="cateBox">
        <p class="cateTitle">东莞区域</p>
        <div class="cate">
          <span class="cateItem" :class="{cateActive: activeDongGuan === index}" v-for="(item, index) in homePageData.dongguan_cate" :key="item.id" @click="goCateHouse(item.id, index, false)">{{ item.title }}</span>
        </div>
      </div>
      <div class="qrCode">
        <el-image style="width:100%;height:100%;" :src="footer_logn" fit="cover"></el-image>
        <!-- <img :src="homePageData.footer_logn || '../assets/image/weixin.png'" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import utils from '@/utils/index'
import ENV from '@/env.js'
export default {
  name: 'footerMenu',
  data() {
    return {
      activeShenZhen: '',
      activeDongGuan: ''
    }
  },
  created() {
    
  },
  methods: {
    toMoble() {
      this.$router.push({name: 'mhome'})
    },
    goCateHouse(cateId, index, isShenZhen = true) {
      if (isShenZhen) {
        this.activeShenZhen = index
        this.activeDongGuan = ''
      } else {
        this.activeShenZhen = ''
        this.activeDongGuan = index
      }
      this.$router.push({path: '/xcqHouse/houseRecommend/cate', query: {cateId, cateType: 0, activeIndex: index, rondom: new Date().getTime()}})
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
.container {
  min-height: 220px;
  background-color: #2c2c2c;
  .defaultWidth {
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .websiteInfo {
      flex: 3;
    }
    .cateBox {
      flex: 2;
      .cateTitle {
        font-size: 16px;
        color: #fff;
        height: 36px;
        line-height: 36px;
      }
      .cate {
        .cateItem {
          cursor: pointer;
          border: 1px solid #ffffff;
          padding: 6px;
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
          display: inline-block;
          margin-right: 4px;
          margin-bottom: 4px;
          &:hover {
            background-color: #909399;
            border: 1px solid #909399;
          }
        }
        // .cateActive {
        //   background-color: #ff7575;
        //   border: 1px solid #ff7575;
        // }
      }
    }
    .qrCode {
      flex: 1;
      width: 150px;
      height: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .contactInfo {
      min-height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #ccc;
    }
    .wap {
      &:hover {
        text-decoration: underline;
      }
    }
    .friendLink {
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #ccc;
      .title, .linkItem {
        width: 100px;
        text-align: center;
        height: 18px;
        line-height: 18px;
        color: #ccc;
        padding: 0px 5px;
      }
      .title {
        font-weight: bold;
        
      }
    }
  }
}
</style>