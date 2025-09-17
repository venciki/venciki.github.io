---
title: webpack集合
date: 2026-01-01
tags:
  - RV
---

## webpack流程概述

Webpack首先会把配置的参数和命令行的参数及默认参数合并，并初始化需要使用的插件和配置插件等执行环境所需要的参数；初始化完成后会调用Compiler的run来真正启动webpack编译构建过程，webpack的构建流程包括 compile、make、build、seal、emit阶段，执行万只写阶段就完成了构建。

![](https://cdn.jsdelivr.net/gh/venciki/image-bed@main/img/Snipaste_2025-09-18_01-28-10.png)