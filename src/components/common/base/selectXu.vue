<template> 
<div class="select">
	<div class="backdrop" @click='colseSelect'></div>  
	<ul class="scon" :class={active:activebl}>
		<li v-for="(item,key) in datas" @click='changeType(item)'>
			{{item.txt}}
			<!-- {{item}} -->
		</li>
	</ul>
</div> 
</template>
<script>
export default{
	name:'selectXu',
	props:['datas'],
	data(){
		return {
			activebl:false,
			timer:null
		}
	},
	created(){
		this.timer = setTimeout(() => {
			this.activebl = true;
		},30)
	},
	methods:{
		colseSelect(){
			this.$emit('colseSelect');
		},
		changeType(item){
			this.$emit('changeType',item);
			this.colseSelect();
		}
	},
	destroyed(){
		clearTimeout(this.timer);
	}
}
</script>
<style scoped> 
.active.scon{
	transform: translate3d(0, 0, 0);
	transition: transform 1s cubic-bezier(.23, 1, .23, 1) 0s
}

.backdrop{
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);  
    min-height: 100vh;
	z-index: 18;
}

.scon{
	position: fixed !important;
	width: 100%;
	bottom: 0; 
	padding-bottom: .8rem;
	background: #fff;
	z-index: 20;

	transform: translate3d(0, 2rem, 0);
} 
.scon li{
	line-height: 1rem;
	height: 1rem;
	border-bottom: 1px solid #ddd;
	text-align: center;
	background: #fff;
}
.scon li:last-child{
	border-bottom: 0;
}
</style>