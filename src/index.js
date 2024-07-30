import "./style.css";
import { parse, format, getYear, set } from "date-fns";
import { DOManipulation } from "./dom";

const domManipulationInstance = DOManipulation();
domManipulationInstance.renderProjects();
domManipulationInstance.renderTasks(0);
// domManipulationInstance.updateMainTitle("Good Boy");
/*const date = getYear(new Date());
console.log(date)


const currentDate = new Date();
const formattedDate = format(currentDate,'yyyy-MM-dd');
console.log(formattedDate);*/
