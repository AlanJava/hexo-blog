# hexo-blog
> 利用hexo搭建的个人博客,使用fluid美化主题
# 1. Hexo

## 1.1 简介

[Hexo官网]( https://hexo.io/zh-cn/docs/)

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

- **超快速度**

Node.js 所带来的超快生成速度，让上百个页面在几秒内瞬间完成渲染。

- **支持 Markdown**

Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。

- **一键部署**

只需一条指令即可部署到 GitHub Pages, Heroku 或其他平台。

- **插件和可扩展性**

强大的 API 带来无限的可能，与数种模板引擎（EJS，Pug，Nunjucks）和工具（Babel，PostCSS，Less/Sass）轻易集成

## 1.2 安装

安装 Hexo 相当简单，只需要先安装下列应用程序即可：

- [Node.js](http://nodejs.org/) (Node.js 版本需不低于 10.13，建议使用 Node.js 12.0 及以上版本)
- [Git](http://git-scm.com/)

所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。

```shell
$ npm install -g hexo-cli
```

## 1.3 创建Hexo应用

安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```shell
$ hexo init <folder>
$ cd <folder>
$ npm install
```

或者新建文件夹,进入文件夹执行命令

```shell
$ hexo init 
$ npm install
```

这样Hexo就安装完成,并已经生成好了一个网站模板

## 1.4 目录结构

新建完成后，文件夹的目录如下：

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### _config.yml

网站的 [配置](https://hexo.io/zh-cn/docs/configuration) 信息，您可以在此配置大部分的参数。

### source

资源文件夹是存放用户资源的地方。除 `_posts` 文件夹之外，开头命名为 `_` (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 `public` 文件夹，而其他文件会被拷贝过去。

```
package.json{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": ""
  },
  "dependencies": {
    "hexo": "^3.8.0",
    "hexo-generator-archive": "^0.1.5",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.3.1",
    "hexo-renderer-stylus": "^0.3.3",
    "hexo-renderer-marked": "^0.3.2",
    "hexo-server": "^0.3.3"
  }
}
```



---

# 2. Fluid

## 2.1 简介

一款 Material Design 风格的主题

[Fluid官方仓库](https://github.com/fluid-dev/hexo-theme-fluid)

## 2.2 安装

通过 npm 直接安装

进入博客目录执行命令：

```shell
npm install --save hexo-theme-fluid
```

然后在博客目录下创建 `_config.fluid.yml`,这是Fluid主题的配置文件

全部的配置项如下

```yml
#---------------------------
# Hexo Theme Fluid
# Author: Fluid-dev
# Github: https://github.com/fluid-dev/hexo-theme-fluid
#
# 配置指南: https://hexo.fluid-dev.com/docs/guide/
# 你可以从指南中获得更详细的说明
#
# Guide: https://hexo.fluid-dev.com/docs/en/guide/
# You can get more detailed help from the guide
#---------------------------


#---------------------------
# 全局
# Global
#---------------------------

# 用于浏览器标签的图标
# Icon for browser tab
favicon: /img/fluid.png

# 用于苹果设备的图标
# Icon for Apple touch
apple_touch_icon: /img/fluid.png

# 浏览器标签页中的标题分隔符，效果： 文章名 - 站点名
# Title separator in browser tab, eg: article - site
tab_title_separator: " - "

# 强制所有链接升级为 HTTPS（适用于图片等资源出现 HTTP 混入报错）
# Force all links to be HTTPS (applicable to HTTP mixed error)
force_https: false

# 代码块的增强配置
# Enhancements to code blocks
code:
  # 是否开启复制代码的按钮
  # Enable copy code button
  copy_btn: true

  # 代码语言
  # Code language
  language:
    enable: true
    default: "TEXT"

  # 代码高亮
  # Code highlight
  highlight:
    enable: true

    # 代码块是否显示行号
    # If true, the code block display line numbers
    line_number: true

    # 实现高亮的库，对应下面的设置
    # Highlight library
    # Options: highlightjs | prismjs
    lib: "highlightjs"

    highlightjs:
      # 在链接中挑选 style 填入
      # Select a style in the link
      # See: https://highlightjs.org/static/demo/
      style: "github gist"
      style_dark: "dark"

    prismjs:
      # 在下方链接页面右侧的圆形按钮挑选 style 填入，也可以直接填入 css 链接
      # Select the style button on the right side of the link page, you can also set the CSS link
      # See: https://prismjs.com/
      style: "default"
      style_dark: "tomorrow night"

      # 设为 true 高亮将本地静态生成（但只支持部分 prismjs 插件），设为 false 高亮将在浏览器通过 js 生成
      # If true, it will be generated locally (but some prismjs plugins are not supported). If false, it will be generated via JS in the browser
      preprocess: true

# 一些好玩的功能
# Some fun features
fun_features:
  # 为 subtitle 添加打字机效果
  # Typing animation for subtitle
  typing:
    enable: true

    # 打印速度，数字越大越慢
    # Typing speed, the larger the number, the slower
    typeSpeed: 70

    # 游标字符
    # Cursor character
    cursorChar: "_"

    # 是否循环播放效果
    # If true, loop animation
    loop: false

    # 在指定页面开启，不填则在所有页面开启
    # Enable in specified page, all pages by default
    # Options: home | post | tag | category | about | links | page | 404
    scope: []

  # 为文章内容中的标题添加锚图标
  # Add an anchor icon to the title on the post page
  anchorjs:
    enable: true
    element: h1,h2,h3,h4,h5,h6
    # Options: left | right
    placement: left
    # Options: hover | always | touch
    visible: hover
    # Options: § | # | ❡
    icon: ""

  # 加载进度条
  # Progress bar when loading
  progressbar:
    enable: true
    height_px: 3
    color: "#29d"
    # See: https://github.com/rstacruz/nprogress
    options: { showSpinner: false, trickleSpeed: 100 }

# 主题暗色模式，开启后菜单中会出现切换按钮，用户浏览器会存储切换选项，并且会遵循 prefers-color-scheme 自动切换
# Theme dark mode. If enable, a switch button will appear on the menu, each of the visitor's browser will store his switch option
dark_mode:
  enable: true
  # 默认的选项（当用户手动切换后则不再按照默认模式），选择 `auto` 会优先遵循 prefers-color-scheme，其次按用户本地时间 18 点到次日 6 点之间进入暗色模式
  # Default option (when the visitor switches manually, the default mode is no longer followed), choosing `auto` will give priority to prefers-color-scheme, and then enter the dark mode from 18:00 to 6:00 in the visitor’s local time
  # Options: auto | light | dark
  default: auto

# 主题颜色配置，其他不生效的地方请使用自定义 css 解决，配色可以在下方链接中获得启发
# Theme color, please use custom CSS to solve other colors, color schema can be inspired by the links below
# See: https://www.webdesignrankings.com/resources/lolcolors/
color:
  # body 背景色
  # Color of body background
  body_bg_color: "#eee"
  # 暗色模式下的 body 背景色，下同
  # Color in dark mode, the same below
  body_bg_color_dark: "#181c27"

  # 顶部菜单背景色
  # Color of navigation bar background
  navbar_bg_color: "#2f4154"
  navbar_bg_color_dark: "#1f3144"

  # 顶部菜单字体色
  # Color of navigation bar text
  navbar_text_color: "#fff"
  navbar_text_color_dark: "#d0d0d0"

  # 副标题字体色
  # Color of navigation bar text
  subtitle_color: "#fff"
  subtitle_color_dark: "#d0d0d0"

  # 全局字体色
  # Color of global text
  text_color: "#3c4858"
  text_color_dark: "#c4c6c9"

  # 全局次级字体色（摘要、简介等位置）
  # Color of global secondary text (excerpt, introduction, etc.)
  sec_text_color: "#718096"
  sec_text_color_dark: "#a7a9ad"

  # 主面板背景色
  # Color of main board
  board_color: "#fff"
  board_color_dark: "#252d38"

  # 文章正文字体色
  # Color of post text
  post_text_color: "#2c3e50"
  post_text_color_dark: "#c4c6c9"

  # 文章正文字体色（h1 h2 h3...）
  # Color of Article heading (h1 h2 h3...)
  post_heading_color: "#1a202c"
  post_heading_color_dark: "#c4c6c9"

  # 文章超链接字体色
  # Color of post link
  post_link_color: "#0366d6"
  post_link_color_dark: "#1589e9"

  # 超链接悬浮时字体色
  # Color of link when hovering
  link_hover_color: "#30a9de"
  link_hover_color_dark: "#30a9de"

  # 超链接悬浮背景色
  # Color of link background when hovering
  link_hover_bg_color: "#f8f9fa"
  link_hover_bg_color_dark: "#364151"

  # 分隔线和表格边线的颜色
  # Color of horizontal rule and table border
  line_color: "#eaecef"
  line_color_dark: "#435266"

  # 滚动条颜色
  # Color of scrollbar
  scrollbar_color: "#c4c6c9"
  scrollbar_color_dark: "#687582"
  # 滚动条悬浮颜色
  # Color of scrollbar when hovering
  scrollbar_hover_color: "#a6a6a6"
  scrollbar_hover_color_dark: "#9da8b3"

  # 按钮背景色
  # Color of button
  button_bg_color: "transparent"
  button_bg_color_dark: "transparent"
  # 按钮悬浮背景色
  # Color of button when hovering
  button_hover_bg_color: "#f2f3f5"
  button_hover_bg_color_dark: "#46647e"

# 主题字体配置
# Font
font:
  font_size: 16px
  font_family:
  letter_spacing: 0.02em
  code_font_size: 85%

# 指定自定义 .js 文件路径，支持列表；路径是相对 source 目录，如 /js/custom.js 对应存放目录 source/js/custom.js
# Specify the path of your custom js file, support list. The path is relative to the source directory, such as `/js/custom.js` corresponding to the directory `source/js/custom.js`
custom_js:

# 指定自定义 .css 文件路径，用法和 custom_js 相同
# The usage is the same as custom_js
custom_css:

# 网页访问统计
# Analysis of website visitors
web_analytics:  # 网页访问统计
  enable: false

  # 遵循访客浏览器"请勿追踪"的设置，如果开启则不统计其访问
  # Follow the "Do Not Track" setting of the visitor's browser
  # See: https://www.w3.org/TR/tracking-dnt/
  follow_dnt: true

  # 百度统计的 Key，值需要获取下方链接中 `hm.js?` 后边的字符串
  # Baidu analytics, get the string behind `hm.js?`
  # See: https://tongji.baidu.com/sc-web/10000033910/home/site/getjs?siteId=13751376
  baidu:

  # Google 统计的 Tracking ID
  # Google analytics, set Tracking ID
  # See: https://developers.google.com/analytics/devguides/collection/analyticsjs
  google:

  # Google gtag.js 的媒体资源 ID
  # Google gtag.js GA_MEASUREMENT_ID
  # See: https://developers.google.com/analytics/devguides/collection/gtagjs/
  gtag:

  # 腾讯统计的 H5 App ID，开启高级功能才有cid
  # Tencent analytics, set APP ID
  # See: https://mta.qq.com/h5/manage/ctr_app_manage
  tencent:
    sid:
    cid:

  # 51.la 站点统计 ID
  # 51.la analytics
  # See: https://www.51.la/user/site/index
  woyaola:  # 51.la 站点统计 ID，参见

  # 友盟/cnzz 站点统计 web_id
  # cnzz analytics
  # See: https://web.umeng.com/main.php?c=site&a=show
  cnzz:

  # LeanCloud 计数统计，可用于 PV UV 展示，如果 `web_analytics: enable` 没有开启，PV UV 展示只会查询不会增加
  # LeanCloud count statistics, which can be used for PV UV display. If `web_analytics: enable` is false, PV UV display will only query and not increase
  leancloud:
    app_id:
    app_key:
    # REST API 服务器地址，国际版不填
    # Only the Chinese mainland users need to set
    server_url:
    # 统计页面时获取路径的属性
    # Get the attribute of the page path during statistics
    path: window.location.pathname
    # 开启后不统计本地路径( localhost 与 127.0.0.1 )
    # If true, ignore localhost & 127.0.0.1
    ignore_local: false

# 对页面中的图片和评论插件进行懒加载处理，可见范围外的元素不会提前加载
# Lazy loading of images and comment plugin on the page
lazyload:
  enable: true

  # 加载时的占位图片
  # The placeholder image when loading
  loading_img: /img/loading.gif

  # 开启后懒加载仅在文章页生效，如果自定义页面需要使用，可以在 Front-matter 里指定 `lazyload: true`
  # If true, only enable lazyload on the post page. For custom pages, you can set 'lazyload: true' in front-matter
  onlypost: false

  # 触发加载的偏移倍数，基数是视窗高度，可根据部署环境的请求速度调节
  # The factor of viewport height that triggers loading
  offset_factor: 2

# 图标库，包含了大量社交类图标，主题依赖的不包含在内，因此可自行修改，详见 https://hexo.fluid-dev.com/docs/icon/
# Icon library, which includes many social icons, does not include those theme dependent, so your can modify link by yourself. See: https://hexo.fluid-dev.com/docs/en/icon/
iconfont: //at.alicdn.com/t/font_1736178_lbnruvf0jn.css


#---------------------------
# 页头
# Header
#---------------------------

# 导航栏的相关配置
# Navigation bar
navbar:
  # 导航栏左侧的标题，为空则按 hexo config 中 `title` 显示
  # The title on the left side of the navigation bar. If empty, it is based on `title` in hexo config
  blog_title: "Fluid"

  # 导航栏毛玻璃特效，实验性功能，可能会造成页面滚动掉帧和抖动，部分浏览器不支持会自动不生效
  # Navigation bar frosted glass special animation. It is an experimental feature
  ground_glass:
    enable: false

    # 模糊像素，只能为数字，数字越大模糊度越高
    # Number of blurred pixel. the larger the number, the higher the blur
    px: 3

    # 不透明度，数字越大透明度越低，注意透明过度可能看不清菜单字体
    # Ratio of opacity, 1.0 is completely opaque
    # available: 0 - 1.0
    alpha: 0.7

  # 导航栏菜单，可自行增减，key 用来关联 languages/*.yml，如不存在关联则显示 key 本身的值；icon 是 css class，可以省略；增加 name 可以强制显示指定名称
  # Navigation bar menu. `key` is used to associate languages/*.yml. If there is no association, the value of `key` itself will be displayed; if `icon` is a css class, it can be omitted; adding `name` can force the display of the specified name
  menu:
    - { key: "home", link: "/", icon: "iconfont icon-home-fill" }
    - { key: "archive", link: "/archives/", icon: "iconfont icon-archive-fill" }
    - { key: "category", link: "/categories/", icon: "iconfont icon-category-fill" }
    - { key: "tag", link: "/tags/", icon: "iconfont icon-tags-fill" }
    - { key: "about", link: "/about/", icon: "iconfont icon-user-fill" }
    #- { key: "links", link: "/links/", icon: "iconfont icon-link-fill" }

# 搜索功能，基于 hexo-generator-search 插件，若已安装其他搜索插件请关闭此功能，以避免生成多余的索引文件
# Search feature, based on hexo-generator-search. If you have installed other search plugins, please disable this feature to avoid generating redundant index files
search:
  enable: true

  # 搜索索引文件的路径，可以是相对路径或外站的绝对路径
  # Path for search index file, it can be a relative path or an absolute path
  path: /local-search.xml

  # 文件生成在本地的位置，必须是相对路径
  # The location where the index file is generated locally, it must be a relative location
  generate_path: /local-search.xml

  # 搜索的范围
  # Search field
  # Options: post | page | all
  field: post

  # 搜索是否扫描正文
  # If true, search will scan the post content
  content: true

# 首屏图片的相关配置
# Config of the big image on the first screen
banner:
  # 视差滚动，图片与板块会随着屏幕滚动产生视差效果
  # Scrolling parallax
  parallax: true

  # 图片最小的宽高比，以免图片两边被过度裁剪，适用于移动端竖屏时，如需关闭设为 0
  # Minimum ratio of width to height, applicable to the vertical screen of mobile device, if you need to close it, set it to 0
  width_height_ratio: 1.0

# 向下滚动的箭头
# Scroll down arrow
scroll_down_arrow:
  enable: true

  # 头图高度不小于指定比例，才显示箭头
  # Only the height of the banner image is greater than the ratio, the arrow is displayed
  # Available: 0 - 100
  banner_height_limit: 80

  # 翻页后自动滚动
  # Auto scroll after page turning
  scroll_after_turning_page: true

# 向顶部滚动的箭头
# Scroll top arrow
scroll_top_arrow:
  enable: true

# Open Graph metadata
# See: https://hexo.io/docs/helpers.html#open-graph
open_graph:
  enable: true
  twitter_card: summary_large_image
  twitter_id:
  twitter_site:
  google_plus:
  fb_admins:
  fb_app_id:


#---------------------------
# 页脚
# Footer
#---------------------------
footer:
  # 页脚第一行文字的 HTML，建议保留 Fluid 的链接，用于向更多人推广本主题
  # HTML of the first line of the footer, it is recommended to keep the Fluid link to promote this theme to more people
  content: '
    <a href="https://hexo.io" target="_blank" rel="nofollow noopener"><span>Hexo</span></a>
    <i class="iconfont icon-love"></i>
    <a href="https://github.com/fluid-dev/hexo-theme-fluid" target="_blank" rel="nofollow noopener"><span>Fluid</span></a>
  '

  # 展示网站的 PV、UV 统计数
  # Display website PV and UV statistics
  statistics:
    enable: false

    # 统计数据来源，使用 leancloud 需要设置 `web_analytics: leancloud` 中的参数；使用 busuanzi 不需要额外设置，但是有时不稳定，另外本地运行时 busuanzi 显示统计数据很大属于正常现象，部署后会正常
    # Data source. If use leancloud, you need to set the parameter in `web_analytics: leancloud`
    # Options: busuanzi | leancloud
    source: "busuanzi"

  # 国内大陆服务器的备案信息
  # For Chinese mainland website policy, other areas keep disable
  beian:
    enable: false
    # ICP证号
    icp_text: 京ICP证123456号
    # 公安备案号，不填则只显示ICP
    police_text: 京公网安备12345678号
    # 公安备案的编号，用于URL跳转查询
    police_code: 12345678
    # 公安备案的图片. 为空时不显示备案图片
    police_icon: /img/police_beian.png


#---------------------------
# 首页
# Home Page
#---------------------------
index:
  # 首页 Banner 头图，可以是相对路径或绝对路径，以下相同
  # Path of Banner image, can be a relative path or an absolute path, the same on other pages
  banner_img: /img/image404.png

  # 头图高度，屏幕百分比
  # Height ratio of banner image
  # Available: 0 - 100
  banner_img_height: 100

  # 头图黑色蒙版的不透明度，available: 0 - 1.0， 1 是完全不透明
  # Opacity of the banner mask, 1.0 is completely opaque
  # Available: 0 - 1.0
  banner_mask_alpha: 0.3

  # 首页副标题的独立设置
  # Independent config of home page subtitle
  slogan:
    enable: true

    # 为空则按 hexo config.subtitle 显示
    # If empty, text based on `subtitle` in hexo config
    text: "An elegant Material-Design theme for Hexo"

    # 通过 API 接口作为首页副标题的内容，必须返回的是 JSON 格式，如果请求失败则按 text 字段显示，该功能必须先开启 typing 打字机功能
    # Subtitle of the homepage through the API, must be returned a JSON. If the request fails, it will be displayed in `text` value. This feature must first enable the typing animation
    api:
      enable: false

      # 请求地址
      # Request url
      url: ""

      # 请求方法
      # Request method
      # Available: GET | POST | PUT
      method: "GET"

      # 请求头
      # Request headers
      headers: {}

      # 从请求结果获取字符串的取值字段，最终必须是一个字符串，例如返回结果为 {"data": {"author": "fluid", "content": "An elegant theme"}}, 则取值字段为 ['data', 'content']；如果返回是列表则自动选择第一项
      # The value field of the string obtained from the response. For example, the response content is {"data": {"author": "fluid", "content": "An elegant theme"}}, the expected `keys: ['data','content']`; if the return is a list, the first item is automatically selected
      keys: []

  # 自动截取文章摘要
  # Auto extract post
  auto_excerpt:
    enable: true

  # 打开文章的标签方式
  # The browser tag to open the post
  # Available: _blank | _self
  post_url_target: _self

  # 是否显示文章信息（时间、分类、标签）
  # Meta information of post
  post_meta:
    date: true
    category: true
    tag: true

  # 文章通过 sticky 排序后，在首页文章标题前显示图标
  # If the posts are sorted by `sticky`, an icon is displayed in front of the post title
  post_sticky:
    enable: true
    icon: "iconfont icon-top"


#---------------------------
# 文章页
# Post Page
#---------------------------
post:
  banner_img: /img/image404.png
  banner_img_height: 70
  banner_mask_alpha: 0.3

  # 文章在首页的默认封面图，当没有指定 index_img 时会使用该图片，若两者都为空则不显示任何图片
  # Path of the default post cover when `index_img` is not set. If both are empty, no image will be displayed
  default_index_img:

  # 文章标题下方的元信息
  # Meta information below title
  meta:
    # 作者，优先根据 front-matter 里 author 字段，其次是 hexo 配置中 author 值
    # Author, based on `author` field in front-matter, if not set, based on `author` value in hexo config
    author:
      enable: false

    # 文章日期，优先根据 front-matter 里 date 字段，其次是 md 文件日期
    # Post date, based on `date` field in front-matter, if not set, based on create date of .md file
    date:
      enable: true
      # 格式参照 ISO-8601 日期格式化
      # ISO-8601 date format
      # See: http://momentjs.cn/docs/#/parsing/string-format/
      format: "LL a"

    # 字数统计
    # Word count
    wordcount:
      enable: true

    # 估计阅读全文需要的时长
    # Estimated reading time
    min2read:
      enable: true
      # 每个字词的长度，建议：中文≈2，英文≈5，中英混合可自行调节
      # Average word length (chars count in word), ZH ≈ 2, EN ≈ 5
      awl: 2
      # 每分钟阅读字数，如果大部分是技术文章可适度调低
      # Words per minute
      wpm: 60

    # 浏览量计数
    # Number of visits
    views:
      enable: false
      # 统计数据来源
      # Data Source
      # Options: busuanzi | leancloud
      source: "busuanzi"

  # 在文章开头显示文章更新时间，该时间默认是 md 文件更新时间，可通过 front-matter 中 `updated` 手动指定（和 date 一样格式）
  # Update date is displayed at the beginning of the post. The default date is the update date of the md file, which can be manually specified by `updated` in front-matter (same format as date)
  updated:
    enable: false

    # 格式参照 ISO-8601 日期格式化
    # ISO-8601 date format
    # See: http://momentjs.cn/docs/#/parsing/string-format/
    date_format: "LL a"

    # 是否使用相对时间表示，比如："3 天前"
    # If true, it will be a relative time, such as: "3 days ago"
    relative: false

    # 提示标签类型
    # Note class
    # Options: default | primary | info | success | warning | danger | light
    note_class: info

  # 侧边栏展示当前分类下的文章
  # Sidebar of category
  category_bar:
    enable: true

    # 开启后，只有在文章 Front-matter 里指定 `category_bar: true` 才会展示分类，也可以通过 `category_bar: ["分类A"]` 来指定分类
    # If true, only set `category_bar: true` in Front-matter will enable sidebar of category, also set `category_bar: ["CategoryA"]` to specify categories
    specific: true

    # 置于板块的左侧或右侧
    # place in the board
    # Options: left | right
    placement: left

    # 文章的排序字段，前面带减号是倒序，不带减号是正序
    # Sort field for posts, with a minus sign is reverse order
    # Options: date | title | or other field of front-matter
    post_order_by: "title"

    # 单个分类中折叠展示文章数的最大值，超过限制会显示 More，0 则不限制
    # The maximum number of posts in a single category. If the limit is exceeded, it will be displayed More. If 0 no limit
    post_limit: 0

  # 侧边栏展示文章目录
  # Table of contents (TOC) in the sidebar
  toc:
    enable: true

    # 置于板块的左侧或右侧
    # place in the board
    # Options: left | right
    placement: right

    # 目录会选择这些节点作为标题
    # TOC will select these nodes as headings
    headingSelector: "h1,h2,h3,h4,h5,h6"

    # 层级的折叠深度，0 是全部折叠，大于 0 后如果存在下级标题则默认展开
    # Collapse depth. If 0, all headings collapsed. If greater than 0, it will be expanded by default if there are sub headings
    collapseDepth: 0

  # 版权声明，会显示在每篇文章的结尾
  # Copyright, will be displayed at the end of each post
  copyright:
    enable: true

    # CreativeCommons license
    # Options: BY | BY-SA | BY-ND | BY-NC | BY-NC-SA | BY-NC-ND
    license: 'BY'

    # 显示作者
    author:
      enable: true

    # 显示发布日期
    # Show post date
    post_date:
      enable: true
      format: "LL"

    # 显示更新日期
    # Show update date
    update_date:
      enable: false
      format: "LL"

  # 文章底部上一篇下一篇功能
  # Link to previous/next post
  prev_next:
    enable: true

  # 文章图片标题
  # Image caption
  image_caption:
    enable: true

  # 文章图片可点击放大
  # Zoom feature of images
  image_zoom:
    enable: true
    # 放大后图片链接替换规则，可用于将压缩图片链接替换为原图片链接，如 ['-slim', ''] 是将链接中 `-slim` 移除；如果想使用正则请使用 `re:` 前缀，如 ['re:\\d{3,4}\\/\\d{3,4}\\/', '']
    # The image url replacement when zooming, the feature can be used to replace the compressed image to the original image, eg: ['-slim', ''] removes `-slim` from the image url when zooming; if you want to use regular, use prefix `re:`, eg: ['re:\\d{3,4}\\/\\d{3,4}\\/','']
    img_url_replace: ['', '']

  # 脚注语法，会在文章底部生成脚注，如果 Markdown 渲染器本身支持，则建议关闭，否则可能会冲突
  # Support footnote syntax, footnotes will be generated at the bottom of the post page. If the Markdown renderer itself supports it, please disable it, otherwise it may conflict
  footnote:
    enable: true
    # 脚注的节标题，也可以在 front-matter 中通过 `footnote: <h2>Reference</h2>` 这种形式修改单独页面的 header
    # The section title of the footnote, you can also modify the header of a single page in the form of `footnote: <h2>Reference</h2>` in front-matter
    header: ''

  # 数学公式，开启之前需要更换 Markdown 渲染器，否则复杂公式会有兼容问题，具体请见：https://hexo.fluid-dev.com/docs/guide/##latex-数学公式
  # Mathematical formula. If enable, you need to change the Markdown renderer, see: https://hexo.fluid-dev.com/docs/en/guide/#math
  math:
    # 开启后文章默认可用，自定义页面如需使用，需在 Front-matter 中指定 `math: true`
    # If you want to use math on the custom page, you need to set `math: true` in Front-matter
    enable: false

    # 开启后，只有在文章 Front-matter 里指定 `math: true` 才会在文章页启动公式转换，以便在页面不包含公式时提高加载速度
    # If true, only set `math: true` in Front-matter will enable math, to load faster when the page does not contain math
    specific: false

    # Options: mathjax | katex
    engine: mathjax

  # 流程图，基于 mermaid-js，具体请见：https://hexo.fluid-dev.com/docs/guide/#mermaid-流程图
  # Flow chart, based on mermaid-js, see: https://hexo.fluid-dev.com/docs/en/guide/#mermaid
  mermaid:
    # 开启后文章默认可用，自定义页面如需使用，需在 Front-matter 中指定 `mermaid: true`
    # If you want to use mermaid on the custom page, you need to set `mermaid: true` in Front-matter
    enable: false

    # 开启后，只有在文章 Front-matter 里指定 `mermaid: true` 才会在文章页启动公式转换，以便在页面不包含公式时提高加载速度
    # If true, only set `mermaid: true` in Front-matter will enable mermaid, to load faster when the page does not contain mermaid
    specific: false

    # See: http://mermaid-js.github.io/mermaid/
    options: { theme: 'default' }

  # 评论插件
  # Comment plugin
  comments:
    enable: false
    # 指定的插件，需要同时设置对应插件的必要参数
    # The specified plugin needs to set the necessary parameters at the same time
    # Options: utterances | disqus | gitalk | valine | waline | changyan | livere | remark42 | twikoo | cusdis | giscus
    type: disqus


#---------------------------
# 评论插件
# Comment plugins
#
# 开启评论需要先设置上方 `post: comments: enable: true`，然后根据 `type` 设置下方对应的评论插件参数
# Enable comments need to be set `post: comments: enable: true`, then set the corresponding comment plugin parameters below according to `type`
#---------------------------

# Utterances
# 基于 GitHub Issues
# Based on GitHub Issues
# See: https://utteranc.es
utterances:
  repo:
  issue_term: pathname
  label: utterances
  theme: github-light
  theme_dark: github-dark

# Disqus
# 基于第三方的服务，国内用户直接使用容易被墙，建议配合 Disqusjs
# Based on third-party service
# See: https://disqus.com
disqus:
  shortname:
  # 以下为 Disqusjs 支持, 国内用户如果想使用 Disqus 建议配合使用
  # The following are Disqusjs configurations, please ignore if DisqusJS is not required
  # See: https://github.com/SukkaW/DisqusJS
  disqusjs: false
  apikey:

# Gitalk
# 基于 GitHub Issues
# Based on GitHub Issues
# See: https://github.com/gitalk/gitalk#options
gitalk:
  clientID:
  clientSecret:
  repo:
  owner:
  admin: ['name']
  language: zh-CN
  labels: ['Gitalk']
  perPage: 10
  pagerDirection: last
  distractionFreeMode: false
  createIssueManually: true
  # 默认 proxy 可能会失效，解决方法请见下方链接
  # The default proxy may be invalid, refer to the links for solutions
  # https://github.com/gitalk/gitalk/issues/429
  # https://github.com/Zibri/cloudflare-cors-anywhere
  proxy: https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token

# Valine
# 基于 LeanCloud
# Based on LeanCloud
# See: https://valine.js.org/
valine:
  appId:
  appKey:
  path: window.location.pathname
  placeholder:
  avatar: 'retro'
  meta: ['nick', 'mail', 'link']
  requiredFields: []
  pageSize: 10
  lang: 'zh-CN'
  highlight: false
  recordIP: false
  serverURLs: ''
  emojiCDN:
  emojiMaps:
  enableQQ: false

# Waline
# 从 Valine 衍生而来，额外增加了服务端和多种功能
# Derived from Valine, with self-hosted service and new features
# See: https://waline.js.org/
waline:
  serverURL: ''
  path: window.location.pathname
  meta: ['nick', 'mail', 'link']
  requiredMeta: ['nick']
  lang: 'zh-CN'
  emoji: ['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']
  dark: 'html[data-user-color-scheme="dark"]'
  wordLimit: 0
  pageSize: 10

# 畅言 Changyan
# 基于第三方的服务
# Based on third-party service, insufficient support for regions outside China
# http://changyan.kuaizhan.com
changyan:
  appid: ''
  appkey: ''

# 来必力 Livere
# 基于第三方的服务
# Based on third-party service
# See: https://www.livere.com
livere:
  uid: ''

# Remark42
# 需要自托管服务端
# Based on self-hosted service
# See: https://remark42.com
remark42:
  host:
  site_id:
  max_shown_comments: 10
  locale: zh
  components: ['embed']

# Twikoo
# 基于腾讯云开发
# Based on Tencent CloudBase
# See: https://twikoo.js.org
twikoo:
  envId:
  region: ap-shanghai
  path: window.location.pathname

# Cusdis
# 基于第三方服务或自托管服务
# Based on third-party or self-hosted service
# See https://cusdis.com
cusdis:
  host:
  app_id:
  lang: zh-cn

# Giscus
# 基于 GitHub Discussions，类似于 Utterances
# Based on GitHub Discussions, similar to Utterances
# See: https://giscus.app/
giscus:
  repo:
  repo-id:
  category:
  category-id:
  theme-light: light
  theme-dark: dark
  mapping: pathname
  reactions-enabled: 1
  emit-metadata: 0
  input-position: top
  lang: zh-CN

#---------------------------
# 归档页
# Archive Page
#---------------------------
archive:
  banner_img: /img/image404.png
  banner_img_height: 60
  banner_mask_alpha: 0.3


#---------------------------
# 分类页
# Category Page
#---------------------------
category:
  enable: true
  banner_img: /img/image404.png
  banner_img_height: 60
  banner_mask_alpha: 0.3

  # 分类的排序字段，前面带减号是倒序，不带减号是正序
  # Sort field for categories, with a minus sign is reverse order
  # Options: length | name
  order_by: "-length"

  # 层级的折叠深度，0 是全部折叠，大于 0 后如果存在子分类则默认展开
  # Collapse depth. If 0, all posts collapsed. If greater than 0, it will be expanded by default if there are subcategories
  collapse_depth: 0

  # 文章的排序字段，前面带减号是倒序，不带减号是正序
  # Sort field for posts, with a minus sign is reverse order
  # Options: date | title | or other field of front-matter
  post_order_by: "-date"

  # 单个分类中折叠展示文章数的最大值，超过限制会显示 More，0 则不限制
  # The maximum number of posts in a single category. If the limit is exceeded, it will be displayed More. If 0 no limit
  post_limit: 10


#---------------------------
# 标签页
# Tag Page
#---------------------------
tag:
  enable: true
  banner_img: /img/image404.png
  banner_img_height: 80
  banner_mask_alpha: 0.3
  tagcloud:
    min_font: 15
    max_font: 30
    unit: px
    start_color: "#BBBBEE"
    end_color: "#337ab7"


#---------------------------
# 关于页
# About Page
#---------------------------
about:
  enable: true
  banner_img: /img/image404.png
  banner_img_height: 60
  banner_mask_alpha: 0.3
  avatar: /img/avatar.png
  name: "Fluid"
  intro: "An elegant theme for Hexo"
  # 更多图标可从 https://hexo.fluid-dev.com/docs/icon/ 查找，`class` 代表图标的 css class，添加 `qrcode` 后，图标不再是链接而是悬浮二维码
  # More icons can be found from https://hexo.fluid-dev.com/docs/en/icon/  `class` is the css class of the icon. If adding `qrcode`, The icon is no longer a link, but a hovering QR code
  icons:
    - { class: "iconfont icon-github-fill", link: "https://github.com", tip: "GitHub" }
    - { class: "iconfont icon-douban-fill", link: "https://douban.com", tip: "豆瓣" }
    - { class: "iconfont icon-wechat-fill", qrcode: "/img/favicon.png" }


#---------------------------
# 自定义页
# Custom Page
#
# 通过 hexo new page 命令创建的页面
# Custom Page through `hexo new page`
#---------------------------
page:
  banner_img: /img/image404.png
  banner_img_height: 60
  banner_mask_alpha: 0.3


#---------------------------
# 404页
# 404 Page
#---------------------------
page404:
  enable: true
  banner_img: /img/image404.png
  banner_img_height: 85
  banner_mask_alpha: 0.3
  # 重定向到首页的延迟(毫秒)
  # Delay in redirecting to home page (milliseconds)
  redirect_delay: 5000


#---------------------------
# 友链页
# Links Page
#---------------------------
links:
  enable: true
  banner_img: /img/image404.png
  banner_img_height: 60
  banner_mask_alpha: 0.3
  # 友链的成员项
  # Member item of page
  items:
    - {
      title: "Fluid Blog",
      intro: "主题博客",
      link: "https://hexo.fluid-dev.com/",
      avatar: "/img/favicon.png"
    }
    - {
      title: "Fluid Docs",
      intro: "主题使用指南",
      link: "https://hexo.fluid-dev.com/docs/",
      avatar: "/img/favicon.png"
    }
    - {
      title: "Fluid Repo",
      intro: "主题 GitHub 仓库",
      link: "https://github.com/fluid-dev/hexo-theme-fluid",
      avatar: "/img/favicon.png"
    }

  # 当成员头像加载失败时，替换为指定图片
  # When the member avatar fails to load, replace the specified image
  onerror_avatar: /img/avatar.png

  # 友链下方自定义区域，支持 HTML，可插入例如申请友链的文字
  # Custom content at the bottom of the links
  custom:
    enable: false
    content: '<hr><p>在下方留言申请加入我的友链，按如下格式提供信息：</p><ul><li>博客名：Fluid</li><li>简介：Fluid 主题官方博客</li><li>链接：https://hexo.fluid-dev.com</li><li>图片：https://hexo.fluid-dev.com/img/favicon.png</li></ul>'

  # 评论插件
  # Comment plugin
  comments:
    enable: false
    # 指定的插件，需要同时设置对应插件的必要参数
    # The specified plugin needs to set the necessary parameters at the same time
    # Options: utterances | disqus | gitalk | valine | waline | changyan | livere | remark42 | twikoo | cusdis | giscus
    type: disqus


#---------------------------
# 以下是配置 JS CSS 等静态资源的 URL 前缀，可以自定义成 CDN 地址，
# 如果需要修改，最好使用与默认配置相同的版本，以避免潜在的问题，
# ** 如果你不知道如何设置，请不要做任何改动 **
#
# Here is the url prefix to configure the static assets. Set CDN addresses you want to customize.
# Be aware that you would better use the same version as default ones to avoid potential problems.
# DO NOT EDIT THE FOLLOWING SETTINGS UNLESS YOU KNOW WHAT YOU ARE DOING
#---------------------------

static_prefix:
  # 内部静态
  # Internal static
  internal_js: /js
  internal_css: /css
  internal_img: /img

  anchor: https://lib.baomitu.com/anchor-js/4.3.1/

  github_markdown: https://lib.baomitu.com/github-markdown-css/4.0.0/

  jquery: https://lib.baomitu.com/jquery/3.6.0/

  bootstrap: https://lib.baomitu.com/twitter-bootstrap/4.6.1/

  prismjs: https://lib.baomitu.com/prism/1.27.0/

  tocbot: https://lib.baomitu.com/tocbot/4.18.2/

  typed: https://lib.baomitu.com/typed.js/2.0.12/

  fancybox: https://lib.baomitu.com/fancybox/3.5.7/

  nprogress: https://lib.baomitu.com/nprogress/0.2.0/

  mathjax: https://lib.baomitu.com/mathjax/3.2.1/

  katex: https://lib.baomitu.com/KaTeX/0.15.6/

  busuanzi: https://busuanzi.ibruce.info/busuanzi/2.3/

  clipboard: https://lib.baomitu.com/clipboard.js/2.0.10/

  mermaid: https://lib.baomitu.com/mermaid/8.14.0/

  valine: https://lib.baomitu.com/valine/1.4.17/

  waline: https://lib.baomitu.com/waline/2.5.1/

  gitalk: https://lib.baomitu.com/gitalk/1.7.2/

  disqusjs: https://lib.baomitu.com/disqusjs/1.3.0/

  twikoo: https://lib.baomitu.com/twikoo/1.5.11/

  hint: https://lib.baomitu.com/hint.css/2.7.0/
```

## 2.3 指定主题

修改 Hexo 博客目录中的 `_config.yml`：

```shell
theme: fluid  # 指定主题

language: zh-CN  # 指定语言，会影响主题显示的语言，按需修改
```

## 2.4 创建「关于页」

首次使用主题的「关于页」需要手动创建：

```shell
hexo new page about
```



---

# 3. 常用命令

## 3.1 hexo server 启动Hexo服务

```shell
hexo server
```

## 3.2 hexo new 新建文章

```shell
$ hexo new post 文件名
```

执行成功后会在source/_posts目录下生成`文件名.md`文件,内容如下所示

```md
---
title: 文章题目
date: 2022-08-26 10:17:20
tags: [标签1,标签2]
categories: 分类
---
文章描述
<!--more-->
正文内容
```

## 3.3 hexo g 打包

```shell
hexo g
```

执行完成后会生成public文件夹,可以将此文件夹内容部署在nginx服务器上,实现网站的部署