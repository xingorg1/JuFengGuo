import { ref, computed } from "vue";
import { $post } from "../utils/fetch";
import { md5ID, timeDeal } from "../utils/util"

export function useAddTodo(todoListsRef) {
    const todoTitleRef = ref('');
    const todoItemHandle = () => {
        const title = todoTitleRef.value
        const params = {
            id: md5ID(),
            time: timeDeal(),
            title,
            isCompleted: false
        }
        todoListsRef.value.unshift(params)
        $post(todoListsRef.value)
        todoTitleRef.value = ''
    }
    return {
        todoTitle: todoTitleRef,
        todoItemHandle,
    }
}