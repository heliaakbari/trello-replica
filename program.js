let globalDragged;

function changeColorOnChangePriority(dropdown) {
  dropdown.addEventListener("change", changeColorTarget);
}

function changeColorTarget(event) {
  changeColor(event.target);
}

function changeColor(target) {
  let priority = target.value;
  if (priority === "Normal") {
    target.parentNode.style.backgroundColor = "#dddddd";
    target.style.backgroundColor = "white";
    target.parentElement.children[0].style.backgroundColor = "white";
  }
  if (priority === "High") {
    target.parentNode.style.backgroundColor = "#ff5252 ";
    target.style.backgroundColor = "#ffcece ";
    target.parentElement.children[0].style.backgroundColor = "#ffcece ";
  }
  if (priority === "Low") {
    target.parentNode.style.backgroundColor = "#138cff";
    target.style.backgroundColor = "#cde6ff ";
    target.parentElement.children[0].style.backgroundColor = "#cde6ff";
  }

  sort(target.parentElement, target.parentElement.parentElement);
}

let addButton = document.querySelector("#addButton");
addButton.addEventListener("click", addATask);

function addATask() {
  let TaskName = document.querySelector(".addTask input").value;
  let TaskPriority = document.querySelector("#newTaskPriority").value;
  let TaskStatus = document.querySelector("#newTaskStatus").value;
  let list;

  if (TaskStatus == "todo") {
    list = "todos";
  } else if (TaskStatus == "doing") {
    list = "doings";
  } else {
    list = "dones";
  }

  let li = document.createElement("li");
  li.setAttribute("class", "list-group-item task");
  li.setAttribute("draggable", true);
  li.addEventListener("dragstart", onDragStart);
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "form-control d-inline me-1");
  input.setAttribute("value", `${TaskName}`);
  let selectElement = document.createElement("select");
  selectElement.setAttribute("style", "max-width: fit-content;");
  selectElement.setAttribute("class", "form-select form-select-sm");
  let NormalOption = document.createElement("option");
  let LowOption = document.createElement("option");
  let HighOption = document.createElement("option");
  NormalOption.setAttribute("value", "Normal");
  LowOption.setAttribute("value", "Low");
  HighOption.setAttribute("value", "High");
  NormalOption.innerHTML = "Normal";
  HighOption.innerHTML = "High";
  LowOption.innerHTML = "Low";
  if (TaskPriority == "High") {
    HighOption.setAttribute("selected", true);
  } else if (TaskPriority == "Low") {
    LowOption.setAttribute("selected", true);
  } else {
    NormalOption.setAttribute("selected", true);
  }
  li.appendChild(input);
  li.appendChild(selectElement);
  selectElement.appendChild(HighOption);
  selectElement.appendChild(NormalOption);
  selectElement.appendChild(LowOption);
  let button = document.createElement("button");
  button.innerHTML = "X";
  button.setAttribute("class", "btn delete");
  li.appendChild(button);
  button.addEventListener("click", deleteTask);
  document.getElementById(`${list}`).appendChild(li);
  changeColor(document.getElementById(list).lastElementChild.children[1]);
  for (
    let i = 0;
    i < document.querySelector(`#${list}`).childElementCount;
    i++
  ) {
    document
      .querySelector(`#${list}`)
      .children[i].children[1].addEventListener("change", changeColorTarget);
  }

  sort(
    document.getElementById(`${list}`).children[0],
    document.getElementById(`${list}`)
  );
}

function sort(element, list) {
  if (list.childElementCount > 1) {
    if (element.children[1].value == "High") {
      list.removeChild(element);
      list.insertBefore(element, list.firstElementChild);
    } else if (element.children[1].value == "Low") {
      list.removeChild(element);
      list.appendChild(element);
    } else {
      list.removeChild(element);
      let placed = false;
      for (i = 0; i < list.childElementCount; i++) {
        if (list.children[i].children[1].value == "Low") {
          list.insertBefore(element, list.children[i]);
          placed = true;
          return;
        }
      }
      if (placed == false) {
        list.appendChild(element);
      }
    }
  }
}

function deleteTask(event) {
  task = event.target.parentElement;
  list = task.parentElement;
  list.removeChild(task);
}

function onDragStart(event) {
  globalDragged = event.target;
}

function onDropToDo(event) {
  event.preventDefault();
  let list = document.getElementById("todos");
  globalDragged.parentElement.removeChild(globalDragged);
  list.appendChild(globalDragged);
  sort(globalDragged,list);
}

function onDropDoing(event) {
  event.preventDefault();
  globalDragged.parentElement.removeChild(globalDragged);
  let list = document.getElementById("doings");
  list.appendChild(globalDragged);
  sort(globalDragged, list);
}

function onDropDone(event) {
  event.preventDefault();
  globalDragged.parentElement.removeChild(globalDragged);
  let list = document.getElementById("dones");
  list.appendChild(globalDragged);
  sort(globalDragged, list);
}
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}
