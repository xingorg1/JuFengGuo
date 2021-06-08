import { ref } from "vue";
import { md5ID, timeDeal } from "../utils/util"

export function useAddTodo(todoListsRef) {
    const todoTitleRef = ref('');
    const addTodoHandle = () => {
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