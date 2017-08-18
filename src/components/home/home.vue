<template>
<div class="home">
	<section class='h_top'>
		<div class="imgBox" tag='div'>
			<img src="../../assets/ihome.png" alt="">
		</div> 
		<h1 class='hlogin'>{{phone}}</h1>
	</section>

	<section class="dlcons">
		<ul class="clearfix">
			<router-link to='/repair' tag='li'>
				<img src="../../assets/h_icon.png" alt="">
				<span>相遇报修</span>
			</router-link> 
			<router-link to='/paypending' tag='li'>
				<img src="../../assets/h_icon.png" alt="">
				<span>待付款</span>
			</router-link> 
			<router-link to='/myhouse' tag='li'>
				<img src="../../assets/h_icon.png" alt="">
				<span>我的管家</span>
			</router-link> 
			<router-link to='/mycontract' tag='li'>
				<img src="../../assets/h_icon.png" alt="">
				<span>我的合同</span>
			</router-link> 
			<router-link to='/guide' tag='li'>
				<img src="../../assets/h_icon.png" alt="">
				<span>入住指南</span>
			</router-link> 
			<li @click='destroy'>
				<img src="../../assets/h_icon.png" alt="">
				<span>注销登录</span>
			</li> 
			<router-link to='/revise' tag='li'>
				<img src="../../assets/h_icon.png" alt="">
				<span>修改密码</span>
			</router-link>
			
		</ul>
	</section>  

	<rent-footer :path="'home'"></rent-footer>

</div>
</template>
<script>
import { getJson,getAgainToken,checkLogin } from 'src/service/getData';
import { errDialog,myHttp } from "src/common/myMixin";
export default{
	name:'home',
	mixins: [errDialog,myHttp],
	data(){
		return {
			phone:''
		}
	},
	created(){ 
		this.init();
		this.phone = this.mUtils.getCookie('Account');
	},
	methods:{
		async init(){},
		destroy(){
			this.mUtils.removeAllCookie();
			this.$router.push('/login');
		}
	}
}
</script>
<style scoped>
.home{padding-bottom: 1rem;min-height: 100vh;}
.hlogin,.dlcons li span,.diht{font-size: 0.32rem;}
.h_top{height: 3.2rem;background: #ebebeb;padding-top: 0.5rem;position: fixed !important;width: 100%;}
.imgBox{width: 1.6rem;height: 1.6rem;margin:0 auto;overflow: hidden;/*background: #fff;*/border-radius: 50%;}
.imgBox img{width:100%;}
.hlogin{text-align: center;margin-top:0.2rem;}
.dlcons {background: #fff;padding: 3.5rem 0 0;}
.dlcons li{float: left;width: 33.3%;height:2rem;text-align: center;}
.dlcons li img{width: 0.6rem;margin: 0 auto;display: block;margin: 0.5rem auto 0.15rem;}

.ht{font-size: 0.32rem;padding-left: 0.45rem;line-height: 1.3rem;border-bottom: 1px solid #ddd;}


.ddcos{
	background: #fff;
}
.ddcos li{
	line-height: 1.2rem;
	padding-left: 0.36rem;
	border-bottom: 1px solid #ddd;
}

.dicos{
	background: #fff;
	padding-bottom: .3rem;
}
.dicos ul{white-space: nowrap;}
.dicos li{display: inline-block;margin-right: 0.1rem;}
.dicos li:last-child{margin-right: 0.36rem;}
.dicos .diimg{
	display: block;
	width: 5.7rem;
	height: 3.7rem;
}  
.diht{color: #535353;margin: 0.3rem 0 0.15rem;}
.footer{
	position: fixed !important;
	height: 1rem;
	background: #eee;
	bottom:0;
	left: 0;
	width: 100%;
	box-shadow: 0 0 3px 0 rgba(0,0,0,0.5);
}
.footer a{
	float:left;
	width: 50%;
	line-height: 1rem;
	text-align: center;
}
.footer a.active{
	background: #fff;
}
</style>