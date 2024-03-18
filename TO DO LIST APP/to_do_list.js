document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
            saveTasks();
        });

        const span = document.createElement("span");
        span.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(function(task, index) {
            task.id = `task-${index}`;
            const taskObj = {
                id: task.id,
                text: task.querySelector("span").textContent,
                completed: task.querySelector("input[type='checkbox']").checked
            };
            tasks.push(taskObj);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(task => {
                addTask(task.text);
                const li = document.getElementById(task.id);
                li.querySelector("input[type='checkbox']").checked = task.completed;
                if (task.completed) {
                    li.style.textDecoration = "line-through";
                }
            });
        }
    }
});
