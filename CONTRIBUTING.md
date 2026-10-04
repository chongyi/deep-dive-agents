# 贡献指南（CONTRIBUTING）

本文档面向贡献者与维护者；读者入口见 [README](./README.md)。

## 参与方式

- **勘误**：错别字、事实错误、失效链接 → [提交 Issue](https://github.com/chongyi/deep-dive-agents/issues)；小改动欢迎直接 Pull Request；
- **共建**：新增章节、结构调整 → 先开 Issue 说明动机与方案，达成一致后再动笔；
- **提交信息**：中文、带类型前缀（如 `fix:`、`ci:`、`术语治理：`），参考 `git log` 现有风格。

## 仓库结构

```
.
├── book.toml          # mdBook 配置（site-url、渲染特性等）
├── custom.css         # 附加样式（中文字体、图表容器等）
├── mermaid.min.js     # 内置的 mermaid 12.1.0（离线可渲染，勿手改）
├── mermaid-loader.js  # 自写的 mermaid 加载脚本（免预处理器方案）
├── admonition-loader.js # 告示框加载脚本（支持「[!NOTE] 标题」写法）
├── .github/workflows/deploy.yml  # push 到 main 自动部署 Pages
└── src/               # 书稿正文
    ├── SUMMARY.md     # 目录定义（增删章节在此登记）
    ├── README.md      # 前言
    ├── part1/         # 第一部分：深入浅出 Agent
    ├── part2/         # 第二部分：主流开源 Agent 剖析
    ├── part3/         # 第三部分：自我改进的 Agent（RSI）
    └── appendix/      # 附录（术语表、延伸阅读）
```

## 本地开发

```bash
mdbook serve --open   # 写作预览：http://localhost:3000
mdbook build          # 构建到 book/
```

依赖仅 mdBook ≥ 0.5，**不需要**安装 `mdbook-mermaid` 等预处理器。构建后建议跑一遍产物级检查（历史上拦下过真实缺陷）：

```bash
# 1) 加粗渲染真值检查（合法 ** 应转为 <strong>，产物中不应残留字面星号；代码块除外）
for f in book/index.html book/part*/*.html book/appendix/*.html; do
  perl -CSD -0777 -ne 's/<pre.*?<\/pre>//gs; s/<code[^>]*>.*?<\/code>//gs; print "$ARGV: **\n" if /\*\*/' "$f"
done
# 2) 错位配对检查（嵌套 strong）
for f in book/part*/*.html; do
  perl -CSD -0777 -ne 's/<pre.*?<\/pre>//gs; print "$ARGV: nested strong\n" if /<strong>(?:(?!<\/strong>).)*<strong/s' "$f"
done
```

## 渲染方案（为什么没有用预处理器）

- **mermaid**：mdBook 把 \`\`\`mermaid 围栏输出为 `pre.language-mermaid` 代码块，`mermaid-loader.js` 在浏览器端将其替换为图表；mermaid 12.1.0 内置于仓库（离线可用）。注意 mdBook 0.5 的主题类在 `<html>` 上而非 `<body>`，加载脚本已兼容两处并支持明暗主题自动重渲染。
- **告示框**：mdBook 0.5 不支持「`[!NOTE] 标题`」写法（上游 #2975/#3031 未实现），`admonition-loader.js` 将其改写为与原生完全同构的结构（复用 `blockquote-tag-*` 类名、内置 SVG 图标与样式）。标记独占一行的原生写法不受影响。
- 升级 mermaid 时替换 `mermaid.min.js` 并更新 README/本文件中的版本号。

## 写作约定

- **术语**：以附录 A 术语表为准，业界惯用译法优先、首次出现标注英文原词；**不使用自造词**（历史上已清理「能力光谱」「五个透镜」等）。harness 等无定译术语保留英文。
- **加粗与全角标点的坑**：`**术语（english）**中文` 这类「加粗以全角标点结尾、星号后紧跟中文」的写法会因 CommonMark 侧翼（flanking）规则失效。约定：括号注释放在加粗外（`**术语**（english）中文`）；引号内加粗写 `「**术语**」`；避免 `字**「` 开启侧模式。
- **图表**：一律 mermaid（`sequenceDiagram`/`flowchart`/`stateDiagram-v2`），不贴截图；告示框用 `> [!NOTE] 标题` 形式。
- **事实口径**：开源项目相关事实标注「截至 YYYY-MM」，引用注明来源并登记进附录 B；单一/二手来源的说法需注明口径（如「实验室自述」），查无出处的一律不写。

## 发布

推送到 `main` 即自动发布：GitHub Actions 下载 mdbook 0.5.4 预编译二进制 → `mdbook build` → 官方 Pages 动作部署，全程约一分钟。书托管在子路径 `https://chongyi.github.io/deep-dive-agents/`，`book.toml` 中的 `site-url` 必须与之一致。

## 版本管理

本书目录是独立 Git 仓库（遵循父项目 doc-library 中 `design/` 的同款惯例，父仓库不收录其内容）。本地修改后正常 `git commit && git push` 即完成发布。
