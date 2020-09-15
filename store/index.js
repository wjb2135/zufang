/*
*
* 根数据状态 存放全局数据和异步方法
*
*/
import axios from 'axios'

export const state = () => ({
  homePageData: null,
  breadcrumbObj: {}
})

export const mutations = {
  setHomePageData (state, n) {
    state.homePageData = n
  },
  setBreadcrumbObj (state, n) {
    state.breadcrumbObj = n
  }
}

// global actions
export const actions = {
  // 全局服务初始化
  async nuxtServerInit ({ commit, dispatch }, { req, route, redirect, $axios }) {
    return $axios.post('/api/index.php').then((res) => {
      //code
      let appInfo = res;
      let navList = res.nav_list;
      if (navList && navList.length > 0) {
        navList.forEach(element => {
          if (element.url == '//') {
            element.url = '/'
          }
        });
        appInfo.nav_list = navList;
      }
      commit('setHomePageData', appInfo)
    }).catch((error) => {
      console.log(error)
    })
  },
  setBreadcrumbObj({commit}, res) {
    commit('setBreadcrumbObj', res);
  }
}