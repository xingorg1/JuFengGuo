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
        reserve-keyword
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
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
    </div>
    <ElementSelectSearch />
    <ElementCascader :cascaderOptions="cascaderOptions"/>
  </div>
</template>

<script>
import ElementCascader from './ElementCascader'
import ElementSelectSearch from './ElementSelectSearch'
const { log } = console
export default {
  components: {
    ElementCascader,
    ElementSelectSearch
  },
  data () {
    return {
      selectVal: "",
      optionsSelect: this.$mock.selectAllData,
      cascaderOptions: this.$mock.cascaderOptions,
      optionsNoDisLen: 0 // 排除disabled后的内容列表长度
    }
  },
  computed: {
    // allOptionsData: function() {
    //   this.optionsNoDisLen = 0
    //   return this.optionsSelect.reduce((pre, cur) => {
    //     // 这里是全选功能，思路就是，能不能在全选的时候，只选择过滤的数据呢？这就需要知道fileter的过滤规则
    //     // 随之而来的问题1：如果过滤规则变了呢？
    //     // 随之而来的问题2：取消全选的时候怎么办？需要只取消当前过滤的内容，需要遍历啊啊啊这就是性能问题了
    //     // 性能问题：空间换时间？对象代替多次耗性能的循环

    //     if (!cur.disabled) {
    //       pre.push(cur.value)
    //       this.optionsNoDisLen ++;
    //     }
    //     return pre
    //   }, [])
    // },
    isIndeterminate: function() {
      // 是否半选
      let len = this.selectVal.length;
      return len !== 0 && len < this.optionsNoDisLen;
    },
    checkedAll: {
      // 是否全选
      get: function() {
        // log("get");
        return this.selectVal.length >= this.optionsNoDisLen;
      },
      set: function(e) {
        log(e, "set");
      }
    }
  },
  mounted() {
    this.initFunc(this.optionsSelect);
  },
  watch: {
    optionsSelect(newVal) {
      newVal = newVal || []
      this.initFunc(newVal)
    }
  },
  methods: {
    initFunc(options = []) {
      this.optionsNoDisLen = 0
      this.allOptionsData = options.reduce((pre, cur) => {
        if (!cur.disabled) {
          pre.push(cur.value)
          this.optionsNoDisLen ++;
        }
        return pre
      }, [])
      log(this.optionsNoDisLen)
    },
    // 切换全选按钮
    checkboxChange(e) {
      // log(e, "change");
      let len1 = this.selectVal.length
      // len2 = this.optionsSelect.length; // 【待优化，长度应该减去disabled】
      if (e) {
        // '全选'
        if (len1 === this.optionsNoDisLen) this.selectVal = [];
        // '全不选'
        else this.changeSelectedData();
      } else {
        if (len1 < this.optionsNoDisLen) this.changeSelectedData();
        else this.selectVal = [];
      }
    },
    changeSelectedData() {
      this.selectVal = this.allOptionsData
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
