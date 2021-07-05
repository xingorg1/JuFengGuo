import { ref } from "vue";
import { md5ID, timeDeal } from "../../utils/util"

export function useAddTodo(todoListsRef) {
    const todoTitleRef = ref('');
    const addTodoHandle = () => {
      // TODO: 回车想选英文但是提交了，老师的也这样。但是滴答清单就是好的。
        const title = todoTitleRef.value
        const params = {
            id: md5ID(),
            time: timeDeal(),
            title,
            isCompleted: false
        }
        todoListsRef.value.unshift(params)
        // $post(todoListsRef) // 数据改变后会自动触发watchEffect，该hook的钩子里会自动发请求的。
        todoTitleRef.value = ''
    }
    return {
        todoTitle: todoTitleRef,
        addTodoHandle,
    }
}