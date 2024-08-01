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
    const description = prompt("Enter project description:");
    console.log("before add: ", Projects().projectList());
    Projects().addProject(title, description);
    console.log("after add: ", Projects().projectList());
    DOManipulation().renderProjects();
    // checkAndRenderTask(projects.projectList().length);
  };

  const editProjectHandler = (projectIndex) => {
    const title = prompt("Enter project title:");
    const description = prompt("Enter project description:");
    console.log("before edit: ", Projects().projectList());
    Projects().editProject(title, description, projectIndex);
    console.log("after edit: ", Projects().projectList());
    DOManipulation().renderProjects();
    // checkAndRenderTask(projects.projectList().length);
  };

  const deleteProjectHandler = (index) => {
    console.log("before delete: ", Projects().projectList());
    Projects().deleteProject(index);
    console.log("after delete: ", Projects().projectList());
    DOManipulation().renderProjects();
    // checkAndRenderTask(projects.projectList().length);
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
