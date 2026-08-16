// ---- State ----
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ---- DOM references ----
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---- Save to localStorage ----
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---- Render tasks based on current filter ----
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<li class="empty-state">No tasks here yet</li>`;
  } else {
    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item" + (task.completed ? " completed" : "");
      li.dataset.id = task.id;

      li.innerHTML = `
        <div class="checkbox"></div>
        <span class="task-text">${escapeHTML(task.text)}</span>
        <button class="delete-btn" aria-label="Delete task">&times;</button>
      `;

      taskList.appendChild(li);
    });
  }

  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} left`;
}

// ---- Prevent basic HTML injection from task text ----
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---- Add new task ----
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    completed: false,
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// ---- Toggle complete / delete (event delegation) ----
taskList.addEventListener("click", (e) => {
  const li = e.target.closest(".task-item");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.classList.contains("checkbox")) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
  }

  if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }
});

// ---- Clear completed tasks ----
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

// ---- Filters ----
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ---- Initial render ----
renderTasks();
