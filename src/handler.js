import { ta } from "date-fns/locale";
import { DOManipulation } from "./dom";
import Projects from "./Project";

export const Handler = () => {
  const checkAndRenderTask = (length) => {
    if (length !== 0) {
      DOManipulation().renderTasks(length - 1);
    }
  };

  const addProjectHandler = () => {
    const title = prompt("Enter project title:");
    Projects().addProject(title);
    DOManipulation().renderProjects();
  };

  const editProjectHandler = (projectIndex) => {
    const title = prompt("Enter project title:");
    Projects().editProject(title, projectIndex);
    DOManipulation().renderProjects();
  };

  const deleteProjectHandler = (index) => {
    Projects().deleteProject(index);
    DOManipulation().renderProjects();

    // Check if there are remaining projects
    const remainingProjects = Projects().projectList();

    if (remainingProjects.length > 0) {
      // Render tasks for the first remaining project
      DOManipulation().renderTasks(0);
      DOManipulation().updateMainTitle(remainingProjects[0].title);
    } else {
      // Clear the task container and main title if no projects remain
      DOManipulation().clearTasks();
      DOManipulation().clearMainTitle();
    }
  };

  const addTaskHandler = (projectIndex) => {
    const title = prompt("What is the title: ");
    const description = prompt("What is the Description: ");
    const date = prompt("The date (dd-MM-yyyy): ");
    const priority = prompt("What is the Priority: ");

    // Log the projects list before adding
    console.log(
      "Before adding task - Project: ",
      Projects().projectList()[projectIndex]
    );
    Projects().addTask(title, description, date, priority, projectIndex);
    console.log(
      "After adding task - Project: ",
      Projects().projectList()[projectIndex]
    );

    // Re-render the tasks for the given project index
    DOManipulation().renderTasks(projectIndex);
  };

  const editTaskHandler = (projectIndex, taskIndex) => {
    const title = prompt("What is the title: ");
    const description = prompt("What is the Description: ");
    const date = prompt("The date (dd-MM-yyyy): ");
    const priority = prompt("What is the Priority: ");
    Projects().editTask(
      title,
      description,
      date,
      priority,
      projectIndex,
      taskIndex
    );
    DOManipulation().renderTasks(projectIndex);
  };

  const deleteTaskHandler = (projectIndex, taskIndex) => {
    Projects().deleteTask(projectIndex, taskIndex);
    DOManipulation().renderTasks(projectIndex);
  };

  const taskCompletionHandler = (projectIndex, taskIndex) => {
    Projects().changeTaskCompletion(projectIndex, taskIndex);
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
