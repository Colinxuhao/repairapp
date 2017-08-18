<template>
<div class="rentdetail">
	<header-top :title="'我的报修详情'">
		 <router-link tag='span' to="/repair/needrepair" slot="edit" class='myrepair'>我要报修</router-link>
	</header-top>

	<div class='sync'>
	<swiper :options="swiperOptionContent">
	    <swiper-slide class="text">
		<ul class="u">
			<li class="clearfix">
				<span class="t">合同号</span>
				<span class="d">{{entrustContractNo}}</span>
			</li>
			<li class="clearfix">
				<span class="t">报修地址</span>
				<span class="d">{{ecHousePropertyCard}}</span>
			</li>
			<li class="clearfix">
				<span class="t">报修人</span>
				<span class="d"> <input style="color:#601986;" type="text" v-model="repairMan"></span>
			</li>
			<li class="clearfix">
				<span class="t">报修人联系电话</span>
				<span class="d"> <input type="text" style="color:#601986;" v-model='repairManCall'></span>
			</li>
			<li class="clearfix">
				<span class="t">报修内容</span>
				<span class="d" style="color:#601986;white-space: normal;" @click='show3=true;show3arr= []'>
					{{RepairArr.length ? RepairArr : '请选择报修内容'}}
				</span>
			</li>
			
			<li class="clearfix">
				<span class="t">上门类型</span>
				<span class="d" style="color:#601986" @click='show1 = true;'>
				{{visitType[repairtime]}}
				</span>
			</li>
			<li class="clearfix">
				<span class="t">时间</span> 
				<span class="d"> 
					<yd-datetime type="date" style="color:#601986" v-model="dateTime" slot="right"></yd-datetime> 
				</span>
			</li>
			<li class="clearfix">
				<span class="t">时间段</span>
				<span class="d" style="color:#601986" @click='show2 = true;'>
					{{repairPartTime[time]}} 
				</span>
			</li>

			<li class="clearfix">
				<span class="t">备注</span>
				<span class="d dt">
					<textarea class='textarea' placeholder="备注尽快上门" name="" style="color:#601986" v-model="repairRemark" id="" cols="30" rows="10"></textarea>
				</span>
			</li>
		</ul>

		<div class="btnbox">
			<a class="abtn" @click='InsertRepairContent'>报修</a> 
		</div>
		</swiper-slide>
	</swiper>     
	</div>

	<rent-footer></rent-footer>

	<yd-actionsheet :items="myItems1" v-model="show1"></yd-actionsheet>
	<yd-actionsheet :items="myItems2" v-model="show2"></yd-actionsheet>

	<yd-popup v-model='show3' height='70%'>
		<div class="tlt">
			请选择报修你要报修的内容
			<div class="tpot">
				<a href="javascript:;" @click='submit'>确定</a>
				<a href="javascript:;" @click='show3 = false;show3arr = []'>取消</a>
			</div>
		</div>

		<div class='lbox' style=""> 
			<li :class="{active:show3Index == index}"  @click='GetRepairClassDataChild(item,index)'  v-for="(item,index) in repairListTitle">{{item.FullName}}</li>
		</div>
		<div class="rbox">
		<swiper :options="swiperOption">
	        <swiper-slide class="text">
            	<ul v-show='show3Index == idx' v-for="(it,idx) in repairListTitle.length">
            		<li v-for="(item,key) in repairListitems" @click='depliclick($event,item)' :key='key'>{{item.FullName}}</li>
            	</ul> 
	        </swiper-slide>
	        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
	      </swiper>
		</div>
    </yd-popup> 

</div>
</template>
<script> 
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import {ActionSheet} from 'vue-ydui/dist/lib.rem/actionsheet';
import rentFooter from "@/components/common/rentfooter/rentfooter"; 

import { InsertRepairContent, GetRepairClassData } from 'src/service/getData';
import { visitType,repairPartTime } from "src/config/env";

