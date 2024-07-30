import Projects from "./Project";

function Task(title, description, date, priority, projectIndex, taskIndex) {
  let completed = false;

  const setCompleted = () => {
    completed = true;
  };

  const setNotCompleted = () => {
    completed = false;
  };

  return {
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex,
    completed,
  };
}

function Tasks() {
  const saveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const addTask = (
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex
  ) => {
    const new_task = Task(
      title,
      description,
      date,
      priority,
      projectIndex,
      taskIndex
    );
    Projects.projects[projectIndex].tasks.push(new_task);
    saveProjects();
  };

  const editTask = (
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex
  ) => {
    Projects.projects[projectIndex].tasks[taskIndex].title = title;
    Projects.projects[projectIndex].tasks[taskIndex].description = description;
    Projects.projects[projectIndex].tasks[taskIndex].date = date;
    Projects.projects[projectIndex].tasks[taskIndex].priority = [priority];
    saveProjects();
  };

  const deleteTask = (projectIndex, taskIndex) => {
    if (projectIndex >= 0) {
      Projects.projects[projectIndex].tasks.splice(taskIndex, 1);
      saveProjects();
    }
  };

  const changeTaskCompletion = (projectIndex, taskIndex, done) => {
    const task = projects[projectIndex].tasks[taskIndex];
    task.completed = !task.completed;
    saveProjects();
  };
  return { addTask, editTask, deleteTask, changeTaskCompletion };
}

export default Tasks;
