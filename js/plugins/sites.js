const sitesjs={requestAPI:(a,o,i)=>{let l=5;!function n(){return new Promise((t,e)=>{let s=0,r=setTimeout(()=>{0===s&&(s=2,r=null,e("请求超时"),0==l&&i())},5e3);fetch(a).then(function(e){if(2!==s&&(clearTimeout(r),t(e),r=null,s=1),e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){l=0,o(e)}).catch(function(e){0<l?(--l,setTimeout(()=>{n()},5e3)):i()})})}()},layout:r=>{const n=$(r.el)[0];$(n).append('<div class="loading-wrap"><svg class="loading" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2709"><path d="M832 512c0-176-144-320-320-320V128c211.2 0 384 172.8 384 384h-64zM192 512c0 176 144 320 320 320v64C300.8 896 128 723.2 128 512h64z" p-id="2710"></path></svg><p></p></div>'),sitesjs.requestAPI(r.api,function(e){$(n).find(".loading-wrap").remove();const t=e.content;t.forEach((e,t)=>{var s='<div class="site-card">';s+='<a class="card-link" target="_blank" rel="external nofollow noopener noreferrer" href="'+e.url+'">',s+='<img src="'+(e.screenshot||"https://image.thum.io/get/width/1024/crop/768/"+e.url)+'" onerror="javascript:this.src=\''+r.screenshot+"';\"/>",s+='<div class="info">',s+='<img src="'+(e.avatar||r.avatar)+'" onerror="javascript:this.src=\''+r.avatar+"';\"/>",s+='<span class="title">'+e.title+"</span>",s+='<span class="desc">'+(e.description||e.url)+"</span>",s+="</div>",s+="</a>",s+="</div>",$(n).find(".group-body").append(s)})},function(){$(n).find(".loading-wrap svg").remove(),$(n).find(".loading-wrap p").text("加载失败，请稍后重试。")})}};$(function(){for(var e=document.getElementsByClassName("sitesjs-wrap"),t=0;t<e.length;t++){const n=e[t];var s,r=n.getAttribute("api");null!=r&&((s=new Object).class=n.getAttribute("class"),s.el=n,s.api=r,s.avatar="https://fastly.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/link/8f277b4ee0ecd.svg",s.screenshot="https://fastly.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/cover/76b86c0226ffd.svg",sitesjs.layout(s))}});