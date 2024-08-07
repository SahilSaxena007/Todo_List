import "./style.css";
import Task from "./Tasks";
import { format } from "date-fns";

function Project(title) {
  const tasks = [];
  return { title, tasks };
}

export default function Projects() {
  let projects = [];
  let today = new Date();
  const formattedToday = format(today, "dd-MM-yyyy");

  if (localStorage.getItem("projects") === null) {
    projects = [
      {
        title: "Todo List Introduction",
        tasks: [
          {
            title: "Use Project to track tasks",
            description: "",
            date: formattedToday,
            priority: "high",
            projectIndex: 0,
            taskIndex: 0,
            completed: true,
          },
          {
            title: "Set Date and priority for each task",
            description:
              "Red is high priority, yellow is medium, and green is low",
            date: formattedToday,
            priority: "medium",
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
          {
            title: "View compilated list of tasks",
            description:
              "The top left menu bar allows you to see the tasks based on time and importance",
            date: formattedToday,
            priority: "low",
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
    ];
  } else {
    const projectitem = JSON.parse(localStorage.getItem("projects"));
    projects = projectitem;
  }

  const saveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const projectList = () => {
    return projects;
  };

  const addProject = (title) => {
    const item = Project(title);
    projects.push(item);
    saveProjects();
  };

  const editProject = (title, index) => {
    projects[index].title = title;
    saveProjects();
  };

  const deleteProject = (index) => {
    if (index >= 0) {
      projects.splice(index, 1);
      saveProjects();
    }
  };

  const addTask = (title, description, date, priority, projectIndex) => {
    const new_task = Task(title, description, date, priority, projectIndex);
    const currentProject = projects[projectIndex];

    if (currentProject) {
      projects[projectIndex].tasks.push(new_task);
      saveProjects();
      console.log("After adding task: ", projects[projectIndex].tasks);
    } else {
      console.error("Invalid project index");
    }
  };

  const editTask = (
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex
  ) => {
    projects[projectIndex].tasks[taskIndex].title = title;
    projects[projectIndex].tasks[taskIndex].description = description;
    projects[projectIndex].tasks[taskIndex].date = date;
    projects[projectIndex].tasks[taskIndex].priority = [priority];
    saveProjects();
  };

  const deleteTask = (projectIndex, taskIndex) => {
    if (projectIndex >= 0) {
      projects[projectIndex].tasks.splice(taskIndex, 1);
      saveProjects();
    }
  };

  const changeTaskCompletion = (projectIndex, taskIndex) => {
    const task = projects[projectIndex].tasks[taskIndex];
    task.completed = !task.completed;
    saveProjects();
  };

  return {
    projects,
    projectList,
    addProject,
    editProject,
    deleteProject,
    editTask,
    addTask,
    deleteTask,
    changeTaskCompletion,
  };
}
