"use strict";var searchFunc=function(t,n,e,r){$.ajax({url:t,dataType:"json",success:function(t){var s=t,i=document.getElementById(e);if(i){var a=document.getElementById(r);i.addEventListener("input",(function(){var t=[],e=function(t){var n,e,r=[];for(n=0;n<t.length;n++)for(e=n+1;e<t.length+1;e++)r.push(t.slice(n,e).join(" "));return r}(this.value.trim().toLowerCase().split(" ")).sort((function(t,n){return n.split(" ").length-t.split(" ").length}));if(a.innerHTML="",!(this.value.trim().length<=0)&&(s.forEach((function(r){var s,i;if(null!==(s=r.title)&&void 0!==s&&s.trim().length&&null!==(i=r.content)&&void 0!==i&&i.trim().length){var a=0;if(!n||r.path.includes(n)){var l=r.title.trim(),o=l.toLowerCase(),u=r.content,c=u.toLowerCase(),h=r.path,f=-1,p=-1,v=-1;if(""!==u&&e.forEach((function(t){f=o.indexOf(t),p=c.indexOf(t),(f>=0||p>=0)&&(a+=1,p<0&&(p=0),v<0&&(v=p))})),a>0){var g={};if(g.rank=a,g.str="<li><a href='"+h+"'><span class='search-result-title'>"+l+"</span>",v>=0){var d=v-20,m=v+80;d<0&&(d=0),0==d&&(m=100),m>u.length&&(m=u.length);var E=u.substring(d,m),L=new RegExp(e.join("|"),"gi");E=E.replace(L,(function(t){return'<span class="search-keyword">'+t+"</span>"})),g.str+='<p class="search-result-content">'+E+"...</p>"}g.str+="</a></li>",t.push(g)}}}})),t.length)){t.sort((function(t,n){return n.rank-t.rank}));for(var r='<ul class="search-result-list">',i=0;i<t.length;i++)r+=t[i].str;r+="</ul>",a.innerHTML=r}}))}}})};
//# sourceMappingURL=../../maps/js/search/local-search.js.map
