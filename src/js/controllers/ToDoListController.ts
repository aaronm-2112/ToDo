import Controller from "./Controller";
import StringTask from "../models/StringTask";
import ToDoListView from "../views/ToDoListView";
import ToDoListModel from "../models/ToDoListModel";
import Task from "../models/Task";

/*
The controller for the ToDo list. The controller encompasses the task entry and the ToDo list methods. 
*/
export default class ToDoListController implements Controller {
  model: ToDoListModel = new ToDoListModel();
  view: ToDoListView = new ToDoListView();

  constructor(model: ToDoListModel, view: ToDoListView) {
    this.model = model;
    this.view = view;
  }

  public addEvents() {
    //configure what actions the controller will initiate.
    this.view.createAddTaskEvent(this.addTaskToList);
    this.view.assignEventDelegation(this.chooseHandler);
    this.view.assignPageChangeLeftDelegation(this.changePage);
    this.view.assignPageChangeRightDelegation(this.changePage);
  }

  // change the page being displayed.
  public changePage = e => {
    // get the current tasks
    let modelData: Array<Task> = this.model.getModelData();

    //Clear the display
    this.view.clearTaskList();

    //display the tasks on the next page
    this.view.paginate(modelData, 5, Number(e.target.textContent));
  };

  // adds the user inputted task to the todo list
  public addTaskToList = () => {
    //Get user input
    let userInput: string;
    userInput = this.view.getInput();
    let userTask: StringTask = new StringTask(userInput);

    //Clear task entry bar

    //add task to the task model list
    this.model.setModelData(userTask);

    //parse the data --upcoming
    this.model.parseData();

    //Add the data to the view
    let modelData: Array<Task> = this.model.getModelData();
    this.view.paginate(
      modelData,
      5,
      this.view.calculateCurrentPage(modelData.length, 5)
    );
  };

  // Can be expanded upon when more functionality is added to each task
  // determines what action to take when the task item displayed is clicked
  public chooseHandler = e => {
    const element: Element = e.target.closest("#btn_delete");
    console.log(element);
    // if the element is btn delete task, then delete the task with the
    if (element.id === "btn_delete") {
      //delete the element from the view
      this.view.deleteTaskItem(element);
      //update the model
    }
  };
}
