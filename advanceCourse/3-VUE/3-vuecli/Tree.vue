<template>
  <div class="tree">
    <ul class="tree-list">
      <li v-for="(item, index) in treeData" :key="item.name + index">
        <span
          class="tree-name"
          :class="{
            'has-child': item.children,
            'open-tree': showList[index]
          }"
          @click="openList(index, item.children)"
        >{{ item.name }}</span>
        <!-- 递归调用 -->
        <Tree
          :tree-data="item.children"
          v-show="showList[index] && item.children"
          v-if="onceClick[index] && item.children"
        />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Tree",
  props: ["treeData"],
  created() {},
  data() {
    return {
      showList: [],
      onceClick: []
    };
  },
  methods: {
    openList(i, has) {
      if (has) {
        //没有children数据时点击不生效
        // this.showList[i] = !this.showList[i];
        // this.showList.splice(i,1,!this.showList[i]);
        this.$set(this.showList, i, !this.showList[i]);
      }
      if (!this.onceClick[i]) {
        // 优化，第一次进来不会主动渲染内部所有的逻辑（v-show控制切换条件时会这样），点击渲染过dom后再多次切换显示或隐藏只会切换style样式，不会重复增删dom了。
        this.$set(this.onceClick, i, true);
      }
    }
  }
};
</script>
<style>
  ul{
    padding-left: 10px;
  }
  li {
    list-style: none;
  }
  .tree-name {
    display: block;
    position: relative;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .has-child::before {
    position: absolute;
    top: 6px;
    left: -22px;
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-left-color: tomato;
  }
  .open-tree::before {
    transform: rotate(90deg);
  }
  .tree-name:hover {
    background: #def;
  }
</style>

