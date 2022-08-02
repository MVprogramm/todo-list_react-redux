import { RECIVE } from "./tasks.actions.js";

const initialState = {
  tasksList: []
}

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIVE:
      return {
        ...state,
        tasksList: action.payload.tasksList
      }
    default:
      return state;
  }
}

export default tasksReducer;