document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("right_nav_box");
  if (!nav) return;

  nav.innerHTML = `
    <ul>
      <li><a href="../index.html">Home</a></li>
      <li><a href="../chapter1/index.html">Chapter 1</a></li>
      <li><a href="../chapter2/index.html">Chapter 2</a></li>
      <li><a href="../chapter3/index.html">Chapter 3</a></li>
      <li><a href="../chapter4/index.html">Chapter 4</a></li>
      <li><a href="../chapter5/index.html">Chapter 5</a></li>
      <li><a href="../chapter6/index.html">Chapter 6</a></li>
      <li><a href="../chapter7/index.html">Chapter 7</a></li>
      <li><a href="../chapter8/index.html">Chapter 8</a></li>
      <li><a href="../chapter9/index.html">Chapter 9</a></li>
      <li><a href="../supplement1/index.html">Supplement 1</a></li>
    </ul>
  `;

  // Highlight the active page
  const current = window.location.href.replace(/\/$/, "");
  nav.querySelectorAll("a").forEach(a => {
    const normalized = new URL(a.href).href.replace(/\/$/, "");
    if (normalized === current) {
      a.classList.add("active");
    }
  });
});
