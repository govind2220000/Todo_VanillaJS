const btn = document.querySelector("#add-task-btn");
const inputBox = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
console.log(tasks);

tasks.forEach((task) => renderTasks(task));

//handling Add Task Button
btn.addEventListener("click", function () {
  if (inputBox.value === "") return;
  let task = inputBox.value;
  saveTasks(task);
  inputBox.value = "";
});

function saveTasks(task) {
  let taskObj = { id: Date.now(), task: task, isCompleted: false };
  tasks.push(taskObj);
  updateToLocalStorage();
  renderTasks(taskObj);
}

function renderTasks(task) {
  //console.log(task);
  const li = document.createElement("li");
  if (task?.isCompleted) li.classList.add("completed");
  li.setAttribute("data-id", task?.id);
  li.innerHTML = `<span>${task?.task}</span><button>delete</button>`;
  todoList.appendChild(li);

  li.addEventListener("click", (e) => {
    // //console.log(e.target.LI);
    if (e.target.tagName === "BUTTON") {
      return;
    }
    task.isCompleted = !task.isCompleted;
    li.classList.toggle("completed");

    for (let i = 0; i < tasks.length; i++) {
      //console.log(tasks[i], typeof tasks[i]);
    }
    //console.log(tasks);

    updateToLocalStorage();
  });

  li.querySelector("button").addEventListener("click", (e) => {
    ////console.log("btn clicked");

    /**
     * ? When you click on the delete button, an event is triggered, and because of event bubbling, that event would naturally propagate up to the parent li element, triggering the click event handler there as well. By using e.stopPropagation(), you prevent the event from propagating up to the parent li, ensuring that only the delete button's event handler is executed and not the parent li's event handler.
     */

    e.stopPropagation();
    tasks = tasks.filter((currentTask) => currentTask?.id !== task?.id);
    li.remove();
    //console.log(tasks);
    updateToLocalStorage();
  });
}

function updateToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
