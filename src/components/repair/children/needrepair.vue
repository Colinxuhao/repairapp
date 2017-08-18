<template>
<div class="needrepair">
	<header-top :title="'新增报修'"></header-top>
	<div class="c">
		<!-- <ul class="u">
			<li class="clearfix">
				<span class="t">报修人类型</span>
				<span class="d" @click='show1 = true'> 
					{{rType}} 
				</span>
			</li>
			<li class="clearfix">
				<span class="t">手机号</span>
				<span class="d clearfix">
					<input type="number" class='ipt' placeholder='请输入手机号' v-model='phone'>
					<em class="sbtn" @click='query'>查询</em>
				</span>
			</li>
		</ul>  -->

		<!-- 租客报修 1 -->
		<div class='ls' v-if='inquery'>
			<ul>
				<li class="lli" v-for="(item,index) in datas"  @click='repairFunc(item)'>
					<div class="table clearfix" >
						<span class='mt ellipsis'>{{item.Type == 1 ? '承租' : '委托'}}合同号</span>
						<span class='mh ellipsis'>{{item.EntrustContractNo}}</span>
						<span class='md ellipsis'>{{item.ECHousePropertyCard}}</span>
					</div>

					<!-- <div class="btnbox">
						<a href="javascript:;" class="rabtn" @click='repairFunc(item)'>报修</a>
					</div> -->
				</li> 
			</ul>

			<div class="abtn" @click='loadMore' v-if='mshow'>
				点击加载更多
			</div>
			<div class="abtn" v-else>
				没有更多数据了
			</div>
		</div> 

	</div>
	 
	<yd-actionsheet :items="myItems1" v-model="show1"></yd-actionsheet>

	<rent-footer></rent-footer>
</div>
</template>
<script>
import { GetRepairContractAllList } from 'src/service/getData';
import { ActionSheet } from 'vue-ydui/dist/lib.rem/actionsheet';
import { errDialog,myHttp } from "src/common/myMixin"; 

export default{
	name:'needrepair',
	mixins: [errDialog,myHttp],
	data(){
		return { 
			phone:'',
			inquery:false,
			rType:'---请选择---',
			type:'',
			PageIndex:1,
			datas:[],
			selectbl:false,
			mshow: true,
			show1:false,
			myItems1:[
				{
					label: ' 租客报修',
                    method: (options) => {
                    	this.type = 1;
                        this.rType = options.label;
                    }
				},
				{
					label: ' 房东报修',
                    method: (options) => {
                    	this.type = 2;
                      	this.rType = options.label;
                    }
				}
			],
		}
	},
	created(){
		this.$nextTick(() => {
			this.GetRepairContractAllList();
		})
	},
	watch:{
		'type': function(nvalue,ovalue){
			this.datas = [];
			this.PageIndex = 1;
			this.inquery = false;
		}
	},
	methods:{
		query(){ 
			// if(this.rType == '---请选择---'){
			// 	this.$dialog.alert({mes: '请先选择报修类型!'}); 
			// 	return;
			// }

			// if(!(/^1[34578]\d{9}$/.test(this.phone))){
			// 	if(this.phone == ""){
			// 		this.$dialog.alert({mes: '请先填写手机号!'});
			// 		return;
			// 	}
			// 	this.$dialog.alert({mes: '手机号格式错误!'});
			// 	return ;
			// }
			//this.GetRepairContractAllList();
			
		},
		async GetRepairContractAllList(){
			let res = await this.myHttp(GetRepairContractAllList,{"PageIndex":this.PageIndex,"PageSize":10,"Order":"EntrustContractNo","DescOrAsc":0});
			this.mshow = true;
			if(res.ReturnData.length<10){
				this.mshow = false;
			}
			this.datas = [...this.datas,...res.ReturnData]; 
			this.inquery = true;
		},
		repairFunc(item){
			this.mUtils.setCookie("needrepair",item);
			this.$router.push('/repair/newRepair/1');
		},
		async loadMore(){
			this.PageIndex = this.PageIndex + 1;
			this.GetRepairContractAllList();
		}
	},
	components:{ 
		'yd-actionsheet':ActionSheet
	}
}
</script>
<style scoped>

.demo{
	position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 30px 0 0;
    background-color: #f5f5f5;
    z-index: 12;
    box-sizing: border-box;
    pointer-events: auto!important;
    transition: transform .2s ease-in-out;
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transform: translateY(100%);
    -webkit-transform: translateY(100%); 
}

.needrepair{
	position: fixed !important;
	top:0;
	left: 0;
	width: 100%;
	height: 100%; 
	background: #f8f8f8;
	overflow-y:auto;
	padding-bottom: 2rem;
	-webkit-overflow-scrolling: touch; 
	z-index: 10;
}
.c{
	padding-top: 1.2rem;
}
.u{
	border:1px solid #999;
	background: #fff;
}
.u li {
	line-height: .8rem; 
}
.u li:first-child{
	border-bottom: 1px solid #999;
}
.u li span{
	float: left;
	padding-left: .2rem; 
}
.u li .t{
	width: 25%;
	border-right: 1px solid #999;
}
.u .d{
	width: 75%;
}
select,input{background: #f8f8f8;}
select{
	display: block;
	width: 100%;
	height: .8rem;
}
.ipt{
	width: 80%;
	height: .8rem;
	float: left;
	background: #fff;
}
.sbtn{
	border-radius: .1rem;
	border:1px solid #999;
	background: #fff;
	font-size: 0.16rem; 
	float: left;
	width: 15%;
	text-align: center;
	margin:.2rem 0 0 3%;
	line-height: .4rem;
}
.table{
	padding:0.1rem;
	background: #fff url(../../../assets/left.png) right 0.25rem center no-repeat;
	-webkit-background-size: .12rem;
	background-size: .12rem;
}
.table span{
	float: left;
}
.table .mt{
	width: 20%;
}
.table .mh{
	width: 38%;
	text-align: center;
}
.table .md{
	width: 38%;
}
.ellipsis{
	text-overflow: ellipsis;
	overflow: hidden; 
	white-space: nowrap;
}
.lli{
	padding:.2rem 0; 
	/*margin: .3rem auto 0; */
	border-bottom: 1px solid #ddd;
	background: #fff;
}
.ls{
	border-top: 1px solid #ddd;
}
.ls .rabtn{
	display: block;
	width: 40%;
	text-align: center;
	margin:.3rem auto 0;
	line-height: .7rem;
	border-radius: .2rem;
	background: #ac7cc5; 
    background: -webkit-linear-gradient(to right, from(#c697df), to(#ac7cc5));
	color: #fff;
	font-size: 0.3rem;
}

.ls .abtn{ 
	text-align: center;
	margin:.3rem auto 0;
}
</style>