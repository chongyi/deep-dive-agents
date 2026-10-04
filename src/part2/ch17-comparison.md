# 第 17 章 横向对比：共性、分歧与取舍

> 收官一章做三件事：把五个项目放进同一张表、提炼它们不约而同的共识、分析它们刻意不同的分歧点——最后给「构建自己的 Agent」一张可执行的检查清单。

## 17.1 总对比表

| 维度 | Codex CLI | Claude Code | OpenCode | Gemini CLI | Aider |
|---|---|---|---|---|---|
| 出品方 / 开源 | OpenAI · Apache-2.0 | Anthropic · source-available | 社区（Anomaly）· MIT | Google · Apache-2.0 | 社区 · Apache-2.0 |
| 语言 / 进程模型 | Rust · 引擎+协议化多前端 | TypeScript · 单进程单体 | TS 服务端 + Go TUI · C/S 分离 | TypeScript · 库级前后端分离 | Python · 单体 |
| 形态定位 | 多端编码 Agent | 产品化标杆 | 提供商中立的开放平台 | 平台入口（免费层） | 结对编程（受约束） |
| 主循环载体 | `codex-core` 轮次循环 | 进程内循环（headless/SDK 复用） | 服务端会话循环 | `packages/core` 循环 | 受约束编辑协议（非自由循环） |
| 内置工具 | shell、apply_patch、update_plan、view_image、web_search | 家族化：Bash/Edit/…、Agent、Task 族、Plan 工具 | bash/edit/…、todowrite、question、lsp | shell/文件/检索/save_memory | /add 文件集 + 补丁协议 |
| 记忆文件 | AGENTS.md（发源地） | CLAUDE.md 四级 + AGENTS.md 兜底 | AGENTS.md | GEMINI.md（兼容 AGENTS.md） | 约定文件（CONVENTIONS） |
| 上下文策略 | rollout 持久化 + 压缩演进 | auto-compact + /compact + /context | 内部 compaction/summary agent | 记忆工具 + checkpoint | repo map（约 1k token） |
| 权限默认 | 按档位，问得多 | 默认逐项询问 | **默认全放行** | 确认 + 免确认清单 | 无审批，git 兜底 |
| 沙箱 | 内核级（Seatbelt / Landlock+seccomp） | /sandbox（Seatbelt / bubblewrap + 网络代理） | 无（交给用户环境） | 容器（Docker/Podman）+ Seatbelt | 无（可逆性代替隔离） |
| 子代理 / 多 Agent | 有（subagent、hooks 事件） | Agent 工具 + .claude/agents（嵌套/并发受限） | 内置角色 agent + 自定义 | 无重点 | 无（哲学排斥） |
| 扩展机制 | MCP（双向）+ hooks/skills | MCP + hooks + skills + plugins | MCP + JS 插件 + ACP | MCP + Extensions（三合一包） | lint/test 钩子 |
| 独门绝技 | 沙箱×审批正交双旋钮 | 权限规则 DSL + hooks 泛化 | OpenAPI 契约 + fork/revert | Extensions + 免费层 | repo map + edit formats + benchmark |

## 17.2 六条行业共识

分歧再多，五个项目在骨架上惊人一致——这正是第一部分的「公理」被市场反复验证的证据：

1. **主循环殊途同归**：无论 Rust 单体还是 C/S 分离，引擎核心都是第 2 章那个 `while`（模型 ⇄ 工具 ⇄ 观察）循环，加上同样的终止保险。
2. **工具集收敛到同一小家族**：读/写/编辑/搜索/执行/计划 六件套是所有项目的公共子集（第 3 章克制原则的胜利）。
3. **记忆文件事实标准化**：`AGENTS.md` 完成对各家私有命名的收编——五家全部支持或兼容（第 5 章指令分层的胜利）。
4. **压缩成为标配**：上下文管理从「可选优化」变成「必备功能」，且实现方式都符合第 4 章的四板斧框架。
5. **权限与沙箱至少占一头**：要么审批（Claude Code/Codex/Gemini），要么可逆（Aider 的 git），要么交给环境（OpenCode）——「裸奔」的生产 Agent 不存在。
6. **MCP 成为连接层公约**：五家全部支持；差异只在「是否再加一层自己的扩展机制」（hooks/plugins/extensions）。

## 17.3 四个真正的分歧点

分歧不是对错，而是**约束函数不同**——每个分歧都能追溯到「这家产品的用户是谁、信任模型是什么」：

**① 默认权限哲学：问 vs 不问。** Claude Code 默认逐项询问（企业用户，安全默认），OpenCode 默认全放行（开发者本地，信任环境）。这是第 8 章「审批疲劳 vs 安全默认」两难的两种产品化答案。

**② 架构形态：单体 vs 分离。** 单进程（Claude Code/Aider）换延迟与一致性；协议化引擎（Codex）换多端复用；开放服务（OpenCode）换生态接入。Agent 的「正确架构」取决于你要优化哪一端——这个问题没有全局最优解。

**③ 沙箱路线：内核原语 vs 容器 vs 不做。** Codex 用 OS 级强制（最强，绑定平台能力）；Gemini CLI 用容器（可移植，依赖用户环境装 Docker）；Aider/OpenCode 用可逆性/信任代替隔离。第 8.3 节谱系的三档全齐。

**④ 自主性刻度。** Aider 证明了「收窄自主性」可以是一种竞争力：对可枚举的任务，受约束协议在可靠性、成本、可审计上全面占优。自主性是旋钮，不是方向。

## 17.4 构建自己 Agent 的检查清单

如果你要从零构建（或在产品内嵌）一个 Agent，五个项目共同给出的清单，按本书章节组织：

```text
□ 主循环：while + 三层终止（自然/max turns/预算）（第 2 章）
□ 工具：六件套起步；描述当文档写；错误可恢复（第 3 章）
□ 上下文：工具结果截断 → 压缩 → 记忆文件的完整预案（第 4 章）
□ 指令：系统提示词分层 + AGENTS.md 项目层（第 5 章）
□ 规划：todo 工具 + 高风险任务先计划后执行（第 6 章）
□ 流程：从提示链开始，按需升级到编排器（第 7 章）
□ 安全：权限三态 + 沙箱边界 + 网络白名单 + 可逆兜底（第 8 章）
□ 扩展：子代理影响半径递减；外部能力优先 MCP（第 9、11 章）
□ 评估：20 条任务起步，bug 进回归集，轨迹落盘（第 10 章）
```

## 17.5 结语

回到前言的公式：**Agent = 模型 + 工具 + 循环 + 上下文 + 护栏**。

五个成熟项目用几十万行代码、千万级用户验证了它，但它们做的事情并不神秘——每一项都能在第一部分找到原理对应物。差异只在于：**把哪一项做到什么程度，用什么代价换**。

这就是「深入浅出」的本意：**深的是取舍，浅的是原理。** 掌握了原理与取舍的词汇，你既可以读懂任何一个新冒出来的 Agent（用第 12 章的五个视角），也可以在自己的场景里做出有依据的工程决策。

祝你在人机协作的这条曲线上，找到自己产品的位置。
