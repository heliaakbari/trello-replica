let dropdowns = document.querySelectorAll(".task .form-select");
dropdowns.forEach(changeColorOnChangePriority);
dropdowns.forEach(changeColor);

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

  sort(target.parentElement,target.parentElement.parentElement);
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

  let dropdownCode;
  if (TaskPriority === "Low") {
    dropdownCode = `            <option value="High">High</option>
                                <option value="Normal">Normal</option>
                                <option value="Low" selected>Low</option>`;
  } else if (TaskPriority === "Normal") {
    dropdownCode = `            <option value="High">High</option>
                                <option value="Normal" selected>Normal</option>
                                <option value="Low">Low</option>`;
  } else {
    dropdownCode = `            <option value="High" selected>High</option>
                                <option value="Normal">Normal</option>
                               <option value="Low">Low</option>`;
  }
  let newTask = `<li class="list-group-item task">
                            <input type="text" class="form-control d-inline me-1" value="${TaskName}"
                                aria-label="task" aria-describedby="addon-wrapping">
                            <select class="form-select form-select-sm" style="max-width: fit-content;"
                                aria-label=".form-select-sm example">
                                ${dropdownCode}
                            </select>
                        </li>`;
  document.querySelector(`#${list}`).innerHTML =
    newTask + document.querySelector(`#${list}`).innerHTML;
  changeColor(document.querySelector(`#${list}`).children[0].children[1]);
  for (let i = 0; i < document.querySelector(`#${list}`).childElementCount; i++) {
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
      list.insertBefore(element,list.firstElementChild);
    } else if (element.children[1].value == "Low") {
      list.removeChild(element);
      list.appendChild(element);
    } else {
    }
  }
}