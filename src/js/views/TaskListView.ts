import Task from "../models/Task";
/*
Purpose: Responsible for adding, deleting, paginating, and returning list items.
*/

export default class TaskListView {
  constructor() {}

  getInput() {
    return (<HTMLInputElement>document.querySelector("#task")).value;
  }

  createAddTaskEvent(handler) {
    document.querySelector("#task_btn").addEventListener("click", handler); //Would have to swap func in class for new funcs. DOes that break open-closed?
  }

  assignEventDelegation = handler => {
    document
      .querySelector("#task_list_container")
      .addEventListener("click", e => {
        handler(e);
      });
  };

  renderNewTask(task: string, indexPosition : number) {
    //console.log(task);
    let new_task_item: Element;
    let task_item_div: Element;

    let task_item_button: Element;
    let task_item_icon: Element;
    new_task_item = document.createElement("li");
    new_task_item.id = `${indexPosition}`; 
    task_item_div = document.createElement("div");
    task_item_div.textContent = task;

    task_item_button = document.createElement("button");
    task_item_button.id = "btn_delete";
    task_item_icon = document.createElement("i");
    task_item_icon.textContent = "Delete";

    //append the nodes
    new_task_item.appendChild(task_item_div);
    task_item_div.appendChild(task_item_button);
    task_item_button.appendChild(task_item_icon);

    /*
    `
                      <li id="${indexPosition}">
                      <div>
                        ${task} <button id="btn_delete"><i>Icon</i></button>
                      </div>
                    </li>
    `;
    */

    //console.log(new_task_item);

    document
      .querySelector("#task_list")
      .insertAdjacentElement("beforeend", new_task_item);
  }

  //render page number of tasks
  //activated when task item added with the task_btn
  renderTaskList = (modelData: Array<Task>, itemsPerPage: number, currentPage: number) => {
    let taskField: string;
    let index = 0;
    let tasksToRenderLimit : number = 0; 
    if(modelData.length < itemsPerPage) {
      tasksToRenderLimit = modelData.length; 
    }
    for (index = 0; index < tasksToRenderLimit; index++) {
      taskField = modelData[index].getTaskFields();
      this.renderNewTask(taskField, index);
    }
  };

  calculateCurrentPage = (modelDataSize : number, itemsPerPage : number) => {
    console.log("Calculate Current Page");
    //Get the index number of the last child rendered in the task list
    let taskListItems : HTMLCollection = document.getElementById("task_list").children; 
    if(taskListItems.length === 0) return; 
    let lastRenderedItemIndex : string = taskListItems[taskListItems.length - 1].id; 
    //using the size and itemsperpage calculate the current page - add one for presentation purposes 
    let currentPage : number = Math.floor((Number(lastRenderedItemIndex) / itemsPerPage) + 1); 
    return currentPage; 
  };

  clearTaskList = () => {
    //get task list DOM element 
    let taskList : HTMLElement = document.getElementById("task_list");
    //delete the children of the list element 
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
     }
  };

  //used as setup for pagination that gets called when we click
  //calls the render task list field to reuse functionality there
  paginate = (modelData: Array<Task>, itemsPerPage: number = 5) => {
    //Calculate the current page
    let currentPage;
    currentPage = this.calculateCurrentPage(modelData.length, itemsPerPage);
    //Render our buttons
    this.renderPaginationButtons(modelData, itemsPerPage, currentPage);
    //clear list data from the view -- TODO: if new item is out of page bounds do not clear 
    this.clearTaskList();
    //render the new Tasks that are within the bounds of the current page
    this.renderTaskList(modelData, itemsPerPage, currentPage);
  };

  renderPaginationButtons = (
    modelData: Array<Task>,
    itemsPerPage: number,
    currentPage : number
  ) => {
    console.log("Render Pagination Buttons"); 
    //Determine if left button will be rendered
    if (currentPage > 1) 
    //Determine if right button will be rendered
    //Render the buttons
  };
}
