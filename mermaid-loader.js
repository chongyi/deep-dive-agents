/**
 * mermaid-loader.js —— 在 mdBook 中免预处理器渲染 ```mermaid 代码块
 *
 * 原理：mdBook 会把 ```mermaid 围栏渲染为
 *   <pre class="language-mermaid"><code class="language-mermaid">…</code></pre>
 * 本脚本在页面加载后：
 *   1. 找到这些代码块，取出源码，原地替换为 <div class="mermaid-container">
 *   2. 按当前明/暗主题初始化 mermaid 并逐图渲染
 *   3. 监听 body 的主题切换，主题变化后按新主题整体重渲染
 * 渲染失败时降级为纯文本展示源码与错误信息，方便排查 mermaid 语法问题。
 *
 * 兼容说明：mermaid 11/12 的 dist 包除暴露全局 `mermaid` 外，
 * 12.x 的打包形态还可能是 `__esbuild_esm_mermaid_nm.mermaid`，此处统一探测。
 */
(function () {
  "use strict";

  var DARK_THEMES = ["coal", "navy", "ayu"];
  var diagrams = [];
  var seq = 0;

  function mermaidApi() {
    if (typeof window.mermaid !== "undefined") return window.mermaid;
    if (
      typeof window.__esbuild_esm_mermaid_nm !== "undefined" &&
      window.__esbuild_esm_mermaid_nm.mermaid
    ) {
      return window.__esbuild_esm_mermaid_nm.mermaid;
    }
    return null;
  }

  /* mdBook 的主题以 body 的 class 表示（light / rust / coal / navy / ayu） */
  function mermaidTheme() {
    var classes = ((document.body && document.body.className) || "").split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
      if (DARK_THEMES.indexOf(classes[i]) !== -1) return "dark";
    }
    return "default";
  }

  function collect() {
    var nodes = document.querySelectorAll(
      "pre.language-mermaid > code, pre > code.language-mermaid"
    );
    Array.prototype.forEach.call(nodes, function (code) {
      var pre = code.parentElement;
      if (!pre || !pre.parentNode) return;
      var container = document.createElement("div");
      container.className = "mermaid-container";
      pre.parentNode.replaceChild(container, pre);
      diagrams.push({ source: code.textContent, container: container });
    });
  }

  function showRaw(d, err) {
    d.container.classList.add("mermaid-error");
    d.container.textContent =
      "mermaid 图表渲染失败：" +
      (err && err.message ? err.message : String(err)) +
      "\n\n图表源码：\n" +
      d.source;
  }

  function renderAll() {
    var api = mermaidApi();
    if (!api) return;
    if (diagrams.length === 0) return;

    api.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: mermaidTheme()
    });

    diagrams.forEach(function (d) {
      d.container.classList.remove("mermaid-error");
      var id = "mdbook-mermaid-" + seq++;
      api
        .render(id, d.source)
        .then(function (out) {
          d.container.innerHTML = out.svg;
          if (out.bindFunctions) out.bindFunctions(d.container);
        })
        .catch(function (err) {
          showRaw(d, err);
        });
    });
  }

  function watchTheme() {
    if (typeof MutationObserver === "undefined") return;
    var last = mermaidTheme();
    new MutationObserver(function () {
      var now = mermaidTheme();
      if (now !== last) {
        last = now;
        renderAll();
      }
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  collect();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    renderAll();
  }
  watchTheme();
})();
