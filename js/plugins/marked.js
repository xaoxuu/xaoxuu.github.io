const loadMarkdown=t=>{window.fetch?(t.el.innerHTML='<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>',fetch(t.src,{method:"GET"}).then(e=>Promise.all([e.ok,e.status,e.text(),e.headers])).then(([e,t,r,a])=>{if(e)return{ok:e,status:t,data:r,headers:a};throw new Error(JSON.stringify(json.error))}).then(e=>{e=marked.parse(e.data);t.el.innerHTML=e}).catch(e=>{console.error(e),t.el.innerHTML='<div class="loading-wrap error"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg></div>'})):t.el.innerHTML='<div style="font-size: 24px"><p>Your browser outdated. Please use the latest version of Chrome or Firefox!</p><p>您的浏览器版本过低，请使用最新版的 Chrome 或 Firefox 浏览器！</p></div>'};$(function(){for(var e=document.getElementsByClassName("stellar-marked-api"),t=0;t<e.length;t++){var r=new Object,a=e[t];r.src=a.getAttribute("src")+"?t="+(new Date).getTime(),r.el=a,loadMarkdown(r)}});