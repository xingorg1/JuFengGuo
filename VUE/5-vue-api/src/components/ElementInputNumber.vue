<template>
  <div class="api-element-input-number">
    <div class="area">
      <h3>实现el-input-number增加千位分隔符</h3>
      <p>使用blur事件（值变了，视图不展示）</p>
      <el-input-number
        v-model.trim="form.num"
        @blur="inputMoney($event, 'pastAdjustFee')"
      >
      </el-input-number>
      <p>使用自定义指令（但是也要失焦才能实现）</p>
      <el-input-number
        v-model="ruleForm1.workInfo.registeredCapital"
        v-thousands.registeredCapital="ruleForm1.workInfo"
      ></el-input-number>
    </div>
  </div>
</template>
<script>
import { getInputValue } from "../utils/util";
const { log } = console;
export default {
  name: "ElementInputNumber",
  data() {
    return {
      form: {
        num: "",
      },
      ruleForm1: {
        workInfo: {
          registeredCapital: "1234567",
        },
      },
    };
  },
  methods: {
    inputMoney(el, name) {
      log(el, name, getInputValue(el));
      this.form["num"] = getInputValue(el);
      console.log(this.form);
    },
  },
  directives: {
    thousands: {
      bind(el, binding, vnode) {
        const key = Object.keys(binding.modifiers)[0];
        // 处理千分位展示
        const generatingThousandthPer = (num) => {
          let num1 = num.split(".")[0],
            num2 = num.split(".")[1];
          let c = num1.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
          return num.toString().indexOf(".") !== -1 ? c + "." + num2 : c;
        };
        // 赋值
        const assignment = (event, value, value2) => {
          binding.value[key] = value;
          vnode.context.$nextTick(
            () =>
              (event.target.value = generatingThousandthPer(value2 || value))
          );
        };
        // 处理最后一位非法字符
        const handlerIllegalStr = (str) => {
          while (!/^[0-9]+.?[0-9]*/.test(str.charAt(str.length - 1))) {
            str = str.substr(0, str.length - 1);
          }
          return str;
        };

        el.addEventListener("input", (event) => {
          let inp = (event.target.value = event.target.value.replace(/,/g, ""));
          assignment(event, inp);
        });

        // element
        const input = el.querySelector(".el-input__inner");
        if (input) {
          input.addEventListener("blur", (event) => {
            const val = event.target.value;
            if (!val || !/^[0-9]+.?[0-9]*/.test(val)) return;
            assignment(event, handlerIllegalStr(val.replace(/,/g, "")));
          });
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
</style>
