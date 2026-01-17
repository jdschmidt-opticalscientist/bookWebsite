/* ==========================================================
   layout.js — loads shared header/footer and inserts chapter title
   ========================================================== */

async function loadLayout() {
  async function inject(url, selector) {
    const resp = await fetch(url);
    if (!resp.ok) return;
    const html = await resp.text();
    document.querySelector(selector).innerHTML = html;
  }

  // Inject header and footer
  await inject("/partials/header.html", "header");
  await inject("/partials/footer.html", "footer");

  // Populate header text from data-* attributes
const header = document.querySelector("header.page-header");
if (!header) return;

const { title, subtitle, author, tagline } = header.dataset;

const titleEl = document.getElementById("chapter-title");
const subtitleEl = document.getElementById("chapter-subtitle");
const authorEl = document.getElementById("chapter-author");
const taglineEl = document.getElementById("chapter-tagline");

if (titleEl && title) titleEl.textContent = title;
if (subtitleEl && subtitle) subtitleEl.textContent = subtitle;
if (authorEl && author) authorEl.textContent = author;
if (taglineEl && tagline) taglineEl.textContent = tagline;

}

document.addEventListener("DOMContentLoaded", loadLayout);
