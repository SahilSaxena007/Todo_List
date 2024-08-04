import "./style.css";
import Task from "./Tasks";

function Project(title) {
  const tasks = [];
  return { title, tasks };
}

// DOM Manipulation is required
export default function Projects() {
  let projects = [];

  if (localStorage.getItem("projects") === null) {
    projects = [
      {
        title: "Clean House",
        description: "Make sure that the cupboard is also cleaned",
        tasks: [
          {
            title: "Brush House",
            description: "",
            date: "08-03-2024",
            priority: "high",
            projectIndex: 0,
            taskIndex: 0,
            completed: true,
          },
          {
            title: "Brush House",
            description: "",
            date: "08-11-2024",
            priority: "low",
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
      {
        title: "Finish HomeWork",
        description: "Constructing the neural networks is remaining.",
        tasks: [
          {
            title: "Coding",
            description: "",
            date: "12-04-2024",
            priority: "High",
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
          {
            title: "Physics",
            description: "",
            date: "12-04-2024",
            priority: "Low",
            projectIndex: 0,
            taskIndex: 0,
            completed: true,
          },
        ],
      },
    ];
  } else {
    const projectitem = JSON.parse(localStorage.getItem("projects"));
    projects = projectitem;

    // // If projects array is empty, add a default project or show a message
    // if (projects.length === 0) {
    //   projects = [
    //     {
    //       title: "Default Project",
    //       description: "This is a default project to get started.",
    //       tasks: [
    //         {
    //           title: "This project appears when you have no projects left",
    //           description: "This is a default task.",
    //           date: "12-04-2024",
    //           priority: "medium",
    //           projectIndex: 0,
    //           taskIndex: 0,
    //           completed: false,
    //         },
    //       ],
    //     },
    //   ];
    // }
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
