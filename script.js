const inputField = document.getElementById("task-input");
const addBtn = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const allbtn = document.getElementById("filter-all");
const completedBtn = document.getElementById("filter-completed");
const pendingBtn = document.getElementById("filter-pending");
let tasks = [];
const savedTask = localStorage.getItem("tasks");
if (savedTask) {
  tasks = JSON.parse(savedTask);
  for(const task of tasks){
    displayTask(task)
  }
}
addBtn.addEventListener("click", addTask);
  
inputField.addEventListener("keydown",(event)=>{
  if(event.key === "Enter"){
    addTask();
  }
})
function addTask() {
  const task = inputField.value.trim();

  if (task === "") {
    return;
  }
  inputField.value = "";
  //Obj
  const taskObj = {
    text: task,
    completed: false,
  };
  tasks.push(taskObj);
  // calling function
 saveTask();
  // calling function
  displayTask(taskObj);
  inputField.focus();
}
function displayTask(taskObj) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskList.appendChild(taskItem);
  //chechbox
  const checkBox = document.createElement("input");
  checkBox.checked = taskObj.completed
  checkBox.setAttribute("type", "checkbox");
  taskItem.appendChild(checkBox);
  checkBox.classList.add("checkbox");
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
    taskObj.completed = checkBox.checked;
    saveTask();
  });
  //span
  const span = document.createElement("span");
  span.innerText = taskObj.text;
  taskItem.appendChild(span);
  if (taskObj.completed) {
    span.classList.add("completed");
}
  //delbtn
  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete 🗑";
  delBtn.classList.add("delete-btn")
  
  taskItem.appendChild(delBtn);

  delBtn.addEventListener("click", () => {
     const index = tasks.indexOf(taskObj)
     tasks.splice(index,1)
     saveTask();
    taskItem.remove();
  });
  const editBtn = document.createElement("button")
  editBtn.innerText = "Edit ✏️";
  editBtn.classList.add("edit-btn")
  taskItem.appendChild(editBtn);
  editBtn.addEventListener("click",()=>{
    inputField.value = taskObj.text;
    const index = tasks.indexOf(taskObj)
    tasks.splice(index,1)
    saveTask();
    taskItem.remove();
  })
  
}


function saveTask(){
  localStorage.setItem("tasks", JSON.stringify(tasks));

}
allbtn.addEventListener("click",()=>{
  taskList.innerHTML = "";
  for(const task of tasks){
    displayTask(task)
  }

})
completedBtn.addEventListener("click", () => {
    taskList.innerHTML = "";

    for (const task of tasks) {
        if (task.completed) {
            displayTask(task);
        }
    }
});
pendingBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    for (const task of tasks) {
        if (!task.completed) {
            displayTask(task);
        }
      }
    })



