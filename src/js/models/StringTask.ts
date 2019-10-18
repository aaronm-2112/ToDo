import Task from "./Task";

export default class StringTask implements Task {
  userTask: String;

  constructor() {
    this.userTask = "";
  }

  getTaskFields() {
    return this.userTask;
  }
}
