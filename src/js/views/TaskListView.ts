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

  renderNewTask(task: string) {
    console.log(task);
    let new_task_item: Element;
    let task_item_div: Element;

    let task_item_button: Element;
    let task_item_icon: Element;
    new_task_item = document.createElement("li");
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
                      <li>
                      <div>
                        ${task} <button id="btn_delete"><i>Icon</i></button>
                      </div>
                    </li>
    `;
    */

    console.log(new_task_item);

    document
      .querySelector("#task_list")
      .insertAdjacentElement("beforeend", new_task_item);
  }

  //render page number of tasks
  //activated when task item added with the task_btn
  renderTaskList = (modelData: Array<Task>, itemsPerPage: number) => {
    let taskField: string;
    let index = 0;
    // for (index = 0; index < itemsPerPage; index++) {
    //   taskField = modelData.getTaskFields();
    //   this.renderNewTask(taskField);
    // }
  };

  calculateCurrentPage = () => {};

  clearTaskList = () => {};

  //used as setup for pagination that gets called when we click
  //calls the render task list field to reuse funcitonality there
  paginate = (modelData: Array<Task>, itemsPerPage: number = 5) => {
    //Calculate the current page
    let currentPage = 0;
    this.calculateCurrentPage();
    //Render our buttons
    this.renderPaginationButtons(modelData, currentPage, itemsPerPage);
    //clear list data from the view
    this.clearTaskList();
    //render the new Tasks that are within the bounds of the current page
    this.renderTaskList(modelData, itemsPerPage);
  };

  renderPaginationButtons = (
    modelData: Array<Task>,
    currentPage: number,
    itemsPerPage: number
  ) => {
    //Determine if left button will be rendered
    //Determine if right button will be rendered
    //Render the buttons
  };
}
