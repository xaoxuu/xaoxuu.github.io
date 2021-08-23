---
robots: noindex,nofollow
sitemap: false
menu_id: more
seo_title: 友链
toc_title: 友链索引
comment_title: 快来交换友链吧～
comment_id: '留言板'
---

{% friends %}

{% noteblock color:yellow 友链更新通知 %}

由于近期对友链系统进行了重做，原链接失效的小伙伴请按照下方交换友链的步骤进行填写。在新的友链系统中，您随时可以对自己的信息进行修改而无需等待博主更新。

{% endnoteblock %}

## 我可以交换友链吗？

先友后链，在我们有一定了解了之后才可以交换友链，除此之外，您的网站还应满足以下条件：

- 合法的、非营利性、无商业广告
- 有实质性原创内容的 `HTTPS` 站点

## 如何自助添加友链？

{% timeline %}

<!-- node 第一步：新建 Issue -->

新建 [GitHub Issue](https://github.com/xaoxuu/friends/issues/) 按照模板格式填写并提交。

为了提高图片加载速度，建议优化头像：
1. 打开 [压缩图](https://www.yasuotu.com/) 上传自己的头像，将图片尺寸调整到 `96px` 后下载。
2. 将压缩后的图片上传到 [去不图床](https://7bu.top/) 并使用此图片链接作为头像。

<!-- node 第二步：添加友链并等待管理员审核 -->

请添加本站到您的友链中，如果您也使用 issue 作为友链源，只需要告知您的友链源仓库即可。

{% codeblock lang:yaml %}
title: xaoxuu
avatar: https://cdn.jsdelivr.net/gh/cdn-x/xaoxuu/avatar/rect-256@2x.png
url: https://xaoxuu.com
screenshot: https://i.loli.net/2020/08/21/VuSwWZ1xAeUHEBC.jpg
{% endcodeblock %}

待管理员审核通过，添加了 `active` 标签后，回来刷新即可生效。

{% endtimeline %}

如果您需要更新自己的友链，请直接修改 issue 内容，大约 3 分钟内生效，无需等待博客更新。如果无法修改，可以重新创建一个。
