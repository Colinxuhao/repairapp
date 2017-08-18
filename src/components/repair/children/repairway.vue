<template>
<div class="all">
	<header-top :title="'我的报修工单-'+tlt">
		 <router-link tag='span' to="/repair/needrepair" slot="edit" class='myrepair'>我要报修</router-link>
	</header-top>

	<div class="c">
		<ul class="u">
			<li class="clearfix">
				<span>报修工单号</span>
				<span>报修内容</span>
				<span>报修状态</span>
			</li>

			<router-link tag='li' :to="'/repair/detail/'+item.RepairWorkOrderCode" v-for="(item,index) in dataArray" class="clearfix" :key='index'>
				<span>{{item.RepairWorkOrderCode}}</span>
				<span>{{item.RepairContent}}</span>
				<span>{{repairStatus[item.RepairStatus]}}</span>
			</router-link>

		</ul>
		<div class="abtn" v-if="mshow">
			<input type="button" @click='loadMore' value='点击加载更多'>
		</div>
		<div class="abtn" v-else>
			没有更多数据了 
		</div>
	</div>
	<rent-footer></rent-footer>
</div>
</template>
<script>
import { getRepairAll} from 'src/service/getData';
import { errDialog,myHttp } from "src/common/myMixin";
import { repairStatus } from "src/config/env"; 
export default{
	name:'allrent',
	mixins: [errDialog,myHttp],
	data(){
		return {
			status:'',
			data:{},
			repairStatus:repairStatus,
			Type:0,
			PageIndex:1,
			PageSize:10,
			DescOrAsc:0,
			mshow:false
		}
	},
	created(){
		this.status = this.$route.params.status;
		this.$nextTick(() => {
			this.initData();
		});
	},
	methods:{ 
		async initData(){ 
			let res = await this.myHttp(getRepairAll,{"SearchData":{"Type":this.Type},"PageIndex":this.PageIndex,"PageSize":this.PageSize,"Order":"RepairWorkOrderCode","DescOrAsc":this.DescOrAsc}); 
			this.mshow = true;
			if(res.ReturnData.length < 10){
				this.mshow = false;
			}
			this.data = [...this.data,...res.ReturnData];
		},
		async loadMore(){
			this.PageIndex = this.PageIndex + 1;
			this.initData();	
		},
		destory(){
			this.$dialog.loading.close();
		}
	},
	computed:{
		dataArray(){
			return this.data;
		},
		tlt(){
			let t = '';
			switch(this.status){
				case 'all':
					t = '全部';
					this.Type = 0;
					break;
				case 'bll':
					t = '处理中';
					this.Type = 1;
					break;
				case 'cll':
					t = '上门中';
					this.Type = 2;
					break;
				case 'dll':
					t = '已解决';
					this.Type = 3;
					break;
				case 'ell':
					t = '已撤销';
					this.Type = 4;
					break;
			}
			return t;
		}
	}
}
</script>
<style scoped>
.abtn{
	margin-top:.5rem;
	text-align: center;
}
.all{
	position: fixed !important;
	left: 0;
	top:0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background: #f8f8f8;  
}
.c{
	background: #fff;
	padding-top: 1.2rem; 
	padding-bottom: 1.5rem; 
}
.myrepair{
	position: absolute;
    top: 0;
    right: .2rem;
    height: .9rem;
    font-size: 0.22rem;
    line-height: .9rem;
}
.u{border-top: 1px solid #ddd}
.u li{
	border-bottom: 1px solid #ddd; 
}
.u li:not(:first-child){
	background: #fff url(../../../assets/left.png) right 0.25rem center no-repeat;
	-webkit-background-size: .12rem;
	background-size: .12rem;
}
.u li span{
	float: left;
	width: 33.3%;
	text-align: center;
	line-height: 0.8rem;
	/*border-right: 1px solid #ddd;*/
	font-size: 0.26rem;
	
	white-space:nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.u li span:nth-child(1){
	width: 33%;
}
.u li span:nth-child(2){
	width: 40%;
}
.u li span:nth-child(3){
	width: 23%;
} 
 
</style>