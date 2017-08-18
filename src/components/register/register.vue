<template>
<div>
	<header-top :title="'用户注册'"></header-top>
	<div class='lbox'>
		<ul>
			<li>
				<i class="ln"></i>
				<input class='ipt' type="text" placeholder="输入用户名/手机号/邮箱">
			</li>
			<li>
				<i class="lp"></i>
				<input class='ipt' type="text" placeholder="输入密码">
			</li>
		</ul>
		<div class="btnbox">
			<a href="javascript:;" class="abtn" @click='register'>注册</a>
		</div> 
	</div>

</div>
</template>
<script>
export default{
	name:'register',
	data(){
		return {}
	},
	methods:{
		register(){
			this.mUtils.setStore('name','xuhao');
			this.$router.push('/');
		}
	}
}
</script>
<style scoped>
img{display: block;width: 100%;}
.login{ 
}
.logo{
	width: 2.13rem;
	margin: 1rem auto;
}
.lbox{
	padding: 0 0.5rem;
}
.lbox .ln,.lbox .lp{
	position: absolute;
	width: 0.60rem;
	height: 0.60rem;
	left: 0.1rem;
	top:0.3rem; 
}
.lbox .ln{
	background: #fff url(../../assets/logo_name.png) center center no-repeat;
}
.lbox .lp{
	background: #fff url(../../assets/logo_pwd.png) center center no-repeat;
}
.lbox li{
	border-bottom: 1px solid #ddd;
	position: relative;
	padding:.3rem 0;
}
.lbox .ipt{
	display: block;
	height:.6rem; 
	padding-left: 0.9rem;
	width: 100%;
}
.btnbox{
	margin: 1rem 0 .5rem;
}
.btnbox .abtn{
	display: block;
	width: 50%;
	margin: 0 auto;
	border-radius: 1rem;
	line-height: 0.8rem;
	text-align: center;
	background: #2BD1F2;
	font-size: 0.3rem;
	letter-spacing: 0.05rem;
	color: #fff;
}
.dl{overflow: hidden;}
.dl a{
	float: left;
	width: 50%; 
	text-align: center;
}
.dl a:first-child{
	border-right: 1px solid #ddd;
}
</style>