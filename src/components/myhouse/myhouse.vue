<template>
<div class="house">
	<header-top :title="'我的管家'"></header-top>  
	<div class="lists"> 
		<ul class="list" v-for="(item,index) in datas">
			<li><span class="t">合同号</span><span class="d">{{item.EntrustContractNo}}</span></li>
			<li><span class="t">地址</span><span class="d">{{item.LCHousePropertyCard}}</span></li>
			<li><span class="t">姓名</span><span class="d">{{item.RealName}}</span></li>
			<li><span class="t">手机</span><span class="d">{{item.Mobile}}</span></li>
		</ul>

		<div class="abtn" v-if="mshow">
			<input type="button" @click='loadMore' value='点击加载更多'>
		</div>
		<div class="abtn" v-else>
			没有更多数据了
		</div>
	</div> 
</div>
</template>
<script>
import { GetMyHouseKeeperData } from "src/service/getData";

import { errDialog,myHttp } from "src/common/myMixin"; 

export default{
	name:'myhouse',
	mixins: [errDialog,myHttp],
	data(){
		return {
			CustomerCode:'',
			datas:[],
			mshow:true,
			PageIndex:1,
			PageSize:10,
			DescOrAsc:0,
			CreateDate:'EntrustContractNo', 
		}
	},
	created(){ 
		this.$nextTick(() => {
			this.initData();
		})
	},
	methods:{
		async initData(){
			let res = await this.myHttp(GetMyHouseKeeperData,{"PageIndex":this.PageIndex,"PageSize":this.PageSize,"Order":this.CreateDate,"DescOrAsc":this.DescOrAsc});
			if(res.ReturnData.length < 10){
				this.mshow = false;
			} 
			this.datas = [...this.datas,...res.ReturnData]; 
		},
		async loadMore(){
			this.PageIndex = this.PageIndex + 1;
			let res = this.initData(); 
		}
	}
}
</script>
<style scoped>
.abtn{
	text-align: center;
	margin-top: .4rem;
}
.contract{
	background: #f8f8f8;
	min-height:100vh; 
	padding-bottom: 1rem;
}
.lists{
	padding: 1rem 0 ;
}
.list{
	width: 96%;
	margin:0 auto;
	border: 1px solid #ddd;
	margin-top: .3rem;
	background: #fff;
	border-radius: .5rem;
	padding: .3rem;
}
.list li{
	line-height: .6rem;
	overflow: hidden;
}
.list li .t{
	float: left;
	width: 26%;
	text-align: right;
	margin-right: 4%;
}
.abtn{
	margin-top:.5rem;
	text-align: center;
}
</style>