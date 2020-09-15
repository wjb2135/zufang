const util = {
  _isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  },
  toAbsoluteAddress(url = '') {
    let reg = /^\.\//
    if (url && reg.test(url) ) {
      return url.replace('\.\/', '')
    } else {
      return ''
    }    
  },
  formatDate(date = new Date().getTime()) {
    let currentDate = new Date(parseInt(date))
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
    let day = ('0' + currentDate.getDate()).slice(-2)
    return currentDate.getFullYear() + '-' + month + '-' + day
  },
  formatTime(time = new Date().getTime()) {
    let currentTime = new Date(parseInt(time))
    let month = ('0' + (currentTime.getMonth() + 1)).slice(-2)
    let day = ('0' + currentTime.getDate()).slice(-2)
    let hour = ('0' + currentTime.getHours()).slice(-2)
    let minutes = ('0' + currentTime.getMinutes()).slice(-2)
    let seconds = ('0' + currentTime.getSeconds()).slice(-2)
    return currentTime.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  },
  setLocalStorage(setName, setVal) {
    if (setName && setVal) {
      localStorage.setItem(setName, JSON.stringify(setVal));
    }
  },
  getLocalStorage(setName) {
    return localStorage.getItem(setName)
  }
}

export default util