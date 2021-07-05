import {
  ref,
  computed
} from "vue";


export function useEditTodo(todoListsRef) {
  // FIXME: computed计算属性的思想很完美。利用get和set来实现全选的value和全选的check事件
  const isCompletedAllRef = computed({
    get() {
      return todoListsRef.value.every(todo => todo.complete)
    },
    set(newVal) {
      todoListsRef.value.map(todo => todo.isCompleted = newVal) // FIXME: proxy返回的对象，有map函数。
    }
  })

  const editTodoHandle = (todo) => {
    todo.isEdit = true
    console.log(todo, arguments);
    // TODO: 1、这里怎么拿到自己，然后设置自动focus呢？
    // TODO: 2、arguments里的RefRefImpl是啥？
  }

  const editDoneHandle = (todo) => {
    todo.isEdit = false
  }
  return {
    isCompletedAll: isCompletedAllRef,
    editTodoHandle,
    editDoneHandle
  }
}