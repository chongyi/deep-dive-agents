# 附录 A：术语表

按主题分组；中文为主，括号内为英文原词/代码标识符。全书正文以本表为准。

## 核心概念

| 术语 | 英文 | 一句话解释 |
|---|---|---|
| 智能体/代理 | Agent | LLM 动态决定流程与工具使用、自主完成任务的系统 |
| 工作流 | Workflow | LLM 与工具沿预定义代码路径编排的系统 |
| 智能体系统 | agentic system | Workflow 与 Agent 的统称 |
| 增强型 LLM | augmented LLM | 加上检索、工具与记忆的 LLM（Anthropic 术语） |
| 挽具 | harness | 模型之外的全部外围工程系统（循环、工具、上下文、护栏等）；「Agent = Model + Harness」。中文写作通常保留英文，区别于脚手架（scaffold）与框架（framework） |
| 递归自我改进 | recursive self-improvement (RSI) | 改进的产出反哺改进者自身、闭合成回路。工程上分三层：harness 级（agent 改自己的提示词/技能/工具/工作流）、训练级（模型参与自身训练）、叙事级（智能爆炸与安全治理话语） |
| 主循环 | agent loop | 模型 → 工具 → 观察 → 再请求的往复循环 |
| 轮 | turn | 一轮「模型调用 + 工具执行」的迭代 |
| 工具调用 / 函数调用 | tool calling / function calling | 模型以结构化参数申请调用外部函数的机制 |
| 上下文窗口 | context window | 模型单次请求可见的 token 上限 |
| 上下文工程 | context engineering | 为模型求解任务组织全部上下文的方法学 |
| 上下文腐烂 | context rot | token 越多细节召回越差的现象 |
| 注意力预算 | attention budget | 注意力随序列长度摊薄的约束 |
| 思考链 | chain-of-thought (CoT) | 让模型产出中间推理步骤再给答案 |
| 推理模型 | reasoning model | 内部使用专门推理 token 的模型 |
| 提示词缓存 | prompt caching | 命中稳定前缀的请求按折扣计费、降低延迟 |

## 模式与编排

| 术语 | 英文 | 一句话解释 |
|---|---|---|
| 提示链 | prompt chaining | 固定串行的多步 LLM 流水线，可插检查门 |
| 路由 | routing | 先分类输入再导向专门分支 |
| 并行化 | parallelization | 分区（sectioning）与投票（voting）两种并行形态 |
| 编排器-执行器 | orchestrator-workers | 中央 LLM 动态拆解并委派子任务 |
| 评估器-优化器 | evaluator-optimizer | 生成与评估交替循环改进 |
| 移交 | handoff | 同层 Agent 之间转交对话控制权 |
| 计划模式 | plan mode | 先只读探索产出计划、批准后执行的运行模式 |
| 检查门 | gate | 流程步骤间的程序化（非 LLM）校验 |
| 护栏 | guardrail | 与主流程并行的输入/输出/工具安全检查层 |
| 渐进披露 | progressive disclosure | 只加载描述、触发后加载正文的能力加载策略 |

## 工具与扩展

| 术语 | 英文 | 一句话解释 |
|---|---|---|
| 数据工具 / 动作工具 / 编排工具 | Data / Action / Orchestration tools | OpenAI 的工具三分类 |
| 模型上下文协议 | Model Context Protocol (MCP) | 连接 AI 应用与外部工具/数据源的开放标准 |
| MCP 宿主/客户端/服务器 | Host / Client / Server | MCP 三角色 |
| 技能 | Skill | SKILL.md 文件夹形式封装的任务方法与资产 |
| 项目记忆文件 | AGENTS.md / CLAUDE.md / GEMINI.md | 随仓库走、给 Agent 看的项目约定 |
| 仓库地图 | repo map | 把全仓符号骨架压进极小 token 的索引（Aider） |
| 子代理 | subagent | 引擎递归创建的独立上下文 Agent 实例 |
| Agent 间协议 | Agent2Agent (A2A) | 跨厂商 Agent 互操作协议（与 MCP 正交） |

## 安全

| 术语 | 英文 | 一句话解释 |
|---|---|---|
| 提示注入 | prompt injection | 恶意指令经模型可读通道改写其行为 |
| 直接/间接注入 | direct / indirect injection | 来自用户输入 / 来自外部内容（网页、文件）的注入 |
| 致命三要素 | Lethal Trifecta | 私有数据 + 不可信内容 + 外泄通道齐备即致命 |
| 沙箱 | sandbox | 限制进程文件/网络/系统调用能力的隔离环境 |
| 审批策略 | approval policy | 决定工具调用何时需要人工确认的策略 |
| 权限模式 | permission mode | 预设的默认权限档位（默认/自动接受/计划/全放行等） |
| 影响半径 | blast radius | 失控动作的波及范围 |
| 人工干预 | human-in-the-loop (HITL) | 高风险决策交还人工的机制 |

## 评估与观测

| 术语 | 英文 | 一句话解释 |
|---|---|---|
| 评估 | evaluation (eval) | 对任务完成质量的系统化度量 |
| 轨迹 | trace / trajectory | 一次运行的全部请求与工具调用时序记录 |
| LLM 裁判 | LLM-as-judge | 用模型按评分细则（rubric）给输出打分 |
| 可观测性 | observability | 基于 trace/span 的运行时洞察体系 |
