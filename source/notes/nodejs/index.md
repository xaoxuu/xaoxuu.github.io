---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
title: Node.js 相关问题
order: 350
references:
  - url: https://nodejs.org/en/
  - url: https://www.npmjs.com
---

查看当前的源：
{% copy npm config get registry %}

官方源：
{% copy npm set registry https://registry.npmjs.org/ %}

淘宝源：
{% copy npm set registry https://registry.npm.taobao.org/ %}
