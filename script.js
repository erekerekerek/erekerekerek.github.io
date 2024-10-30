// Theme Toggle
const toggleThemeButton = document.getElementById("toggleTheme");
toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  toggleThemeButton.textContent = document.body.classList.contains("dark-theme")
    ? "Switch to Light Theme"
    : "Switch to Dark Theme";
});

// Reveal More Content
const revealButton = document.getElementById("revealContent");
const hiddenContent = document.getElementById("hiddenContent");

revealButton.addEventListener("click", () => {
  hiddenContent.style.display =
    hiddenContent.style.display === "block" ? "none" : "block";
  revealButton.textContent =
    hiddenContent.style.display === "block" ? "Show Less" : "Show More";
});
