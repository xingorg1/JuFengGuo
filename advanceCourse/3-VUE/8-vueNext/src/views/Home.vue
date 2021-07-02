<script lang="ts">
import { h, defineComponent, ref, reactive } from "vue";
const Component = defineComponent({
  // 已启用类型推断
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const result = props.message.split(""); // 正确, 'message' 被声明为字符串
    // const filtered = props.message.filter(p => p.value) // 将引发错误: Property 'filter' does not exist on type 'string'
    const year = ref<string | number>(2020);
  },
});

const MyModal = defineComponent({
  setup() {
    const isContentShown = ref(false);
    const open = () => (isContentShown.value = true);
    return {
      isContentShown,
      open,
    };
  },
});
const app = defineComponent({
  components: {
    MyModal,
  },
  template: `
    <button @click="openModal">Open from parent</button>
    <my-modal ref="modal" />
  `,
  setup() {
    const modal = ref();
    const openModal = () => {
      modal.value.open();
    };
    return { modal, openModal };
  },
});
export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0,
    });

    function increment() {
      state.count++;
    }

    // 返回渲染函数
    return () =>
      h(
        "div",
        {},
        h(
          "strong",
          {
            icon: "axe-icon-love",
            type: "danger",
            position: "left",
            onClick: increment,
          },
          state.count
        )
      );
  },
};
</script>