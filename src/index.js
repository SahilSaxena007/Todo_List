import "./style.css";
import { parse, format, getYear, set, add } from "date-fns";
import { DOManipulation } from "./dom";
import Projects from "./Project";
import { Handler } from "./handler";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const taskListRenderer = (taskChoice) => {
  const projects = Projects().projectList();
  const compiledTaskList = [];

  const today = new Date();
  const formattedToday = format(today, "dd-MM-yyyy");

  const nextWeekStart = startOfWeek(add(today, { weeks: 1 }), {
    weekStartsOn: 1,
  });
  const nextWeekEnd = endOfWeek(add(today, { weeks: 1 }), { weekStartsOn: 1 });

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].tasks.length; j++) {
      const taskDate = new Date(projects[i].tasks[j].date);
      const formattedTaskDate = format(taskDate, "dd-MM-yyyy");
      if (taskChoice === "all-task") {
        compiledTaskList.push([projects[i].tasks[j], i, j]);
      } else if (taskChoice === "today-task") {
        if (formattedTaskDate === formattedToday) {
          compiledTaskList.push([projects[i].tasks[j], i, j]);
        }
      } else if (taskChoice === "week-task") {
        if (
          isWithinInterval(taskDate, {
            start: nextWeekStart,
            end: nextWeekEnd,
          })
        ) {
          compiledTaskList.push([projects[i].tasks[j], i, j]);
        }
      } else if (taskChoice === "important-task") {
        if (projects[i].tasks[j].priority === "high") {
          compiledTaskList.push([projects[i].tasks[j], i, j]);
        }
      } else if (taskChoice === "completed-task") {
        if (projects[i].tasks[j].completed) {
          compiledTaskList.push([projects[i].tasks[j], i, j]);
        }
      }
    }
  }

  console.log("Compiled Task List:", compiledTaskList);
  return compiledTaskList;
};

document.addEventListener("DOMContentLoaded", () => {
  const domManipulationInstance = DOManipulation();
  let currentProjectIndex = null;
  let currentSelection = "project";

  const initializeApp = () => {
    if (Projects().projectList().length > 0) {
      domManipulationInstance.renderProjects();
      domManipulationInstance.renderTasks(0);
      domManipulationInstance.updateMainTitle(
        Projects().projectList()[0].title
      );
      currentProjectIndex = 0;

      // Add .selected class to the first project
      const firstProject = document.querySelector(".project-item");
      if (firstProject) {
        firstProject.classList.add("selected");
      }
    } else {
      console.warn("No projects available to render.");
    }
  };

  initializeApp();

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

  const unselectAllItems = () => {
    document.querySelectorAll(".project-item, .menu").forEach((item) => {
      item.classList.remove("selected");
    });
  };

  document.getElementById("projects").addEventListener("click", (event) => {
    const target = event.target;
    const projectItem = target.closest(".project-item");

    if (!projectItem) return;

    unselectAllItems();
    projectItem.classList.add("selected");
    currentSelection = "project";
    currentProjectIndex = parseInt(projectItem.dataset.index);

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

  document.querySelectorAll(".menu").forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
      const target = event.target.closest(".menu");
      if (target) {
        unselectAllItems();
        target.classList.add("selected");
        currentSelection = "menu";
        currentProjectIndex = null;

        const list = target.classList;
        let chosenList = [];
        if (list.contains("all-task")) {
          chosenList = taskListRenderer("all-task");
        } else if (list.contains("today-task")) {
          chosenList = taskListRenderer("today-task");
        } else if (list.contains("week-task")) {
          chosenList = taskListRenderer("week-task");
        } else if (list.contains("important-task")) {
          chosenList = taskListRenderer("important-task");
        } else if (list.contains("completed-task")) {
          chosenList = taskListRenderer("completed-task");
        }

        domManipulationInstance.renderTaskList(chosenList);
        domManipulationInstance.updateMainTitle(
          target.querySelector("p").textContent
        );
      } else {
        console.warn("No valid menu item was clicked.");
      }
    });
  });
});
