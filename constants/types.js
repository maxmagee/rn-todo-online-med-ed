import colors from "./colors";

const priority = {
  high: {
    color: colors.dark.red,
    name: "high",
    value: 1,
  },
  keys: {
    high: "high",
    low: "low",
    medium: "medium",
  },
  low: {
    color: colors.dark.green,
    name: "low",
    value: 3,
  },
  medium: {
    color: colors.dark.yellow,
    name: "medium",
    value: 2,
  },
};

const sort = {
  byDateCompletedAsc: "SORT_BY_DATE_COMPLETED_ASC",
  byDateCompletedDesc: "SORT_BY_DATE_COMPLETED_DESC",
  byDueDateAsc: "SORT_BY_DUE_DATE_ASC",
  byDueDateDesc: "SORT_BY_DUE_DATE_DESC",
  byPriorityAsc: "SORT_BY_PRIORITY_ASC",
  byPriorityDesc: "SORT_BY_PRIORITY_DESC",
};

export default {
  priority,
  sort,
};
