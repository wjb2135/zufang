<template>
  <div class="mSearch">
    <el-input clearable placeholder="请输入内容" prefix-icon="el-icon-search" v-model.trim="searchContent" @keyup.enter.native="goSearch"></el-input>
    <span>
      <el-button type="success" size="medium" @click="goSearch">搜索</el-button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'mSearch',
  data() {
    return {
      searchContent: ''
    }
  },
  methods: {
    goSearch() {
      if (this.searchContent) {
        this.$router.replace({ path: '/h5/mSearch', query: { keyword: this.searchContent } })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mSearch {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  padding: 0 20px;
  /deep/ .el-input {
    margin-right: 8px;
  }
}
</style>