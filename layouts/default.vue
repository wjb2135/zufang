<template>
  <div class="container">
    <header-menu></header-menu>
    <transition name="fade">
      <div class="container">
        <nuxt-child/>
      </div>
    </transition>
    <footer-menu :homePageData="homePageData"></footer-menu>
    <contact></contact>
  </div>
</template>

<script>
import headerMenu from '@/components/header'
import footerMenu from '@/components/footer'
import contact from '@/components/contact'
import utils from '@/utils/index'
import ENV from '@/env.js'
import { mapState } from "vuex";
export default {
  components: {
    headerMenu,
    footerMenu,
    contact
  },
  computed: {
    ...mapState(['homePageData'])
  },
  head () {
    return {
      title: this.homePageData.seo_title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description_i', name: 'description', content: this.homePageData.seo_description, },
        { hid: 'keywords_i', name: 'keywords', content: this.homePageData.seo_keyword, }
      ]
    }
  }
}
</script>


<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  /* box-sizing: border-box; */
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.topInfo {
  background-color: #33B371;
  .flexBlock {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .topInfoHeight {
    min-height: 40px;
    .icondianhua1 {
      font-size: 15px;
      margin-right: 6px;
    }
    span {
      color: #fff;
      font-size: 14px;
    }

  }
}
.telDetail {
  width: 150px;
  position: fixed;
  right: 130px;
  bottom: 207px;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  line-height: 28px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 15px #888;
  .telNum {
    font-size: 16px;
    color: crimson;
    border-bottom: 1px solid #dcdcdc;
  }
}
.wechatQrCode {
  position: fixed;
  right: 130px;
  bottom: 100px;
  width: 180px;
  height: 180px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 10px #888;
  img {
    width: 100%;
  }
}
.contact {
  bottom: 202px;
}
.contactWe {
  bottom: 100px;
}
.contact, .contactWe {
  width: 100px;
  height: 100px;
  position: fixed;
  right: 20px;
  z-index: 999;
  overflow: hidden;
  .tel, .wechat {
    width: 100px;
    background: #39ac6a;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    span {
      display: inline-block;
      width: 100px;
      height: 100px;
      line-height: 100px;
      color: #fff;
      text-align: center;
      transition: all 1s;
      overflow: hidden;
      .iconfont  {
        font-size: 48px;
      }
    }
    // span.icon {
    //   position: absolute;
    //   top: 0;
    //   &:hover {
    //     top: -50px;
    //   }
    // }
    span.text {
      font-size: 20px;
    }
  }
  .tel {
    position: absolute;
    left: 0;
    top: 0;
    transition: all .5s;
    &:hover {
      top: -105px;
    }
  }
  .wechat {
    position: absolute;
    left: 0;
    top: 0px;
    transition: all 0.5s;
    &:hover {
      top: -105px;
    }
  }
}
.descrtptionTop {
  width: calc( 100% - 480px );
}
.main {
  width: 1200px;
  margin: 0 auto;
}
</style>
