import Task from "./Task";
import Model from "./Model";
/*
Purpose: Responsible for working on the data in the TaskListView.
*/
export default class ToDoListModel implements Model {
  private taskModelData: Array<Task>;

  constructor() {
    this.taskModelData = new Array();
  }

  setModelData(task: Task) {
    this.taskModelData.push(task);
  }

  getModelData() {
    let result = new Array<Task>();
    this.taskModelData.forEach(task => {
      result.push(task);
    });

    return result;
  }

  parseData() {
    console.log("Data Parsed");
  }
}
