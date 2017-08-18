import { checkLogin } from 'src/service/getData';

export const errDialog = {
  	methods: {
    	errDialog: function (msg) {
    		this.$dialog.confirm({
                title: ' ',
                mes: msg,
                opts: [  
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                        	this.mUtils.removeAllCookie();
                        	this.$router.push('/login');
                        }
                    }
                ]
            });

    	}
  	}
}

export const myHttp = {
	methods:{
		 async myHttp(callback,params={}){ 
		 	this.$dialog.loading.open('请稍后...');
			let res;
				res = await callback(params);
			if(res == -401){
				await checkLogin();
				res = await callback(params);
				if(res.status == 200){ 
					//console.log(res,2);
					return this.responseInfo(res);
				}else{
					//this.$dialog.alert({mes: '用户异常2'});
					this.errDialog('用户异常');
				}
			}else if(res == -404){
				//this.$dialog.alert({mes: '用户异常1'});
				this.errDialog('服务器异常');
			}else{ 
				//console.log(res,1);
				return this.responseInfo(res); 
			}
		}, 
		responseInfo(res){
			this.$dialog.loading.close();
			if(res.data.State == 1){ 
				return res.data;
			}else{
				this.$dialog.alert({mes: res.data.Msg}); 
				return {};
			}
		}
	}
}