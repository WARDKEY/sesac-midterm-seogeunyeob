import { users, todos } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "index.html";
  }
});
