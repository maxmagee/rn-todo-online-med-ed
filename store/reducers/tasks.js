import { COMPLETE_TASK, REACTIVATE_TASK } from "../actions/tasks";
import TASKS from "../../data/dummy-data";

const initialState = {
  activeTasks: TASKS.filter((task) => task.isActive),
  completedTasks: TASKS.filter((task) => !task.isActive),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_TASK: {
      const updatedActiveTasks = state.activeTasks.filter((task) => task.id !== action.task.id);
      const completedTask = action.task;

      completedTask.dateCompleted = new Date();
      completedTask.isActive = false;

      return {
        ...state,
        activeTasks: updatedActiveTasks,
        completedTasks: state.completedTasks.concat(completedTask),
      };
    }
    case REACTIVATE_TASK: {
      const updatedCompletedTasks = state.completedTasks.filter(
        (task) => task.id !== action.task.id
      );
      const activatedTask = action.task;

      activatedTask.dateCompleted = null;
      activatedTask.isActive = true;

      return {
        ...state,
        activeTasks: state.activeTasks.concat(activatedTask),
        completedTasks: updatedCompletedTasks,
      };
    }
    default:
      return state;
  }
};
