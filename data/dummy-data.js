import Task from "../models/task";

const TASKS = [
  new Task(
    "t1",
    "u1",
    "high",
    "Review Challenge Submission",
    "Look over the React Native challenge submission by Max Magee.",
    new Date(2020, 4, 21),
    true
  ),
  new Task(
    "t2",
    "u1",
    "medium",
    "Schedule Technical Interview",
    "Schedule a time to conduct the technical in-depth interview with the candidate.",
    new Date(2020, 4, 25),
    true
  ),
  new Task(
    "t3",
    "u1",
    "low",
    "Conduct Technical Interview",
    "Conduct the technical in-depth interview to further evaluate Max's fitness for the role.",
    new Date(2020, 4, 26),
    true
  ),
  //
  new Task(
    "t4",
    "u1",
    null,
    "Conduct Cultural Interview",
    "It's important that he will work well within the team environment.",
    new Date(2020, 4, 27),
    true
  ),
  new Task(
    "t5",
    "u1",
    "high",
    "Make Max An Offer",
    "We want Max on the team, extend an offer to him as soon as possible.",
    new Date(2020, 4, 27),
    true
  ),
  new Task(
    "t6",
    "u1",
    "high",
    "Receive Max's Challenge Submission",
    "Check to see if Max has sent in his challenge submission.",
    new Date(2020, 4, 21),
    false,
    new Date(2020, 4, 21)
  ),
];

export default TASKS;
