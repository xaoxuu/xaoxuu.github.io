const MemosJS={requestAPI:(i,o,n)=>{let l=5;!function s(){new Promise((t,e)=>{let a=0,r=setTimeout(()=>{0===a&&(a=2,r=null,e("请求超时"),0==l)&&n()},5e3);fetch(i).then(function(e){if(2!==a&&(clearTimeout(r),t(e),r=null,a=1),e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){l=0,o(e)}).catch(function(e){0<l?(--l,setTimeout(()=>{s()},5e3)):n()})})}()},layoutDiv:d=>{const u=$(d.el)[0];$(u).append('<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>'),MemosJS.requestAPI(d.api,function(e){$(u).find(".loading-wrap").remove();var n=[],t=u.getAttribute("user"),l=(t&&0<t.length&&(n=t.split(",")),[]),t=u.getAttribute("hide");t&&0<t.length&&(l=t.split(",")),e.forEach((e,t)=>{if(!(d.limit&&t>=d.limit)&&(!(e.user&&e.user.login&&0<n.length)||n.includes(e.user.login))){var a,r=new Date(1e3*e.createdTs),s='<div class="timenode" index="'+t+'">',i=(s+='<div class="header">',n.length||l.includes("user")||(s+='<div class="user-info">',0<d.avatar?.length&&(s+=`<img src="${d.avatar}">`),s=s+("<span>"+e.creatorName)+"</span></div>"),s=(s=(s+="<p>"+r.toLocaleString()+"</p>")+"</div>"+'<div class="body">')+marked.parse(e.content||""),[]);for(a of e.resourceList)a.type?.includes("image/")&&i.push(a);if(0<i.length){s+='<div class="tag-plugin image">';for(var o of i)0<o.externalLink?.length?s+=`<div class="image-bg"><img src="${o.externalLink}" data-fancybox="memos"></div>`:s+=`<div class="image-bg"><img src="https://${d.host}/o/r/${o.id}" data-fancybox="memos"></div>`;s+="</div>"}s=s+"</div>"+"</div>",$(u).append(s)}})},function(){$(u).find(".loading-wrap svg").remove(),$(u).find(".loading-wrap").append('<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>'),$(u).find(".loading-wrap").addClass("error")})}};$(function(){for(var e=document.getElementsByClassName("stellar-memos-api"),t=0;t<e.length;t++){var a,r=e[t],s=r.getAttribute("api");null!=s&&((a=new Object).el=r,a.api=s,a.limit=r.getAttribute("limit"),a.host=s.replace(/https:\/\/(.*?)\/(.*)/i,"$1"),a.avatar=r.getAttribute("avatar"),a.avatar||(a.avatar="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.12/avatar/round/3442075.svg"),MemosJS.layoutDiv(a))}});