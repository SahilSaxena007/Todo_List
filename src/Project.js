import "./style.css";

function Project(title, description) {
  const tasks = [];
  return { title, description, tasks };
}

// DOM Manipulation is required
function Projects() {
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
            date: "12-04-2024",
            priority: "High",
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
          {
            title: "Brush House",
            description: "",
            date: "12-04-2024",
            priority: "High",
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
      {
        title: "Finish HomeWork",
        description: "Constructing the neural networks is remaining.",
        tasks: [],
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

  const addProject = (title, description) => {
    const item = Project(title, description);
    projects.push(item);
    saveProjects();
  };

  const editProject = (title, description, index) => {
    projects[index].title = title;
    projects[index].description = description;
    saveProjects();
  };

  const deleteProject = (index) => {
    if (index >= 0) {
      projects.splice(index, 1);
      saveProjects();
    }
  };

  return { projects, projectList, addProject, editProject, deleteProject };
}

export default Projects;
