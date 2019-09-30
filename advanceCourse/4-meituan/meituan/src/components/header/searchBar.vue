<template lang="pug">
  .saerch-bar
    el-input(placeholder='搜索商家或地点', v-model='input' @input="changeType" @focus="showHotModal" @blur="hideHotModal")
      el-button(slot="append", type='primary', icon='el-icon-search')
    searchList(:hotSearch="hotSearch" :searchData="searchData" :type="type" v-show="showList")
</template>

<script>
import searchList from "@/components/header/searchList.vue";
export default {
  name: "SearchBar",
  props: ["hotSearch"],
  components: {
    searchList
  },
  data() {
    return {
      // type: 1,
      input: "",
      searchData: [
        "水立方嬉水乐园",
        "水长城",
        "水底海洋馆",
        "欢乐水魔方水上乐园"
      ],
      showList: false
    };
  },
  computed: {
    type: {
      get: function() {
        return 1;//默认type返回类型为1
      },
      set: function() {
        if (this.input !== "") {
          //当input框中有搜索内容时，拿着搜索的内容ajax获取列表（这里省略），展示第二种下拉列表样式。
          console.log(2, this.input);
          return 2;
        } else {
          // 如果把input框的文本删空，回到初始化状态。
          console.log(1)
          return 1;
        }
      }
    }
  },
  methods: {
    showHotModal() {
      this.type = 1;
      this.showList = !this.showList;
    },
    hideHotModal() {
      this.showList = !this.showList;
    },
    changeType() {
      // this.type = 2;
      console.log(this.input)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/header/searchbar.scss";
</style>
