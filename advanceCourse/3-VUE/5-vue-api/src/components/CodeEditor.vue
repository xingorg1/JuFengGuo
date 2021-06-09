<template>
  <!-- 这里添加备注 -->
  <div class="code-editor">
    <h3>第一种：codemirror代码编辑器（强大但是重）</h3>
    <CodeEditorComp />
    <h3>第二种：vue-codemirror-lite（是将codemirror的简单封装，较轻量）</h3>
    <CodeEditorComp1 />
  </div>
</template>

<script>
import CodeEditorComp from './CodeEditorComp.vue'
import CodeEditorComp1 from './CodeEditorComp1.vue'
export default {
  name: "codeEditor",
  components: {
    CodeEditorComp,
    CodeEditorComp1,
  }
};
</script>

<style >
.codesql {
  height: 200px;
  width: 600px;
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
.cm-container {
  border: #ddd solid 1px;
  margin-bottom: 10px;
}
</style>