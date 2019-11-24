import Task from "../models/Task";

/*
Purpose: Responsible for adding, deleting, paginating the ToDo list. 
*/

export default class ToDoListView {
  constructor() {
    //currentPage = 1;
  }

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
        console.log(e);
        handler(e);
      });
  };

  // delete the user inputted task from the todo list
  deleteTaskItem = taskBtn => {
    //Get the task list
    const task_list: Node = taskBtn.parentNode.parentNode.parentNode;

    //Mark the target that will be deleted
    const target: Node = taskBtn.parentNode.parentNode;

    //Remove the target from the DOM
    task_list.removeChild(target);
  };

  assignPageChangeLeftDelegation = handler => {
    document.querySelector("#left_page").addEventListener("click", e => {
      handler(e);
    });
  };

  assignPageChangeRightDelegation = handler => {
    document.querySelector("#right_page").addEventListener("click", e => {
      handler(e);
    });
  };

  renderNewTask(task: string, indexPosition: number) {
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

    document
      .querySelector("#task_list")
      .insertAdjacentElement("beforeend", new_task_item);
  }

  //render page number of tasks
  //activated when task item added with the task_btn
  renderTaskList = (
    modelData: Array<Task>,
    itemsPerPage: number,
    currentPage: number = 0
  ) => {
    let taskField: string;
    let index = currentPage * itemsPerPage - itemsPerPage;
    let taskIterator: number = 0;
    let tasksToRenderLimit: number = 0;
    if (modelData.length < itemsPerPage) {
      tasksToRenderLimit = modelData.length;
    } else if (modelData.length > currentPage * itemsPerPage) {
      //when we are rebuilding a page
      tasksToRenderLimit = itemsPerPage;
    } else {
      //when we are building a page
      tasksToRenderLimit = modelData.length - index;
    }

    for (taskIterator; taskIterator < tasksToRenderLimit; taskIterator++) {
      taskField = modelData[index].getTaskFields();
      console.log("Task field value is: " + taskField);
      this.renderNewTask(taskField, index);
      index++;
    }
  };

  calculateNextPage = (
    modelDataSize: number,
    itemsPerPage: number,
    currentPage: number
  ) => {
    console.log("Calculate Next Page");

    let lastIndexInPageRange: number = currentPage * itemsPerPage - 1;

    if (modelDataSize > lastIndexInPageRange + 1) {
      return currentPage + 1;
    } else {
      return 0; //no next page
    }
  };

  calculatePreviousPage = (
    modelDataSize: number,
    itemsPerPage,
    currentPage: number
  ) => {
    let firstIndexInPageRange: number =
      currentPage * itemsPerPage - 1 - itemsPerPage - 1;

    if (currentPage !== 1 && modelDataSize > firstIndexInPageRange) {
      return currentPage - 1;
    } else {
      return 0; //no previous page
    }
  };

  getLastRenderedItemID = () => {
    //Get the index number of the last child rendered in the task list
    let taskListItems: HTMLCollection = document.getElementById("task_list")
      .children;

    if (taskListItems.length === 0) {
      return -1;
    }

    let lastItemIndex: number = Number(
      taskListItems[taskListItems.length - 1].id
    );

    return lastItemIndex;
  };

  calculateCurrentPage = (modelDataSize: number, itemsPerPage: number) => {
    //Tell us the page we are on. Do not increment the page.
    console.log("In Calculate Current Page");

    // console.log("In paginate current page is:" + currentPage);
    // console.log("In paginate last item id: " + lastItemID);

    let lastItemID = this.getLastRenderedItemID();

    //no items yet rendered. So page one.
    if (lastItemID === -1) {
      return 1;
    }

    if (lastItemID < itemsPerPage - 1) {
      return 1;
    }

    console.log("Last Item Index: " + lastItemID.toString());

    //necessary to add one for the correct page. But when on last ID item for the current range, it incremenets the page. Need to prevent this.
    let currentPage: number = Math.floor(lastItemID / itemsPerPage) + 1;

    // //Determine if new items need to be rendered
    // if (this.getLastRenderedItemID() === (itemsPerPage - 1) * currentPage) {
    //   console.log("Should not ");
    //   currentPage -= 1;
    //   console.log("Current Page is: " + currentPage);
    //   return currentPage - 1;
    // }

    console.log("Current Page calculation result: " + currentPage);

    return currentPage;
  };

  clearTaskList = () => {
    //get task list DOM element
    let taskList: HTMLElement = document.getElementById("task_list");
    //delete the children of the list element
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  };

  //used as setup for pagination that gets called when we click
  //calls the render task list field to reuse functionality there
  //when we click we pass in the current page so we can use that number to help render the correct range in rendertasklist
  paginate = (
    modelData: Array<Task>,
    itemsPerPage: number = 5,
    currentPage: number
  ) => {
    //Render our buttons
    this.renderPaginationButtons(modelData, itemsPerPage, currentPage);

    //Check if we are on last item of our current page
    if (currentPage * itemsPerPage - 1 === this.getLastRenderedItemID()) {
      console.log("Items to render out of current page range.");
      return;
    }
    //clear list data from the view -- TODO: if new item is out of page bounds do not clear
    this.clearTaskList();

    //render the new Tasks that are within the bounds of the current page
    this.renderTaskList(modelData, itemsPerPage, currentPage);
  };

  renderPaginationButtons = (
    modelData: Array<Task>,
    itemsPerPage: number,
    currentPage: number
  ) => {
    console.log("Render Pagination Buttons");
    let leftPageNumber: number;
    let rightPageNumber: number;

    let leftPageBtn: HTMLElement = document.getElementById("left_page");
    let rightPageBtn: HTMLElement = document.getElementById("right_page");

    // //Get the index number of the last child rendered in the task list
    // let taskListItems: HTMLCollection = document.getElementById("task_list")
    //   .children;

    // //Render nothing if no elements are on the page
    // if (taskListItems.length === 0) {
    //   leftPageBtn.style.visibility = "hidden";
    //   rightPageBtn.style.visibility = "hidden";
    //   return;
    // }

    //Calculate the left page number
    leftPageNumber = this.calculatePreviousPage(
      modelData.length,
      itemsPerPage,
      currentPage
    );

    //calculate the right page number
    rightPageNumber = this.calculateNextPage(
      modelData.length,
      itemsPerPage,
      currentPage
    );

    //render the buttons
    if (leftPageNumber > 0) {
      leftPageBtn.style.visibility = "visible";
      leftPageBtn.firstChild.textContent = leftPageNumber.toString(10);
    } else {
      leftPageBtn.style.visibility = "hidden";
    }

    if (rightPageNumber > 0) {
      rightPageBtn.style.visibility = "visible";
      rightPageBtn.firstChild.textContent = rightPageNumber.toString(10);
    } else {
      rightPageBtn.style.visibility = "hidden";
    }
  };
}
