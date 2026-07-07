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
    favicon: "/naruto.jpeg",
    logo: "/naruto.jpeg",
    repo: "venciki/venciki.github.io",
    docsDir: "docs",
    navbarAutoHide: "mobile",

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
      description: "前端开发者，记录技术、实践与持续思考",
      articlePerPage: 8,
      medias: {
        GitHub: "https://github.com/venciki",
      },
    },

    plugins: {
      blog: {
        excerptLength: 220,
      },
    },

    displayFooter: true,
    footer: "Venciki 的博客",
    copyright: "Copyright © Venciki",
  }),
});
