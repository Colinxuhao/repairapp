/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * tokenName: token名称
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let tokenName = 'token';
let baseUrl = 'http://10.10.134.68:1987'; 
let imgBaseUrl = '';

// 报修状态
let repairStatus = {
	"1":"已报修",
	"2":"已派单",
	"3":"已接单",
	"4":"已拒单",
	"5":"已解决",
	"6":"二次派单",
	"7":"未解决",
	"8":"已取消",
	"9":"待客户确认",
	"10":"延迟维修"
}

// 上门类型
let visitType = {
	"1":"尽快上门",
	"2":"客户方便上门时间"
} 

// 上门时间段
let repairPartTime = {
	"1":"上午",
	"2":"下午",
	"3":"晚上"
}

// 支付状态 0：未收款；1：已收款；2：未全部收款
let payStatus = {
	"0":"未付款",
	"1":"已付款",
	"2":"未全部付款",
}

export {
	baseUrl,
	imgBaseUrl,
	tokenName,
	repairStatus,
	visitType,
	repairPartTime,
	payStatus
}