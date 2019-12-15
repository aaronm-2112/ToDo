import ToDoListController from "./controllers/ToDoListController";
import ToDoListView from "./views/ToDoListView";
import ToDoListModel from "./models/ToDoListModel";
/*
Purpose: This is the guidelines (tho not perfectly followed) for the simplified MV* architecture this app will employ. 
          Reference: 
              Model: Responsible for the data. Alerts the view when the model updates[will add later]
              View:  Presentation of the data. Alerts the controller when presentation is edited so it can update the model. Changes when the model updates. (allows reading and setting(?) of data). Does the logic of wiring events to the view DOM objects. 
              Controller: Controls what happens when the user interface experiences user interaction. Will tell the model to update based off changes to the view.

              Models represent application data whilst views are what the user is presented on screen. As such, MVC relies on the Observer pattern for some of its core communication (something that surprisingly isn't covered in many articles about the MVC pattern). When a model is changed it notifies its observers (Views) that something has been updated - this is perhaps the most important relationship in MVC. The observer nature of this relationship is also what facilitates multiple views being attached to the same model.

              For developers interested in knowing more about the decoupled nature of MVC (once again, depending on the implementation), one of the goals of the pattern is to help define one-to-many relationships between a topic (data object) and its observers. When a topic changes, its observers are updated. Views and controllers have a slightly different relationship. Controllers facilitate views to respond to different user input and are an example of the Strategy pattern.
*/

//TODO: Put less details of wiring an event on the controller. Leave it to view so it can be more flexible
//TODO: Implement with an observer

//let taskEnterModel = new TaskEntryModel();
let taskListModel = new ToDoListModel();
let taskListView = new ToDoListView();

//let pipe = new Pipe();
let toDoList = new ToDoListController(taskListModel, taskListView);
toDoList.addEvents();
