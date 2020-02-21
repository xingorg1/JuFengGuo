import React from 'react';
import './App.scss';
import HighChartsUI from './HighChartsUI/HighChartsUI'
import DemoUI from './DemoUI/DemoUI'
import TodoList from './TodoList/TodoList'

function App() {
  return (
    <div className="App">
      <TodoList />
      <HighChartsUI />
      <DemoUI />
    </div>
  );
}

export default App;
