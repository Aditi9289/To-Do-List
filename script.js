const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const searchBox = document.getElementById("search-box");
const exportButton = document.getElementById("export-tasks");

let tasks = [];

function addTask() {
  const taskText = inputBox.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (!taskText) {
    alert("Task cannot be empty!");
    return;
  }

  const task = {
    text: taskText,
    priority: priority,
    deadline: deadline,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
  inputBox.value = "";
  deadlineInput.value = "";
}

function renderTasks(filter = "all") {
  listContainer.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text} (${task.priority}) ${
      task.deadline ? `- ${task.deadline}` : ""
    }</span>
      <button onclick="toggleTask(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    listContainer.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks(filter) {
  renderTasks(filter);
}

function searchTasks() {
  const query = searchBox.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );
  listContainer.innerHTML = "";
  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    listContainer.appendChild(li);
  });
}

function exportTasks() {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();
}

document.getElementById("add-task").onclick = addTask;
document.getElementById("filter-all").onclick = () => filterTasks("all");
document.getElementById("filter-completed").onclick = () =>
  filterTasks("completed");
document.getElementById("filter-pending").onclick = () =>
  filterTasks("pending");
searchBox.oninput = searchTasks;
exportButton.onclick = exportTasks;

renderTasks();
