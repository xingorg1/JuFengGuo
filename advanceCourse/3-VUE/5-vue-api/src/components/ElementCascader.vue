<template>
  <div class="area">
    <h3 class="demonstration">多选选择任意一级选项</h3>
    <el-checkbox value="checkbox">全选</el-checkbox>
    <h4>原生</h4>
    <el-cascader v-model="cascaderVal"
                  :options="cascaderOptions"
                  :props="{ multiple: true, checkStrictly: true }"
                  clearable
                  filterable
                  collapse-tags
                  @change="collapseChange"
                  @expand-change="expandChange"
                  >
                  </el-cascader>
    <h4>自己封装带全选功能</h4>
    <Cascader v-model="cascaderVal1"
                  :options="cascaderOptions"
                  :props="{ multiple: true, checkStrictly: true }"
                  clearable
                  filterable
                  collapse-tags
                  @change="collapseChange"
                  @expand-change="expandChange" />
  </div>
</template>

<script>
import Cascader from './cascader/cascader.vue'
const { log } = console
export default {
  name: 'ElementCascader',
  data () {
    return {
      checkbox: true,
      cascaderVal: '',
      cascaderVal1: '',
      cascaderOptions: this.$mock.cascaderOptions
    }
  },
  components: {
   Cascader
  },
  methods: {
    // 级联项选择
    collapseChange () {
      // log(this.cascaderVal)
      log(this.cascaderVal1)
    },
    expandChange (node, a, b, c) {
      log('expandChange', node, a, b, c, this.cascaderVal)
    }
  }
}
</script>

<style lang="scss">
.el-cascader{
  width: 300px;
}
.el-cascader-menu__list{
  /* padding-top: 40px; */
}
.el-cascader-node__label{
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.checked-all-btn {
    margin-left: 20px;
}
</style>
