<template>
<div class="renting">
	<header-top :title="'相遇报修'"></header-top>
	<div class='c'>
		<ul class="u">
			<router-link to='/repair/list/all' tag='li'>全部</router-link>
			<router-link to='/repair/list/bll' tag='li'>处理中</router-link>
			<router-link to='/repair/list/cll' tag='li'>上门中</router-link>
			<router-link to='/repair/list/dll' tag='li'>已解决</router-link>
			<router-link to='/repair/list/ell' tag='li'>已撤销</router-link>
		</ul>

		<router-link tag="div" to="/repair/needrepair" class="adbtn"> 
			我要报修
		</router-link>
	</div>
 
	<transition name='router-slid'> 
		<!-- <keep-alive> -->
			<router-view></router-view>	   
		<!-- </keep-alive> -->
	</transition>
	
	<rent-footer></rent-footer>
</div>
</template>
<script>

export default{
	name:'repair',
	data(){
		return {}
	}
}
</script>
<style scoped>

.renting{
	background: #f8f8f8;
	padding-bottom: 1rem;
	min-height: 100vh;
	padding-bottom: 2rem;

	position: fixed !important;
	width: 100%;
	overflow-y:auto; 
}
.c{
	padding-top: 1.2rem;
}
.adbtn{
	height: 2rem;
	width: 2rem;
	border-radius: 50%; 
	background: #ac7cc5; 
    background: -webkit-linear-gradient(to right, from(#c697df), to(#ac7cc5));
	margin: 1rem auto 0;
	color: #fff;
	font-size: 0.36rem;
	text-align: center;;
	line-height: 2rem;
	letter-spacing: 2px;
}
.u{
	background: #fff;
}
.u li{
	line-height: 1rem;
	text-indent: .3rem;
	border-bottom:1px solid #ddd;

	background: #fff url(../../assets/left.png) right 0.3rem center no-repeat;
	-webkit-background-size: .16rem;
	background-size: .16rem;
}

.router-slid-leave-active{                                  /***退出后消失 位置*********/
  backface-visibility: hidden;
  transition: transform .5s cubic-bezier(.23, 1, .23, 1), opacity .5s cubic-bezier(.23, 1, .23, 1);
  transform: translate3d(2rem, 0, 0);

  /*opacity: 0;*/ 							/*因为这里有一个时间*/
}
.router-slid-enter-active{                                  /***最终位置 ***/
  transition: all .5s;
  transition: transform .5s cubic-bezier(.23, 1, .23, 1), opacity .5s cubic-bezier(.23, 1, .23, 1);
  transform-origin: center top;
}
.router-slid-enter {                                        /***初始 动画刚要执行的时候**/  
  backface-visibility: hidden;
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
.router-slid-leave{                                         /****退出后消失****/ 
}


</style>