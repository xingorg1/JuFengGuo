<template>
  <div id="Tree">
    <div class="my-tree">
      <div class="tree-node" v-for="item in treeData" :key="item.dimCode">
        {{ item.dimName }}
      </div>
    </div>
    <!-- <Tree :treeData="treeDataTotal" /> -->
  </div>
</template>

<script>
export default {
  name: 'Tree',
  components: {
    // Home
  },
  props: {
    treeData: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>

<style lang="scss">
.my-tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.tree-node {
  // width: 100px;
  padding: 20px;
  background: #def;
  cursor: pointer;
}
</style>
