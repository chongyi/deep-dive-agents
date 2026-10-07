# 附录 B：延伸阅读与参考资料

全书事实与引文的来源汇总（按主题分组）。链接以 2026-10 可访问为准；文档类链接请优先看官方最新版。

## 同类读物与课程（延伸）

- 李博杰《深入理解 AI Agent：设计原理与工程实践》（开源免费，「动手实现」路线）：<https://github.com/bojieli/ai-agent-book>
- 黄佳《Claude Code 实战：Harness 工程之道》（人民邮电出版社，2026，单实现深度剖析）
- Chip Huyen《AI Engineering》（O'Reilly，2025；中译本《AI 工程》，2026）：<https://www.oreilly.com/library/view/ai-engineering/9781098166298/>
- Datawhale Hello-Agents（免费中文教程，从零构建智能体）：<https://github.com/datawhalechina/hello-agents>
- HuggingFace Agents Course（免费课程）：<https://huggingface.co/learn/agents-course>

## 方法论与工程原则（第一部分主干）

- Anthropic《Building Effective Agents》——workflow/agent 定义、五种模式：<https://www.anthropic.com/research/building-effective-agents>
- Anthropic《Effective context engineering for AI agents》——压缩、笔记、子代理、按需检索：<https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- Anthropic《How we built our multi-agent research system》——多 Agent 实证数字：<https://www.anthropic.com/engineering/built-multi-agent-research-system>
- OpenAI《A Practical Guide to Building Agents》——组件、编排模式、护栏：<https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf>
- OpenAI Agents SDK 文档——handoff、guardrails、sessions、tracing：<https://openai.github.io/openai-agents-python/>
- LangChain《The Rise of Context Engineering》——术语源流：<https://blog.langchain.dev/the-rise-of-context-engineering/>
- LangChain《Plan-and-Execute Agents》——预设路线规划：<https://blog.langchain.dev/planning-agents/>

## 论文

- ReAct: Synergizing Reasoning and Acting in Language Models（Yao et al., 2022）：<https://arxiv.org/abs/2210.03629>
- Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（Wei et al., 2022）：<https://arxiv.org/abs/2201.11903>

## API 与机制（第 2、3、4 章）

- OpenAI Function Calling 指南（含 Responses/Chat Completions 两种形态）：<https://developers.openai.com/api/docs/guides/function-calling>
- OpenAI 会话状态管理：<https://developers.openai.com/api/docs/guides/conversation-state>
- Anthropic Tool Use 概览与机制（消息结构、stop_reason、tool_result）：<https://platform.claude.com/docs/en/docs/agents-and-tools/tool-use/overview>
- Anthropic Memory Tool / Context Editing / Prompt Caching 各文档：<https://platform.claude.com/docs/en/build-with-claude>

## 协议与生态（第 11 章）

- MCP 官方文档（架构、原语、传输、版本）：<https://modelcontextprotocol.io/docs/getting-started/intro>
- MCP 官方注册表：<https://registry.modelcontextprotocol.io>
- AGENTS.md 开放约定：<https://agents.md/>
- Agent Skills 开放标准（agentskills.io）与发布公告：<https://claude.com/blog/skills>
- Anthropic 捐赠 MCP/AGENTS.md 至 Linux Foundation 公告：<https://www.anthropic.com/news/donating-mcp>
- A2A 协议官网（v1.0、参与方）：<https://a2a-protocol.org>

## 安全（第 8 章）

- OWASP Top 10 for LLM Applications（LLM01: Prompt Injection）：<https://genai.owasp.org/llm-top-10/>
- Simon Willison 的 prompt injection 系列与「Lethal Trifecta」：<https://simonwillison.net/tags/prompt-injection/>
- Claude Code 官方沙箱文档（Seatbelt/bubblewrap/网络白名单）：<https://code.claude.com/docs/en/sandboxing>

## 可观测性（第 10 章）

- OpenTelemetry GenAI 语义约定（agent span、MCP 约定）：<https://opentelemetry.io/docs/specs/semconv/gen-ai/>
- 语义约定专用仓库：<https://github.com/open-telemetry/semantic-conventions-genai>

## harness 术语与工程范式（第 12 章）

