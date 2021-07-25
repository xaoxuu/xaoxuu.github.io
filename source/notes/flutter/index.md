---
robots: noindex,nofollow
sitemap: false
menu_id: notes
layout: wiki
wiki: Notes
title: Flutter 相关问题
order: 250
references:
  - title: 'flutter.cn'
    url: https://flutter.cn/
  - title: 'flutter.dev'
    url: https://flutter.dev/docs
  - title: 'flutterchina.club'
    url: https://flutterchina.club/docs/
  - title: 'alibaba/fish-redux'
    url: https://github.com/alibaba/fish-redux/blob/master/doc/README-cn.md
---

运行时弹出「无法打开“iproxy”，因为无法验证开发者。」弹窗，手动添加信任：

```
sudo xattr -r -d com.apple.quarantine futter的SDK目录/bin/cache/artifacts/usbmuxd/iproxy
```

清除缓存，重新 build：

```
rm -rf build
flutter clean
flutter build ios --debug
```
