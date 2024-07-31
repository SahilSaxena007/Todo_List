import { ta } from "date-fns/locale";
import { DOManipulation } from "./dom";
import Projects from "./Project";
import Tasks from "./Tasks";

export const Handler = () => {
  const projects = Projects();
  const tasks = Tasks();

  const checkAndRenderTask = (length) => {
    if (length !== 0) {
      DOManipulation().renderTasks(length - 1);
    }
  };

  const addProjectHandler = () => {
    const title = prompt("Enter project title:");
    const description = prompt("Enter project description:");
    projects.addProject(title, description);
    DOManipulation().renderProjects();
    // checkAndRenderTask(projects.projectList().length);
  };

  const editProjectHandler = (projectIndex) => {
    const title = prompt("Enter project title:");
    const description = prompt("Enter project description:");
    projects.editProject(title, description, projectIndex);
    DOManipulation().renderProjects();
    // checkAndRenderTask(projects.projectList().length);
  };

  const deleteProjectHandler = (index) => {
    projects.deleteProject(index);
    DOManipulation().renderProjects();
    // checkAndRenderTask(projects.projectList().length);
  };

  const addTaskHandler = (projectIndex) => {
    const title = prompt("What is the title: ");
    const description = prompt("What is the Description: ");
    const date = prompt("The date (dd-MM-yyyy): ");
    const priority = prompt("What is the Priority: ");
    tasks.addTask(title, description, date, priority, projectIndex);
    DOManipulation().renderTasks(projectIndex);
  };

  const editTaskHandler = (projectIndex, taskIndex) => {
    const title = prompt("What is the title: ");
    const description = prompt("What is the Description: ");
    const date = prompt("The date (dd-MM-yyyy): ");
    const priority = prompt("What is the Priority: ");
    tasks.editTask(title, description, date, priority, projectIndex, taskIndex);
    DOManipulation().renderTasks(projectIndex);
  };

  const deleteTaskHandler = (projectIndex, taskIndex) => {
    tasks.deleteTask(projectIndex, taskIndex);
    DOManipulation().renderTasks(projectIndex);
  };

  const taskCompletionHandler = (projectIndex, taskIndex) => {
    tasks.changeTaskCompletion(projectIndex, taskIndex);
    DOManipulation().renderTasks(projectIndex);
  };

  return {
    addProjectHandler,
    editProjectHandler,
    deleteProjectHandler,
    addTaskHandler,
    editTaskHandler,
    deleteTaskHandler,
    taskCompletionHandler,
  };
};
