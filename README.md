# 团队代码规范标准

## commit 规范

**commitlint** 可以帮助你的团队使用统一的 commit 规范。

### 使用

#### install
```shell
npm install @commitlint/{cli,config-conventional} -D
```

在 **git commit** 提交时进行 **commit** 检查是否规范，因此需要对 **commit** 进行拦截，只有符合相应的格式才能提交代码。社区中可以通过 **Husky** 来完成这件事情。

#### Install husky
```shell
# Install
npm install husky --save-dev

# Activate hooks
npx husky install
```

#### Add hook
```shell
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

#### 当前根目录下新建 commitlint.config.js

```JS
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
```

我们一般直接使用 **@commitlint/config-conventional** 提供的规范即可，它所规定的 commit 信息格式一般如下：

```shell
git commit -m <type>[optional scope]: <description>
```

**常用 type 类别**

type：用于表明这次提交代码的改动类型，常用的类型如下：

- feat：新增功能
- fix：bug 修复
- docs：文档更新
- style：不影响程序逻辑更改（例如格式化，分号不全等）
- refactor：代码重构（既不新增功能也不是 bug 修复）
- perf：性能优化
- test：新增测试用例或更改已有测试用例
- build：影响构建系统或外部依赖关系的更改（例如gulp、webpack、npm等）
- ci：CI 配置文件与脚本的修改（例如：Travis、Circle等）
- chore：不涉及到修改 src 文件或测试文件的其他更改
- revert：回退到之前的commit提交记录

**optional scope**

一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块的改动。

**description**

用于描述此次提交的内容。


**示例**
```shell
git commit -m 'feat(xx模块): 增加 xx 功能'
```



## 参考资料

1. https://commitlint.js.org/#/






# vite 相关

1. GLob 模式
2. 预构建

## 依赖预构建

1. 将其他格式（如CommonJS、UMD）的产物转化为 ESM 格式，使得其在浏览器中通过 <script type="module"><script> 的方式正常加载。

2. 打包第三方库代码，将各个第三方库代码的文件合并到一起，减 HTTP 请求数量，避免页面加载性能劣化。


而这两件事情全部由性能优异的 **Esbuild** (基于 Golang 开发)完成，而不是传统的 Webpack/Rollup，所以也不会有明显的打包性能问题，反而是 Vite 项目启动飞快(秒级启动)的一个核心原因。



## JSON 文件加载


# Vite


## 为什么选择 Vite ？

当冷启动开发服务器时，基于打包器的方式启动必须构建整个应用，然后才能提供服务。Vite 通过在一开始将应用中的模块区分为 **依赖** 和 **源码** 两类，改进开发服务器启动时间。

- **依赖** 大多为在开发时不会变动的纯 JS。一些较大的依赖（例如有上百个模块的组件库）处理的代价很高。依赖通常会存在多种模块化格式（例如 CommonJS 或者 ESM）。

Vite 将会使用 esbuild 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

- **源码**

通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。

Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。


## 总览

Vite 主要有两部分组成：

- 一个开发服务器，它基于 **原生 ES 模块** 提供了 *丰富的内建功能*，如速度快到惊人的**模块热更新**。

- 一套构建指令，它使用 **Rollup** 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite 意在提供开箱即用的配置，同时它的 **插件 API** 和 **JavaScript API**带来了高度的可扩展性，并有完整的类型支持。


## 浏览器支持

默认的构建目标是能支持 **原生 ESM 语法的 script 标签**、**原生 ESM 动态导入** 和 **import.meta** 的浏览器。传统浏览器可以通过官方插件 **@vitejs/plugin-legacy** 支持 —— 查看 **构建生产版本**章节获取更多细节。

**import.meta 用于表示这个模块的元数据信息，它会返回一个带有 url 属性的对象，指明当前这个模块的基本 URL。**


## 命令行界面

在安装了 Vite 的项目中，可以在 npm scripts 中使用 vite 可执行文件，或者直接使用 `npx vite` 运行它。下面是通过脚手架创建的 Vite 项目中默认的 npm scripts：


```JSON
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产环境的构建产物
  }
}
```


## NPM 依赖解析和预构建（重要）

1. 预构建可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。

2. 重写导入为合法的 URL，例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。

### 依赖是强缓存的

Vite 通过 HTTP 头来缓存请求得到的依赖，所以如果你想要编辑或调试一个依赖，请按照 这里 的步骤操作。


## TS（重点注意：仅执行时转译）

Vite 支持引入 **.ts** 文件。

### 仅执行转译



## 客户端类型（重要）

```TS
// xx.d.ts 文件
/// <reference types="vite/client" />
```

**上述指令用于引入 Vite 客户端类型声明。这将会提供以下类型定义补充：**

- 资源导入(例如：导入一个 `.svg` 文件)
- `import.meta.env` 上 Vite 注入的环境变量的类型定义
- `import.meta.hot` 上的 `HMR API` 类型定义



## CSS（重要）

通过 `.css` 文件将会把内容插入到 <style> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。例如：


```JS
import styles from './styles.css';

