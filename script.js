document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const saveTasks = localStorage.getItem("tasks");
    if (saveTasks) {
      JSON.parse(saveTasks).forEach((taskText) => {
        addTask(taskText, false);
      });
    }
  }
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className.add("remove-btn");
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
    };
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
    taskInput.value = "";
  }
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      addTask();
    }
  });
});
