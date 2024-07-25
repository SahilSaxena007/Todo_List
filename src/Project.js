import './style.css'

function Project(title, description){
    const tasks = [];
    return {title, description,tasks};
}

// DOM Manipulation is required
function Projects(){
    let projects = [];

    if (localStorage.getItem('projects') === null){
        projects = [
            {
                title:"Clean House",
                description:"Make sure that the cupboard is also cleaned",
                tasks: []
                
            },
            {
                title: "Finish HomeWork",
                description: "Constructing the neural networks is remaining.",
                tasks: []
            }
        ]
    }else{
        const projectitem = JSON.parse(localStorage.getItem('projects'));
        projects = projectitem;
    }

    const projectList = ()=>{
        return projects;
    }

    const addProject = (title, description)=>{
        const item = Project(title,description);
        projects.push(item);        
    }

    const editProject = (title, description, index)=>{
        projects[index].title = title;
        projects[index].description = description;
    }

    const deleteProject = (index) =>{
        if (index >= 0){
            projects.splice(index,1);
        }
    }
    
    return {projects,projectList, addProject, editProject,deleteProject}
}

export default Projects;