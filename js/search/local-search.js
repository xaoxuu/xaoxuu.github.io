var searchFunc=function(e,g,t,i){$.ajax({url:e,dataType:"xml",success:function(e){var r,n=$("entry",e).map(function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("link",this).attr("href")}}).get(),e=document.getElementById(t);e&&(r=document.getElementById(i),e.addEventListener("input",function(){var o=[],p=function(e){for(var t,r=[],n=0;n<e.length;n++)for(t=n+1;t<e.length+1;t++)r.push(e.slice(n,t).join(" "));return r}(this.value.trim().toLowerCase().split(" ")).sort(function(e,t){return t.split(" ").length-e.split(" ").length});if(r.innerHTML="",!(this.value.trim().length<=0)&&(n.forEach(function(e){var t,r,n,i,l,s,a,c,u=0;e.title&&""!==e.title.trim()&&(g&&!e.url.includes(g)||(c=e.title.trim().toLowerCase(),t=c.toLowerCase(),r=e.content.trim().replace(/<style([\s\S]*?)<\/style>/gi,"").replace(/<script([\s\S]*?)<\/script>/gi,"").replace(/<figure([\s\S]*?)<\/figure>/gi,"").replace(/<\/div>/gi,"\n").replace(/<\/li>/gi,"\n").replace(/<li>/gi,"  *  ").replace(/<\/ul>/gi,"\n").replace(/<\/p>/gi,"\n").replace(/<br\s*[\/]?>/gi,"\n").replace(/<[^>]+>/gi,""),n=r.toLowerCase(),a=e.url,s=l=i=-1,""!==r&&p.forEach(function(e){i=t.indexOf(e),l=n.indexOf(e),(0<=i||0<=l)&&(u+=1,l<0&&(l=0),s<0&&(s=l))}),0<u&&((e={}).rank=u,e.str="<li><a href='"+a+"'><span class='search-result-title'>"+c+"</span>",0<=s&&(a=s+80,(a=0==(c=(c=s-20)<0?0:c)?100:a)>r.length&&(a=r.length),c=r.substring(c,a),a=new RegExp(p.join("|"),"gi"),c=c.replace(a,function(e){return'<span class="search-keyword">'+e+"</span>"}),e.str+='<p class="search-result-content">'+c+"...</p>"),e.str+="</a></li>",o.push(e))))}),o.length)){o.sort(function(e,t){return t.rank-e.rank});for(var e='<ul class="search-result-list">',t=0;t<o.length;t++)e+=o[t].str;r.innerHTML=e+="</ul>"}}))}})};