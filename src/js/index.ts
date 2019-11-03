import TaskEntryController from "./controllers/TaskEntryController";
import TaskListView from "./views/TaskListView";
import TaskListModel from "./models/TaskListModel";
/*
Purpose: This is the controller for the simplified MVC architecture this app will employ. 
          Reference: 
              Model: Responsible for the data. Alerts the view when the model updates[will add later]
              View:  Presentation of the data. Alerts the controller when presentation is edited so it can update the model. Changes when the model updates. (allows reading and setting(?) of data). Does the logic of wiring events to the view DOM objects. 
              Controller: Controls what happens when the user interface experiences user interaction. Will tell the model to update based off changes to the view.
*/

//TODO: Put less details of wiring an event on the controller. Leave it to view so it can be more flexible
//TODO: Implement with an observer

//let taskEnterModel = new TaskEntryModel();
let taskListModel = new TaskListModel();
let taskListView = new TaskListView();

//let pipe = new Pipe();
let taskList = new TaskEntryController(taskListModel, taskListView);
taskList.addEvents();
