import React from 'react';
import './App.scss';
import HighChartsUI from '../../components/HighChartsUI/HighChartsUI'
import DemoUI from '../../components/DemoUI/DemoUI'
import TodoList1 from '../../components/TodoList1/TodoList1'
import TodoList2 from '../../components/TodoList2/TodoList2'
import TodoList from '../../components/TodoList3/TodoList'

function App() {
  return (
    <div className="App">
      <DemoUI />
      <HighChartsUI />
      <TodoList1/>
      <TodoList2/>
      <TodoList/>
    </div>
  );
}

export default App;
