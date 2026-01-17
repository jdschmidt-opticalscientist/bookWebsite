/* ==========================================================
   loadMatlabCode.js
   Loads MATLAB code files, applies Prism highlighting
   with line numbers and toolbar.
   ========================================================== */

async function loadMatlabFile(path, containerSelector) {
  try {
    await ensurePrismReady();

    const resp = await fetch(path);
    if (!resp.ok) throw new Error(resp.statusText);

    // --- Decode explicitly as UTF-8 ---
    const buffer = await resp.arrayBuffer();
    let text = new TextDecoder("utf-8").decode(buffer);

    // --- Normalize line endings for Prism ---
    text = text.replace(/\r\n?/g, "\n");

    // --- Build code block ---
    const pre = document.createElement("pre");
    pre.className = "line-numbers codeinput";

    const code = document.createElement("code");
    code.className = "language-matlab";
    code.textContent = text;

    pre.appendChild(code);

    // Insert into page
    const container = document.querySelector(containerSelector);
    if (!container) throw new Error("Container not found: " + containerSelector);
    container.appendChild(pre);

    // Highlight once layout is stable
    requestAnimationFrame(() => {
      Prism.highlightElement(code);

      if (Prism.plugins.lineNumbers) {
        Prism.hooks.run("complete", { element: code });
      }
    });
  } catch (err) {
    console.error("⚠️ Failed to load MATLAB file:", err);
  }
}

/* Wait until Prism + MATLAB + line-number plugin are loaded */
function ensurePrismReady() {
  return new Promise((resolve) => {
    const check = () => {
      if (
        typeof Prism !== "undefined" &&
        Prism.languages &&
        Prism.languages.matlab &&
        Prism.plugins &&
        Prism.plugins.lineNumbers
      ) {
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}

/* Optional: auto-resize line numbers on window resize */
function enableAutoLineNumberResize(containerSelector = "pre.line-numbers") {
  if (!window.ResizeObserver || !Prism.plugins.lineNumbers) return;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const pre = entry.target;
      Prism.plugins.lineNumbers.resize(pre);
    }
  });

  document.querySelectorAll(containerSelector).forEach((pre) => observer.observe(pre));

  window.addEventListener("resize", () => {
    document.querySelectorAll(containerSelector).forEach((pre) => {
      Prism.plugins.lineNumbers.resize(pre);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  enableAutoLineNumberResize();
});
