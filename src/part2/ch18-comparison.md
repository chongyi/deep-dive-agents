# 第 18 章 横向对比：共性、分歧与取舍

> 第二部分收官一章做三件事：把六个项目放进同一张表、提炼它们不约而同的共识、分析它们刻意不同的分歧点——最后给「构建自己的 Agent」一张可执行的检查清单。

## 18.1 总对比表

| 维度 | Codex CLI | Claude Code | OpenCode | Gemini CLI | Aider | DeepSeek Harness |
|---|---|---|---|---|---|---|
| 出品方 / 开源 | OpenAI · Apache-2.0 | Anthropic · source-available | 社区（Anomaly）· MIT | Google · Apache-2.0 | 社区 · Apache-2.0 | DeepSeek · MIT |
| 语言 / 进程模型 | Rust · 引擎+协议化多前端 | TypeScript · 单进程单体 | TS 服务端 + Go TUI · C/S 分离 | TypeScript · 库级前后端分离 | Python · 单体 | TypeScript · 微内核插件化 + 多形态外壳 |
| 形态定位 | 多端编码 Agent | 产品化标杆 | 提供商中立的开放平台 | 平台入口（免费层） | 结对编程（受约束） | 模型厂商的开放 harness 运行时 |
| 主循环载体 | `codex-core` 轮次循环 | 进程内循环（headless/SDK 复用） | 服务端会话循环 | `packages/core` 循环 | 受约束编辑协议（非自由循环） | agent-loop 插件（step/turn 事件流） |
| 内置工具 | shell、apply_patch、update_plan、view_image、web_search | 家族化：Bash/Edit/…、Agent、Task 族、Plan 工具 | bash/edit/…、todowrite、question、lsp | shell/文件/检索/save_memory | /add 文件集 + 补丁协议 | 大目录：bash/文件族/lsp/goals/jobs/会话检索… |
| 记忆文件 | AGENTS.md（发源地） | CLAUDE.md 四级 + AGENTS.md 兜底 | AGENTS.md | GEMINI.md（兼容 AGENTS.md） | 约定文件（CONVENTIONS） | 无内置（MCP 外接；自身开发用 AGENTS.md） |
| 上下文策略 | rollout 持久化 + 压缩演进 | auto-compact + /compact + /context | 内部 compaction/summary agent | 记忆工具 + checkpoint | repo map（约 1k token） | 日志即真相 + 可选 compaction 缝 |
| 权限默认 | 按档位，问得多 | 默认逐项询问 | **默认全放行** | 确认 + 免确认清单 | 无审批，git 兜底 | ask 默认 · fail-closed，预设仅两档 |
| 沙箱 | 内核级（Seatbelt / Landlock+seccomp） | /sandbox（Seatbelt / bubblewrap + 网络代理） | 无（交给用户环境） | 容器（Docker/Podman）+ Seatbelt | 无（可逆性代替隔离） | 原生内核级（bwrap/Landlock · Seatbelt · Win ACL，无 Docker） |
| 子代理 / 多 Agent | 有（subagent、hooks 事件） | Agent 工具 + .claude/agents（嵌套/并发受限） | 内置角色 agent + 自定义 | 无重点 | 无（刻意不做） | provider 化（spawn/fork，可委派竞品 CLI） |
| 扩展机制 | MCP（双向）+ hooks/skills | MCP + hooks + skills + plugins | MCP + JS 插件 + ACP | MCP + Extensions（三合一包） | lint/test 钩子 | 万物皆插件 + MCP + 分层 Skills |
| 独门绝技 | 沙箱×审批正交双旋钮 | 权限规则 DSL + hooks 泛化 | OpenAPI 契约 + fork/revert | Extensions + 免费层 | repo map + edit formats + benchmark | 微内核 Cordis · 日志即真相 · harness 变体跑分 |

## 18.2 七条行业共识

分歧再多，六个项目在骨架上惊人一致——这正是第一部分的「公理」被市场反复验证的证据：

