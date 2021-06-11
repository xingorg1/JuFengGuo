import {
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
  return {
    isCompletedAll: isCompletedAllRef,
  }
}