document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => {
      addTask(taskText, false);
    });
  }
  // save tasks to localstorage
  function saveTasks() {
    const tasks = [...taskList.children].map((li) => li.firstChild.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  //add a new task
  function addTask(taskText, save = true) {
    // const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      saveTasks();
    };
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
    taskInput.value = "";
    if (save) {
      saveTasks();
    }
  }

  //event listener for the "add task" button
  addButton.addEventListener("click", () => {
    addTask(taskInput.value.trim());
    taskInput.value = ""; //clear input field
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask(taskInput.value.trim());
      taskInput.value = "";
    }
  });
  loadTasks();
});
