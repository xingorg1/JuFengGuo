export function useDeleteTodo(todoListsRef) {
  const deleteTodoHandle = (todoId) => {
    /* // let rsts = todoLists.indexOf(todo)
      FIXME: 代码技巧，可以直接用indexOf查找数组中的一个对象所在的索引值。
      arr = [{a: 1}, {a: 2}]
      arr.indexOf(arr[1]) => 1
    */
    let index = todoListsRef.value.findIndex(todo => {
      return todo.id === todoId
    })
    if (index !== -1) {
      todoListsRef.value.splice(index, 1)
    }
  }
  const deleteTodosHandle = () => {
    // FIXME: 这里卡死了，将todoLists重新赋值为filter后的结果，不能触发effect事件、也就不能调用post发请求。所以改todoLists为ref，然后重置其value的值。
    todoListsRef.value = todoListsRef.value.filter(todo => !todo.isCompleted)
  }
  return {
    deleteTodoHandle,
    deleteTodosHandle
  }
}