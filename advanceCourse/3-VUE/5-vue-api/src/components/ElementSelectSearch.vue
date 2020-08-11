<template>
  <div class="element-select-search">
    <div class="area">
      <h3>全选效果+搜索后全选</h3>
                 <!-- reserve-keyword -->

      <el-select v-model="selectVal"
                 placeholder="请选择"
                 filterable
                 clearable
                 multiple
                 collapse-tags
                 remote
                 :remote-method="remoteMethod"
                 :loading="loading"
                 popper-class="select-all-comp"
                 @visible-change="visibleChange"
                 @change="selectChange"
                 @blur="blurHandle">
        <el-checkbox v-model="checkedAll"
                     :indeterminate="isIndeterminate"
                     @change="checkboxChange">全选</el-checkbox>
        <el-option v-for="item in optionsList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
                   :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>
    <!-- <ElementCascader :cascaderOptions="cascaderOptions"/> -->
  </div>
</template>

<script>
const { log } = console
export default {
  mixins: [
    {
      methods: {
        testMixin () {
          log('执行混入的testMixin方法')
        }
      }
    }
  ],
  components: {
  },
  data () {
    return {
      optionsList: [],
      loading: false,
      selectVal: [],
      originSelectData: this.$mock.selectAllData,
      optionsNoDisLen: 0, // 排除disabled后的内容列表长度
      optionsNoDisLenfilter: 0, // 过滤后的内容，排除disabled后的内容列表长度
    }
  },
  computed: {
    allOptionsData () {
      return this.optionsList.reduce((pre, cur) => {
        !cur.disabled && pre.push(cur.value)
        return pre
      }, [])
    },
    isIndeterminate: function () {
      // 是否半选
      // let len = this.selectVal.length;
      let len = 0,
        selectVal = this.selectVal;
      this.optionsList.forEach((cur) => {
        selectVal.includes(cur.value) && len++
      });
      return len !== 0 && len < this.optionsNoDisLenfilter;
    },
    checkedAll: {
      // 是否全选
      get: function () {
        let len = 0,
          selectVal = this.selectVal;
        this.optionsList.forEach((cur) => {
          selectVal.includes(cur.value) && len++
        });
        // log("get");
        return len >= this.optionsNoDisLenfilter; // 应该是selctVal里包含options的length
      },
      set: function (e) {
        log(e, "set===");
      },
    },
  },
  mounted () {
    log('初始化可选下拉为全部数据')
    this.optionsList = this.originSelectData
    this.initFunc();
    // log('混入mixins学习观察——实例内有同名函数时'); this.testMixin()
    log('混入mixins学习观察——实例内无同名函数时'); this.testMixin()
  },
  watch: {
    originSelectData (newVal) {
      newVal = newVal || []
      this.initFunc(newVal)
      // this.optionsList = newVal
      log('全部数据修改，同步修改初始化可选下拉')
    }
  },
  methods: {
    // testMixin () {
    //   log(this)
    //   log('执行组件实例内的testMixin方法')
    // },
    // 初始化，生成可以选中的所有项value集合，方便
    initFunc (options = this.originSelectData) {
      let len = 0
      this.optionsList = options
      options.forEach((cur) => !cur.disabled && len++)
      this.optionsNoDisLenfilter = this.optionsNoDisLen = len
      log(this.optionsNoDisLen)
    },
    remoteMethod (query) {
      log('remote-搜索')
      if (query !== '') {
        let len = 0
        this.loading = true;
        this.optionsList = this.originSelectData.filter(item => {
          return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
        });
        this.optionsList.forEach((item) => {
          !item.disabled && len++
          this.optionsNoDisLenfilter = len
        })
        this.loading = false;
        log('remote-if', this.optionsList, len)
      } else {
        this.optionsList = this.originSelectData;
        this.optionsNoDisLenfilter = this.optionsNoDisLen
        log('remote-else', this.optionsList, this.optionsNoDisLen)
      }
    },
    // 切换全选按钮
    checkboxChange (e) {
      // 全选：是从当前列表内容一个一个选中。全不选，是将selectVal中的内容去掉当前的几项。selectVal得用什么数据结构更友好？
      // select的选中和不确定状态，应该是和当前列表对比，而不是全部数据。
      // log(e, "change");
      let len1 = this.selectVal.length,
        len2 = this.optionsNoDisLenfilter
      if (e) {
        // '全选'
        log(e)
        if (len1 === len2) this.selectSpliceDataFn()
        // '全不选'
        else this.selectAllDataFn();
      } else {
        if (len1 < len2) this.selectAllDataFn();
        else this.selectSpliceDataFn()
      }
      log(this.selectVal)
    },
    selectSpliceDataFn () {
      // 全不选 - 从选项中去除
      let selectVal = this.selectVal;
      this.optionsList.forEach((cur) => {
        selectVal.includes(cur.value) && selectVal.splice(selectVal.indexOf(cur.value), 1)
      });
      this.selectVal = selectVal
    },
    selectAllDataFn () {
      // 全选 - 合并+去重
      this.selectVal = [...new Set(this.selectVal.concat(this.allOptionsData))]
    },
    visibleChange (show) {
      // 下拉列表收起,
      log('收起', show)
      if (!show) {
        this.initFunc();
      }
    },
    selectChange () {
      log('change')
    },
    blurHandle () {
      // 失焦时，希望下拉列表为全部数据
      log('blur')
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
