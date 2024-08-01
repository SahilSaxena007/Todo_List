import "./style.css";
import { parse, format, getYear, set, add } from "date-fns";
import { DOManipulation } from "./dom";
import Projects from "./Project";
import { Handler } from "./handler";

// const domManipulationInstance = DOManipulation();
// domManipulationInstance.renderProjects();
// domManipulationInstance.renderTasks(0);

document.addEventListener("DOMContentLoaded", () => {
  const domManipulationInstance = DOManipulation();
  let currentProjectIndex = null;
  if (Projects().projectList().length > 0) {
    domManipulationInstance.renderProjects();
    domManipulationInstance.renderTasks(0);
    domManipulationInstance.updateMainTitle(Projects().projectList()[0].title);
    currentProjectIndex = 0;
  } else {
    console.warn("No projects available to render.");
  }

  document
    .getElementById("project-title")
    .addEventListener("click", Handler().addProjectHandler);

  document
    .querySelector("#task-title .add-button")
    .addEventListener("click", () => {
      if (currentProjectIndex !== null) {
        Handler().addTaskHandler(currentProjectIndex);
        console.log("current project index:", currentProjectIndex);
      } else {
        console.warn("No project selected to add a task.");
      }
    });

  document.getElementById("projects").addEventListener("click", (event) => {
    const target = event.target;
    const projectItem = target.closest(".project-item");

    if (!projectItem) return;

    currentProjectIndex = projectItem.dataset.index;

    if (target.classList.contains("edit-svg")) {
      Handler().editProjectHandler(currentProjectIndex);
    } else if (target.classList.contains("delete-svg")) {
      Handler().deleteProjectHandler(currentProjectIndex);
    } else {
      domManipulationInstance.projectClickHandler(event);
    }
  });

  document.getElementById("tasks").addEventListener("click", (event) => {
    const target = event.target;
    const projectIndex = target.closest(".task")?.dataset.projectIndex;
    const taskIndex = target.closest(".task")?.dataset.index;

    if (target.classList.contains("edit-svg")) {
      Handler().editTaskHandler(projectIndex, taskIndex);
    } else if (target.classList.contains("delete-svg")) {
      Handler().deleteTaskHandler(projectIndex, taskIndex);
    } else if (target.classList.contains("checkbox")) {
      Handler().taskCompletionHandler(projectIndex, taskIndex);
    }
  });
});
