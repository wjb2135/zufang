/**
 * 设置cookie
 * @param {*cookie名称} name 
 * @param {*cookie值} value 
 */
function setCookie(name, value) {
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

/**
 * 读取cookie
 * @param {*cookie名称} Name 
 * @param {*String} cookieArr 在中间件中可以在直接在参数req的header属性下获取cookie
 */
function getCookie(Name, cookieArr) {
  var search = Name + "=";
  var newCookieArr;
  if (process.server) { // 若是服务端渲染，则使用中间件 header获取到的cookie
    newCookieArr = cookieArr || [];
  } else {
    newCookieArr = document.cookie || [];
  }
  if (newCookieArr.length > 0) {
    let offset = newCookieArr.indexOf(search)
    if (offset != -1) {
      offset += search.length
      let end = newCookieArr.indexOf(";", offset)
      if (end == -1) end = newCookieArr.length
      return unescape(newCookieArr.substring(offset, end))
    } else return ""
  } else {
    return ""
  }
}

/**
 * 删除cookie
 * @param {*cookie名称} name 
 */
function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}

export { setCookie, getCookie, deleteCookie }