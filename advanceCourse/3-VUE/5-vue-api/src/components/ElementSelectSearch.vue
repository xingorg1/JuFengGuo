<template>
  <div class="element-select-search">
    <div class="area">
      <h3>全选效果+搜索后全选</h3>
      <el-select
        v-model="selectVal"
        placeholder="请选择"
        filterable
        clearable
        multiple
        collapse-tags
        remote
        reserve-keyword
        :remote-method="remoteMethod"
        :loading="loading"
        popper-class="select-all-comp"
        @change="selectChange"
      >
        <el-checkbox
          v-model="checkedAll"
          :indeterminate="isIndeterminate"
          @change="checkboxChange"
          >全选</el-checkbox
        >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- <ElementCascader :cascaderOptions="cascaderOptions"/> -->
  </div>
</template>

<script>
const { log } = console
export default {
  components: {
  },
  data () {
    return {
      options: [],
      loading: false,
      selectVal: [],
      optionsSelect: this.$mock.selectAllData,
    }
  },
  computed: {
    allOptionsData: function() {
      return this.options.reduce((pre, cur) => {
        pre.push(cur.value)
        return pre
      }, [])
    },
    isIndeterminate: function() {
      // 是否半选
      let len = this.selectVal.length;
      return len !== 0 && len < this.options.length;
    },
    checkedAll: {
      // 是否全选
      get: function() {
        // log("get");
        return this.selectVal.length >= this.options.length; // 应该是selctVal里包含options的length
      },
      set: function(e) {
        log(e, "set===");
      },
    },
  },
  mounted() {
    this.options = this.optionsSelect
  },
  methods: {
    remoteMethod(query) {
      log('remote')
      if (query !== '') {
        this.loading = true;
        this.options = this.optionsSelect.filter(item => {
          return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
        });
        this.loading = false;
      } else {
        this.options = this.optionsSelect;
      }
    },
    // 切换全选按钮
    checkboxChange(e) {
      // 全选：是从当前列表内容一个一个选中。全不选，是将selectVal中的内容去掉当前的几项。selectVal得用什么数据结构更友好？
      // select的选中和不确定状态，应该是和当前列表对比，而不是全部数据。
      // log(e, "change");
      let len1 = this.selectVal.length,
        len2 = this.options.length;
      if (e) {
        // '全选'
        log(e)
        if (len1 === len2) this.selectVal = [];
        // '全不选'
        else this.selectAllDataFn();
      } else {
        if (len1 < len2) this.selectAllDataFn();
        else this.selectVal = [];
      }
    },
    selectAllDataFn() {
      this.selectVal = this.allOptionsData
    },
    selectChange() {
      log('change')
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
