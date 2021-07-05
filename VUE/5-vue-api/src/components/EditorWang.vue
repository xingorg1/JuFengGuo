<template>
  <div class="editor-wang">
    <div class="area"
         style="overflow:hidden;">
      <h3>富文本编辑器
        <el-link href="https://github.com/wangfupeng1988/wangEditor"
                 type="primary">官网与源码</el-link>
      </h3>
      <el-alert type="success"
                title="搭配了xss攻击防具工具"
                description="文字说明文字说明文字说明文字说明文字说明文字说明"
                show-icon
                style="margin-bottom:10px;"
                :closable="false">
      </el-alert>
      <div ref="editor"
           style="text-align:left"></div>
      <el-button v-on:click="getContent"
                 type="primary"
                 size="mini"
                 style="margin-top:10px;float:right;">查看内容(控制台)</el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import XSS from 'xss'
const { log } = console;
log(XSS)
export default {
  name: "EditorWang",
  components: {
   
  },
  data() {
    return {
      editorContent: ''
    };
  },

  methods: {
    getContent: function () {
            log(this.editorContent)
        }
  },
    mounted() {
    var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = XSS(html) // 使用专业的xss防御工具
          // this.editorContent = html
        }
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.zIndex = 100 // 配置编辑区域的 z-index
        editor.create()
  },
};
</script>

<style scoped>
</style>
