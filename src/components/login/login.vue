<template>
<div class="login">
	<div class="logo">
		<img src="../../assets/logo_bak.png" alt="">
	</div> 
	<div class='lbox'>
		<ul>
			<li>
				<span class="icon-phone ln"></span>
				<input class='ipt' type="number" v-model='phone' maxlength="11" placeholder="输入手机号">
			</li>
			<li>
				<span class="icon-key ln"></span>
				<input class='ipt' type="password" v-model='password' placeholder="输入密码" utocomplete="off">
			</li>
		</ul>
		<div class="btnbox">
			<a href="javascript:;" class="abtn" @click='login'>登陆</a>
		</div>

		<!-- <div class='dl'>
			<a href="javascript:;" class="">登陆遇到问题</a>
			<router-link to="/register" tag='a'>手机号注册</router-link>
		</div> -->
	</div>
</div>
</template>
<script>
import MD5 from "js-md5";
import { checkLogin } from 'src/service/getData.js';
export default{
	name:'login',
	data(){
		return {
			phone:'',
			password:''
		}
	},
	methods:{
		async login(){  
			let m = 1;
			if(m){ 
				let params = {
					Account:this.phone,
					Password:MD5(this.password)
				}
				this.$dialog.loading.open('请稍后...');
				let res = await checkLogin(params); 
				this.$dialog.loading.close();
				let ress = res.data;
				if(ress.State === 1){
					this.$router.push('/');
				}else{
					if(res == -404 || res == -401){
						this.openAlert('服务器异常,请稍后登陆');
					}else{
						this.openAlert('用户名或密码错误');
					}
				} 
			}
		},
		checkInfo(){
			let m = 1;
			if(!(/^1[34578]\d{9}$/.test(this.phone))){
				if(this.phone == ""){
					this.openAlert('请先填写手机号')
					m = 0;
					return;
				}
				this.openAlert('手机号格式错误');
				m = 0;
				return;
			}

			if(!this.password.trim()){
				this.openAlert('密码不可为空');
				m = 0;
				return;
			}else if(this.password.rim().length < 6){t
				this.openAlert('密码个数不能小于6位！')
				m = 0;
				return;
			}
			return m;
		},
		openAlert(msg) {
            this.$dialog.alert({mes: msg});
        },
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
	font-size: 0.4rem;
	line-height: .6rem;
	color: #AC7CC5;
	/*background: #fff url(../../assets/logo_name.png) center center no-repeat;*/
}
.lbox .lp{
	/*background: #fff url(../../assets/logo_pwd.png) center center no-repeat;*/
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
	background: #ac7cc5; 
    background: -webkit-linear-gradient(to right, from(#c697df), to(#ac7cc5));
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