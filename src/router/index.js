import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login';
import Home from "@/components/home/home";
import revise from "@/components/revise/revise";                            //  修改密码
import guide from "@/components/guide/guide";                               //  入职指南
import mycontract from "@/components/mycontract/mycontract";                   //  我的合同
import myhouse from "@/components/myhouse/myhouse";                         //  我的管家
import paypending from "@/components/paypending/paypending";                         //  代付款
import endover from "@/components/endover/endover";                         //  已结束的合同

import repair from "@/components/repair/repair";                            //  我的报修
import repairway from "@/components/repair/children/repairway";                   // 我的报修-状态
import rentdetail from "@/components/repair/children/rentdetail";                   // 我的报修详情
import needrepair from "@/components/repair/children/needrepair";                   // 我要报修
import newRepair from "@/components/repair/children/newRepair";                     //新增报修

import register from "@/components/register/register"                         // 注册
import t404 from "@/components/t404/t404";

// import Test from "@/components/test/test";

Vue.use(Router);


//判断有没有登陆 
// export default
const routers =  new Router({
  // mode:'history',
  routes: [
    {
      path: '/login',                   // 登陆
      component: Login
    },
    {
      path:'/register',                 // 注册
      component:register
    },
    {
      path: '/',
      component: Home,
      meta: {
          requireAuth: true,
      },
    }, 
    {
      path: '/revise',                  // 修改密码     
      component: revise,
      meta: {
          requireAuth: true,
      },
    },
    {
      path: '/guide',                   // 入住指南
      component: guide,
      meta: {
          requireAuth: true,
      },
    },
    {
      path: '/mycontract',              // 我的合同 
      component: mycontract,
      meta: {
          requireAuth: true,
      },
    },
    {
      path: '/myhouse',                 // 我的管家
      component: myhouse,
      meta: {
          requireAuth: true,
      },
    },
    {
      path: '/paypending',              // 租房待付款
      component: paypending,
      meta: {
          requireAuth: true,
      }
    },
    {
      path: '/endover',                 // 已经结束完成的合同
      component: endover,
      meta: {
          requireAuth: true,
      },
    },
    {
    path: '/repair',                    // 相遇报修
    component: repair,
    meta: {
          requireAuth: true,
    },
    children:[
        {
            path:'list/:status',        // 我的报修-报修状态
            component:repairway,
            meta: {
                requireAuth: true,
            },
        },
        {
            path:'detail/:repairid',          // 我的报修--报修详情
            component:rentdetail,
            meta: {
                requireAuth: true,
            },
        },
        {
            path:'needrepair',          // 新增报修 信息输入页
            component:needrepair,
            meta: {
                requireAuth: true,
            },
        },{
            path:'newRepair/:repairid',          // 这个可以改成newRepair id中进行修改
            component:newRepair,
            meta: {
                requireAuth: true,
            },
        }
    ]},{
      path:'/*',
      component:t404
    }
  ]
})


import * as mUtils from "../common/mUtils.js";
import { tokenName } from "../config/env.js";

routers.beforeEach((to, from, next) => {
    if(to.meta.requireAuth){                                      // 判断该路由是否需要登录权限
      if(!!mUtils.getCookie(tokenName)){                           // 是否有登陆标识符号
        next();
      }else{
        next({
          path:'/login',
          query: {redirect: to.fullPath}                          // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }else{
      next()
    }
})
export default routers;
// My contract myhouse  Pending  over