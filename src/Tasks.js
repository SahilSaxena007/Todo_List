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
