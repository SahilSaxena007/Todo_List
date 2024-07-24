
import './style.css'
import {parse,format,getYear, set} from 'date-fns';

function Todo(title,description,date,priority){
    const title = title;
    const description = description;
    const date = date;
    const priority = priority;
    let completed = false;

    const getCompleted = ()=>{
        return completed;
    }

    const setCompleted = ()=>{
        completed = true;
    }

    const setNotCompleted = ()=>{
        completed = false;
    }


    return {title, description, date, priority, getCompleted, setCompleted,setNotCompleted}
}

function Project(title, description){
    const projectTitle = title;
    const projectDescription = description;
    let todoArray = [];

    const getTodoList = ()=>{
        return todoArray;
    }

    const addTodo = (title, description, date, priority)=>{
        const item = Todo(title, description, date, priority);
        todoArray.push(item);
        // Call DOM to display
    }
    
    return {projectTitle, projectDescription, getTodoList, addTodo}
}

function DOManipulation(){
    
}



/*const date = getYear(new Date());
console.log(date)


const currentDate = new Date();
const formattedDate = format(currentDate,'yyyy-MM-dd');
console.log(formattedDate);*/