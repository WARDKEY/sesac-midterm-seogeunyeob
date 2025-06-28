import { users, todos } from "./data.js";

const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

document.addEventListener("DOMContentLoaded", () => {
  console.log(todos.length);
  const user = localStorage.getItem("currentUser");
  function createPosts() {
    postList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("div");
      li.className = "card";
      li.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${todo.title}</h5>
      <p class="card-text">${todo.description}</p>
            <p class="card-text">${todo.isCompleted}</p>
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
    <div class="card-body">
      <h5 class="card-title">${todo.title}</h5>
      <p class="card-text">${todo.description}</p>
            <p class="card-text">${todo.isCompleted}</p>
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
  const isChecked = document.getElementById("check").checked;

  // 제목과 내용 체크 되어 있으면 뒤에 추가
  if (title && content) {
    todos.push({
      id: todos.length + 1,
      title,
      description: content,
      date: new Date().toLocaleString(),
      isCompleted: isChecked,
    });
    createPosts();
  }
});
