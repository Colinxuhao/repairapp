<template>
<div class="revise">
	<header-top :title="'修改密码'"></header-top> 
	<div class="idiv">
		<input type="password" class="ipt" v-model='OldPwd' placeholder="原密码">
		<input type="password" class="ipt" v-model='NewPwd' placeholder="新密码">
		<input type="password" class="ipt" v-model='rNewPwd' placeholder="确认新密码">
	</div> 

	<div class='btnbox'>
		<a href="javascript:;" class="abtn" @click='updata'>确认</a>
	</div>
</div>
</template>
<script>
import MD5 from "js-md5";
import { UpdateMyPwd,getAgainToken } from "src/service/getData";
import { errDialog,myHttp } from "src/common/myMixin"; 
export default{
	name:'revise',
	mixins: [errDialog,myHttp],
	data(){
		return {
			CustomerCode:'',
			OldPwd:'',
			NewPwd:'',
			rNewPwd:''
		}
	},
	created(){
		this.CustomerCode = this.mUtils.getCookie('CustomerCode')
	},
	methods:{
		async updata(){
			if(!this.checkInfo()){
				let res = await this.myHttp(UpdateMyPwd,{
				    "CustomerCode": this.CustomerCode,
				    "OldPwd": MD5(this.OldPwd),
				    "NewPwd": MD5(this.NewPwd)
				});
				if(res.State == 1){
					this.toLogin();
				}
				//this.toLogin(); 
			}
		},
		toLogin(){
			this.$dialog.confirm({
                title: ' ',
                mes: '更新密码成功！',
                opts: [ 
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                        	this.mUtils.removeAllCookie();
                        	this.$router.push("/login");
                        }
                    }
                ]
            });
		},
		checkInfo(){
			if(this.OldPwd.trim() == ''){ 
				this.$dialog.alert({mes:'原密码不能为空'});	
				return true;
			}

			if(this.NewPwd.trim() == ''){ 
				this.$dialog.alert({mes:'新密码不能为空'});	
				return true;
			}else{
				if(this.NewPwd.trim().length < 6){
					this.$dialog.alert({mes:'新密码长度不得小于6位'});
					return true;
				}
			}
			
			if(this.rNewPwd.trim() == ''){ 
				this.$dialog.alert({mes:'确认新密码不能为空'});	
				return true;
			}

			if(this.NewPwd.trim() != this.rNewPwd.trim()){
				this.$dialog.alert({mes:'两次密码输入不一致'});
				return true;
			}
		}
	}
}
</script>
<style scoped>
.idiv{
	padding-top: 1.5rem;
}
.ipt{
	line-height: 1rem;
	border-bottom: 1px solid #ddd;
	display: block;
	width: 100%;
	text-indent: .5rem;
}
.btnbox{
	margin-top: 1rem;
}
.btnbox .abtn{
	text-align: center;
	display: block;
	width: 50%;
	margin:0 auto; 
	background: #ac7cc5; 
    background: -webkit-linear-gradient(to right, from(#c697df), to(#ac7cc5));
	color: #fff;
	line-height: .8rem;
	border-radius: 1rem;
}
</style>