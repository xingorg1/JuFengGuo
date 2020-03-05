import React from 'react';
import './App.scss';
import HighChartsUI from '../../components/HighChartsUI/HighChartsUI'
import DemoUI from '../../components/DemoUI/DemoUI'
import TodoList1 from '../../components/TodoList1/TodoList1'
import TodoList2 from '../../components/TodoList2/TodoList2'
import TodoList3 from '../../components/TodoList3/TodoList'
import AntDesign from '../../components/AntDesign/AntDesign'
import TodoList4 from '../../components/TodoList4/TodoList'

function App() {
  return (
    <div className="App">
      <DemoUI />
      <HighChartsUI />
      <TodoList1/>
      <TodoList2/>
      <TodoList3/>
      <AntDesign />
      <TodoList4 />
    </div>
  );
}

export default App;
