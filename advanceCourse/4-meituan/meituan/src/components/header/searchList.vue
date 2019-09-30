<template lang="pug">
  .search-list(:class="type == 1 ? 'hot' : ''")
    h3 热门搜索
    ul(v-if="type == 1")
      li(v-for="item in hotSearch")
        a(href="") {{item}}
    ul(v-else) 
      li(v-for="item in searchData")
        a(href="") {{item}}

</template>

<script>
export default {
  name: "searchList",
  props: ["hotSearch","searchData","type"],
  data() {
    return {};
  },
  watch: {
    type(){
      console.log(this.type)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/_var.scss";
.search-list {
  overflow: hidden;
  padding: 10px;
  h3 {
    display: none;
    margin-top: 0;
  }
  ul {
    padding: 0 10px;
  }
  li {
    color: $c9;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  a {
    color: $c9;
    text-decoration: none;
    &:hover {
      color: $mainClr;
    }
  }
  &.hot{
    h3{
      display: block;
    }
    li{
      float: left;
    }
  }
}
</style>
