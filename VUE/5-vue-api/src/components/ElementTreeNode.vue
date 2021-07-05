<template>
  <div class="my-tree-node">
    <span>{{ node.label }}</span>
    <span>
      <el-button type="text" size="mini" @click="() => append(data)">
        Append
      </el-button>
      <el-button type="text" size="mini" @click="() => remove(node, data)">
        Delete
      </el-button>
      <el-button icon="el-icon-plus" type="text" v-if="node.isLeaf"></el-button>
    </span>
    <div class="row-operte">
      <span class="row-create">
        <em>{{ data.label }}</em>
      </span>
    </div>
  </div>
</template>

<script>
import mockData from "../assets/mock.js";
const { log } = console;
let id = 1000;
export default {
  name: "ElementTreeNode",
  props: {
    node: Object,
    data: Object,
  },
  data() {
    return {};
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest" + id, children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
  },
};
</script>