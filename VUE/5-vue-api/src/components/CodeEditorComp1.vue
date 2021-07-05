<template>
  <div class="code-editor">
    <CodemirrorComp
      class="cm-container"
      :value="codeData"
      :options="editorOption"
      ref="myEditor"
      @change="codemirrorChange"
    />
    <el-button @click="sqlFormatterHandle">SQL格式化</el-button>
  </div>
</template>

<script>
import { codemirror as CodemirrorComp } from "vue-codemirror-lite"; // https://github.com/cnu4/vue-codemirror-lite/blob/master/README_CN.md
// sql格式化
import { format as sqlFormatter } from "sql-formatter";

const { log } = console;
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
    this.codeEditorObj.on("cursorActivity", () => {
      this.codeEditorObj.showHint();
    });
  },
  methods: {
    codemirrorChange(data) {
      log(data);
    },
    sqlFormatterHandle() {
      console.log(sqlFormatter);
      const sqlvalue = sqlFormatter(this.codeData);
      console.log("sqlvalue:", sqlvalue);
      this.codeData = sqlvalue;
    },
  },
};
</script>

<style>
</style>