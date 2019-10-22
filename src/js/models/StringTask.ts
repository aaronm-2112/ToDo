import Task from "./Task";

export default class StringTask implements Task {
  private userTask: String;

  constructor(userInput) {
    this.userTask = "";
  }

  getTaskFields() {
    return this.userTask;
  }

  setTaskValue(task: string) {
    this.userTask = task; 
  }
}
