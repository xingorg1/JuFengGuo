import {
    ref,
    computed
} from "vue";
import {
    $get
} from "../utils/fetch";

export function useGetTodoLists() {
    const todoListsRef = ref($get());
    const isEmptyRef = computed(() => {
        return todoListsRef.value.length <= 0;
    });
    return {
        todoLists: todoListsRef,
        isEmpty: isEmptyRef,
    }
}