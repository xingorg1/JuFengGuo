<template>
  <div class="element-select">
    <div class="area">
      <h3>全选效果</h3>
      <el-select v-model="selectVal"
                 placeholder="请选择"
                 multiple
                 collapse-tags
                 popper-class="select-all-comp"
                 @change="selectChange">
        <!-- <el-option label="全部日期" value="all" /> -->
        <el-checkbox v-model="checkedAll"
                     :indeterminate="isIndeterminate"
                     @change="checkboxChange">全选</el-checkbox>
        <el-option v-for="item in optionsSelect"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="area">
      <h3 class="demonstration">多选选择任意一级选项</h3>
      <el-cascader v-model="cascaderVal"
                   :options="cascaderOptions"
                   :props="{ multiple: true, checkStrictly: true }"
                   clearable
                   filterable
                   :show-all-levels="false"
                   collapse-tags
                   @change="collapseChange"></el-cascader>
    </div>
  </div>
</template>

<script>
const { log } = console
export default {
  data () {
    return {
      isIndeterminate: false,
      checkedAll: false,
      selectVal: '',
      optionsSelect: this.$mock.selectAllData,
      cascaderVal: '',
      cascaderOptions: this.$mock.cascaderOptions
    }
  },
  created () {
    log('elementSelect，created')
  },
  mounted () {
    log('elementSelect，mounted')
  },
  methods: {
    // 切换全选按钮
    checkboxChange (e) {
      log(e)
      if (e) {
        log(e, '全选')
        if (this.selectVal.length === this.optionsSelect.length) {
          log(e, '全不选')
          this.selectVal = []
          this.checkedAll = false
          this.isIndeterminate = false
        } else {
          this.selectVal = this.optionsSelect.reduce((pre, cur) => {
            pre.push(cur.value)
            return pre
          }, [])
        }
      } else {
        if (this.selectVal.length < this.optionsSelect.length) {
          this.isIndeterminate = false
          this.checkedAll = true
          this.selectVal = this.optionsSelect.reduce((pre, cur) => {
            pre.push(cur.value)
            return pre
          }, [])
        } else {
          this.selectVal = []
          this.checkedAll = false
          this.isIndeterminate = false
        }
      }
    },
    // select选择器内容切换
    selectChange () {
      log(this.selectVal, '选择内容')
      if (this.selectVal.length < this.optionsSelect.length)
        this.isIndeterminate = true
      else this.isIndeterminate = false
      this.checkedAll = true
    },
    // 级联项选择
    collapseChange () {
      log(this.cascaderVal)
    }
  }
}
</script>

<style lang="scss">
.select-all-comp {
  .el-select-dropdown__list {
    // padding-top: 40px;
    position: relative;
  }
  .el-checkbox {
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