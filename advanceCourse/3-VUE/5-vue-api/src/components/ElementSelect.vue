<template>
  <div class="element-select">
    <div class="area">
      <h3>全选效果</h3>
      <el-select v-model="selectVal" placeholder="请选择" multiple collapse-tags popper-class="select-all-comp" @change="selectChange">
        <!-- <el-option label="全部日期" value="all" /> -->
        <el-checkbox v-model="checkedAll" :indeterminate="isIndeterminate" @change="checkboxChange">全选</el-checkbox>
        <el-option
          v-for="item in optionsSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="area">
      <h3 class="demonstration">多选选择任意一级选项</h3>
      <el-cascader
        :options="cascaderOptions"
        :props="{ multiple: true, checkStrictly: true }"
        clearable
        filterable
      ></el-cascader>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIndeterminate: false,
      checkedAll: false,
      selectVal: '',
      optionsSelect: this.$mock.selectAllData,
      cascaderOptions: this.$mock.cascaderOptions
     }
  },
  methods: {
    checkboxChange(e) {
      if (e) {
        console.log(e, '全选')
        this.selectVal = this.optionsSelect.reduce((pre, cur)=>{pre.push(cur.value);return pre}, [])
      } else {
        this.selectVal = []
        this.isIndeterminate = false
      }
    },
    selectChange() {
      console.log(this.selectVal, '选择内容')
      if (this.selectVal.length < this.optionsSelect.length) this.isIndeterminate = true
      else this.isIndeterminate = false; this.checkedAll = true;
    }
  }
}
</script>

<style lang="scss">
.select-all-comp{
  .el-select-dropdown__list {
    // padding-top: 40px;
    position: relative;
}
  .el-checkbox{
    // position: absolute;
    // top: 10px;
    // right: 10px;
    position: sticky;
    top: 0px;
    right: 10px;
    z-index: 1;
    text-align: right;
    display: block;
    padding: 10px;
    padding-top: 10px;
    background: #fff;
  }
}
</style>