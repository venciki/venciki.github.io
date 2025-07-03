module.exports = {
    title: 'Venciki',
    description: 'Venciki的博客',
    theme: 'reco',
    themeConfig: {
        type: "blog",
        logo: "/naruto.jpeg",
        authorAvatar: "/naruto.jpeg",
        nav: [
            { text: "首页", link: "/" },
            {
                text: "Links",
                items: [
                    { text: "Github", link: "https://github.com/venciki" },
                ]
            }
        ],
        // sidebar: [
        //     {
        //       title: "欢迎学习",
        //       path: "/",
        //       collapsable: false,  // 是否折叠
        //       children: [{ title: "博客简介", path: "/" }],
        //     },
        //     {
        //       title: "基础篇",
        //       path: "/blogs/1",
        //       collapsable: true,
        //       children: [
        //         { title: "第一篇", path: "/blogs/1" },
        //         { title: "第二篇", path: "/blogs/2" },
        //       ]
        //     } 
        // ],
        author: "venciki",
        blogConfig: {
            category: {
              location: 2, // 在导航栏菜单中所占的位置，默认2
              text: "博客", // 默认文案 “分类”
            },
            tag: {
              location: 4, // 在导航栏菜单中所占的位置，默认4
              text: "Tag", // 默认文案 “标签”
            },
        },
        locales: {
            "/": {
              lang: "zh-CN",
            },
        },
    },
    plugins: [
        [
          "cursor-effects",
          {
            size: 4, // size of the particle, default: 2
            shape: "circle", // ['star' | 'circle'], // shape of the particle, default: 'star'
            zIndex: 999999999, // z-index property of the canvas, default: 999999999
          },
        ],
        [
          'vuepress-plugin-right-anchor',
          {
            showDepth: 2, // 显示 H1、H2 和 H3 标题
            expand: {
              trigger: 'click',
              open: true // 默认关闭
            }
          }
        ]
     ]
}