<template>
<div class="rentdetail">
	<header-top :title="'我的报修详情'">
		 <router-link tag='span' to="/repair/needrepair" slot="edit" class='myrepair'>我要报修</router-link>
	</header-top> 

	<div class='sync'>
		<ul class="u">
			<li class="clearfix">
				<span class="t">报修工单</span>
				<span class="d">{{data.RepairWorkOrderCode}}</span>
			</li>
			<li class="clearfix">
				<span class="t">报修人</span>
				<span class="d">{{data.RepairMan}}</span>
			</li>
			<li class="clearfix">
				<span class="t">报修人联系电话</span>
				<span class="d">{{data.RepairManCall}}</span>
			</li>
			<li class="clearfix">
				<span class="t">报修内容</span>
				<span class="d">{{data.RepairContentSmall}}</span>
			</li>
			<li class="clearfix">
				<span class="t">合同号</span>
				<span class="d">{{data.ContractNo}}</span>
			</li>
			<li class="clearfix">
				<span class="t">客服</span>
				<span class="d">{{data.CustomerService}}</span>
			</li>
			<li class="clearfix">
				<span class="t">维修人</span>
				<span class="d">{{data.RepairMachines }}</span>
			</li>
			<li class="clearfix">
				<span class="t">维修人联系电话</span>
				<span class="d">{{data.RepairMachinesCall}}</span>
			</li>
			<li class="clearfix">
				<span class="t">上门类型</span>
				<span class="d">{{visitType[data.VisitType]}}</span>
			</li>
			<li class="clearfix">
				<span class="t">时间</span>
				<span class="d">{{data.RepairConvenientTime}}</span>
			</li>
			<li class="clearfix">
				<span class="t">时间段</span>
				<span class="d">{{repairPartTime[data.RepairPartTime]}}</span>
			</li>
			<li class="clearfix">
				<span class="t">备注</span>
				<span class="d">{{data.RepairRemark }}</span>
			</li>
			<li class="clearfix">
				<span class="t">状态</span>
				<span class="d">{{repairStatus[data.RepairStatus]}}</span>
			</li>
		</ul>  
		<div class="btnbox" v-if='showStatus == true && show == true'>
			<a href="javascript:;" class="abtn" @click='revoked'>撤销</a>
		</div>
	</div>
</div>
</template>
<script>
import { getRepairDetail,UpdateRepairModel } from 'src/service/getData';
import { repairStatus,visitType,repairPartTime } from "src/config/env"; 
import { errDialog,myHttp } from "src/common/myMixin"; 
export default{
	name:'rentdetail',
	mixins: [errDialog,myHttp],
	data(){
		return {
			repairid:'',
			data:'',
			repairStatus:repairStatus,
			visitType:visitType,
			repairPartTime:repairPartTime,
			state:'',
			show:true
		}
	},
	created(){
		this.repairid = this.$route.params.repairid;
		this.$nextTick(() => {
			this.initData();
		})
	},
	methods:{
		async initData(){
			let res = await this.myHttp(getRepairDetail,{"RepairWorkOrderCode":this.repairid});  
			this.data = res.ReturnData;
		},
		revoked(){
			this.$dialog.confirm({
				title:'  ', 
                mes: '是否撤销？',
                opts: () => { 
                	this.UpdateRepairModel();
                }
            }); 
		},
		async UpdateRepairModel(){
			let res = await this.myHttp(UpdateRepairModel,{"RepairWorkOrderCode":this.repairid}); 
			this.$dialog.alert({mes: res.Msg});
			this.show = false;
		},

	},
	computed:{
		showStatus(){
			let c = this.data.RepairStatus; 
			if(c == 1 || c == 2){
				return true;
			}else{
				return false;
			}
		}
	}
}
</script>
<style scoped>
.rentdetail{
	position: fixed !important;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #f8f8f8;
	overflow-y:auto;
}
.myrepair{
	position: absolute;
    top: 0;
    right: .2rem;
    height: .9rem;
    font-size: 0.22rem; 
    line-height: .9rem;
}
.sync{
	padding: 1.2rem 0; 
}
.u{
	width: 96%;
	margin:  0 auto;
	border: 1px solid #999;
	border-radius: 0.5rem;
	background: #fff; 

}
.u li{
	line-height: .5rem;
}
.u span{
	float: left;
	font-size: 0.26rem;

	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.u .t{
	width: 40%;
	padding-right: 8%;
	text-align: right;
}
.u .d{
	width: 60%;
}
.btnbox{
	margin-top:.5rem;
}
.btnbox .abtn{
	text-align: center;
	display: block;
	line-height: .8rem;
	border-radius: .2rem;
	width: 60%;
	margin: 0 auto;
	background: #ac7cc5; 
    background: -webkit-linear-gradient(to right, from(#c697df), to(#ac7cc5));
	color: #fff;
	font-size: 0.3rem;
	letter-spacing: 0.02rem;
}
</style>