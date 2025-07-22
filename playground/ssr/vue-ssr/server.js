const express = require("express"); // 类koa 简单backend框架 commonjs
const app = express();
const Vue = require("vue"); // vue走向后端
const readerer3 = require("@vue/server-renderer"); // ssr
const vue3Compile = require("@vue/compiler-ssr"); // 编译模板

const vueapp = {
  template: `
        <div>
            <h1 @click="add">{{num}}</h1>
            <ul>
                <li v-for="(todo, n) in todos">{{n+1}}-- {{todo}}</li>
            </ul>
        </div>
    `,
  data() {
    return {
      num: 1,
      todos: ["吃饭", "睡觉", "打豆豆"],
    };
  },
  methods: {
    add() {
      this.num++;
      console.log("11");
    },
  },
};

vueapp.ssrRender = new Function(
  "require",
  vue3Compile.compile(vueapp.template).code
)(require);


// http 协议基于请求响应的简单协议
app.get("/", async (req, res) => {
  // 爬虫 拿到 组件的html  在vue之前
  // res.end('hello world');
  // 创建服务器端的渲染app
  let vapp = Vue.createSSRApp(vueapp);
  // 渲染
  let html = await readerer3.renderToString(vapp);
  const title = "vue3 ssr";
  let ret = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <div id="app">${html}</div>
        </body>
        </html>
    `;

  res.end(ret);
});

app.listen(9093, () => {
  console.log("server is running at port 9093");
});