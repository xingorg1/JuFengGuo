<template>
  <div
    @dragstart.prevent
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]">
    <span
      class="el-input-number__decrease"
      role="button"
      v-if="controls"
      v-repeat-click="decrease"
      :class="{'is-disabled': minDisabled}"
      @keydown.enter="decrease">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="el-input-number__increase"
      role="button"
      v-if="controls"
      v-repeat-click="increase"
      :class="{'is-disabled': maxDisabled}"
      @keydown.enter="increase">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <el-input
      ref="input"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange">
    </el-input>
  </div>
</template>
<script>
  import ElInput from 'element-ui/packages/input';
  import Focus from 'element-ui/src/mixins/focus';
  import RepeatClick from 'element-ui/src/directives/repeat-click';

  export default {
    name: 'ElInputNumber',
    mixins: [Focus('input')],
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    directives: {
      repeatClick: RepeatClick
    },
    components: {
      ElInput
    },
    props: {
      separator: {
        type: String,
        default: ''
      },
      step: {
        type: Number,
        default: 1
      },
      stepStrictly: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {},
      disabled: Boolean,
      size: String,
      controls: {
        type: Boolean,
        default: true
      },
      controlsPosition: {
        type: String,
        default: ''
      },
      name: String,
      label: String,
      placeholder: String,
      precision: {
        type: Number,
        validator(val) {
          return val >= 0 && val === parseInt(val, 10);
        }
      }
    },
    data() {
      return {
        currentValue: 0,
        userInput: null
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          let newVal = value === undefined ? value : Number(value);
          if (newVal !== undefined) {
            if (isNaN(newVal)) {
              return;
            }

            if (this.stepStrictly) {
              const stepPrecision = this.getPrecision(this.step);
              const precisionFactor = Math.pow(10, stepPrecision);
              newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
            }

            if (this.precision !== undefined) {
              newVal = this.toPrecision(newVal, this.precision);
            }
          }
          if (newVal >= this.max) newVal = this.max;
          if (newVal <= this.min) newVal = this.min;
          this.currentValue = newVal;
          this.userInput = null;
          this.$emit('input', newVal);
        }
      }
    },
    computed: {
      minDisabled() {
        return this._decrease(this.value, this.step) < this.min;
      },
      maxDisabled() {
        return this._increase(this.value, this.step) > this.max;
      },
      numPrecision() {
        const { value, step, getPrecision, precision } = this;
        const stepPrecision = getPrecision(step);
        if (precision !== undefined) {
          if (stepPrecision > precision) {
            console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
          }
          return precision;
        } else {
          return Math.max(getPrecision(value), stepPrecision);
        }
      },
      controlsAtRight() {
        return this.controls && this.controlsPosition === 'right';
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      inputNumberSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      inputNumberDisabled() {
        return this.disabled || !!(this.elForm || {}).disabled;
      },
      displayValue() {
        if (this.userInput !== null) {
          return this.userInput;
        }

        let currentValue = this.currentValue;

        if (typeof currentValue === 'number') {
          if (this.stepStrictly) {
            const stepPrecision = this.getPrecision(this.step);
            const precisionFactor = Math.pow(10, stepPrecision);
            currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
          }

          if (this.precision !== undefined) {
            currentValue = currentValue.toFixed(this.precision);
          }
          if (this.separator) {
            // currentValue = currentValue.toLocaleString() fixme: 这个函数有缺点，只能小数点后三位、而且四舍五入式截断
            // FIXME: 增加千位分隔符的关键
            currentValue = this.generatingThousandthPer(currentValue)
          }
        }

        return currentValue;
      }
    },
    methods: {
      generatingThousandthPer(num) {
        num += ''
        let reg = /(?=(\B)(\d{3})+$)/g,
          // regBack = /(\d)(?=(?:\d{3})+$)/g,
          num1 = num.split(".")[0],
          num2 = num.split(".")[1];
        let c = num1 && num1.toString().replace(reg, "$1" + this.separator);
        return num.toString().indexOf(".") !== -1 ? c + "." + num2 : c;
      },
      toPrecision(num, precision) {
        if (precision === undefined) precision = this.numPrecision;
        return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
      },
      getPrecision(value) {
        if (value === undefined) return 0;
        const valueString = value.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      _increase(val, step) {
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);
        // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
        return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
      },
      _decrease(val, step) {
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);

        return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
      },
      increase() {
        if (this.inputNumberDisabled || this.maxDisabled) return;
        const value = this.value || 0;
        const newVal = this._increase(value, this.step);
        this.setCurrentValue(newVal);
      },
      decrease() {
        if (this.inputNumberDisabled || this.minDisabled) return;
        const value = this.value || 0;
        const newVal = this._decrease(value, this.step);
        this.setCurrentValue(newVal);
      },
      handleBlur(event) {
        this.$emit('blur', event);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      setCurrentValue(newVal) {
        const oldVal = this.currentValue;
        if (typeof newVal === 'number' && this.precision !== undefined) {
          newVal = this.toPrecision(newVal, this.precision);
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        if (oldVal === newVal) return;
        this.userInput = null;
        this.$emit('input', newVal);
        this.$emit('change', newVal, oldVal);
        this.currentValue = newVal;
      },
      handleInput(value) {
        // 如果触发了非change事件，展示的内容就会取userInput， 是个字符串数字
        this.userInput = value;
      },
      handleInputChange(value) {
        // FIXME: 返回值的时候去掉千位分隔符
        const reg = new RegExp(`${this.separator}`, 'g');
        const newVal =
          value === ""
            ? undefined
            : this.separator
            ? Number(value.replace(reg, ""))
            : Number(value);
        if (!isNaN(newVal) || value === '') {
          this.setCurrentValue(newVal);
        }
        // 如果触发了change事件，展示的内容就会取currentValue，是个纯数字
        this.userInput = null;
      },
      select() {
        this.$refs.input.select();
      }
    },
    mounted() {
      let innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('role', 'spinbutton');
      innerInput.setAttribute('aria-valuemax', this.max);
      innerInput.setAttribute('aria-valuemin', this.min);
      innerInput.setAttribute('aria-valuenow', this.currentValue);
      innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
    },
    updated() {
      if (!this.$refs || !this.$refs.input) return;
      const innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('aria-valuenow', this.currentValue);
    }
  };
</script>
