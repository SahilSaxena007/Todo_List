import Projects from "./Project";

export const DOManipulation = () => {
  const projectContainer = document.getElementById("projects");
  const taskContainer = document.getElementById("tasks");
  const mainTitle = document.getElementById("main-title").querySelector("p");
  const mainTitleImage = document
    .getElementById("main-title")
    .querySelector("div");

  const renderProjects = () => {
    projectContainer.innerHTML = "";
    const projects = Projects().projectList();
    projects.forEach((project, index) => {
      const div_container = document.createElement("div");
      div_container.classList.add("project-item");
      div_container.dataset.index = index;
      div_container.innerHTML = `
      <div class="tool-svg"></div>
      <p>${project.title}</p>
      <div class="edit-svg"></div>
      <div class="delete-svg"></div>
      `;
      projectContainer.appendChild(div_container);
    });
    console.log(projects);
  };

  const renderTasks = (projectIndex) => {
    taskContainer.innerHTML = "";
    toggleAddTaskButton(true);
    const tasks = Projects().projectList()[projectIndex].tasks;
    tasks.forEach((task, index) => {
      const div_container = document.createElement("div");
      const filled = task.completed ? "filled" : "";
      div_container.classList.add("task");
      div_container.dataset.index = index;
      div_container.dataset.projectIndex = projectIndex;

      div_container.innerHTML = `
        <div class="checkbox ${filled} ${task.priority}" data-project-index="${projectIndex}" data-task-index="${index}"></div>
        <div class="task-title">${task.title}</div>
        <div class="due-date">${task.date}</div>
        <div class="task-iconic">
          <div class='edit-svg' data-project-index="${projectIndex}" data-task-index="${index}"></div>
          <div class='delete-svg' data-project-index="${projectIndex}" data-task-index="${index}"></div>
          <div class='info-svg' data-project-index="${projectIndex}" data-task-index="${index}></div>
        </div>
      `;
      taskContainer.appendChild(div_container);
    });
    console.log(tasks);
  };

  const renderTaskList = (tasks) => {
    taskContainer.innerHTML = "";
    toggleAddTaskButton(false);
    tasks.forEach((task) => {
      const div_container = document.createElement("div");
      const filled = task[0].completed ? "filled" : "";
      div_container.classList.add("task");
      div_container.dataset.index = task[2];
      div_container.dataset.projectIndex = task[1];
      // console.log(task[1], "ff", task[2]);

      div_container.innerHTML = `
        <div class="checkbox ${filled} ${task[0].priority}" data-project-index="${task[1]}" data-task-index="${task[2]}"></div>
        <div class="task-title">${task[0].title}</div>
        <div class="due-date">${task[0].date}</div>
        <div class="task-iconic">
          <div class='edit-svg' data-project-index="${task[1]}" data-task-index="${task[2]}"></div>
          <div class='delete-svg' data-project-index="${task[1]}" data-task-index="${task[2]}"></div>
          <div class='info-svg' data-project-index="${task[1]}" data-task-index="${task[2]}"></div>
        </div>
      `;
      taskContainer.appendChild(div_container);
    });
  };

  function displayTaskInfo(projectIndex, taskIndex) {
    const task = Projects().projectList()[projectIndex].tasks[taskIndex];
    const infoDialog = document.getElementById("information-dialog");
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");

    titleElement.textContent = task.title;
    descriptionElement.textContent = task.description;

    infoDialog.style.display = "flex";
  }

  const updateMainTitle = (title, iconClass = "tool-svg") => {
    const div = document.querySelector("#main-title>div");
    div.className = iconClass;
    mainTitle.textContent = title;
  };

  const projectClickHandler = (event) => {
    const projectItem = event.target.closest(".project-item");
    if (projectItem) {
      const projectIndex = projectItem.dataset.index;
      const projectName = Projects().projectList()[projectIndex].title;
      updateMainTitle(projectName, "tool-svg");
      renderTasks(projectIndex);
      toggleAddTaskButton(true);
    }
  };

  const toggleAddTaskButton = (show) => {
    const addTaskButton = document.querySelector("#task-title .add-button");
    if (addTaskButton) {
      addTaskButton.style.display = show ? "block" : "none";
    }
  };

  const clearTasks = () => {
    taskContainer.innerHTML = "";
  };

  const clearMainTitle = () => {
    mainTitle.textContent = "All";
  };

  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
  });

  // Attach click event listener to the project container
  projectContainer.addEventListener("click", projectClickHandler);

  return {
    renderProjects,
    renderTasks,
    renderTaskList,
    updateMainTitle,
    projectClickHandler,
    clearTasks,
    clearMainTitle,
  };
};
