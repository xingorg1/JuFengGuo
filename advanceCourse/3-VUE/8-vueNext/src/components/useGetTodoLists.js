import {
    reactive,
    ref, // FIXME: 引用类型数据尽量用reactive，但是这里要重置todoList的值，所以用ref，重置「对象.value」来达到响应式的目的
    watchEffect,
    computed
} from "vue";
import {
    $get,
    $post
} from "../utils/fetch";

export function useGetTodoLists() {
    // let todoLists = reactive($get());
    let todoListsRef = ref($get());
    const isEmptyRef = computed(() => {
        return todoListsRef.value.length <= 0;
    });
    // FIXME: watchEffect不要太香了啊！只需要关心数据就行了，effect里集中去做相关的数据请求！
    watchEffect(() => {
      $post(todoListsRef.value)
    })
    
    return {
        todoLists: todoListsRef,
        isEmpty: isEmptyRef,
    }
}