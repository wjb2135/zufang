<template>
  <div>
    <div class="contact">
      <div class="tel" @mouseover="mouseoverTel" @mouseleave="mouseleaveTel">
        <span class="icon"><i class="iconfont icondianhua1"></i></span>
        <span class="text">电话dddddddddddddd</span>
      </div>
    </div>
    <div class="telDetail" v-show="telDetailShow">
      <p>服务dd热线</p>
      <p class="telNum">{{homePageData.contact_phone}}</p>
      <p>24小时等待您的电话</p>
    </div>
    <div class="contactWe">
      <div class="wechat" @mouseover="mouseoverWechat" @mouseleave="mouseleaveWechat">
        <span class="icon"><i class="iconfont iconweixin"></i></span>
        <span class="text">微信</span>
      </div>
    </div>
    <div class="wechatQrCode" v-show="wechatQrCodeShow">
      <img id="wechatImg" :src="footer_logn? footer_logn : '../assets/images/weixin.png'" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import utils from '@/utils/index'
import ENV from '@/env.js'
export default {
  data () {
    return {
      telDetailShow: false,
      wechatQrCodeShow: false
    }
  },
  methods: {
    mouseoverTel() {
      this.telDetailShow = true
    },
    mouseleaveTel() {
      this.telDetailShow = false
    },
    mouseoverWechat() {
      this.wechatQrCodeShow = true
    },
    mouseleaveWechat() {
      this.wechatQrCodeShow = false
    },
  },
  computed: {
    ...mapState(['homePageData']),
    footer_logn() {
      return ENV._APIROOT + '/' + utils.toAbsoluteAddress(this.homePageData.footer_logn)
    }
  }
}
</script>

