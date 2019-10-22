//import View from './views/view'; 
import TaskEntryController from './controllers/TaskEntryController'; 
import TaskEntryView from './views/TaskEntryView'; 
import TaskEntryModel from './models/TaskEntryModel'; 
/*
Purpose: This is the controller for the simplified MVC architecture this app will employ. 
          Reference: 
              Model: Responsible for the data. Alerts the view when the model updates[will add later]
              View:  Presentation of the data. Alerts the controller when presentation is edited so it can update the model. Changes when the model updates. (allows reading and setting(?) of data)
              Controller: Controls what happens when the user interface experiences user interaction. Will tell the model to update based off changes to the view.
*/

let taskEnterModel = new TaskEntryModel(); 
let taskEnterView = new TaskEntryView(); 
let taskList = new TaskEntryController(taskEnterModel, taskEnterView); 
console.log(taskList); 
taskList.addEvents("click", "#task_btn"); 
