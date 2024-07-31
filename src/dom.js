import Projects from "./Project";

export const DOManipulation = () => {
  const projectContainer = document.getElementById("projects");
  const taskContainer = document.getElementById("tasks");
  const mainTitle = document.getElementById("main-title").querySelector("p");
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
    const tasks = Projects().projectList()[projectIndex].tasks;
    tasks.forEach((task, index) => {
      const div_container = document.createElement("div");
      const filled = task.completed ? "filled" : "";
      div_container.classList.add("task");
      div_container.dataset.index = index;
      div_container.dataset.projectIndex = projectIndex;

      div_container.innerHTML = `
        <div class="checkbox ${filled}" data-project-index="${projectIndex}" data-task-index="${index}"></div>
        <div class="task-title">${task.title}</div>
        <div class="due-date">${task.date}</div>
        <div class="task-iconic">
          <div class='edit-svg' data-project-index="${projectIndex}" data-task-index="${index}"></div>
          <div class='delete-svg' data-project-index="${projectIndex}" data-task-index="${index}"></div>
          <div class='info-svg'></div>
        </div>
      `;
      taskContainer.appendChild(div_container);
    });
    console.log(tasks);
  };

  const updateMainTitle = (projectName) => {
    const div = document.querySelector("#main-title>div");
    div.classList = [];
    div.classList.add("tool-svg");
    mainTitle.textContent = projectName;
  };

  const projectClickHandler = (event) => {
    const projectItem = event.target.closest(".project-item");
    if (projectItem) {
      const projectIndex = projectItem.dataset.index;
      const projectName = Projects().projectList()[projectIndex].title;
      updateMainTitle(projectName);
      renderTasks(projectIndex);
    }
  };

  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
  });

  // Attach click event listener to the project container
  projectContainer.addEventListener("click", projectClickHandler);

  return { renderProjects, renderTasks, updateMainTitle, projectClickHandler };
};
