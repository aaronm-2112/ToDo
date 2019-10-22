import View from './View'; 
/*
Purpose: Returns task search bar value for the controller
*/

//export const getInput = () => document.querySelector("#task_entry_bar").value;
export default class TaskEntryView implements View {
    constructor() {
       
    }

    getInput() {
        return (<HTMLInputElement> document.querySelector("#task")).value; 
    }
}