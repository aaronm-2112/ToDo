import Model from "./models/Model";
/*
Purpose: Responsible for taking two generic models and transferring the data between them.
*/

export default class Pipe {
  constructor() {}

  //any models get always returns an array of Task objects
  transfer(modelOne: Model, modelTwo: Model) {
    let modelData = modelOne.getModelData();
    modelData.forEach(task => {
      modelTwo.setModelData(task);
    });
  }
}
