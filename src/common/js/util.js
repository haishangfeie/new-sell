/**
 * @desc 解析url参数
 * @example ?id=123&a=1
 * @return Object {id:123,a=1}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if(!arr) {
    return {};
  }
  arr.forEach(str => {
    let tempArr = str.substr(1).split('=');
    let key = decodeURIComponent(tempArr[0]);
    let value = decodeURIComponent(tempArr[1]);
    obj[key] = value;
  });
  return obj;
}
