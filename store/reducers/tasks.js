import {
  COMPLETE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  REACTIVATE_TASK,
  SORT_TASKS,
} from "../actions/tasks";
import Task from "../../models/task";
import TASKS from "../../data/dummy-data";
import types from "../../constants/types";

const initialState = {
  activeTasks: TASKS.filter((task) => task.isActive).sort((a, b) => a.dueDate - b.dueDate),
  completedTasks: TASKS.filter((task) => !task.isActive).sort(
    (a, b) => b.dateCompleted - a.dateCompleted
  ),
  lastActiveListSortType: types.sort.byDueDateAsc,
  lastCompletedListSortType: types.sort.byDateCompletedDesc,
};

const sortByType = (tasks, sortType) => {
  switch (sortType) {
    case types.sort.byDueDateAsc:
      return tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
    case types.sort.byDueDateDesc:
      return tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
    case types.sort.byDateCompletedAsc:
      return tasks.slice().sort((a, b) => a.dateCompleted - b.dateCompleted);
    case types.sort.byDateCompletedDesc:
      return tasks.slice().sort((a, b) => b.dateCompleted - a.dateCompleted);
    case types.sort.byPriorityAsc:
      return tasks.slice().sort((a, b) => {
        const valueA =
          a.priorityKey === null ? Number.MAX_SAFE_INTEGER : types.priority[a.priorityKey].value;
        const valueB =
          b.priorityKey === null ? Number.MAX_SAFE_INTEGER : types.priority[b.priorityKey].value;

        return valueB - valueA;
      });
    case types.sort.byPriorityDesc:
      return tasks.slice().sort((a, b) => {
        const valueA =
          a.priorityKey === null ? Number.MAX_SAFE_INTEGER : types.priority[a.priorityKey].value;
        const valueB =
          b.priorityKey === null ? Number.MAX_SAFE_INTEGER : types.priority[b.priorityKey].value;

        return valueA - valueB;
      });
    default:
      return tasks.slice();
  }
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
      const { taskPriorityKey, taskName, taskDescription, taskDueDate } = action;
      const newTask = Task.create(taskPriorityKey, taskName, taskDescription, taskDueDate);

      return {
        ...state,
        activeTasks: state.activeTasks.concat(newTask),
      };
    }
    case DELETE_TASK: {
      const updatedActiveTasks = state.activeTasks.filter((task) => task.id !== action.task.id);
      return {
        ...state,
        activeTasks: updatedActiveTasks,
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
    case SORT_TASKS: {
      let updatedActiveTasks = null;
      let updatedCompletedTasks = null;

      if (action.isActiveList) {
        updatedActiveTasks = sortByType(state.activeTasks, action.sortType);
        return {
          ...state,
          activeTasks: updatedActiveTasks,
          lastActiveListSortType: action.sortType,
        };
      }

      updatedCompletedTasks = sortByType(state.activeTasks, action.sortType);

      return {
        ...state,
        completedTasks: updatedCompletedTasks,
        lastCompletedListSortType: action.sortType,
      };
    }
    default:
      return state;
  }
};