import { errDialog,myHttp } from "src/common/myMixin"; 
export default{
	name:'newRepair',
	mixins: [errDialog,myHttp],
	data(){
		return { 
			dateTime:'',

			repairtime:'1',
			show1:false,
			myItems1:[
				{
					label: ' 客户方便上门时间',
                    method: (options) => {
                        this.repairtime = 2;
                    }
				},
				{
					label: ' 尽快上门',
                    method: (options) => {
                      this.repairtime = 1;
                    }
				}
			],

			time:'1',
			show2: false,
			myItems2: [
                {
                    label: ' 上午',
                    method: (options) => {
                    	this.time = 1;
                    }
                },
                {
                	label: '下午',
            		method: (options) => {
            			this.time = 2;
            		}
            	},
                {
                	label: '晚上',
                	method: (options) => {
                		this.time = 3;
                	}
                }
            ],

            show3:false,
            show3Index:0,

            show3arr:[],

            swiperOption: {
	          // scrollbar: '.swiper-scrollbar',
	          direction: 'vertical',
	          slidesPerView: 'auto',
	          mousewheelControl: true,
	          freeMode: true, 
	        },
	        swiperOptionContent: {
	          // scrollbar: '.swiper-scrollbar',
	          direction: 'vertical',
	          slidesPerView: 'auto',
	          mousewheelControl: true,
	          freeMode: true, 
	        },

			RepairArr:[],
			RepairArrCode:[],
			RepairArrCodes:[],

			entrustContractNo:'',
			ecHousePropertyCard:'',
			userName:'',
			phone:'',

			repairPartTime:repairPartTime,
			visitType:visitType,						//上门类型
			repairMan:'',
			repairManCall:'',
			repairRemark:'',


			repairListTitle:{},
			repairListitems:{},

			HouseCode:'',

			citem:''

		}
	},
	created(){
		this.dateTime = this.mUtils.getDay();

		this.$nextTick(() => {
			this.initData();
		})
		
	},
	components:{
		'rent-footer':rentFooter,
		'yd-datetime':DateTime,
		'yd-actionsheet':ActionSheet,
		'yd-popup':Popup
	},
	methods:{
		submit(){
			if(!this.show3arr.length){ 
				this.$dialog.alert({mes: '你还没有选择要保修的内容！'});
				return ;
			}
			if(!this.repairMan.trim()){
				this.$dialog.alert({mes: '报修人姓名不可为空'});
				return ;
			}
			this.RepairArr  = this.show3arr;
			this.RepairArrCodes  = this.RepairArrCode;

			console.log(this.RepairArrCodes,'RepairArrCodes')
			this.show3 = false;
		},
		initData(){
			this.getNeedrepair();
			this.GetRepairClassData(); 
		},
		async GetRepairClassData(){ 
			let res = await this.myHttp(GetRepairClassData,{"ParentId":"","IsFirstNode":"1"});
			
			this.repairListTitle = res.ReturnData;
			this.GetRepairClassDataChild(this.repairListTitle[0],0);
		},
		async GetRepairClassDataChild(item,index){ 
			this.show3Index = index; 
			let res = await this.myHttp(GetRepairClassData,{"ParentId":item.DataDictionaryDetailId,"IsFirstNode":"0"});
			this.repairListitems = res.ReturnData; 

		},
		async InsertRepairContent(){				// 保存
			if(!this.repairMan.trim()){
				alert('报修人姓名不能为空');
				return;
			}else if(!(/^1[34578]\d{9}$/.test(this.repairManCall))){
				if(!this.repairManCall.trim()){
					alert("报修人联系电话不能为空");
				}else{
					alert("报修人联系电话格式错误");
				} 
				return;
			}else if(!this.RepairArrCodes.length){
				alert('报修内容不能为空');
				return;
			}

			let params = {
			  "ContractNo": this.entrustContractNo,
			  "UserName": this.userName,
			  "Account": this.phone,
			  "OLRContent":this.RepairArrCodes,
			  "WorkOrder": {
			  	"ContractType": this.repairtime,
			  	"HouseCode": this.houseCode,
			  	"RepairMan": this.repairMan,
			  	"RepairManCall": this.repairManCall,
			  	"RepairConvenientTime": this.dateTime,
			  	"RepairRemark": this.repairRemark,
			  	"VisitType": this.repairtime,
			  	"RepairPartTime": this.time
			  }
			}
			let res = await this.myHttp(InsertRepairContent,params);
			if(res.State == 1){
				this.$dialog.confirm({
	                title: ' ',
	                mes: "修改成功",
	                opts: [  
	                    {
	                        txt: '确定',
	                        color: true,
	                        callback: () => { 
	                        	this.$router.push('/repair/list/all'); 
	                        }
	                    }
	                ]
	            }); 
			}
			
		},
		depliclick(e,item){
			this.citem = item;
			if(e.target.classList.toString().indexOf('active') != -1){
				e.target.classList.remove('active');
				
				this.show3arr.splice(this.show3arr.indexOf(e.target.innerHTML),1);
				this.RepairArrCode.splice(this.RepairArrCode.indexOf(item.DataDictionaryDetailId),1)
			}else{
				e.target.classList.add('active'); 

				this.show3arr.push(e.target.innerHTML);
				this.RepairArrCode.push({'RepairContentSmall':item.DataDictionaryDetailId});
			} 

		},
		getNeedrepair(){
			let needRepair = JSON.parse(this.mUtils.getCookie('needrepair')); 
			this.entrustContractNo = needRepair.EntrustContractNo;
			this.ecHousePropertyCard = needRepair.ECHousePropertyCard;
			this.houseCode = needRepair.XnewHouseCode;

			this.userName = this.mUtils.getCookie('UserName');
			this.repairMan = this.mUtils.getCookie('UserName');
			this.phone =  this.mUtils.getCookie('Account'); 
		}
	}, 
}
</script>
<style scoped> 
.swiper-container{
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top:0;
}
.swiper-slide{
	font-size: 18px;
	height: auto;
	-webkit-box-sizing:border-box;
	box-sizing:border-box; 
}

