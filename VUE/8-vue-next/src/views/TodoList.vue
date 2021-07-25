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
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="isCompletedAll"
      />
      <label for="toggle-all" v-show="!isEmpty">Mark all as complete</label>
      <ul class="todo-list">
        <li
          :class="['todo', todo.isCompleted && 'completed']"
          v-for="(todo, index) in todoListsFilter"
          :key="todo.id"
        >
          <div class="view">
            <!-- FIXME: 太绝了！v-model的思想很好的应用到了这里，不用绑定值和事件了。 -->
            <input class="toggle" type="checkbox" v-model="todo.isCompleted" />
            <label @dblclick.stop="editTodoHandle(todo)"
              >{{ todoListsFilter.length - index }}. {{ todo.title }}</label
            >
            <button
              class="destroy"
              @click.stop="deleteTodoHandle(todo.id)"
            ></button>
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
import { useGetTodoLists } from "../hooks/TodoList/useGetTodoLists";
import { useAddTodo } from "../hooks/TodoList/useAddTodo";
import { useFilterTodoLists } from "../hooks/TodoList/useFilterTodoLists";
import { useDeleteTodo } from "../hooks/TodoList/useDeleteTodo";
import { useEditTodo } from "../hooks/TodoList/useEditTodo";
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
      ...useEditTodo(todoLists),
    };
  },
};
</script>
<style scoped>
.todoapp {
  background: #fff;
  margin: 130px auto 140px;
  max-width: 550px;
  min-width: 430px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.todoapp h1 {
  position: absolute;
  top: -140px;
  width: 100%;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  color: #3d87ca;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none;
  /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 500px;
  overflow-y: auto;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:hover {
  background-color: #f7f7f7;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  background-image: url("../assets/images/unchecked.svg");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("../assets/images/checked.svg");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 5px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  color: #4d4d4d;
  cursor: pointer;
}

.todo-list li.completed label {
  color: #cdcdcd;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  cursor: pointer;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-left: 43px;
  width: calc(100% - 43px);
}
.todo-list li .show {
  display: block;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.todo-list li .time {
  display: block;
  padding-bottom: 5px;
  padding-left: 60px;
  font-size: 12px;
  color: rgb(102, 102, 102);
}

.footer {
  overflow: hidden;
  padding: 10px 15px;
  height: 41px;
  text-align: center;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px,
    rgb(246, 246, 246) 0px 8px 0px -3px, rgba(0, 0, 0, 0.2) 0px 9px 1px -3px,
    rgb(246, 246, 246) 0px 16px 0px -6px, rgba(0, 0, 0, 0.2) 0px 17px 2px -6px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.left {
  float: left;
}
.right {
  float: right;
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  margin-left: 55px;
  padding: 0;
  list-style: none;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

.clear-completed.clear-completed-hide {
  opacity: 0;
  appearance: none;
}

.info {
  margin: 65px auto 0;
  color: #4d4d4d;
  font-size: 11px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

.todo-count strong {
  margin-right: 5px;
}
</style>
