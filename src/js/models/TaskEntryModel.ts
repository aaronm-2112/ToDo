import Task from "./Task";
import Model from "./Model";

/*
Purpose: Will return the values entered in the text box.
*/
export default class TaskEntryModel implements Model {
  private taskList: Array<Task>;

  constructor() {
    this.taskList = new Array();
  }

  setModelData(userTask: Task) {
    this.taskList.push(userTask);
  }

  getModelData() {
    let result: Array<Task>;
    this.taskList.forEach(task => {
      result.push(task);
    });
    return result;
  }

  parseData() {
    console.log("Data Parsed");
  }
}
