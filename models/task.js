const moment = require("moment");

class Task {
  constructor(id, userId, name, description, dueDate, isActive) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.isActive = isActive;
  }

  get displayDate() {
    // ex: Tuesday May 19 2020
    return moment(this.date).format("dddd LL");
  }
}

export default Task;
