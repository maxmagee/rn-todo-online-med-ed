import Task from "../models/task";

const TASKS = [
  new Task(
    "t1",
    "u1",
    "Wash the dishes",
    "The sink is full of dishes, clean them.",
    new Date(),
    true
  ),
  new Task(
    "t2",
    "u1",
    "Take out the trash",
    "Garbage collection is tomorrow morning.",
    new Date(),
    true
  ),
  new Task(
    "t3",
    "u1",
    "Sweep the floor",
    "The dog brought in a lot of footprints last night.",
    new Date(),
    false
  ),
];

export default TASKS;
