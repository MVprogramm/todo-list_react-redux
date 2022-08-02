import * as tasksGateWay from "./tasks.gateway.js";
import { tasksListSelector } from "./tasks.selectors.js";

export const RECIVE = "TASKS/RECIVE_TASKS";

export const reciveTasksList = (tasksList) => {
  return {
    type: RECIVE,
    payload: {
      tasksList
    }
  }
}

export const getTasksList = () => {
  const thunkAction = function(dispatch) {
    tasksGateWay.fetchTasksList()
      .then(tasksList => dispatch(reciveTasksList(tasksList)))
  };

  return thunkAction;
}

export const updateTask = (id) => {
  const thunkAction = function(dispatch,getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const taskData = tasksList.find(task => task.id === id);
    const updatedTask = {
      ...taskData,
      done: !taskData.done,
    };
    tasksGateWay.updateTask(id, updatedTask)
      .then(res => res.json())
      .then (res => {
        const newTasksList = tasksList.map(
          task => task.id === res.id
            ? res
            :task
        );

        dispatch(reciveTasksList(newTasksList));
      });
  };

  return thunkAction;
}

export const deleteTask = (id) => {
  const thunkAction = function(dispatch,getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    tasksGateWay.deleteTask(id)
      .then(res => res.json())
      .then (res => {
        const newTasksList = tasksList.filter(
          task => task.id !== res.id
        );

        dispatch(reciveTasksList(newTasksList));
      });
  };

  return thunkAction;
}

export const createTask = (text) => {
  const thunkAction = function(dispatch,getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const createdTask = {
      text,
      done: false,
    };
    tasksGateWay.createTask(createdTask)
      .then(res => res.json())
      .then (res => {
        const newTasksList = tasksList.concat([res]);

        dispatch(reciveTasksList(newTasksList));
      });
  };

  return thunkAction;
}