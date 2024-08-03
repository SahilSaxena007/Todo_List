import "./style.css";
import { parse, format, getYear, set, add } from "date-fns";
import { DOManipulation } from "./dom";
import Projects from "./Project";
import { Handler } from "./handler";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
// import { format } from "date-fns";

// const domManipulationInstance = DOManipulation();
// domManipulationInstance.renderProjects();
// domManipulationInstance.renderTasks(0);
const taskListRenderer = (taskChoice) => {
  const projects = Projects().projectList();
  const compiledTaskList = [];

  const today = new Date();
  const formattedToday = format(today, "dd-MM-yyyy");

  // Calculate the start and end dates for the upcoming week
  const nextWeekStart = startOfWeek(add(today, { weeks: 1 }), {
    weekStartsOn: 1,
  });
  const nextWeekEnd = endOfWeek(add(today, { weeks: 1 }), { weekStartsOn: 1 });

  for (let project of projects) {
    for (let task of project.tasks) {
      const taskDate = new Date(task.date);
      const formattedTaskDate = format(taskDate, "dd-MM-yyyy");
      // console.log("ffg", formattedTaskDate);
      if (taskChoice === "all-task") {
        compiledTaskList.push(task);
      } else if (taskChoice === "today-task") {
        if (formattedTaskDate === formattedToday) {
          compiledTaskList.push(task);
        }
      } else if (taskChoice === "week-task") {
        if (
          isWithinInterval(taskDate, {
            start: nextWeekStart,
            end: nextWeekEnd,
          }) &&
          !task.completed
        ) {
          compiledTaskList.push(task);
        }
      } else if (taskChoice === "important-task") {
        if (task.priority === "high") {
          compiledTaskList.push(task);
        }
      } else if (taskChoice === "completed-task") {
        if (task.completed) {
          compiledTaskList.push(task);
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

  document.querySelectorAll(".menu").forEach((task) => {
    task.addEventListener("click", (event) => {
      const target = event.target.closest(".menu");
      if (target) {
        const list = target.classList;
        if (list.contains("all-task")) {
          taskListRenderer("all-task");
          console.log(list);
        } else if (list.contains("today-task")) {
          taskListRenderer("today-task");
        } else if (list.contains("week-task")) {
          taskListRenderer("week-task");
        } else if (list.contains("important-task")) {
          taskListRenderer("important-task");
        } else if (list.contains("completed-task")) {
          taskListRenderer("completed-task");
        }
      } else {
        console.warn("No valid menu item was clicked.");
      }
    });
  });
});
