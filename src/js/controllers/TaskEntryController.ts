import Controller from "./Controller";
import StringTask from "../models/StringTask";
import TaskListView from "../views/TaskListView";
import TaskListModel from "../models/TaskListModel";
import Task from "../models/Task";

/*
Define the task entry controller. In index instantiate it. Hav eit grab the user input.
Technically we still need to know which controller we are making and it cannot just be decided--is that necessary or part of MVC?
One option is an if statement to see what "view" is on the DOM, and instantiate the correct controller for that view.
That might mean making and destroying a lot of controllers. Maybe not so efficient.
*/
export default class TaskEntryController implements Controller {
  model: TaskListModel = new TaskListModel();
  view: TaskListView = new TaskListView();

  constructor(model: TaskListModel, view: TaskListView) {
    this.model = model;
    this.view = view;
  }

  addEvents() {
    //configure what function will be called
    this.view.createAddTaskEvent(this.addTaskToList);
    this.view.assignEventDelegation(this.chooseHandler);
  }

  addTaskToList = () => {
    //Get user input
    console.log("addTaskToList called");
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
    this.view.renderTaskList(modelData);
  };

  deleteTaskItem = (taskBtn: Element) => {
    console.log(taskBtn.parentNode.parentNode);
    const task_list: Node = taskBtn.parentNode.parentNode.parentNode;
    const target: Node = taskBtn.parentNode.parentNode;
    task_list.removeChild(target);
  };

  chooseHandler = e => {
    const element: Element = e.target.closest("#btn_delete");
    if (element.id === "btn_delete") {
      this.deleteTaskItem(element);
    }
  };
}
