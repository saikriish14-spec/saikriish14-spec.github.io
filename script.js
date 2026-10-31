// script.js — makes the page DO things.

// 1. Put the current year in the footer automatically
document.getElementById("year").textContent = new Date().getFullYear();

// 2. "Copy email" button
const copyBtn = document.getElementById("copy-btn");
const email = document.getElementById("email").textContent;

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = "Copied!";
  } catch (err) {
    // If copying isn't allowed, select the text so the visitor can copy it
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("email"));
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    copyBtn.textContent = "Press Ctrl+C";
  }
  setTimeout(() => (copyBtn.textContent = "Copy email"), 2000);
});

// 3. Underline the menu link for the section you're looking at
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));
