<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus=""
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodoRef"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li class="todo">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>学习composition api</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text" />
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>1</strong>
        <span>items left</span>
      </span>
      <ul class="filters">
        <li><a href="#/all" class="selected">All</a></li>
        <li><a href="#/active" class="">Active</a></li>
        <li><a href="#/completed" class="">Completed</a></li>
      </ul>
      <button class="clear-completed" style="display: none">
        Clear completed
      </button>
    </footer>
  </section>
  <hr />
  <axe-button icon="axe-icon-love" type="danger" style="float: right"
    >Axe使用成功啦！喜大普奔～</axe-button
  >
</template>

<script>
export default {
  setup() {
    // console.log(this)
  },
};
</script>
