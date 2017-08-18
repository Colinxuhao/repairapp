<template>
<div class="rentfooter clearfix">
	<router-link to="/" tag='a'>
		<i class="icon"><span class="icon-home-outline ihome"></span></span></i>
		<span class="t">首页</span>
	</router-link>	
	<router-link to="/" tag='a' :class="{active:path == 'home'}">
		<i class="icon"><span :class="{'icon-user-o':path != 'home','icon-user2':path == 'home'}" class='ifile'></span></span></i>
		<span class="t">我的</span>
	</router-link>	
</div> 
</template>
<script>
export default{
	name:'rentfooter',
	props:['path'],
	data(){
		return {}
	},
	created(){}
}
</script>
<style scoped>
.rentfooter{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1;
	box-shadow: 0 1px 3px rgba(96,25,134,0.6);
	background: #fff;
}
.rentfooter a{
	float: left;
	width: 50%;
	text-align: center;
	letter-spacing: 0.02rem;
	padding: .1rem 0; 
}
.rentfooter a:first-child{
	/*border-right: 1px solid #ac7cc5;*/
} 
.icon{
	display: block;
	width: 0.36rem;
	height: 0.4rem;
	margin: 0 auto; 
}
.ihome,.ifile,.rentfooter .t{
	color:#666;
	font-size: 0.26rem;
} 
.ihome,.ifile{
	font-size: 0.4rem;
}
.active{
	/*background: #fff;*/
}
.active .ifile,.active .t{
	color: black;
	/*border-left: 1px solid #fff;*/
}
</style>