import Projects from "./Project";

export default function Task(
  title,
  description,
  date,
  priority,
  projectIndex,
  taskIndex
) {
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
// function Tasks() {
//   const saveProjects = () => {
//     localStorage.setItem("projects", JSON.stringify(Projects().projectList()));
//   };

//   const addTask = (title, description, date, priority, projectIndex) => {
//     const new_task = Task(title, description, date, priority, projectIndex);
//     const currentProject = Projects().projectList()[projectIndex];

//     if (currentProject) {
//       Projects().projectList()[projectIndex].tasks.push(new_task);
//       saveProjects();
//       console.log(
//         "After adding task: ",
//         Projects().projectList()[projectIndex].tasks
//       );
//     } else {
//       console.error("Invalid project index");
//     }
//   };

//   const editTask = (
//     title,
//     description,
//     date,
//     priority,
//     projectIndex,
//     taskIndex
//   ) => {
//     Projects().projectList()[projectIndex].tasks[taskIndex].title = title;
//     Projects().projectList()[projectIndex].tasks[taskIndex].description =
//       description;
//     Projects().projectList()[projectIndex].tasks[taskIndex].date = date;
//     Projects().projectList()[projectIndex].tasks[taskIndex].priority = [
//       priority,
//     ];
//     saveProjects();
//   };

//   const deleteTask = (projectIndex, taskIndex) => {
//     if (projectIndex >= 0) {
//       Projects().projectList()[projectIndex].tasks.splice(taskIndex, 1);
//       saveProjects();
//     }
//   };

//   const changeTaskCompletion = (projectIndex, taskIndex) => {
//     const task = Projects().projectList()[projectIndex].tasks[taskIndex];
//     task.completed = !task.completed;
//     saveProjects();
//   };
//   return { addTask, editTask, deleteTask, changeTaskCompletion };
// }
