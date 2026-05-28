// script.js - 初學者可讀的互動行為
// 功能：手機導覽切換、導覽滾動時標示 active、表單驗證與模擬送出

document.addEventListener("DOMContentLoaded", function () {
  // 當網頁內容載入完成後再執行 JavaScript
  // header 元素選取
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  // 手機導覽開關：點擊按鈕時展開或關閉選單
  navToggle.addEventListener("click", function () {
    const expanded = this.getAttribute("aria-expanded") === "true" || false;
    this.setAttribute("aria-expanded", !expanded);
    siteNav.classList.toggle("open");
  });

  // 滾動時，讓對應導覽連結變成 active（簡易版）
  const sections = document.querySelectorAll("main section[id]");
  function onScroll() {
    const scrollPos = window.scrollY + 120; // 偏移：考量固定 header
    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector('.site-nav a[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  // 每次滾動時都執行一次，讓頁面載入時也能正確顯示 active
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 導覽連結點擊後（在行動裝置）自動收起導覽
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // 表單處理：簡單驗證並模擬送出
  const form = document.getElementById("contact-form");
  const formMsg = document.getElementById("form-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // 先阻止真實送出（初學者示範）
    formMsg.textContent = "";

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = "請填寫所有欄位。";
      return;
    }

    // 簡單的 email 格式檢查（非完整驗證）
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formMsg.textContent = "請輸入有效的電子郵件地址。";
      return;
    }

    // 模擬送出：顯示成功訊息並清空表單
    formMsg.textContent = "已收到您的訊息，謝謝！";
    form.reset();
  });

  // 自動填寫頁尾年份（小細節）
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
