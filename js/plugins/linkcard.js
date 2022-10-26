var cardLink={};function indexHandler(e){let t=e.replace(/(\/index\.html|\/)*$/gi,"");return 0===t.length&&(t+="/"),t}function isHttp(e){return/^(https?:)?\/\//g.test(e)}function renderer(e,t){t.title&&0<t.title.length&&(e.querySelector(".title").innerHTML=t.title),t.icon&&0<t.icon.length&&(e.querySelector(".img").style='background-image: url("'+t.icon+'");');let r=e.querySelector(".desc");r&&t.desc&&0<t.desc.length&&(r.innerHTML=t.desc)}function getInfo(c,e,i){try{let t,r,n;const l=(new DOMParser).parseFromString(e,"text/html");if(t=l.querySelector("title")){t=t.textContent;let e=l.querySelector('head link[rel="apple-touch-icon"]');if(e=e||l.querySelector('head link[rel="icon"]'),r=e&&e.getAttribute("href"),/^data:image/.test(r)&&(r=""),!r){const a=[].slice.call(l.querySelectorAll("link[rel][href]"));r=a.find(e=>e.rel.includes("icon")),r=r&&r.getAttribute("href")}n=l.querySelector('head meta[name="description"]'),n=n&&n.content,r&&!isHttp(r)&&(r=new URL(i).origin+r),cardLink.caches[i]={title:t,link:i,icon:r,desc:n},renderer(c,cardLink.caches[i])}}catch(e){console.warn("CardLink Error: Failed to parse",e)}}function fetchPage(r,n){fetch(r).then(e=>e.text()).then(n).catch(e=>{var t=cardLink.server;if(r.includes(t)||!t)return console.error("CardLink Error:",e);fetchPage(t+r,n)})}function setCardLink(e){(e="forEach"in(e||{})?e:document.querySelectorAll("a[cardlink]")).forEach(t=>{if(1===t.nodeType){t.removeAttribute("cardlink");const r=t.href;var e=cardLink.caches[r];if(e)return renderer(t,e);isHttp(r)&&fetchPage(r,e=>{getInfo(t,e,r)})}})}cardLink.caches={},cardLink.server="https://api.allorigins.win/raw?url=";