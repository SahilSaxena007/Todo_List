import "./style.css";
import { parse, format, getYear, set } from "date-fns";
import { DOManipulation } from "./dom";
import Projects from "./Project";
// import {
//   addProjectHandler,
//   editProjectHandler,
//   deleteProjectHandler,
//   addTaskHandler,
//   editTaskHandler,
//   deleteTaskHandler,
//   taskCompletionHandler,
//   projectClickHandler,
// } from "./handler";

// const domManipulationInstance = DOManipulation();
// domManipulationInstance.renderProjects();
// domManipulationInstance.renderTasks(0);

document.addEventListener("DOMContentLoaded", () => {
  const domManipulationInstance = DOManipulation();
  domManipulationInstance.renderProjects();
  domManipulationInstance.renderTasks(0);
  domManipulationInstance.updateMainTitle(Projects().projectList()[0].title);
});
