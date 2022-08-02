import React from 'react';
import { Provider } from "react-redux";
import TasksList from './tasks/components/TasksList.jsx';
import store from "./store.js";
import './app.scss';

const App = () => (
  <div>
    <h1 className="title">Todo List</h1>
    <Provider store={store}>
      <TasksList />
    </Provider>
  </div>
);

export default App;
