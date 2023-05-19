tasks_array = [
  { id: 0, title: "task 1", date: "5/20/2023" },
  { id: 1, title: "task 2", date: "5/19/2023" },
  { id: 2, title: "task 3", date: "5/19/2023" },
];

let inbox_button = document.querySelector(".inbox-click");
let today_button = document.querySelector(".today-click");
inbox_button.addEventListener("click", show_task_list);
today_button.addEventListener("click", show_task_list);

function reload_list(e) {
  let title = document.querySelector(".title-task-section").innerText;
  let task_section = document.querySelector(".task-section");
  task_section.innerHTML = "";

  let title_div = document.createElement("div");
  let title_p = document.createElement("p");
  title_p.setAttribute("class", "title-task-section");
  title_p.innerText = e.target.innerText;
  title_div.appendChild(title_p);

  task_section.appendChild(title_div);
  if (title == "Today") {
    for (i = 0; i < tasks_array.length; i++) {
      if (check_date(tasks_array[i]["date"])) {
        print_tasks(tasks_array);
      }
    }
  } else
    for (i = 0; i < tasks_array.length; i++) {
      print_tasks(tasks_array);
    }

  add_button();
  document.querySelector(".title-task-section").innerText = title;
}

function remove_task(e) {
  tasks_array.splice(e.target.id, 1);
  for (i = 0; i < tasks_array.length; i++) {
    tasks_array[i]["id"] = i;
  }
  reload_list(e);
}

function print_tasks(tasks_array) {
  let task_section = document.querySelector(".task-section");

  let task = document.createElement("div");
  task.setAttribute("class", "task");

  let done_button_a = document.createElement("a");
  done_button_a.setAttribute("class", "done-button");
  done_button_a.addEventListener("click", remove_task);
  done_button_a.setAttribute("href", "javascript:void(0);");

  let done_button_img = document.createElement("img");
  done_button_img.setAttribute("class", "done-button");
  done_button_img.setAttribute("id", `${i}`);
  done_button_img.setAttribute("src", "./img/done.png");

  let task_title = document.createElement("p");
  task_title.setAttribute("class", "task-title");
  task_title.innerText = tasks_array[i]["title"];

  let task_date = document.createElement("p");
  task_date.setAttribute("class", "task-date");
  task_date.innerText = tasks_array[i]["date"];

  done_button_a.appendChild(done_button_img);
  task.appendChild(done_button_a);
  task.appendChild(task_title);
  task.appendChild(task_date);

  task_section.appendChild(task);
}

function add_button() {
  let task_section = document.querySelector(".task-section");

  let add_div = document.createElement("a");
  add_div.setAttribute("class", "add-task-section");
  add_div.setAttribute("href", "javascript:void(0);");
  add_div.addEventListener("click", add_task_form);

  let add_img = document.createElement("img");
  add_img.setAttribute("class", "add-button");
  add_img.setAttribute("src", "./img/add.png");

  let add_p = document.createElement("p");
  add_p.innerText = "Add Task";

  add_div.appendChild(add_img);
  add_div.appendChild(add_p);

  task_section.appendChild(add_div);
}

function show_task_list(e) {
  let task_section = document.querySelector(".task-section");
  task_section.innerHTML = "";

  let title_div = document.createElement("div");
  let title_p = document.createElement("p");
  title_p.setAttribute("class", "title-task-section");
  title_p.innerText = e.target.innerText;
  title_div.appendChild(title_p);

  task_section.appendChild(title_div);
  if (title_p.innerText == "Today") {
    for (i = 0; i < tasks_array.length; i++) {
      if (check_date(tasks_array[i]["date"])) {
        print_tasks(tasks_array);
      }
    }
  } else
    for (i = 0; i < tasks_array.length; i++) {
      print_tasks(tasks_array);
    }

  add_button();
}

function check_date(date_value) {
  let today_date = new Date();
  let today_year = today_date.getFullYear();
  let today_month = today_date.getMonth() + 1;
  let today_day = today_date.getDate();

  let task_date = date_value.split("/");

  if (
    today_month == task_date[0] &&
    today_day == task_date[1] &&
    today_year == task_date[2]
  ) {
    return true;
  } else return false;
}

