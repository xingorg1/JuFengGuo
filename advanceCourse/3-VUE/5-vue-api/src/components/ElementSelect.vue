<template>
  <div class="element-select">
    <div class="area">
      <h3>全选效果</h3>
      <el-select
        v-model="selectVal"
        placeholder="请选择"
        filterable
        clearable
        multiple
        collapse-tags
        popper-class="select-all-comp"
      >
        <!-- <el-option label="全部日期" value="all" /> -->
        <el-checkbox
          v-model="checkedAll"
          :indeterminate="isIndeterminate"
          @change="checkboxChange"
          >全选</el-checkbox
        >
        <el-option
          v-for="item in optionsSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <ElementCascader :cascaderOptions="cascaderOptions"/>
  </div>
</template>

<script>
import ElementCascader from './ElementCascader'
const { log } = console
export default {
  components: {
    ElementCascader
  },
  data () {
    return {
      selectVal: "",
      optionsSelect: this.$mock.selectAllData,
      cascaderOptions: this.$mock.cascaderOptions
    }
  },
  computed: {
    isIndeterminate: function() {
      // 是否半选
      let len = this.selectVal.length;
      return len !== 0 && len < this.optionsSelect.length;
    },
    checkedAll: {
      // 是否全选
      get: function() {
        // log("get");
        return this.selectVal.length >= this.optionsSelect.length;
      },
      set: function(e) {
        // log(e, "set");
      },
    },
  },
  methods: {
    // 切换全选按钮
    checkboxChange(e) {
      // log(e, "change");
      let len1 = this.selectVal.length,
        len2 = this.optionsSelect.length;
      if (e) {
        // '全选'
        if (len1 === len2) this.selectVal = [];
        // '全不选'
        else this.changeSelectedData();
      } else {
        if (len1 < len2) this.changeSelectedData();
        else this.selectVal = [];
      }
    },
    changeSelectedData() {
      this.selectVal = this.optionsSelect.reduce((pre, cur) => {
        pre.push(cur[this.props.value])
        return pre
      }, [])
    }
  }
}
</script>

<style lang="scss">
.select-all-comp {
  .el-select-dropdown__list {
    padding-top: 0px;
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
