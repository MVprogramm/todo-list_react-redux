import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tasksActions from '../tasks.actions.js';
import { sortedTasksListSelector } from "../tasks.selectors.js";
import CreateTaskInput from './CreateTaskInput.jsx';
import Task from './Task.jsx';
import './tasksList.scss';

class TasksList extends React.Component {
  componentDidMount() {
    this.props.getTasksList();
  }

  render() {
    const { tasks, updateTask, deleteTask, createTask } = this.props;
    const todoList = tasks
      .map(item => (
        <Task
          key={item.id}
          {...item}
          onChange={updateTask}
          onDelete={deleteTask}
        />
      ));

    return (
      <main className="todo-list">
        <CreateTaskInput onCreate={createTask} />
        <ul className="list">{todoList}</ul>
      </main>
    );
  }
};

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  getTasksList: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
}

const mapState = (state) => {
  return {
    tasks: sortedTasksListSelector(state)
  }
}

const mapDispatch = {
  getTasksList: tasksActions.getTasksList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  createTask: tasksActions.createTask,
}

export default connect(mapState, mapDispatch)(TasksList);
