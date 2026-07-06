import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Venciki",
  description: "Venciki 的博客",

  bundler: viteBundler(),

  theme: hopeTheme({
    hostname: "https://venciki.github.io",
    author: {
      name: "venciki",
      url: "https://github.com/venciki",
    },
    logo: "/naruto.jpeg",
    repo: "venciki/venciki.github.io",
    docsDir: "docs",

    navbar: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/article/" },
      { text: "分类", link: "/category/" },
      { text: "标签", link: "/tag/" },
    ],

    sidebar: false,
    pageInfo: ["Author", "Date", "Category", "Tag", "ReadingTime"],

    blog: {
      name: "venciki",
      avatar: "/naruto.jpeg",
      description: "记录前端、算法与日常思考",
      medias: {
        GitHub: "https://github.com/venciki",
      },
    },

    plugins: {
      blog: true,
    },

    displayFooter: true,
    footer: "Venciki 的博客",
    copyright: "Copyright © Venciki",
  }),
});
