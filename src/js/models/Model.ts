import Task from './Task'; 
/*
Base class for the models.
*/

export default interface Model {
    //returns decomposed data --make a template later
    getModelData() : Array <Task>
    setModelData(userTask : Task) : void 
}