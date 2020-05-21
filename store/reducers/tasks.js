import { COMPLETE_TASK, CREATE_TASK, EDIT_TASK, REACTIVATE_TASK } from "../actions/tasks";
import Task from "../../models/task";
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
    case CREATE_TASK: {
      const { taskName, taskDescription, taskDueDate } = action;
      const newTask = Task.create(taskName, taskDescription, taskDueDate);

      return {
        ...state,
        activeTasks: state.activeTasks.concat(newTask),
      };
    }
    case EDIT_TASK: {
      const taskToUpdate = state.activeTasks.find((task) => task.id === action.task.id);

      taskToUpdate.name = action.task.name;
      taskToUpdate.description = action.task.description;
      taskToUpdate.dueDate = action.task.dueDate;

      return {
        ...state,
        activeTasks: [...state.activeTasks],
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
