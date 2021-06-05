import { ref, computed } from "vue";
import { $post } from "../utils/fetch";
import { md5ID, timeDeal } from "../utils/util"

export function useAddTodo(todoLists) {
    const todoTitleRef = ref('');
    const todoItemHandle = () => {
        const title = todoTitleRef.value
        const params = {
            id: md5ID(),
            time: timeDeal(),
            title,
            isCompleted: false
        }
        todoLists.value.unshift(params)
        $post(todoLists.value)
        todoTitleRef.value = ''
    }
    return {
        todoTitle: todoTitleRef,
        todoItemHandle,
    }
}