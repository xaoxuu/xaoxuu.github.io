function renderer(e,t){var n=[],r=e.getAttribute("autofill"),r=(r&&(n=r.split(",")),t.title&&0<t.title.length&&n.includes("title")&&(e.querySelector(".title").innerHTML=t.title,e.title=t.title),t.icon&&0<t.icon.length&&n.includes("icon")&&(e.querySelector(".img").style='background-image: url("'+t.icon+'");',e.querySelector(".img").setAttribute("data-bg",t.icon)),e.querySelector(".desc"));r&&t.desc&&0<t.desc.length&&n.includes("desc")&&(r.innerHTML=t.desc)}function setCardLink(e){(e="forEach"in(e||{})?e:document.querySelectorAll("a[cardlink]")).forEach(t=>{var e;1===t.nodeType&&(t.removeAttribute("cardlink"),null!=(e=t.getAttribute("api")))&&fetch(e).then(function(e){if(e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){renderer(t,e)}).catch(function(e){console.error(e)})})}