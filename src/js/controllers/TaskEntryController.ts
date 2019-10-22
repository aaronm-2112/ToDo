import Controller from './Controller'; 
import StringTask from '../models/StringTask'; 
import TaskEntryView from '../views/TaskEntryView'; 
import TaskEntryModel from '../models/TaskEntryModel'; 
/*
Define the task entry controller. In index instantiate it. Hav eit grab the user input.
Technically we still need to know which controller we are making and it cannot just be decided--is that necessary or part of MVC?
One option is an if statement to see what "view" is on the DOM, and instantiate the correct controller for that view.
That might mean making and destroying a lot of controllers. Maybe not so efficient.
*/
export default class TaskEntryController implements Controller {
    model : TaskEntryModel = new TaskEntryModel(); 
    view : TaskEntryView = new TaskEntryView(); 


    constructor(model : TaskEntryModel, view : TaskEntryView) {
        this.model = model; 
        this.view = view;  
    }

    addEvents(event: string, DOMElement: string ) {
        //configure what function will be called
        if(DOMElement === "#task_btn") {
             //add a click event for the DOM element
             console.log("In action adding function"); 
             document.querySelector(DOMElement).addEventListener(event, this.addTaskToList); //Would have to swap func in class for new funcs. DOes that break open-closed?
        }
       

    }

    addTaskToList = () => {
        //Get user input
        console.log("addTaskToList called"); 
        let userInput : string; 
        userInput = this.view.getInput(); 
        let userTask : StringTask = new StringTask(userInput); 
        //Clear task entry bar
        //add task to the task model list
        this.model.addTask(userTask);
        //parse the data --upcoming 
        this.model.parseData(); 
      };

      
}