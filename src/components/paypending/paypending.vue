<template>
<div class="pay">
	<header-top :title="'相遇房租待付款'"></header-top>
	<div class="lists">
		<router-link to="/endover" class="cend" tag='a'>已结束的合同</router-link>

		<ul class="list" v-for="(item,index) in datas" :key="index">
			<li><span class="t">合同号：</span><span class="d">{{item.ContractNo}}</span></li>
			<li><span class="t">地址：</span><span class="d">{{item.Adress}}</span></li>
			<li><span class="t">租客姓名：</span><span class="d">{{item.RealName}}</span></li>
			<li><span class="t">手机：</span><span class="d">{{item.Account}}</span></li>
			<li>
				<span class="t">支付详情：</span>
				<div style="clear:both"></div>
				<ul class='clearfix' v-for="(tem,idx) in item.PayMentStatus" :key='idx'>
					<li>
						<span class="t">{{tem.StartTime}}</span>
						<span class="t">{{tem.EndTime}}</span><span class="n">{{tem.PExpectedPayMoney}}</span>
						<span class="d">{{payStatus[tem.PayStatus]}}</span>
					</li>
				</ul>
			</li>
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
import { GetResponsePayData } from "src/service/getData";
import { payStatus } from "src/config/env"; 

import { errDialog,myHttp } from "src/common/myMixin"; 

export default{
	name:'paypending',
	mixins: [errDialog,myHttp],
	data(){
		return {
			CustomerCode:'',
			datas:[],
			payStatus:payStatus,
			mshow:true,
			PageIndex:1
		}
	},
	created(){
		this.$nextTick(() => { 
			this.initData();
		})
	},
	methods:{ 
		async initData(){
			let res = await this.myHttp(GetResponsePayData,{"SearchData":{"Type":0},"PageIndex":this.PageIndex,"PageSize":10,"Order":"EntrustContractNo","DescOrAsc":0});
				
			if(res.ReturnData.length< 10){
				this.mshow = false;
			}

			this.datas = [...this.datas,...res.ReturnData];
		},
		loadMore(){
			this.PageIndex = this.PageIndex + 1;
			this.initData();
		}
	}
}
</script>
<style scoped>
.abtn{
	margin-top:.5rem;
	text-align: center;
}
.cend{margin:.3rem 2% 0 0 ;text-align: right;display: block;color: green;}
.contract{
	background: #f8f8f8;
	min-height:100vh; 
	padding-bottom: 1rem;
}
.lists{
	padding: 1rem 0;
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
.list li .n{
	float: left;
	width: 20%;
	text-align: center;
	margin-right: 4%;
}
.dd{
	color: red;
}
.yd{
	color: #ddd;
}
</style>