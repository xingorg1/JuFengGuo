<template>
  <div class="indexbar">
    <h3>search</h3>
    <Search
      v-model="value"
      placeholder="请输入搜索关键词..."
      show-action
      @search="onSearch"
      @cancel="onCancel"
    ></Search>
    <h3>IndexBar</h3>
    <index-bar 
      :index-list="IndexArr" 
      :sticky="false"
      @select="selectIndet"
      highlight-color="red">
      <div class="my-index-bar" v-for="item in IndexArr" :key="item">
        <index-anchor :index="item">{{item}}</index-anchor>
        <Cell v-for="myCell in 4" :key="'h'+ myCell" 
          :value="'文案' + myCell"></Cell>
      </div>
    </index-bar>
    <h3>button</h3>
    <Button type="default">默认按钮</Button>
  </div>
</template>

<script>
import { Search, IndexBar, IndexAnchor, Cell } from "vant";
const { log } = console;
export default {
  name: "AppIndexBar",
  components: {
    Search,
    IndexBar,
    IndexAnchor,
    Cell
  },
  data() {
    return {
      value: "",
      IndexArr: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    };
  },
  mounted() {
    log(Search);
  },
  methods: {
    onSearch(e) {
      log(e);
    },
    onCancel(a) {
      log(a);
    },
    selectIndet(a,b,c){
      log(a,b,c)
    }
  }
};
</script>

<style scoped>
.indexbar{
  padding-bottom: 300px;
}
.van-index-anchor {
  background: #f2f2f2;
}
</style>
