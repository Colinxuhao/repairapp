//公共函数
/** 
 *存储sessionStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}

/**
 * 获取cookie
 */
import Cookies from 'js-cookie';
export function getCookie(name){
	return Cookies.get(name);
}

/**
 * 设置cookie
 */
export function setCookie(name,value){
	return Cookies.set(name,value,{ expires: 1, path: '' });
}

/**
 * 删除cookie
 */
export function removeCookie(name){
	return Cookies.remove(name)
}

/**
 * 删除所有cookie
*/
export function removeAllCookie(){  
	var cookies = document.cookie.split(";");
	 for (var i = 0; i <cookies.length; i++) {
		 var cookie = cookies[i];
		 var eqPos = cookie.indexOf("=");
		 var name = eqPos> -1? cookie.substr(0, eqPos) : cookie;
		 document.cookie = name +"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	 }
}

/**
* 获取当前日期
**/
export function getDay(){
	var myDate = new Date();

	var y = myDate.getFullYear();				//年
	var m = myDate.getMonth() + 1;					//月
	var d = myDate.getDate();					//日

	m = (m < 10) ? ('0' + m) : m;
	d = (d < 10) ? ('0' + d) : d;

	// console.log(y + '-' + m + '-' + d)
	return y + '-' + m + '-' + d; 
}


;!function(){ 
	document.addEventListener('touchstart', function (event) { 
	    if (event.touches.length > 1) {
	        event.preventDefault();
	    }
	}, false);

	var lastTouchEnd = 0;
	document.addEventListener('touchend', function (event) {
	  
	  var now = Date.now();
	  if (now - lastTouchEnd <= 300) {
	    event.preventDefault();
	  }
	  lastTouchEnd = now;
	}, false);


}();