const friendsjs={requestAPI:(o,i,n)=>{let l=5;!function s(){new Promise((t,e)=>{let r=0,a=setTimeout(()=>{0===r&&(r=2,a=null,e("请求超时"),0==l)&&n()},5e3);fetch(o).then(function(e){if(2!==r&&(clearTimeout(a),t(e),a=null,r=1),e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){l=0,i(e)}).catch(function(e){0<l?(--l,setTimeout(()=>{s()},5e3)):n()})})}()},layout:a=>{const s=$(a.el)[0];$(s).append('<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>'),friendsjs.requestAPI(a.api,function(e){$(s).find(".loading-wrap").remove(),(e.content||e).forEach((e,t)=>{var r=(r=(r=(r=(r='<div class="user-card">')+'<a class="card-link" target="_blank" rel="external nofollow noopener noreferrer"'+(' href="'+(e.html_url||e.url)+'">'))+('<img src="'+(e.avatar_url||e.avatar||a.avatar)+'" onerror="javascript:this.src=\''+a.avatar+"';\">"))+('<div class="name"><span>'+(e.title||e.login)+"</span></div>"))+"</a>"+"</div>";$(s).find(".group-body").append(r)})},function(){$(s).find(".loading-wrap svg").remove(),$(s).find(".loading-wrap").append('<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>'),$(s).find(".loading-wrap").addClass("error")})}};$(function(){for(var e=document.getElementsByClassName("stellar-friends-api"),t=0;t<e.length;t++){var r,a=e[t],s=a.getAttribute("api");null!=s&&((r=new Object).el=a,r.api=s,r.class=a.getAttribute("class"),r.avatar="https://fastly.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/avatar/round/3442075.svg",friendsjs.layout(r))}});