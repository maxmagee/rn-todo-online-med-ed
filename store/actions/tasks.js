export const COMPLETE_TASK = "COMPLETE_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REACTIVATE_TASK = "REACTIVATE_TASK";
export const SORT_TASKS = "SORT_TASKS";

/**
 * Completes a task
 * @param {Task} task The Task to be completed
 */
export const completeTask = (task) => {
  return {
    task,
    type: COMPLETE_TASK,
  };
};

/**
 * Create a new task
 * @param {string} priorityKey The priority type key
 * @param {string} name The name of the task
 * @param {string} description A brief description of the task
 * @param {Date} dueDate The due date for the task
 */
export const createTask = (priorityKey, name, description, dueDate) => {
  return {
    taskDescription: description,
    taskDueDate: dueDate,
    taskName: name,
    taskPriorityKey: priorityKey,
    type: CREATE_TASK,
  };
};

/**
 * Delete a given Task
 * @param {Task} task The Task to delete
 */
export const deleteTask = (task) => {
  return {
    task,
    type: DELETE_TASK,
  };
};

/**
 * Edit a task
 * @param {Task} task The Task to be edited
 */
export const editTask = (task) => {
  return {
    task,
    type: EDIT_TASK,
  };
};

/**
 * Reactivates a task
 * @param {Task} task The Task to be reactivated
 */
export const reactivateTask = (task) => {
  return {
    task,
    type: REACTIVATE_TASK,
  };
};

export const sortTasks = (sortType, isActiveList) => {
  return {
    isActiveList,
    sortType,
    type: SORT_TASKS,
  };
};
