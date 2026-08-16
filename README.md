# To-Do List App

A clean, responsive task manager built with vanilla HTML, CSS, and JavaScript. Add, complete, filter, and delete tasks — all saved locally so your list survives a page refresh. No backend, no database.


---

## Features

- Add new tasks via a simple input form
- Mark tasks as complete/incomplete with a single click
- Delete individual tasks
- Filter tasks by All / Active / Completed
- "Clear completed" button to bulk-remove finished tasks
- Live task counter ("X tasks left")
- Data persists across page refreshes using localStorage
- Basic input sanitization to prevent HTML injection from task text

---

## Tech Stack

- HTML5 — page structure
- CSS3 — custom design system, responsive layout, no external UI framework
- JavaScript (ES6+) — DOM manipulation, event delegation, array methods (map, filter), localStorage for persistence

No build tools, no npm dependencies — open index.html and it runs.

---

## Project Structure

todo-app/
├── index.html      # Page structure
├── style.css       # Styling
└── script.js       # Task logic (add, toggle, delete, filter, persistence)

---

## How It Works

1. Adding a task creates an object { id, text, completed } and pushes it into the tasks array.
2. Every change (add, toggle, delete) calls saveTasks(), which writes the full tasks array to localStorage as JSON.
3. On page load, the saved array is read back from localStorage, so tasks aren't lost on refresh.
4. Filtering doesn't mutate the underlying data — it only changes what's rendered, based on the currently selected filter (all, active, completed).
5. Event delegation is used on the task list (one click listener on the parent <ul>) instead of attaching a listener to every task item individually, so newly added tasks work without extra setup.

---

## How to Run Locally

Option 1 — Just open it:
Double-click index.html to open it directly in your browser.

Option 2 — Run a local server:
python3 -m http.server 8000
then visit http://localhost:8000

---

## What This Project Demonstrates

- Core CRUD-style operations (create, update, delete) implemented client-side
- State persistence using the browser's localStorage API
- Event delegation for efficient DOM event handling
- Filtering/derived views without duplicating or mutating source data
- Manual testing of edge cases (empty input, rapid toggling, clearing all completed tasks) to confirm correct state at every step

---

## Author

Momin Zaid
📧 mominzaid004@gmail.com
🔗 LinkedIn · GitHub
