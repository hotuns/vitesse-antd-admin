import{_ as r}from"./index.94226c26.js";import{c as e,bw as s,bj as c,k as d,d as l,o as p,p as _,h as o,i as n,br as u,bs as m,q as f}from"./index.496a8912.js";import{T as h}from"./index.47d1d981.js";import"./index.9341112c.js";import"./omit.98e27ebd.js";import"./index.face6ed6.js";import"./index.755dd249.js";import"./index.336e0858.js";import"./index.517385e1.js";import"./Input.d5b3c0e5.js";function I(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!s(t)}const b=[{title:"IP\u5730\u5740",dataIndex:"ip",width:150},{title:"\u7AEF\u53E3",dataIndex:"host",width:80,customRender:({text:t})=>e(h,null,I(t)?t:{default:()=>[t]})},{title:"\u534F\u8BAE",dataIndex:"protocol",width:100},{title:"\u57DF\u540D",dataIndex:"domain",width:100},{title:"\u90AE\u7BB1",dataIndex:"email",width:150},{title:"\u5730\u5740",dataIndex:"url",width:200,customRender:({text:t})=>e("a",{href:t,target:"_blank",rel:"noreferrer"},[t])}],g=async t=>c({url:"/v1/common/page_one/list",data:t});var v={page_one_list:g};const x=t=>(u("data-v-20d45553"),t=t(),m(),t),w={class:"node-conatiner"},y=x(()=>f("h2",{class:"nc_title font18"}," \u7F51\u7AD9\u7BA1\u7406 ",-1)),a=l({setup(t){return(k,S)=>{const i=r;return p(),_("div",w,[y,e(i,{url:o(v).page_one_list,columns:o(b),"hidden-filter":!0},null,8,["url","columns"])])}}});typeof n=="function"&&n(a);var D=d(a,[["__scopeId","data-v-20d45553"]]);export{D as default};