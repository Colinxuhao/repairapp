<template>
<div class="contract">
	<header-top :title="'我的合同'"></header-top>  
	<div class="lists">
		<div class="list" v-for="(items,index) in datas" :key="index">
			<ul>
				<li><span class="t">合同号</span><span class="d">{{items.ContractNo}}</span></li>
				<li><span class="t">地址</span><span class="d">{{items.Address}}</span></li>
			</ul>

			<div class="imgxBox">
				<yd-lightbox>
			        <yd-lightbox-img v-for="(item,idx) in items.LCAttachList" :src="'http://admin.xiao-new.com'+item.LCAFilePath.substr(1)" :key='idx'></yd-lightbox-img>
			    </yd-lightbox>
			</div>
		</div>
		 
		 <div class="abtn" v-if="mshow">
		 	<input type="button" @click='loadMore' value="点击加载更多">	
		 </div>
		 <div class="abtn" v-else>
		 	没有更多数据了
		 </div>
	</div> 
</div>
</template>
<script>
import {LightBox, LightBoxImg, LightBoxTxt} from 'vue-ydui/dist/lib.rem/lightbox'; 
import { GetMyContractData,getAgainToken } from "src/service/getData";
import { errDialog,myHttp } from "src/common/myMixin"; 
export default{
	name:'mycontract',
	mixins: [errDialog,myHttp],
	data(){
		return {
            datas:[],
            PageIndex:1,
            PageSize:10,
            DescOrAsc:0,
            mshow:true,
            CreateDate:'EntrustContractNo'
		}
	},
	created(){
		this.$nextTick(() => {
			this.initData()
		})
	},
	methods:{
		async initData(){
			let res = await this.myHttp(GetMyContractData,{"PageIndex":this.PageIndex,"PageSize":this.PageSize,"Order":this.CreateDate,"DescOrAsc":this.DescOrAsc});
			if(res.ReturnData.length < 10){
				this.mshow = false;
			}
			this.datas = [...this.datas,...res.ReturnData];
		},
		loadMore(){
			this.PageIndex = this.PageIndex + 1;
			this.initData();
		}
	},
	components:{
		"yd-lightbox":LightBox,
		"yd-lightbox-img":LightBoxImg,
	}
}
</script>
<style scoped>
.abtn{
	text-align: center;
	margin-top: .5rem;
}
.contract{
	background: #f8f8f8;
	min-height:100vh; 
	padding-bottom: 1rem;
}
.lists{
	padding-top: 1rem;
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
.imgxBox{
	width: 100%;
	height: 1rem;
	overflow-x: auto;
	overflow-y: hidden;
	white-space:nowrap;
}
.imgxBox img{ 
	width: 1.2rem;
	height: 1.2rem;
	margin: 0 .2rem;
}
</style>