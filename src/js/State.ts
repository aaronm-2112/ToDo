/*
Holds the programs state, and subscribes observers to changes in state.
In particular the ListViewController's AddTask method will be subscribed and then notified when a task is added to state.
It will then add the new task to the taskListmodel. The tasklistmodel will notify the view and the view will update. 
*/

/* Methods:
      -AddObserver
      =notifyobserver
   Properties:
      -State
*/
