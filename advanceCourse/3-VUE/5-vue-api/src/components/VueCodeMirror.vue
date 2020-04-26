<template>
  <!-- 这里添加备注 -->
  <div class="code-mirror-vue">
    <!-- bidirectional data binding（双向数据绑定） -->
    <codemirror :options="cmOptions" v-model="code"></codemirror>
  </div>
</template>

<script>
// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
// more codemirror resources
// import 'codemirror/some-resource...'
const { log } = console

export default {
  name: 'VueCodeMirror',
  components: {
    codemirror
  },
  data() {
    return {
      code: 'const a = 10',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {
    onCmReady(cm) {
      log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>

<style >
</style>