const inputBox = document.getElementById("input-box");
const deadlineBox = document.getElementById("deadline-box");
const priorityBox = document.getElementById("priority-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        
        // Proper usage of template literals
        let taskText = `<span class='task-text'>${inputBox.value}</span>`;
        let taskDeadline = `<span class='task-deadline'>Deadline: ${deadlineBox.value || 'None'}</span>`;
        let taskPriority = `<span class='task-priority'>Priority: ${priorityBox.value}</span>`;
        
        li.innerHTML = `${taskText} ${taskDeadline} ${taskPriority}`;
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for '×'
        span.className = "delete-btn";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    deadlineBox.value = "";
    priorityBox.value = "Low";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" && e.target.className === "delete-btn") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

showTasks();
