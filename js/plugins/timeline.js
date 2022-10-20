const StellarTimeline={reactions:{"+1":"👍","-1":"👎",laugh:"😀",hooray:"🎉",confused:"😕",heart:"❤️",rocket:"🚀",eyes:"👀"},requestAPI:(a,o,i)=>{let s=5;!function r(){return new Promise((l,e)=>{let n=0,t=setTimeout(()=>{0===n&&(n=2,t=null,e("请求超时"),0==s&&i())},5e3);fetch(a).then(function(e){if(2!==n&&(clearTimeout(t),l(e),t=null,n=1),e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){s=0,o(e)}).catch(function(e){0<s?(--s,setTimeout(()=>{r()},5e3)):i()})})}()},layoutDiv:e=>{const o=$(e.el)[0];$(o).append('<div class="loading-wrap"><svg class="loading" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2709"><path d="M832 512c0-176-144-320-320-320V128c211.2 0 384 172.8 384 384h-64zM192 512c0 176 144 320 320 320v64C300.8 896 128 723.2 128 512h64z" p-id="2710"></path></svg><p></p></div>'),StellarTimeline.requestAPI(e.api,function(e){$(o).find(".loading-wrap").remove();const a=o.getAttribute("user"),l=e.content||e;l.forEach((l,n)=>{if(!(l.user&&l.user.login&&a&&0<a.length)||a.includes(l.user.login)){var t='<div class="timenode" index="'+n+'">';t+='<div class="header">',!a&&l.user&&(t+='<a class="user-info" href="'+l.user.html_url+'" target="_blank" rel="external nofollow noopener noreferrer">',t+='<img src="'+l.user.avatar_url+'">',t+="<span>"+l.user.login+"</span>",t+="</a>");let e=new Date(l.created_at);if(t+="<p>"+e.toString().replace(/\sGMT([^.]*)/i,"")+"</p>",t+="</div>",t+='<div class="body">',t+='<p class="title">',t+='<a href="'+l.html_url+'" target="_blank" rel="external nofollow noopener noreferrer">',t+=l.title||l.name||l.tag_name,t+="</a>",t+="</p>",t+=marked.parse(l.body),t+='<div class="footer">',t+='<div class="flex left">',l.labels?l.labels.forEach((e,l)=>{t+='<div class="item label '+e.name+'" style="background:#'+e.color+"18;border-color:#"+e.color+'36">',t+="<span>"+e.name+"</span>",t+="</div>"}):l.zipball_url&&(t+='<a class="item download" href="'+l.zipball_url+'" target="_blank" rel="external nofollow noopener noreferrer">',t+="<span>📦 "+l.tag_name+".zip</span>",t+="</a>"),t+="</div>",t+='<div class="flex right">',l.reactions&&0<l.reactions.total_count)for(var r of Object.keys(StellarTimeline.reactions))0<l.reactions[r]&&(t+='<div class="item reaction '+r+'">',t+="<span>"+StellarTimeline.reactions[r]+" "+l.reactions[r]+"</span>",t+="</div>");null!=l.comments&&(t+='<a class="item comments last" href="'+l.html_url+'#issuecomment-new" target="_blank" rel="external nofollow noopener noreferrer">',t+='<span><svg t="1666270368054" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2528" width="200" height="200"><path d="M952 64H72C32.3 64 0 96.3 0 136v508c0 39.7 32.3 72 72 72h261l128 128c14 14 32.5 21.1 50.9 21.1s36.9-7 50.9-21.1l128-128h261c39.7 0 72-32.3 72-72V136c0.2-39.7-32.1-72-71.8-72zM222 462c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z m290-7.7c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.2 72-72 72z m290 8c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.2 72-72 72z" p-id="2529"></path></svg> '+(l.comments||0)+"</span>",t+="</a>"),t+="</div>",t+="</div>",t+="</div>",t+="</div>",$(o).append(t)}})},function(){$(o).find(".loading-wrap svg").remove(),$(o).find(".loading-wrap p").text("加载失败，请稍后重试。")})}};$(function(){for(var e=document.getElementsByClassName("stellar-timeline-api"),l=0;l<e.length;l++){const r=e[l];var n,t=r.getAttribute("api");null!=t&&((n=new Object).el=r,n.api=t,StellarTimeline.layoutDiv(n))}});