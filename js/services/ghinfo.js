utils.jq(()=>{$(function(){for(var t=document.getElementsByClassName("stellar-ghinfo-api"),e=0;e<t.length;e++){const a=t[e];var n=a.getAttribute("api");null!=n&&utils.request(null,n,function(t){function e(t){for(var e of Object.keys(t))$(a).find("[type=text]#"+e).text(t[e]),$(a).find("[type=link]#"+e).attr("href",t[e]),$(a).find("[type=img]#"+e).attr("src",t[e])}var n,i,l=a.getAttribute("index");null!=l?(n=t.content||t)&&n.length>l&&((i=n[l])["latest-tag-name"]=i.name,e(n[l])):e(t)})}})});