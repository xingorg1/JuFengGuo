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
    <section class="main" v-show="todoListsFilter.length > 0">
      <!-- FIXME: 这里也是很好的用到了v-model的思想，值得学习。凡是input value 和事件需要的地方，直接用语法糖v-model即可 -->
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="isCompletedAll"/>
      <label for="toggle-all" v-show="!isEmpty"
        >Mark all as complete</label
      >
      <ul class="todo-list">
        <li
          :class="['todo', todo.isCompleted && 'completed']"
          v-for="(todo, index) in todoListsFilter"
          :key="todo.id"
        >
          <div class="view">
            <!-- FIXME: 太绝了！v-model的思想很好的应用到了这里，不用绑定值和事件了。 -->
            <input class="toggle" type="checkbox" v-model="todo.isCompleted" />
            <label @dblclick.stop="editTodoHandle(todo)">{{todoListsFilter.length - index}}. {{ todo.title }}</label>
            <button class="destroy" @click.stop="deleteTodoHandle(todo.id)"></button>
            <span class="time" v-show="todo.time"
              >创建时间：{{ todo.time }}</span
            >
          </div>
          <input 
            :class="['edit', todo.isEdit && 'show']" 
            type="text" 
            v-model="todo.title" 
            @keydown.enter="editDoneHandle(todo)"
            @blur="editDoneHandle(todo)"
            @keydown.escape="editDoneHandle(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer clearfix" v-show="!isEmpty">
      <span class="todo-count left">
        <strong>{{ leftNum }}</strong>
        <span>item{{ leftNum > 1 ? "s" : "" }} left</span>
      </span>
      <ul class="filters left">
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
        class="clear-completed right"
        :class="{
          'clear-completed-hide': false,
        }"
        @click.stop="deleteTodosHandle"
        v-show="completedNum > 0"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { useGetTodoLists } from "../components/TodoList/useGetTodoLists";
import { useAddTodo } from "../components/TodoList/useAddTodo";
import { useFilterTodoLists } from "../components/TodoList/useFilterTodoLists";
import { useDeleteTodo } from "../components/TodoList/useDeleteTodo";
import { useEditTodo } from "../components/TodoList/useEditTodo";
import { focusBtnMap } from "../utils/configs";
export default {
  setup() {
    // console.log(this)
    const focusBtnConf = focusBtnMap;
    const { todoLists, isEmpty } = useGetTodoLists();
    // app.addEventListener('click', () => {
    //   todoLists.value.map((todo) => {
    //     todo.isEdit = false
    //   })
    // })
    return {
      focusBtnConf, // FIXME: [tips]即使不是响应式的数据，如果模版中要使用，setup中就需要扔出去
      todoLists,
      isEmpty,
      ...useAddTodo(todoLists),
      ...useFilterTodoLists(todoLists),
      ...useDeleteTodo(todoLists),
      ...useEditTodo(todoLists)
    };
  },
};
</script>
