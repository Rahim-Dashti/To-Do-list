tasks_array = [
  { id: 0, title: "task 1", date: "5/20/2023" },
  { id: 1, title: "task 2", date: "5/19/2023" },
  { id: 2, title: "task 3", date: "5/19/2023" },
];
projects_array = [
  { id: 0, title: "project 0", date: "05/20/2023" },
  { id: 1, title: "project 1", date: "05/20/2023" },
  { id: 2, title: "project 2", date: "05/20/2023" },
];

let inbox_button = document.querySelector(".inbox-click");
let today_button = document.querySelector(".today-click");
inbox_button.addEventListener("click", show_task_list);
today_button.addEventListener("click", show_task_list);

function remove_task(e) {
  tasks_array.splice(e.target.id, 1);
  for (i = 0; i < tasks_array.length; i++) {
    tasks_array[i]["id"] = i;
  }
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

  let add_div = document.createElement("div");
  add_div.setAttribute("class", "add-task-section");

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
