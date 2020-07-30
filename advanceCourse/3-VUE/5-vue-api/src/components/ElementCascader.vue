<template>
  <div class="area">
    <h3 class="demonstration">多选选择任意一级选项</h3>
    <Cascader v-model="cascaderVal"
                  :options="cascaderOptions"
                  :props="{ multiple: true, checkStrictly: true }"
                  clearable
                  filterable
                  collapse-tags
                  @change="collapseChange"
                  @expand-change="expandChange" />
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
  </div>
</template>

<script>
import Cascader from './cascader/src/cascader.vue'
const { log } = console
export default {
  name: 'ElementCascader',
  data () {
    return {
      cascaderVal: '',
      cascaderOptions: this.$mock.cascaderOptions
    }
  },
  computed: {
   Cascader
  },
  methods: {
    // 级联项选择
    collapseChange () {
      log(this.cascaderVal)
    },
    expandChange (node, a, b, c) {
      log('expandChange', node, a, b, c, this.cascaderVal)
    }
  }
}
</script>

<style lang="scss">
.el-cascader-menu__list{
  padding-top: 40px;
}
</style>
