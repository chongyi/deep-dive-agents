# 深入浅出 Agent（书稿）

一本面向「完全没写过 Agent 的工程师」的书：第一部分从最小的 Agent 循环出发，由浅入深搭建对 Agent 的完整心智模型；第二部分用这套模型剖析 Codex CLI、Claude Code、OpenCode、Gemini CLI、Aider、DeepSeek Harness 等主流开源实现的设计取舍；第三部分延伸到递归自我改进（RSI）——拆解「Agent 改进 Agent」的工程现实、研究前沿与思想叙事。

基于 [mdBook](https://rust-lang.github.io/mdBook/) 编写，目录为 `src/`，构建产物在 `book/`。

## 目录结构

```
.
├── book.toml          # mdBook 配置（含 mermaid 客户端渲染方案）
├── custom.css         # 附加样式（中文字体、图表容器等）
├── mermaid.min.js     # 内置的 mermaid 12.1.0（保证离线可渲染，勿手改）
├── mermaid-loader.js  # 自写的 mermaid 加载脚本（免预处理器方案）
└── src/               # 书稿正文
    ├── SUMMARY.md     # 目录定义（增删章节在此登记）
    ├── README.md      # 前言
    ├── part1/         # 第一部分：深入浅出 Agent
    ├── part2/         # 第二部分：主流开源 Agent 剖析
    ├── part3/         # 第三部分：自我改进的 Agent（RSI）
    └── appendix/      # 附录
```

## 构建与阅读

```bash
mdbook serve --open   # 本地写作预览：http://localhost:3000
mdbook build          # 产出静态站点到 book/，可直接部署
```

依赖：mdBook ≥ 0.5（`cargo install mdbook` 或 `brew install mdbook`）。**不需要** 安装
`mdbook-mermaid` 等预处理器。

## 发布（GitHub Pages）

本书发布于 <https://chongyi.github.io/deep-dive-agents/>（仓库：<https://github.com/chongyi/deep-dive-agents>）。

发布是全自动的：`.github/workflows/deploy.yml` 在每次 push 到 `main` 时触发——
CI 下载 mdbook 0.5.4 预编译二进制、`mdbook build`、经官方 Pages 动作部署。
由于本书零预处理器依赖（mermaid 与告示框均为仓库内置的客户端方案），CI 无需
Rust 工具链，一次构建约一分钟。

日常流程：改稿 → `mdbook serve` 本地预览 → 提交并 `git push` → 线上自动更新。

## mermaid 图表方案

书稿直接使用标准 Markdown 围栏：

````
```mermaid
flowchart LR
    A --> B
```
````

渲染发生在浏览器端：mdBook 把围栏输出为 `pre.language-mermaid` 代码块，
`mermaid-loader.js` 在页面加载后将其替换为图表，并跟随 mdBook 明/暗主题自动重渲染。
mermaid.min.js 固定为 12.1.0 并内置在仓库中，因此离线构建、阅读均可用；
升级 mermaid 时替换该文件并更新本 README 中的版本号。

## 告示框（admonition）方案

书稿使用带自定义标题的写法：

```markdown
> [!NOTE] 本书的用词约定
> 正文……
```

mdBook 0.5 的原生告示框要求标记独占一行，标记后带文字时整块不被识别（自定义标题特性
上游尚未实现：rust-lang/mdBook#2975、#3031）。`admonition-loader.js` 在浏览器端把这类
引用块改写为与原生完全同构的结构（复用 `blockquote-tag-*` 类名、内置 SVG 图标与样式，
明暗主题自动适配），标题即标记后、换行前的文字。标记独占一行的原生写法不受影响。

## 写作约定

- 正文中文；术语以业界惯用译法为主，首次出现标注英文原词（对照见附录 A 术语表）
- 图表一律用 mermaid（时序图 `sequenceDiagram`、流程图 `flowchart`、状态图 `stateDiagram-v2` 等），不贴截图
- 代码示例用 TypeScript / Python 伪代码，聚焦结构、不绑定具体 SDK 版本
- 引用外部事实注明来源（附录 B 汇总链接）；开源项目演进快，事实口径以「截至 2026-10」为准
- **加粗与全角标点的坑**：`**术语（english）**中文` 这类「加粗内容以全角标点（如 `）`）结尾、星号后紧跟中文」的写法，
  会因 CommonMark 的侧翼（flanking）规则导致加粗失效（星号按原文显示）或与后文 `**` 错误配对。
  约定写法：括号注释放在加粗外（`**术语**（english）中文`）；引号内加粗写 `「**术语**」`。
  修改后可执行 `mdbook build && grep -r '\*\*' book/part1 book/part2` 验证产物中无残留星号字面量（代码块除外）。

## 版本管理

本书目录是独立 Git 仓库（遵循 doc-library 中 `design/` 的同款惯例，父仓库不收录其内容）。

```bash
git log --oneline   # 查看书稿修订历史
```

## 许可

本仓库（书稿内容与附带脚本）以 [MIT](./LICENSE) 协议发布；内置的 mermaid.min.js 亦为 MIT（版权归 mermaid 项目）。引用与转载请保留署名。
