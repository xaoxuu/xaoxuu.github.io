"use strict";var StellarTimeline={reactions:{"+1":"👍","-1":"👎",laugh:"😀",hooray:"🎉",confused:"😕",heart:"❤️",rocket:"🚀",eyes:"👀"},requestAPI:function(e,t,r){var a=5;!function n(){return new Promise((function(s,i){var o=0,l=setTimeout((function(){0===o&&(o=2,l=null,i("请求超时"),0==a&&r())}),5e3);fetch(e).then((function(e){if(2!==o&&(clearTimeout(l),s(e),l=null,o=1),e.ok)return e.json();throw new Error("Network response was not ok.")})).then((function(e){a=0,t(e)}))["catch"]((function(e){a>0?(a-=1,setTimeout((function(){n()}),5e3)):r()}))}))}()},layoutDiv:function(e){var t=$(e.el)[0];$(t).append('<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>'),StellarTimeline.requestAPI(e.api,(function(r){$(t).find(".loading-wrap").remove();var a=new URL(e.api).search,n=r.content||r,s=[],i=t.getAttribute("user");i&&i.length>0&&(s=i.split(","));var o=[],l=t.getAttribute("hide");l&&l.length>0&&(o=l.split(",")),n.forEach((function(e,r){if(!(e.user&&e.user.login&&s.length>0)||s.includes(e.user.login)){var n='<div class="timenode" index="'+r+'">';n+='<div class="header">',s.length||!e.user||o.includes("user")||(n+='<a class="user-info" href="'+e.user.html_url+'" target="_blank" rel="external nofollow noopener noreferrer">',n+='<img src="'+e.user.avatar_url+'">',n+="<span>"+e.user.login+"</span>",n+="</a>");var i=new Date(e.created_at);if(n+="<p>"+i.toString().replace(/\sGMT([^.]*)/i,"")+"</p>",n+="</div>",n+='<div class="body">',o.includes("title")||(n+='<p class="title">',n+='<a href="'+e.html_url+'" target="_blank" rel="external nofollow noopener noreferrer">',n+=e.title||e.name||e.tag_name,n+="</a>",n+="</p>"),n+=marked.parse(e.body||""),!o.includes("footer")){if(n+='<div class="footer">',n+='<div class="flex left">',e.labels?e.labels.forEach((function(e,t){a&&a.includes(encodeURI(e.name))||(n+='<div class="item label '+e.name+'" style="background:#'+e.color+"18;border-color:#"+e.color+'36">',n+="<span>"+e.name+"</span>",n+="</div>")})):e.zipball_url&&(n+='<a class="item download" href="'+e.zipball_url+'" target="_blank" rel="external nofollow noopener noreferrer">',n+="<span>📦 "+e.tag_name+".zip</span>",n+="</a>"),n+="</div>",n+='<div class="flex right">',e.reactions&&e.reactions.total_count>0)for(var l=0,c=Object.keys(StellarTimeline.reactions);l<c.length;l++){var d=c[l];e.reactions[d]>0&&(n+='<div class="item reaction '+d+'">',n+="<span>"+StellarTimeline.reactions[d]+" "+e.reactions[d]+"</span>",n+="</div>")}null!=e.comments&&(n+='<a class="item comments last" href="'+e.html_url+'#issuecomment-new" target="_blank" rel="external nofollow noopener noreferrer">',n+='<span><svg t="1666270368054" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2528" width="200" height="200"><path d="M952 64H72C32.3 64 0 96.3 0 136v508c0 39.7 32.3 72 72 72h261l128 128c14 14 32.5 21.1 50.9 21.1s36.9-7 50.9-21.1l128-128h261c39.7 0 72-32.3 72-72V136c0.2-39.7-32.1-72-71.8-72zM222 462c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z m290-7.7c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.2 72-72 72z m290 8c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.2 72-72 72z" p-id="2529"></path></svg> '+(e.comments||0)+"</span>",n+="</a>"),n+="</div>",n+="</div>"}n+="</div>",n+="</div>",$(t).append(n)}}))}),(function(){$(t).find(".loading-wrap svg").remove(),$(t).find(".loading-wrap").append('<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>'),$(t).find(".loading-wrap").addClass("error")}))}};$((function(){for(var e=document.getElementsByClassName("stellar-timeline-api"),t=0;t<e.length;t++){var r=e[t],a=r.getAttribute("api");if(null!=a){var n=new Object;n.el=r,n.api=a,StellarTimeline.layoutDiv(n)}}}));
//# sourceMappingURL=../../maps/js/plugins/timeline.js.map
