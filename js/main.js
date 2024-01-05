console.log("\n%c Stellar v"+stellar.version+" %c\n"+stellar.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{var l,a,r,s=new Date,e=new Date(e),s=s.getTime()-e.getTime(),e=864e5;let n;return n=t?(t=s/e,a=s/36e5,r=s/6e4,12<(l=s/2592e6)?null:1<=l?parseInt(l)+" "+stellar.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.config.date_suffix.day:1<=a?parseInt(a)+" "+stellar.config.date_suffix.hour:1<=r?parseInt(r)+" "+stellar.config.date_suffix.min:stellar.config.date_suffix.just):parseInt(s/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t,2500)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")}},hud={toast:(e,t)=>{var t=Number(isNaN(t)?2e3:t),l=document.createElement("div");l.classList.add("toast"),l.classList.add("show"),l.innerHTML=e,document.body.appendChild(l),setTimeout(function(){document.body.removeChild(l)},t)}},l_body=document.querySelector(".l_body"),sidebar={toggle:()=>{l_body&&(l_body.classList.add("mobile"),l_body.classList.toggle("sidebar"))}},init={toc:()=>{stellar.jQuery(()=>{var o=[];$("article.md-text :header").each(function(e,t){o.push(t)}),$(document,window).scroll(function(e){var t,l,a,r,s=$(this).scrollTop(),n=null;for(t in o){var i=$(o[t]);i.offset().top>s+32||(!n||i.offset().top>=n.offset().top)&&(n=i)}n&&($("#data-toc a.toc-link").removeClass("active"),"#undefined"!=(r="#"+n.attr("id"))?0<(l=$('#data-toc a.toc-link[href="'+encodeURI(r)+'"]')).length&&(l.addClass("active"),l=document.querySelector(".widgets"),a=(r=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(r)+'"]')).getBoundingClientRect().bottom-l.getBoundingClientRect().bottom+200,(r=r.getBoundingClientRect().top-l.getBoundingClientRect().top-64)<0?l.scrollBy(0,r):0<a&&l.scrollBy(0,a)):$("#data-toc a.toc-link:first").addClass("active"))})})},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(l=>{l.addEventListener("click",e=>{if(e.preventDefault(),!l.classList.contains("active")){[...l.parentNode.children].forEach(e=>{e.classList.toggle("active",e===l)});const t=document.getElementById(l.querySelector("a").getAttribute("href").replace("#",""));[...t.parentNode.children].forEach(e=>{e.classList.toggle("active",e===t)}),t.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.toc(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.registerTabsTag(),stellar.plugins.scrollreveal&&stellar.loadScript(stellar.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.plugins.scrollreveal.distance,duration:stellar.plugins.scrollreveal.duration,interval:stellar.plugins.scrollreveal.interval,scale:stellar.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.plugins.lazyload&&(stellar.loadScript(stellar.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.plugins.stellar)for(let t of Object.keys(stellar.plugins.stellar)){let e=stellar.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const _=document.getElementsByClassName("stellar-"+t+"-api");null!=_&&0<_.length&&stellar.jQuery(()=>{t,stellar.loadScript(stellar.plugins.marked).then(function(){stellar.loadScript(e,{defer:!0})})})}}if(stellar.plugins.swiper){const aa=document.getElementById("swiper-api");null!=aa&&(stellar.loadCSS(stellar.plugins.swiper.css),stellar.loadScript(stellar.plugins.swiper.js,{defer:!0}).then(function(){var e=aa.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}function loadFancybox(){stellar.loadCSS(stellar.plugins.fancybox.css),stellar.loadScript(stellar.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(selector,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,l){return l.$trigger.alt||null}})})}if(stellar.plugins.preload&&("instant_page"==stellar.plugins.preload.service?stellar.loadScript(stellar.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.plugins.preload.flying_pages,{defer:!0}))),stellar.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.plugins.fancybox.selector&&(e+=", "+stellar.plugins.fancybox.selector);var needFancybox=0!==document.querySelectorAll(e).length;if(!needFancybox){const ha=document.getElementsByClassName("stellar-memos-api");null!=ha&&0<ha.length&&(needFancybox=!0)}needFancybox&&(stellar.loadCSS(stellar.plugins.fancybox.css),stellar.loadScript(stellar.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,l){return l.$trigger.alt||null}})}))}stellar.search.service&&"local_search"==stellar.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,l=$("input#search-input");0!=l.length&&(e=document.querySelector("div#search-result"),l.focus(function(){var e=stellar.search[stellar.search.service]?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.config.root+e,l.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),l.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.plugins.heti&&(stellar.loadCSS(stellar.plugins.heti.css),stellar.loadScript(stellar.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.plugins.heti.enable=!1})),stellar.plugins.copycode&&stellar.loadScript(stellar.plugins.copycode.js,{defer:!0});