.none{display: none;}

.rentdetail{
	position: fixed !important;
	top:0;
	left: 0;
	width: 100%;
	height:100%;
	background: #f8f8f8;
	overflow-y:auto;
	padding-bottom: 2rem;
	z-index: 10;
}
.myrepair{
	position: absolute;
    top: 0;
    right: .2rem;
    height: .9rem;
    font-size: 0.22rem; 
    line-height: .9rem;
}
.content{
	height: 60vh;
}
.sync{ 
	margin: 0 auto;
	background: #fff; 
	position: absolute;
	top:1.2rem;
	bottom: 1.2rem;
	left: 0;
	width: 100%;
}
.u li{
	line-height: 1rem;
	border-bottom: 1px solid #ddd;
}
.u span{
	float: left;
	font-size: 0.26rem;

	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.u .t{
	width: 36%;
	padding-right: 4%;
	text-align: right;
	
}
.u .d{
	width: 60%;
	padding-left: 4%;
	border-left:1px solid #ddd;
}
.u .dt{
	height:1.5rem;
	padding-left: 0;
}
.btnbox{
	margin:.5rem 0;
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
.textarea{
	width: 100%; 
	height: 100%;
	resize:none;
	text-indent: .3rem;
} 
.lbox{
	position: absolute;
	left:0;
	width: 30%;
	height: 90%; 
	background: #f1f1f1;
	border-right: 1px solid #ddd;
}
.lbox li{
	line-height: .8rem;
	text-align: center;
	border-bottom: 1px solid #ddd;
	list-style: none;
}
.active{
	background: #ac7cc5; 
    background: -webkit-linear-gradient(to right, from(#c697df), to(#ac7cc5));
    color:#fff;
}
.rbox{ 
	position: absolute;
	left:30%;
	width: 70%; 
	height: 90%;
}
.rbox li{
	text-indent: .5rem;
	line-height: .8rem;
	border-bottom: 1px solid #ddd;
}
.tlt{
	line-height: .8rem;
	height: 10%;
	color: #000;
	font-weight: bold;  
	width: 100%; 
	border-bottom: 1px solid #ddd;
}
.tpot{
	float: right;
	line-height: .8rem;
}
.tpot a{
	margin-right: .5rem;
	border: 1px solid #ddd;
	border-radius: .1rem;
	padding: .01rem .1rem;
	text-align:center;
}
</style>