import { users, todos } from "./data.js";

const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

const title = document.getElementById("title");
const content = document.getElementById("content");

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("currentUser");
  function createPosts() {
    postList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("div");
      li.className = "card";
      li.innerHTML = `
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${todo.title}</h5>
      <p class="card-text">${todo.description}</p>
    </div>
  </div>
    `;
      postList.appendChild(li);
    });
  }
  if (!user) {
    window.location.href = "index.html";
  }
  createPosts();
});

function createPosts() {
  postList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("div");
    li.className = "card";
    li.innerHTML = `
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${todo.title}</h5>
      <p class="card-text">${todo.description}</p>
  </div>
</div>
    `;
    postList.appendChild(li);
  });
}

// 글 작성
postForm.addEventListener("click", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  // 제목과 내용 있으면 앞에 추가
  if (title && content) {
    todos.unshift({
      title,
      content,
      date: new Date().toLocaleString(),
    });
    createPosts();
    postForm.reset();
  }
});
