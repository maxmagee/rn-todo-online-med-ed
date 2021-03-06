import expoConstants from "expo-constants";
import utils from "../utils/utils";

const moment = require("moment");

class Task {
  constructor(id, userId, priorityKey, name, description, dueDate, isActive, dateCompleted) {
    this.id = id;
    this.userId = userId;
    this.priorityKey = priorityKey;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.isActive = isActive;
    this.dateCompleted = dateCompleted;
  }

  static create(priorityKey, name, description, dueDate) {
    return new Task(
      utils.getUniqueId(),
      expoConstants.installationId,
      priorityKey,
      name,
      description,
      dueDate,
      true,
      null
    );
  }

  get displayDateCompleted() {
    // ex: Tuesday May 19 2020
    return moment(this.dateCompleted).format("ddd LL");
  }

  get displayDueDate() {
    // ex: Tuesday May 19 2020
    return moment(this.dueDate).format("ddd LL");
  }
}

export default Task;
