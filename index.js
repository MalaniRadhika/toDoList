let task_description = document.querySelector(".task_description");
let add_task = document.querySelector(".add_new_task");
let task_display = document.querySelector("#task_display");
let done_count = document.querySelector(".done_count");
let progressBar = document.querySelector(".progressBar");
let task_array = [
    {
        id: 1,
        task: "Design login page UI",
        date: new Date("2025-12-18T10:30:00"),
        status: "New",
    },
    {
        id: 2,
        task: "Fix task delete bug",
        date: new Date("2025-12-19T14:15:00"),
        status: "In Progress",
    },
    {
        id: 3,
        task: "Write unit tests for task module",
        date: new Date("2025-12-20T09:00:00"),
        status: "Completed",
    },
    {
        id: 4,
        task: "Refactor CSS for responsiveness",
        date: new Date("2025-12-21T16:45:00"),
        status: "New",
    },
    {
        id: 5,
        task: "Add localStorage support",
        date: new Date("2025-12-22T11:20:00"),
        status: "In Progress",
    },
];

let search_txt = document.querySelector(".search-txt");
search_txt.addEventListener("input", function (event) {
    let task_divs = document.querySelectorAll(".display_task");
    task_divs.forEach((tsk) => (tsk.style.display = "flex"));
    let toFind = event.target.value.toLowerCase();
    console.log(event.target.value);

    task_divs.forEach((tsk) => {
        console.log(tsk);
        console.log(tsk.children[1]);

        if (tsk.children[1].textContent.toLowerCase().includes(toFind)) {
            tsk.style.display = "flex";
        } else {
            tsk.style.display = "none";
        }
    });
});

function count_task() {
    let ar = task_array.filter((tk) => tk.status == "Completed");
    console.log(ar.length);
    done_count.innerText = `${ar.length} / ${task_array.length}`;
    let completedTask = task_array.filter(
        (tsk) => tsk.status === "Completed"
    ).length;
    let total = task_array.length;
    let prtcentage = total === 0 ? 0 : (completedTask / total) * 100;
    progressBar.style.width = `${prtcentage}%`;
}
count_task();
function randomId(length = 8) {
    return Math.random().toString(36).substr(2, length);
}

add_task.addEventListener("click", function () {
    let tsk = task_description.value.trim();
    if (tsk === "") {
        return;
    }
    console.log(tsk);
    let task_id = randomId();
    let new_task = {
        id: task_id,
        task: tsk,
        date: new Date(),
        status: "In Progress",
    };
    task_array.push(new_task);
    console.log(new_task);
    display_ticket(new_task);
    task_description.value = "";
});

function handleCheckBox(tsk_div, task_obj) {
    tsk_div.children[0].addEventListener("click", function () {
        let checkBoxId = tsk_div.children[0].getAttribute("id");
        let taskFromArray = task_array.find((tsk) => tsk.id === Number(checkBoxId));
        console.log(taskFromArray);
        if (tsk_div.children[0].checked) {
            tsk_div.classList.add("done-task");
            console.log("checkbox is checked");
            taskFromArray.status = "Completed";
            console.log(task_array);
        } else {
            tsk_div.classList.remove("done-task");
            console.log("not checked");
            taskFromArray.status = "In Progress";
        }
        count_task();
        console.log(tsk_div.children[0]);
    });
}

function deleteTask(task_obj) {
    console.log(task_obj.children[0]);
    task_obj.children[3].addEventListener("click", function () {
        let deleteId = task_obj.children[0].getAttribute("id");
        let tsindexkk = task_array.findIndex((tsk) => {
            return tsk.id == deleteId;
        });
        console.log(`tskk id ${tsindexkk}`);
        task_array.splice(tsindexkk, 1);
        task_obj.remove();
        console.log(task_array.length);
        count_task();
    });
}

function editedTask(tsk_div) {
    let editDiv = tsk_div.children[2];
    console.log(editDiv);
    let id = tsk_div.children[0].getAttribute("id");
    editDiv.addEventListener("click", function () {
        if (editDiv.classList.contains("done-task")) {
            editDiv.classList.remove("done-task");
            let editTsk = task_array.find((tsk) => {
                return tsk.id == id;
            });
            console.log(editTsk);
            editTsk.task = tsk_div.children[1].textContent;
        } else {
            editDiv.classList.add("done-task");
            tsk_div.children[1].setAttribute("contenteditable", "true");
        }
    });
}

function display_ticket(task_obj) {
    let tsk_div = document.createElement("div");
    tsk_div.classList.add("display_task");
    tsk_div.innerHTML = `
    <input class="checkbox" type="checkbox" name="" id="${task_obj.id}" />
          <div class="task_text">${task_obj.task}</div>
          <button class="edit_task">
            <i class="fa-solid fa-pen"></i>
          </button>

          <button class="delete_task">
            <i class="fa-solid fa-trash"></i>
          </button>
    `;

    let checkbox = tsk_div.querySelector(".checkbox");
    if (task_obj.status === "Completed") {
        tsk_div.classList.add("done-task");
    }

    checkbox.checked = task_obj.status === "Completed";
    console.log(tsk_div);
    handleCheckBox(tsk_div, task_obj);
    task_display.appendChild(tsk_div);

    //   delete_task
    deleteTask(tsk_div);
    editedTask(tsk_div);
}

task_array.forEach((element) => {
    display_ticket(element);
});
function isSameDay(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

let sr = document.querySelectorAll(".sr");
let display_task = document.querySelectorAll(".display_task");
sr.forEach((ts) => {
    ts.addEventListener("click", function () {
        let isActive = ts.classList.contains("search-active");
        sr.forEach((t) => t.classList.remove("search-active"));
        if (isActive) {
            display_task.forEach((t) => (t.style.display = "flex"));
        } else {
            let key = ts.getAttribute("value");

            ts.classList.add("search-active");
            let display_taskk;
            if (key == "Completed" || key === "In Progress") {
                display_taskk = task_array.filter((tsk) => tsk.status == key);
            } else {
                const today = new Date();
                display_taskk = task_array
                    .filter((tsk) => isSameDay(tsk.date, today))
                    
            }

            console.log(display_task)

            let idFromDiv = [];
            display_task.forEach((t) => {
                let id = t.children[0].getAttribute("id");
                idFromDiv.push(id);
            });

            let did = [];
            display_taskk.forEach((h) => {
                did.push(h.id);
            });

            display_task.forEach((tsk) => {
                let divId = Number(tsk.children[0].getAttribute("id"));
                if (did.includes(divId)) {
                    tsk.style.display = "flex";
                } else {
                    tsk.style.display = "none";
                }
            });
        }
    });
});
