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


## NPM 依赖解析和预构建

1. 预构建可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。

2. 重写导入为合法的 URL，例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。

### 依赖是强缓存的

Vite 通过 HTTP 头来缓存请求得到的依赖，所以如果你想要编辑或调试一个依赖，请按照 这里 的步骤操作。


## TS（重点注意：仅执行时转译）

Vite 支持引入 **.ts** 文件。

### 仅执行转译



## 客户端类型

```TS
// xx.d.ts 文件
/// <reference types="vite/client" />
```

**上述指令用于引入 Vite 客户端类型声明。这将会提供以下类型定义补充：**

- 资源导入(例如：导入一个 `.svg` 文件)
- `import.meta.env` 上 Vite 注入的环境变量的类型定义
- `import.meta.hot` 上的 `HMR API` 类型定义



## CSS

通过 `.css` 文件将会把内容插入到 <style> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。


```JS
import styles from './styles.css';

console.log(styles); // 输出处理后的CSS字符串

// 在代码中使用CSS字符串
const element = document.createElement('div');
element.className = styles.myClass;
document.body.appendChild(element);
```

### @import 内联和变基

Vite 通过 `postcss-import` 预配置支持了 CSS `@import` 内联，Vite 的路径别名也遵从 CSS `@import` 。换句话说，所有 CSS `url()` 引用，即使导入的文件在不同的目录中，也总是自动变基，以确保正确性。

Sass 和 Less 文件也支持 `@import` 别名和 URL 变基（具体请参阅 CSS Pre-processors）。


1. `@import` 内联是指将 `@import` 规则中引入的外部样式表文件内容内联到主样式表中。这种方式可以减少对外部资源的请求次数，提高加载速度。当 Vite 检测到 CSS 中的 `@import` 规则时，会自动将被引入的外部样式表文件内容内联到当前样式表中。

2. 变基（Rebasing）：变基是指将样式表中的 URL 路径进行重定向，使其基于当前页面的路径。在开发环境中，Vite 在检测到样式表的 URL 路径时，会将其重定向到开发服务器上对应的路径。在生产环境中，Vite 会根据构建配置将样式表中的 URL 路径进行重定向，使其基于生产环境部署的路径。


### PostCSS

