import {
    reactive,
    // ref, // 引用类型数据尽量用reactive
    watchEffect,
    computed
} from "vue";
import {
    $get,
    $post
} from "../utils/fetch";

export function useGetTodoLists() {
    const todoLists = reactive($get());
    const isEmptyRef = computed(() => {
        return todoLists.length <= 0;
    });
    // FIXME: watchEffect不要太香了啊！只需要关心数据就行了，effect里集中去做相关的数据请求！
    watchEffect(() => {
      $post(todoLists)
    })
    
    return {
        todoLists,
        isEmpty: isEmptyRef,
    }
}