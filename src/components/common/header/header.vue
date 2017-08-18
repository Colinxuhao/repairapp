<template>
	<header class="header_top">
		
		<a class="head_goback"  @click="$router.go(-1)">  
			<img src="../../../assets/true.png">
		</a>
		<h5 class="tlt">
		 	{{title}}
		</h5>

		<slot name="edit" class='fr'></slot>
	</header>
</template>
<script>
export default{
	name:'header',
	props:['title'],
	data(){
		return {}
	},
	methods:{}
}
</script>
<style scoped>
.header_top{
	position: fixed !important;
	width: 100%;
	/*z-index: 30;*/
	text-align:center;
}
.tlt{
	line-height:0.9rem;
	height:0.9rem;
	background: #fff;
	font-size:0.32rem;
	box-shadow: 0 0 1px 0 rgba(0,0,0,0.3);
}
.head_goback{
	position: absolute; 
	top:0;
	left:0;
	width:0.8rem;
	height:.9rem;
	font-size:0.3rem; 
	line-height:1rem;
	
}
img{
	width:0.2rem;
}
.head_oper{
	position: absolute;
	right:0.1rem;
	top:0;
	height:1rem;
	line-height:1rem;
	font-size:0.30rem;
}
.fr{
	float: right;
}
</style>

<!-- <template>
<div class="header">
	<a href="javascript:;" class='true' @click='back'>返回</a>
</div>
</template>
<script>
export default{
	name:'header',
	data(){
		return {}
	},
	methods:{
		back(){
			this.$router.back(-1);
		}
	}
}
</script>
<style scoped>
.header{
	height: 0.7rem;
}
.true{
	line-height: 0.7rem;
	background: #ccc;
	float: left;
	font-size: 0.2rem;
	width: 0.6rem;
}
.true:active{
	background: #f2c40c; 
}
</style> -->