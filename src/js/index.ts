import StringTask from "./models/StringTask";
import Task from "./models/Task";
/*
Purpose: This is the controller for the simplified MVC architecture this app will employ. 
          Reference: 
              Model: Responsible for the data. Alerts the view when the model updates[will add later]
              View:  Presentation of the data. Alerts the controller when presentation is edited so it can update the model. Changes when the model updates. (allows reading and setting(?) of data)
              Controller: Controls what happens when the user interface experiences user interaction. Will tell the model to update based off changes to the view.
*/
/*

Typescript example:
let task = new StringTask();
task.userTask = "We are warriors";
console.log(task.getTaskFields());

*/

const state = {
  taskList: Array<Task>()
};

const addTaskToList = taskType => {
  //Get user input
  let userTask: Task = taskType;
  state.taskList.push(userTask);
  console.log(state.taskList);

  //Clear task entry bar
  //add task to the task model list
  //update the view to present the model data to the user
};

//The controller handling user interaction with the view
document
  .querySelector("#task_field") //placeholder id name
  .addEventListener("click", addTaskToList);