1. **主循环殊途同归**：无论 Rust 单体还是 C/S 分离，引擎核心都是第 2 章那个 `while`（模型 ⇄ 工具 ⇄ 观察）循环，加上同样的终止保险。
2. **工具集收敛到同一小家族**：读/写/编辑/搜索/执行/计划 六件套是所有项目的公共子集（第 3 章克制原则的胜利）。
3. **记忆文件事实标准化**：`AGENTS.md` 完成对各家私有命名的收编——六家中五家内置支持或兼容（第 5 章指令分层的胜利）；DeepSeek Harness 是显著例外，把记忆交给 MCP 生态，与其「万物皆插件」的哲学一致。
4. **压缩成为标配**：上下文管理从「可选优化」变成「必备功能」，且实现方式都符合第 4 章的四板斧框架。
5. **权限与沙箱至少占一头**：要么审批（Claude Code/Codex/Gemini/dsh），要么可逆（Aider 的 git），要么交给环境（OpenCode）——「裸奔」的生产 Agent 不存在。
6. **MCP 成为连接层公约**：六家全部支持；差异只在「是否再加一层自己的扩展机制」（hooks/plugins/extensions/万物皆插件）。
7. **模型与 harness 走向协同设计**：Codex 的模型在 harness 在场下训练，Claude Code 的实现围绕 prompt caching 打磨，dsh 是 V4 系列官方跑分的承载——模型与外围工程正从「两层皮」合流为「一套系统」。

## 18.3 五个真正的分歧点

分歧不是对错，而是**约束函数不同**——每个分歧都能追溯到「这家产品的用户是谁、信任模型是什么」：

**① 默认权限哲学：问 vs 不问。** Claude Code 默认逐项询问（企业用户，安全默认），OpenCode 默认全放行（开发者本地，信任环境）；dsh 则把词汇表压到极简——两级审批、两个预设、fail-closed。这是第 8 章「审批疲劳 vs 安全默认」两难的多种产品化答案。

**② 架构形态：单体 vs 分离 vs 微内核。** 单进程（Claude Code/Aider）换延迟与一致性；协议化引擎（Codex）换多端复用；开放服务（OpenCode）换生态接入；dsh 用微内核加插件把「可替换性」本身做成架构目标。Agent 的「正确架构」取决于你要优化哪一端——这个问题没有全局最优解。

**③ 沙箱路线：内核原语 vs 容器 vs 不做。** Codex 与 dsh 用 OS 级强制（最强，绑定平台能力；dsh 明确不用 Docker）；Gemini CLI 用容器（可移植，依赖用户环境装 Docker）；Aider/OpenCode 用可逆性/信任代替隔离。第 8.3 节谱系的三档全齐。

**④ 自主性刻度。** Aider 证明了「收窄自主性」可以是一种竞争力：对可枚举的任务，受约束协议在可靠性、成本、可审计上全面占优。自主性是旋钮，不是方向。

**⑤ harness 由谁来做：模型厂 vs 平台/社区。** Codex、Claude Code、DeepSeek Harness 都是模型厂商为自家模型配套的 harness，换来模型与外围的深度协同（训练在场、官方跑分也跑在自家 harness 上）；OpenCode、Gemini CLI、Aider 站在中立或平台一侧，换来提供商无关与可移植性。两种出身没有优劣，但决定了项目演化的牵引力来自模型还是来自生态。

## 18.4 构建自己 Agent 的检查清单

如果你要从零构建（或在产品内嵌）一个 Agent，六个项目共同给出的清单，按本书章节组织：

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

## 18.5 第二部分收官：从「读懂」到「改进」

回到前言的公式：**Agent = 模型 + 工具 + 循环 + 上下文 + 护栏**。六个成熟项目用几十万行代码、千万级用户验证了它——每一项都能在第一部分找到原理对应物，差异只在于**把哪一项做到什么程度，用什么代价换**。这就是「深入浅出」的本意：深的是取舍，浅的是原理。

掌握这套词汇之后，一个自然的问题浮现出来：**这些 harness，能不能由 Agent 自己来改进？**——让 Agent 修订自己的提示词与技能、维护自己的项目记忆文件、把评估集当作目标函数来优化自己的工作流。这个方向有一个响亮的名字：递归自我改进（RSI，recursive self-improvement）。它是第三部分的主题：我们会把这个词拆成工程现实、研究前沿与思想叙事三层，看看「harness 改进 harness」这条路究竟能走多远、边界在哪里。
