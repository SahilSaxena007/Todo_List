import "./style.css";
import { format, add } from "date-fns";
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

  return compiledTaskList;
};

document.addEventListener("DOMContentLoaded", () => {
  const domManipulationInstance = DOManipulation();
  let currentProjectIndex = null;
  let currentSelection = "project";
  const addProjectButton = document.querySelector("#project-title .add-button");
  const addProjectDialog = document.getElementById("add-project-dialog");
  const projectNameInput = document.getElementById("project-name");
  const cancelProjectButton = document.getElementById("cancel-project");
  const confirmProjectButton = document.getElementById("confirm-project");
  const projectDialogHeader = document.querySelector("#add-project-dialog h2");

  const addTaskButton = document.querySelector("#task-title .add-button");
  const addTaskDialog = document.getElementById("add-task-dialog");
  const taskNameInput = document.getElementById("task-name");
  const taskDescriptionInput = document.getElementById("task-description");
  const taskDateInput = document.getElementById("task-date");
  const taskPrioritySelect = document.getElementById("task-priority");
  const cancelTaskButton = document.getElementById("cancel-task");
  const confirmTaskButton = document.getElementById("confirm-task");
  const taskDialogHeader = document.querySelector("#add-task-dialog h2");

  // const openInfoButton = document.querySelector('')

  let editingProjectIndex = null;
  let editingTaskProjectIndex = null;
  let editingTaskIndex = null;

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

  addProjectButton.addEventListener("click", () => {
    editingProjectIndex = null;
    addProjectDialog.style.display = "block";
    projectNameInput.value = "";
    projectDialogHeader.textContent = "Add Project";
  });

  cancelProjectButton.addEventListener("click", () => {
    addProjectDialog.style.display = "none";
  });

  confirmProjectButton.addEventListener("click", () => {
    const projectName = projectNameInput.value.trim();
    if (projectName) {
      if (editingProjectIndex !== null) {
        Projects().editProject(projectName, editingProjectIndex);
        domManipulationInstance.updateMainTitle(projectName, "tool-svg");
      } else {
        Projects().addProject(projectName);
        currentProjectIndex = Projects().projectList().length - 1;
      }
      domManipulationInstance.renderProjects();
      addProjectDialog.style.display = "none";
    } else {
      alert("Please enter a project name.");
    }
  });

  // Close the dialog if the user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === addProjectDialog) {
      addProjectDialog.style.display = "none";
    }
  });

  addTaskButton.addEventListener("click", () => {
    if (currentProjectIndex !== null) {
      editingTaskProjectIndex = null;
      editingTaskIndex = null;
      addTaskDialog.style.display = "flex";
      taskNameInput.value = "";
      taskDescriptionInput.value = "";
      taskDateInput.value = "";
      taskPrioritySelect.value = "";
      taskDialogHeader.textContent = "Add Task";
    } else {
      console.warn("No project selected to add a task.");
    }
  });

  cancelTaskButton.addEventListener("click", () => {
    addTaskDialog.style.display = "none";
  });

  confirmTaskButton.addEventListener("click", () => {
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskPriority = taskPrioritySelect.value;

    if (taskName && taskDate && taskPriority) {
      if (editingTaskProjectIndex !== null && editingTaskIndex !== null) {
        Projects().editTask(
          taskName,
          taskDescription,
          taskDate,
          taskPriority,
          editingTaskProjectIndex,
          editingTaskIndex
        );
      } else {
        Projects().addTask(
          taskName,
          taskDescription,
          taskDate,
          taskPriority,
          currentProjectIndex
        );
      }
      domManipulationInstance.renderTasks(currentProjectIndex);
      addTaskDialog.style.display = "none";
    } else {
      alert("Please fill in all required fields.");
    }
  });

  // Close the dialog if the user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === addTaskDialog) {
      addTaskDialog.style.display = "none";
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
      editingProjectIndex = currentProjectIndex;
      const projectName = Projects().projectList()[currentProjectIndex].title;
      projectNameInput.value = projectName;
      projectDialogHeader.textContent = "Edit Project";
      addProjectDialog.style.display = "block";
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
      editingTaskProjectIndex = projectIndex;
      editingTaskIndex = taskIndex;
      const task = Projects().projectList()[projectIndex].tasks[taskIndex];
      taskNameInput.value = task.title;
      taskDescriptionInput.value = task.description;
      taskDateInput.value = task.date;
      taskPrioritySelect.value = task.priority;
      taskDialogHeader.textContent = "Edit Task";
      addTaskDialog.style.display = "flex";
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
        let menuTitle = "";
        let menuIconClass = "";

        if (list.contains("all-task")) {
          chosenList = taskListRenderer("all-task");
          menuTitle = "All Tasks";
          menuIconClass = "month-calendar";
        } else if (list.contains("today-task")) {
          chosenList = taskListRenderer("today-task");
          menuTitle = "Today's Tasks";
          menuIconClass = "day-calendar";
        } else if (list.contains("week-task")) {
          chosenList = taskListRenderer("week-task");
          menuTitle = "This Week's Tasks";
          menuIconClass = "week-calendar";
        } else if (list.contains("important-task")) {
          chosenList = taskListRenderer("important-task");
          menuTitle = "Important Tasks";
          menuIconClass = "important-calendar";
        } else if (list.contains("completed-task")) {
          chosenList = taskListRenderer("completed-task");
          menuTitle = "Completed Tasks";
          menuIconClass = "completed-calendar";
        }

        domManipulationInstance.renderTaskList(chosenList);
        domManipulationInstance.updateMainTitle(menuTitle, menuIconClass);
        domManipulationInstance.toggleAddTaskButton(false);
      } else {
        console.warn("No valid menu item was clicked.");
      }
    });
  });
});
