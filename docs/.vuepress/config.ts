import {defineUserConfig, defaultTheme} from 'vuepress'
import katex from 'markdown-it-katex'
import {createPage} from "@vuepress/core";

export default defineUserConfig({
    lang: 'zh-CN',
    title: '你好， VuePress ！',
    description: '这是我的第一个 VuePress 站点',
    theme: defaultTheme({}),
    extendsMarkdown: (md) => {
        md.use(katex)
    },
    head: [
        ['link', {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
        }],
        ['link', {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
        }]],
    onInitialized: async (app) => {
        // 如果主页不存在 {
        // 创建一个主页
        const homepage = await createPage(app, {
            path: '/name',
            frontmatter: {
                layout: "./layouts/Layout.vue",
            },
            // 设置 markdown 内容
            content: "",
        })
        // 把它添加到 `app.pages`
        app.pages.push(homepage)
    },
})

