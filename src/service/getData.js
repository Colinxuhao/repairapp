import MD5 from "js-md5";
import fetch from '../common/fetch';
import { getCookie,setCookie,removeCookie } from "../common/mUtils" 
import { tokenName } from "../config/env"; 

import axios from 'axios';
import Qs from 'qs';  

// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';  
axios.defaults.baseURL = 'http://10.10.134.86:9099';

// 请求
axios.interceptors.request.use(
config => {
    getCookie('token') && (config.headers.Authorization = getCookie('token')); 
    return config;
},
err => {
    return Promise.reject(err);
});

// 提交参数
var jsonParams = (params) => {
	let token = getCookie(tokenName) || ""; 
    return JSON.stringify(Object.assign({token:token}, params));
}

// 登录 0 密码错误
export const checkLogin = (params) => {
	var posdata = {
		"Account":getCookie('Account'),
		"Password":getCookie('Password')
	}
	var params = params || posdata;
	return axios.post("/api/GetToken",JSON.stringify(params)).then((res) => {
		let ress = res.data; 
		if(ress.State == 1){
			setCookie(tokenName,ress.Data.TokeyType + " " + ress.Data.AccessToken); 
			setCookie('Account',params.Account);
			setCookie('Password',params.Password);
			setCookie('UserName',ress.Data.UserName);
			setCookie('CustomerCode',ress.Data.CustomerCode);
			// console.log(ress.Data.tokeyType + " " + ress.Data.accessToken,'gengxin')
		}
		return res;
	}).catch(ErrorInfo)
}

// 获取json
export const getJson = () => {
	return axios.post('/api/GetUserInfo').catch(ErrorInfo);
}

// 我的报修工单
export const getRepairAll = (params) => { 
	return axios.post('/api/GetRepairList',JSON.stringify(params)).catch(ErrorInfo);
}

// 我的报修工单详情
export const getRepairDetail = (params) => {
	return axios.post('/api/GetRepairModel',JSON.stringify(params)).catch(ErrorInfo);
}

// 撤销我的报修工单
export const UpdateRepairModel = (params) => {
	return axios.post('/api/UpdateRepairModel',JSON.stringify(params)).catch(ErrorInfo);
}

// 新增报修 查询
export const GetRepairContractAllList = (params) => {
	return axios.post('/api/GetRepairContractAllList',JSON.stringify(params)).catch(ErrorInfo)
}
// 我的报修详情
export const  InsertRepairContent = (params) => {
	return axios.post('/api/InsertRepairContent',JSON.stringify(params)).catch(ErrorInfo);
}

// 报修内容
export const GetRepairClassData = (params) => {
	return axios.post('/api/GetRepairClassData',JSON.stringify(params)).catch(ErrorInfo);
}
 

// 我的管家
export const GetMyHouseKeeperData = (params) => {
	return axios.post('/api/GetMyHouseKeeperData',JSON.stringify(params)).catch(ErrorInfo);
} 

// 密码更新 
export const UpdateMyPwd = (params) => {
	return axios.post('/api/UpdateMyPwd',JSON.stringify(params)).catch(ErrorInfo);
}

// 相遇房租代付款 
export const GetResponsePayData = (params) => {
	return axios.post('/api/GetResponsePayData',JSON.stringify(params)).catch(ErrorInfo);
}

// 获取我的合同 
export const GetMyContractData = (params) => {
	return axios.post('/api/GetMyContractData',JSON.stringify(params)).catch(ErrorInfo);
}

// 再次获取token
export const getAgainToken = async (url,params) => { 
	await checkLogin(); 
	return axios.post(url,JSON.stringify(params)).catch(ErrorInfo);
}

/*
 * 错误信息处理参数
 * -404 未知错误
 * -401 401 过时
 **/
const ErrorInfo = (error) => { 
	// 能否在这里面直接执行 401 
	console.log('信息:',error);
	let errorStatus = error.response;
	if(errorStatus && errorStatus.status == 401){
		return -401;
	}else{
		return -404;
	}
}