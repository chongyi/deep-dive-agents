<div align="center">

# 深入浅出 Agent

**从零理解 Agent 的构造 · 剖析主流开源实现 · 延伸到自我改进（RSI）的边界**

[![Deploy](https://github.com/chongyi/deep-dive-agents/actions/workflows/deploy.yml/badge.svg)](https://github.com/chongyi/deep-dive-agents/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/chongyi/deep-dive-agents.svg)](https://github.com/chongyi/deep-dive-agents/stargazers)

**[📖 在线阅读](https://chongyi.github.io/deep-dive-agents/)** ·
[📑 完整目录](https://chongyi.github.io/deep-dive-agents/toc.html) ·
[🐛 提交勘误](https://github.com/chongyi/deep-dive-agents/issues)

</div>

## 这是一本什么书

写给「完全没写过 Agent 的工程师」，也写给「想读懂 Codex CLI、Claude Code 这些开源实现」的开发者。全书围绕一条主线公式展开：

> **Agent = 模型 + 工具 + 循环 + 上下文 + 护栏**

- **深入浅出**：从 50 行代码的最小 Agent 循环起步，逐章扩展到规划、工作流、安全、多 Agent 与评估——原理部分与具体产品无关；
- **有据可查**：六个主流开源实现（Codex CLI、Claude Code、OpenCode、Gemini CLI、Aider、DeepSeek Harness）按统一的「五个视角」逐一解剖，内容截至 2026-10 并注明来源；
- **前沿不泡沫**：完整讲解 harness（挽具）与 RSI（递归自我改进）两个热词的工程本质；
- **图胜千言**：40 张 mermaid 图（架构/时序/流程），随源码版本化、可修改。

## 内容结构

**第一部分　深入浅出 Agent（第 1–11 章）**　原理篇：最小 Agent → 工具调用 → 上下文工程 → 系统提示词 → 规划与推理 → 工作流模式 → 权限与沙箱 → 多 Agent → 评估 → MCP 与 Skills。

**第二部分　主流开源 Agent 剖析（第 12–18 章）**　实例篇：「五个视角」读源码方法论 + 六个 harness 逐个解剖 + 横向对比（七条共识、五个分歧）。

**第三部分　自我改进的 Agent（第 19–21 章）**　前沿篇：RSI 三层拆解——harness 级工程学（今天可复现）、训练级研究前沿、智能爆炸叙事与安全治理。

## 如何阅读

- **初学者**：顺序读第一部分，读完前三章就能写出可用的 Agent；
- **有经验者**：从第 12 章方法论直接进入第二部分，按需回查原理；
- **关注前沿**：直接读第三部分，以第 6、10 章与第 12.2 节为回看锚点。

## 本地阅读与构建

```bash
mdbook serve --open   # 本地预览 http://localhost:3000
mdbook build          # 构建静态站点到 book/
```

依赖仅 mdBook ≥ 0.5（`brew install mdbook` 或 `cargo install mdbook`），无任何预处理器要求。

## 勘误与贡献

- 🐛 **勘误**：错别字、事实错误、失效链接 → [提交 Issue](https://github.com/chongyi/deep-dive-agents/issues)；错字、断链等小改动欢迎直接 Pull Request；
- 💡 **共建**：新增章节、结构调整 → 请先开 Issue 说明动机与方案，达成一致后再动笔；
- 📐 **提交前**：请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)——写作约定、本地预览、构建与部署细节都在那里。

## 引用

```bibtex
@book{deep-dive-agents,
  title  = {深入浅出 Agent},
  author = {chongyi},
  year   = {2026},
  url    = {https://chongyi.github.io/deep-dive-agents/},
  note   = {mdBook 在线书；GitHub 仓库 chongyi/deep-dive-agents}
}
```

## 许可

- 书稿内容与仓库脚本：[MIT](./LICENSE)；
- 内置的 mermaid.min.js 归 [mermaid](https://github.com/mermaid-js/mermaid) 项目所有（MIT）。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=chongyi/deep-dive-agents&type=Date)](https://star-history.com/#chongyi/deep-dive-agents&Date)
