import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from "vue";
import {
  locationHashDeal,
  filterList
} from '../utils/util'
import {
  focusBtnMap
} from "../utils/configs";

export function useFilterTodoLists(todoLists) {
  let hashStrRef = ref('all')
  const onHashChange = (e) => {
    hashStrRef.value = locationHashDeal()
    if (!Object.keys(focusBtnMap).includes(hashStrRef.value)) {
      hashStrRef.value = 'all'
    }
  }
  // FIXME: onMounted里处理完数据是异步的。怎么return出异步之后获取的正确数据呢？
  onMounted(() => {
    window.addEventListener('hashchange', onHashChange)
    onHashChange()
  })
  onUnmounted(() => { // FIXME: 这里卸载和挂载的名字很像，注意别写错了。不然绑定了事件又卸载，那可太坑了！
    window.removeEventListener('hashchange', onHashChange)
  })

  const todoListsFilterRef = computed(() => {
    return filterList(todoLists, hashStrRef.value)
  });
  const leftNumRef = computed(() => {
    return filterList(todoLists, 'active').length
  })
  return {
    todoListsFilter: todoListsFilterRef,
    hashStr: hashStrRef,
    leftNum: leftNumRef,
  }
}