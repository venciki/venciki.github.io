---
title: HTTP集合
date: 2026-01-01
categories:
  - 网络协议
tags:
  - HTTP
---

# 浏览器缓存策略
浏览器每次发请求时，都会现在本地缓存中查询结果和缓存标识，通过缓存标识来判断是否使用本地缓存。如果缓存有效则使用本地缓存；否则向服务器发起请求并带缓存标识。根据是否要向服务器发起HTTP请求，将缓存分为两个部分：强缓存、协商缓存。强缓存优先于协商缓存。

## 强缓存

1. 强缓存命中直接读取浏览器本地资源
2. 强缓存的控制字段有，Cache-Control 和 Exprise
3. Cache-Control 是一个相对时间，用于表示自上次请求正确资源后的多少秒的时间短内缓存有效。
4. Exprise 是一个绝对时间，用于表示这个时间点以前发送的请求都可以直接从浏览器中读取数据，而无需发起请求。
5. Cache-Control 优先级高于 Exprise，Cache-Control 出现是为了解决 Exprise 的浏览器时间被手动修改导致缓存判断错误的问题。


## 协商缓存
1. 当浏览器的强缓存实效的时候或者请求头中设置了不走强缓存，并且请求头中设置了 If-Modified-Since 和 If-None-Match的时候，会将这两个字段发送给服务器，来验证是否可以走协商缓存，命中则返回304状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或 Etag属性。
2. 协商缓存有两组控制字段，Last-Modified / If-Modified-Since 和 Etag / If-None-Match
3. Last-Modified / If-Modified—Since 表示的是服务器最后一次修改资源的时间；Etag / If-None-Match表示的是服务器资源的唯一标识，只要资源变换，就会重新生成Etag。

### Last-Modified / If-Modeified-Since
1. 服务器通过 Last-Modified 告诉客户端资源最后一次被修改的时间。
2. 浏览器将这个值和内容一起存放在本地缓存。
3. 下次请求相同资源时，浏览器拿着不确定是否过期的标识 Last-Modified 的值，设置给If-Modeified-Since，传递给服务器。
4. 服务器拿客户端传入的 If-Modeified-Since 值与 Last-Modified 比较，如果相等，则表示未修改，返回304。反之，则表示修改了，返回200状态码，并返回最据。

#### 存在问题
1. 只要是资源修改，无论内容是否发生实质性变化，都会讲资源返回给客户端。例如周期性充血，这种情况下，资源包含的数据时机是一样的。
2. 已时刻作为表示，无法识别出一秒内多次修改的情况，如果资源的更新速度是秒以下，那么该缓存是不可用的，因为它的时间单位最低为秒。


### Etag / If-None-Match
1. Etag 存储的是文件的特殊标识（hash生成），服务器存储着文件的Etag字段。后续流程都和 Last-Modified一致，只是 Last- Modified 字段和它所标识的更新时间变成了 Etag 字段和它所表示的 hash，把 If-Modified-Since 改成了 If-None-Match。服务器同样进行比较，命中返回304，不命中返回新资源和200。

2. Etag 的优先级高于 Last-Modified
