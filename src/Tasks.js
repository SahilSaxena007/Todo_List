import Projects from "./Project";

function Task(title,description,date,priority,projectIndex, taskIndex){
    let completed = false;

    const setCompleted = ()=>{
        completed = true;
    }

    const setNotCompleted = ()=>{
        completed = false;
    }


    return {title, description, date, priority, projectIndex, taskIndex, completed, setCompleted,setNotCompleted}
}

function Tasks(){
    const addTask=(title,description,date,priority,projectIndex,taskIndex)=>{
        const new_task = Task(title,description,date,priority,projectIndex,taskIndex);
        Projects.projects[projectIndex].tasks.push(new_task);
    }

    const editTask=(title,description,date,priority,projectIndex,taskIndex)=>{
        Projects.projects[projectIndex].tasks[taskIndex].title = title;
        Projects.projects[projectIndex].tasks[taskIndex].description = description;
        Projects.projects[projectIndex].tasks[taskIndex].date = date;
        Projects.projects[projectIndex].tasks[taskIndex].priority = [priority];
    }

    const deleteTask = (projectIndex, taskIndex)=>{
        if (projectIndex>=0){
            Projects.projects[projectIndex].tasks.splice(taskIndex,1);
        }
        
    }

    const changeTaskCompletion = (projectIndex, taskIndex, done)=>{
        if (Projects.projects[projectIndex].tasks[taskIndex].completed === false){
            Projects.projects[projectIndex].tasks[taskIndex].completed === true;

        }else{
            Projects.projects[projectIndex].tasks[taskIndex].completed === false;
        }
    }
    return {addTask, editTask, deleteTask,changeTaskCompletion}
}