- Simon Willison《How coding agents work》（Agentic Engineering Patterns 指南，2026-03）：<https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/>
- Addy Osmani《Agent Harness Engineering》（2026-04）：<https://addyosmani.com/blog/agent-harness-engineering/>
- Gabriel Chua《How I think about Codex》（2026-02，"Model + Harness + Surfaces"）：<https://simonwillison.net/2026/Feb/22/how-i-think-about-codex/>
- EleutherAI lm-evaluation-harness（术语进入 LLM 世界的起点，2021）：<https://github.com/EleutherAI/lm-evaluation-harness>

## 递归自我改进 RSI（第三部分）

- 思想源头：I.J. Good《Speculations Concerning the First Ultraintelligent Machine》（1965）；Schmidhuber《Gödel Machines》（2003）：<https://arxiv.org/abs/cs/0309048>
- 指令层：OPRO <https://arxiv.org/abs/2309.03409>；DSPy <https://arxiv.org/abs/2310.03714>；GEPA <https://arxiv.org/abs/2507.19457>
- 程序层：Voyager <https://arxiv.org/abs/2305.16291>；Darwin Gödel Machine <https://arxiv.org/abs/2505.22954>（项目页 <https://sakana.ai/dgm>）；AlphaEvolve <https://arxiv.org/abs/2506.13131>；Gödel Agent <https://arxiv.org/abs/2501.09686>
- 训练层：SEAL <https://arxiv.org/abs/2506.10943>；Absolute Zero <https://arxiv.org/abs/2505.03335>；R-Zero <https://arxiv.org/abs/2504.13586>
- 独立测量：METR《Measuring AI Ability to Complete Long Tasks》<https://arxiv.org/abs/2503.14499>（博客版 <https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/>）；METR 资深开发者 RCT（2025-07，-19%）
- 机构披露与观点（自述数据需注明出处）：Anthropic《When AI Builds Itself》（2026-06）与 R&D Automation Index（2026-09）；Altman《The Gentle Singularity》（2025-06）：<https://blog.samaltman.com/the-gentle-singularity>；《AI 2027》情景报告 <https://ai-2027.com> 及 LessWrong/Reflective Altruism 的逐条批评；Epoch AI《The case for multi-decade AI timelines》（2025-04）
- 安全框架与法律：OpenAI Preparedness Framework v2（Critical 定义为 recursively self-improving / fully automated AI R&D）；Anthropic RSP <https://www.anthropic.com/responsible-scaling>；DeepMind Frontier Safety Framework；加州 SB 53（2025-09）

## 第二部分各项目官方入口

| 项目 | 仓库 | 文档 |
|---|---|---|
| Codex CLI | <https://github.com/openai/codex> | <https://learn.chatgpt.com/docs/codex/cli> |
| Claude Code | —（source-available） | <https://code.claude.com/docs> |
| OpenCode | <https://github.com/sst/opencode> | <https://opencode.ai/docs> |
| Gemini CLI | <https://github.com/google-gemini/gemini-cli> | <https://google-gemini.github.io/gemini-cli/docs/> |
| Aider | <https://github.com/Aider-AI/aider> | <https://aider.chat/docs> |
| DeepSeek Harness | <https://github.com/deepseek-ai/deepseek-harness> | <https://deepseek-harness.github.io/deepseek-harness/>（另见产品页 <https://www.deepseek.com/harness> 与 Cordis 论文 arXiv:2608.25512） |

其他被引用的深度阅读：

- InfoQ《Another Rust Rewrite: OpenAI's Codex CLI Goes Native》（2025-06）
- Baseten 播客《Building AI agents, open code, and open source》（Dax Raad，2025-10）
- cefboud.com《How Coding Agents Actually Work: Inside OpenCode》（2025-09）
- KDnuggets《What I've Learned About DeepSeek Harness》（2026-09）；Developers Digest《We Read DeepSeek Harness: What 453K Lines of Agent Runtime Actually Say》（2026-08）
- Boris Cherny《How We Built Claude Code》访谈；Anthropic Engineering《How we built Claude Code auto mode》《Lessons from building Claude Code: Prompt caching is everything》（2026）
- Aider 博客：《Separating code reasoning and editing》（2024-09）、repo map 构造（2023-10）、edit formats / leaderboard 文档
- 简介级参考：Factory Droid（<https://docs.factory.com>）、Charm Crush（<https://github.com/charmbracelet/crush>）、Cline、Block Goose（<https://github.com/block/goose>）、HuggingFace smolagents（<https://github.com/huggingface/smolagents>）
