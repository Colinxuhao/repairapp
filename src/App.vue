<template>
  <div id="app">
    <transition name='router-slid'>
      <router-view></router-view> 
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>
*{margin:0;padding:0;font-style: normal;color: #666;font-size: 0.28rem;box-sizing: border-box;font-family: STXihei, "Microsoft YaHei";-webkit-tap-highlight-color: transparent;-webkit-overflow-scrolling:touch; -webkit-text-size-adjust: 100%;}
body, button, input, select, textarea { font:0.28rem/1.5; background: #fff;-webkit-appearance: none;}
a,a:hover,a:active,a:link,a:focus { text-decoration:none;color:#666;}
sup { vertical-align:text-top; }sub{ vertical-align:text-bottom; }ul, ol { list-style:none; }
button, input, select, textarea,img,fieldset {outline:none;border:0; -webkit-appearance:none}
table { border-collapse:collapse; border-spacing:0; }
input[type="search"]::-webkit-search-cancel-button{display: none;}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden} .clearfix{*+height:1%;}
body{ font-size: 0.28rem;
	overflow-x: hidden;
	-ms-user-select:none;
	-webkit-user-select:none;
	user-select:none;
}

.router-slid-leave-active{                                  /***退出后消失 位置*********/
  /*backface-visibility: hidden;
  transition: transform .3s cubic-bezier(.23, 1, .23, 1), opacity .3s cubic-bezier(.23, 1, .23, 1);
  transform: translate3d(-2rem, 0, 0);*/
  opacity: 0;
}
.router-slid-enter-active{                                  /***最终位置 ***/
  transition: all 1s;
  transition: transform 1s cubic-bezier(.23, 1, .23, 1), opacity 1s cubic-bezier(.23, 1, .23, 1);
  transform-origin: center top;
}
.router-slid-enter {                                        /***初始 动画刚要执行的时候**/  
  backface-visibility: hidden;
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
.router-slid-leave{                                         /****退出后消失****/ 
}

@import "./assets/font-icon/style.css";
</style>