function add_task_form() {
  if (document.querySelector(".add-form")) {
    document.querySelector(".add-form").remove();
  }
  let task_section = document.querySelector(".task-section");

  let form = document.createElement("form");
  form.setAttribute("class", "add-form");
  form.setAttribute("id", "add-form");
  form.setAttribute("action", "");
  form.setAttribute("method", "post");
  form.setAttribute("onsubmit", "return false");

  let task_name = document.createElement("input");
  task_name.setAttribute("type", "text");
  task_name.setAttribute("class", "task-name form-element");
  task_name.setAttribute("name", "task_name");
  task_name.setAttribute("placeholder", "Enter a task name");

  let task_date = document.createElement("input");
  task_date.setAttribute("class", "form-element");
  task_date.setAttribute("type", "date");
  task_date.setAttribute("id", "task-date");
  task_date.setAttribute("name", "task_date");

  let add_task_button = document.createElement("button");
  add_task_button.setAttribute("class", "add-task-button button form-element");
  add_task_button.setAttribute("type", "submit");
  add_task_button.setAttribute("name", "submit-button");
  add_task_button.setAttribute(
    "onclick",
    "add_task_to_list(task_name,task_date)"
  );
  add_task_button.innerText = "Add";

  let cancel_task_button = document.createElement("button");
  cancel_task_button.setAttribute(
    "class",
    "cancel-task-button button form-element"
  );
  cancel_task_button.setAttribute("onclick", "cancel_task()");
  cancel_task_button.setAttribute("name", "cancel-button");
  cancel_task_button.innerText = "Cancel";

  form.appendChild(task_name);
  form.appendChild(task_date);
  form.appendChild(add_task_button);
  form.appendChild(cancel_task_button);

  task_section.appendChild(form);
}

function add_task_to_list(task_name, task_date) {
  added_date = task_date.value.split("-");
  task_date = added_date[1] + "/" + added_date[2] + "/" + added_date[0];
  task = { title: task_name.value, date: task_date };
  tasks_array.push(task);
  document.querySelector(".add-form").remove();
  reload_after_add();
}

function cancel_task() {
  document.querySelector(".add-form").remove();
}

function reload_after_add() {
  let title = document.querySelector(".title-task-section").innerText;
  let task_section = document.querySelector(".task-section");
  task_section.innerHTML = "";

  let title_div = document.createElement("div");
  let title_p = document.createElement("p");
  title_p.setAttribute("class", "title-task-section");
  title_p.innerText = "Inbox";
  title_div.appendChild(title_p);

  task_section.appendChild(title_div);
  for (i = 0; i < tasks_array.length; i++) {
    print_tasks(tasks_array);
  }

  add_button();
  document.querySelector(".title-task-section").innerText = title;
}

projects_array = [
  {
    id: 0,
    title: "project 0",
    tasks: [
      { id: 0, title: "project 0" },
      { id: 1, title: "project 1" },
      { id: 2, title: "project 2" },
    ],
  },
  {
    id: 1,
    title: "project 1",
    tasks: [
      { id: 0, title: "project 00" },
      { id: 1, title: "project 01" },
      { id: 2, title: "project 02" },
    ],
  },
  {
    id: 2,
    title: "project 2",
    tasks: [
      { id: 0, title: "project 000" },
      { id: 1, title: "project 001" },
      { id: 2, title: "project 002" },
    ],
  },
];

function show_left_project_list() {
  let left_project_section = document.querySelector(".left-project-section");
  for (i = 0; i < projects_array.length; i++) {
    let project_link = document.createElement("a");
    project_link.addEventListener("click", show_project_tasks);
    let project = document.createElement("p");
    project.setAttribute("id", `${projects_array[i]["id"]}`);
    project.innerText = projects_array[i]["title"];

    project_link.appendChild(project);
    left_project_section.appendChild(project_link);
  }
}

show_left_project_list();

function show_project_tasks(e) {
  let id = e.target.id;
  console.log(projects_array[id]["tasks"].length);

  let task_section = document.querySelector(".task-section");
  task_section.innerHTML = "";

  let title_div = document.createElement("div");
  let title_p = document.createElement("p");
  title_p.setAttribute("class", "title-task-section");
  title_p.innerText = e.target.innerText;
  title_div.appendChild(title_p);

  task_section.appendChild(title_div);

  for (i = 0; i < projects_array[id]["tasks"].length; i++) {
    print_project_tasks(projects_array[id]["tasks"]);
  }

  add_button();
}

function print_project_tasks(tasks_array) {
  let task_section = document.querySelector(".task-section");

  let task = document.createElement("div");
  task.setAttribute("class", "task");

  let done_button_a = document.createElement("a");
  done_button_a.setAttribute("class", "done-button");
  done_button_a.addEventListener("click", remove_task);
  done_button_a.setAttribute("href", "javascript:void(0);");

  let done_button_img = document.createElement("img");
  done_button_img.setAttribute("class", "done-button");
  done_button_img.setAttribute("id", `${i}`);
  done_button_img.setAttribute("src", "./img/done.png");

  let task_title = document.createElement("p");
  task_title.setAttribute("class", "task-title");
  task_title.innerText = tasks_array[i]["title"];

  done_button_a.appendChild(done_button_img);
  task.appendChild(done_button_a);
  task.appendChild(task_title);

  task_section.appendChild(task);
}