console.log(styles); // 输出处理后的CSS字符串

// 在代码中使用CSS字符串
const element = document.createElement('div');
element.className = styles.myClass;
document.body.appendChild(element);
```

### @import 内联和变基（重要）

Vite 通过 `postcss-import` 预配置支持了 CSS `@import` 内联，Vite 的路径别名也遵从 CSS `@import` 。换句话说，所有 CSS `url()` 引用，即使导入的文件在不同的目录中，也总是自动变基，以确保正确性。

Sass 和 Less 文件也支持 `@import` 别名和 URL 变基（具体请参阅 CSS Pre-processors）。


1. `@import` 内联是指将 `@import` 规则中引入的外部样式表文件内容内联到主样式表中。这种方式可以减少对外部资源的请求次数，提高加载速度。当 Vite 检测到 CSS 中的 `@import` 规则时，会自动将被引入的外部样式表文件内容内联到当前样式表中。

2. 变基（Rebasing）：变基是指将样式表中的 URL 路径进行重定向，使其基于当前页面的路径。在开发环境中，Vite 在检测到样式表的 URL 路径时，会将其重定向到开发服务器上对应的路径。在生产环境中，Vite 会根据构建配置将样式表中的 URL 路径进行重定向，使其基于生产环境部署的路径。


### PostCSS

同 postcss 配置。


### CSS Modules

任何以 `.module.css` 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：

```CSS
/* example.module.css */
.red {
  color: red;
}
```

```JS
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

CSS modules 行为可以通过 css.modules 选项 进行配置。

如果 css.modules.localsConvention 设置开启了 camelCase 格式变量名转换（例如 localsConvention: 'camelCaseOnly'），你还可以使用按名导入。

```JS
// .apply-color -> applyColor
import { applyColor } from './example.module.css'
document.getElementById('foo').className = applyColor
```

### CSS 预处理器（重要）


由于 Vite 的目标仅为现代浏览器，因此建议使用原生 CSS 变量和实现 CSSWG 草案的 PostCSS 插件（例如 postcss-nesting）来编写简单的、符合未来标准的 CSS。

话虽如此，但 Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖。

***值得注意的是 Vite 为 Sass、Less 改进了 `@import` 解析，保证了 Vite 别名也能被使用。另外，url() 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。***

```Vue
<!-- 下面使用别名也能被正确解析，Vite 做了特殊处理 -->
<style scoped lang="less">
  @import url('@src/components/HelloWorld/style.less');
  .read-the-docs {
    color: #888;
  }
</style>
```

由于 Stylus API 限制，@import 别名和 URL 变基不支持 Stylus。

你还可以通过在文件扩展名前加上 .module 来结合使用 CSS modules 和预处理器，例如 style.module.scss。



### 禁用 CSS 注入页面

自动注入 CSS 内容的行为可以通过 ?inline 参数来关闭。在关闭时，被处理过的 CSS 字符串将会作为该模块的默认导出，但样式并没有被注入到页面中。

```JS
import './foo.css' // 样式将会注入页面
import otherStyles from './bar.css?inline' // 样式不会注入页面
```


## 静态资源处理

## 将资源引入为 URL

导入一个静态资源会返回解析后的 URL：

```JS
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

例如，`imgUrl` 在开发时会是 `/img.png`，在生产构建后会是 `/assets/img.2d8efhg.png`。

行为类似于 Webpack 的 `file-loader`。区别在于导入既可以使用绝对公共路径（基于开发期间的项目根路径），也可以使用相对路径。

- url() 在 CSS 中的引用也以同样的方式处理。

- 如果 Vite 使用了 Vue 插件，Vue SFC 模板中的资源引用都将自动转换为导入。

- 常见的图像、媒体和字体文件类型被自动检测为资源。你可以使用 **assetsInclude 选项** 扩展内部列表。

- 引用的资源作为构建资源图的一部分包括在内，将生成散列文件名，并可以由插件进行处理以进行优化。

- 较小的资源体积小于 **assetsInlineLimit 选项值** 则会被内联为 base64 data URL。

- Git LFS 占位符会自动排除在内联之外，因为它们不包含它们所表示的文件的内容。要获得内联，请确保在构建之前通过 Git LFS 下载文件内容。

- 默认情况下，TypeScript 不会将静态资源导入视为有效的模块。要解决这个问题，需要添加 **vite/client**。




添加一些特殊的查询参数可以更改资源被引入的方式：

```JS
// 显式加载资源为一个 URL
import assetAsURL from './asset.js?url'

// 以字符串形式加载资源
import assetAsString from './shader.glsl?raw'

// 加载为 Web Worker
import Worker from './worker.js?worker'

// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'
```




