# 第 16 章 Gemini CLI 与 Aider：自主性的两个极端

> 本章一次看两个项目：Google 的 **Gemini CLI** 代表「平台生态派」——用免费额度和扩展体系把 Agent 变成获客漏斗；社区项目 **Aider** 代表「克制派」——刻意**不做**自主 Agent，用受约束的协议换取确定性。两者分别处于自主性程度的两个极端，正好检验前四章的概念在极端条件下如何取舍。（事实口径：截至 2026-10）

## 16.1 Gemini CLI：平台生态派

### 定位与架构

2025 年 6 月开源（Apache-2.0）的 TypeScript 终端 Agent，主打「登录 Google 账号即免费用」。monorepo 分 `packages/cli`（终端前端）与 `packages/core`（API 客户端、工具注册执行、会话状态）——**库级前后端分离**：同 core 可接不同前端，但不做 OpenCode 式的跨进程服务。

### 五视角速览

- **主循环/工具**：标准循环；工具集与同类一致（`run_shell_command`、`read_file`、`write_file`、`edit`、`glob`、`grep` 类检索、`web_fetch`、`google_web_search`、`save_memory`），支持参数级禁用（如 `run_shell_command(rm -rf)`）。
- **上下文**：`GEMINI.md` 三级层级（全局/项目/子目录，`@path` 导入），`contextFileName` 可改名——**兼容 AGENTS.md** 的实现方式；`save_memory` 工具把事实追加进全局记忆文件（记忆=第 4 章笔记策略 + 一等工具）；checkpoint 机制保存/恢复会话状态（可逆性）。
- **权限与沙箱**：工具级确认 + 常用命令免确认清单；沙箱 0.61 版后大幅强化：**容器优先**（Docker/Podman 预构建镜像）+ macOS Seatbelt profile——与 Codex 的内核原语路线对照，展示了「可移植性 vs 强隔离」的另一种解（第 8.3 节谱系的两端）。
- **扩展**：**Extensions** 是特色——把「MCP server + 上下文文件 + 自定义命令」打成**一个可安装单元**（`gemini extensions install`），配套版本管理。团队共享一套工具+提示词+命令的组合分发，比裸配 MCP 更接近「能力包」。
- **产品设计**：免费层（个人 Google 账号 60 请求/分、1000 请求/天）是真正的杀器——把 Agent 从「工具订阅」变成「平台入口」，这是平台厂商与模型厂商做 Agent 的动机差异。

## 16.2 Aider：克制派

### 定位：反 Agent 的 Agent

Aider（2023 年起由 Paul Gauthier 维护）把自己的定位写成「终端里的结对编程（pair programming）」——**人决定改哪些文件、何时提交；模型只负责生成编辑**。它刻意不提供开放式工具循环，而是用一套**受约束的编辑协议**换取三样东西：可靠性、可审计、省 token。

### 机制一：edit formats（编辑协议）

用户用 `/add`、`/drop` 显式圈定文件集，模型按选定的**编辑格式**输出补丁，Aider 解析落盘。格式按模型能力自动选择，构成了一个有趣的「模型能力 × 协议刚性」矩阵：

| 格式 | 模型产出 | 适用 |
|---|---|---|
| `whole` | 整个文件重写 | 弱模型，最不易错 |
| `diff` | search/replace 块（含围栏） | 主流默认 |
| `udiff` | 统一 diff | 部分模型更顺手 |
| architect 模式 | 推理强模型出方案 → 编辑模型落补丁 | 双模型分工（第 6.6 节） |

这组格式本质上是第 3 章的问题——「工具/协议怎么设计才能让模型用得对」——的又一种答案：**与其给模型自由的工具集，不如收窄表达空间**。

### 机制二：repo map（仓库地图）

Aider 的招牌发明。全仓库太大读不完（第 4 章），Aider 的解法：

```mermaid
flowchart LR
    a["全仓库源码"] --> b["tree-sitter<br/>解析出符号级 AST"]
    b --> c["构建引用图<br/>文件=节点 引用=边"]
    c --> d["图排序（类 PageRank）<br/>选出最常被引用的符号"]
    d --> e["按 token 预算（默认约 1k）<br/>裁剪成仓库地图"]
    e --> f["注入上下文<br/>模型按图索骥，按需 /add"]
```

这是「按需检索 + 最小高信号集合」（第 4 章）的经典实现：地图常驻（便宜）、内容按需（准确），被后来的产品广泛借鉴。

### 机制三：git 兜底

安全模型完全由 git 构成（第 8 章可逆性的极简实现）：编辑前先把用户已有的脏改动单独提交，每次 AI 修改自动 commit（作者标注 `(aider)`），`/undo`、`/diff` 随手回滚——**没有沙箱、没有审批，因为一切皆可逆**。配合 `--lint-cmd`/`--test-cmd` 自动跑 lint 与测试（失败自动再修），把第 7.6 节「确定性评估器」做成了默认工作流。

### 机制四：benchmark 即护城河

Aider 的 polyglot 基准（225 道 Exercism 题 × 5 种语言，看 pass@1、格式正确率与成本）成了模型选型的公共标尺——第 10 章「评估资产」价值的外部证明：**评估集本身可以成为项目最大的影响力来源**。

## 16.3 两端对照：自主性的经济学

| 维度 | Gemini CLI | Aider |
|---|---|---|
| 自主性 | 高（完整 agent 循环） | 低（受约束编辑协议） |
| 路径决定权 | 模型 | 用户 + 协议 |
| 安全哲学 | 确认清单 + 容器沙箱 | git 全程兜底 |
| 上下文策略 | 记忆文件 + checkpoint | repo map + 显式文件集 |
| 商业/生态逻辑 | 平台入口，免费获客 | 个人工具，基准立信 |

两端共同验证了第一部分的总纲：**自主性不是免费午餐，是「灵活性 × 成本 × 可控性」的交换**。选哪端取决于任务的可枚举性与失败的代价——这正是第 7 章那条从确定性到自主性区间的实践版。

## 16.4 延伸阅读

- Gemini CLI：<https://github.com/google-gemini/gemini-cli>、<https://google-gemini.github.io/gemini-cli/docs/>（tools、architecture、extensions、sandbox、checkpointing 各页）
- Aider：<https://github.com/Aider-AI/aider>、<https://aider.chat/docs>（edit-formats、repomap、git、leaderboards）；博客《Separating code reasoning and editing》（2024-09，architect 模式）与 repo map 构造文（2023-10）

## 16.5 小结

- Gemini CLI：**平台生态派**——免费层获客、Extensions 三合一打包、容器优先沙箱、GEMINI.md/AGENTS.md 兼容。
- Aider：**克制派**——edit formats 收窄表达、repo map 注入「最小高信号」索引、git 兜底可逆、双模型分工。
- 两端共同证明：自主性是可调节的旋钮，不是越多越好；**评估资产（benchmark）本身能成为项目的护城河**。
