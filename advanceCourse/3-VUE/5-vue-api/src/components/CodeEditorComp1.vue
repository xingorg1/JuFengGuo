<template>
  <div class="box cm-container">
    <CodemirrorComp
      :value="codeData"
      :options="editorOption"
      ref="myEditor"
      @change="codemirrorChange"
    />
  </div>
</template>

<script>
import { codemirror as CodemirrorComp } from "vue-codemirror-lite"; // https://github.com/cnu4/vue-codemirror-lite/blob/master/README_CN.md
const { log } = console
export default {
  name: "CodeEditorComp1",
  components: {
    CodemirrorComp,
  },
  data() {
    return {
      codeData: "SELECT * FROM guojufengsTable WHERE dt='2021-06-09'",
      editorOption: {
        mode: "sql",
        tabSize: 2,
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
      },
    };
  },
  computed: {
    codeEditorObj() {
      return this.$refs.myEditor.editor;
    },
  },
  mounted() {
    this.codeEditorObj.focus();
    log("this is current editor object", this.codeEditorObj);
  },
  methods: {
    codemirrorChange(data) {
      log(data);
    },
  },
};
</script>

<style>
</style>