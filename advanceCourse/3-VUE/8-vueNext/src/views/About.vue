<script lang="ts">
import { h, reactive } from 'vue'

export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }
    // 返回渲染函数
    return () =>
      h(
        'div',
        {
          onClick: increment
        },
        'about'
      )
  }
}
</script>