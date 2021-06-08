<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus=""
        autocomplete="off"
        v-model="todoTitle"
        @keyup.enter="addTodoHandle"
        placeholder="What needs to be done?"
      />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all" v-show="!isEmpty">Mark all as complete</label>
      <ul class="todo-list">
        <li class="todo" v-for="todo in todoListsFilter" :key="todo.id">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>{{ todo.title }}</label>
            <button class="destroy" @click="deleteTodoHandle(todo.id)"></button>
            <span class="time" v-show="todo.time"
              >创建时间：{{ todo.time }}</span
            >
          </div>
          <input class="edit" type="text" />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="!isEmpty">
      <span class="todo-count">
        <strong>{{leftNum}}</strong>
        <span>items left</span>
      </span>
      <ul class="filters">
        <li>
          <a
            :href="`#/${key}`"
            :class="{
              selected: hashStr === key,
            }"
            v-for="(conf, key) in focusBtnConf"
            :key="key"
            >{{ conf }}</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        :class="{
          'clear-completed-hide': false,
        }"
        @click="deleteTodosHandle"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <hr />
  <axe-button
    icon="axe-icon-love"
    type="danger"
    style="float: right"
    position="left"
    >Axe使用成功啦！喜大普奔～</axe-button
  >
</template>

<script>
import { useGetTodoLists } from "./components/useGetTodoLists";
import { useAddTodo } from "./components/useAddTodo";
import { useFilterTodoLists } from "./components/useFilterTodoLists";
import { useDeleteTodo } from "./components/useDeleteTodo";
import { focusBtnMap } from "./utils/configs";
export default {
  setup() {
    // console.log(this)
    const focusBtnConf = focusBtnMap;
    const { todoLists, isEmpty } = useGetTodoLists();
    return {
      focusBtnConf, // tips: 即使不是响应式的数据，如果模版中要使用，setup中就需要扔出去
      todoLists,
      isEmpty,
      ...useAddTodo(todoLists),
      ...useFilterTodoLists(todoLists),
      ...useDeleteTodo(todoLists),
    };
  },
};
</script>
