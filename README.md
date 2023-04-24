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
  extends: ["@commitlint/config-conventional"],
  rules: {
   //  "type-enum": [
   //    2,
   //    "always",
   //    ["feat", "fix", "docs", "style", "refactor", "test", "revert", "build", "perf"],
   //  ],
  },
};
```

我们一般直接使用 **@commitlint/config-conventional** 提供的规范即可，它所规定的 commit 信息格式一般如下：

```shell

```



## 参考资料

1. https://commitlint.js.org/#/
2. 