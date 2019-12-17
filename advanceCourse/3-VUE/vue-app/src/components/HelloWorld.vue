<template>
  <div class="hello">
    <!-- bidirectional data binding（双向数据绑定） -->
    <codemirror :options="cmOptions" ref="myCm" v-model="code"></codemirror>
    <!-- <codemirror
      :options="cmOptions"
      :value="code"
      @focus="onCmFocus"
      @input="onCmCodeChange"
      @ready="onCmReady"
      ref="myCm"
    ></codemirror>-->
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
  name: 'HelloWorld',
  props: {
    msg: String,
    code: 'CREATE DATABASE IF NOT EXISTS test;',
    cmOptions: {
      // codemirror options
      tabSize: 4,
      mode: 'text/x-mysql',
      theme: 'base16-dark',
      lineNumbers: true,
      line: true
      // more codemirror options, 更多 codemirror 的高级配置...
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
// -- 如果test数据库不存在，就创建test数据库：
// CREATE DATABASE IF NOT EXISTS test;

// -- 切换到test数据库
// USE test;

// -- 删除classes表和students表（如果存在）：
// DROP TABLE IF EXISTS classes;
// DROP TABLE IF EXISTS students;

// -- 创建classes表：
// CREATE TABLE classes (
// id BIGINT NOT NULL AUTO_INCREMENT,
// name VARCHAR(100) NOT NULL,
// PRIMARY KEY (id)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

// -- 创建students表：
// CREATE TABLE students (
// id BIGINT NOT NULL AUTO_INCREMENT,
// class_id BIGINT NOT NULL,
// name VARCHAR(100) NOT NULL,
// gender VARCHAR(1) NOT NULL,
// score INT NOT NULL,
// PRIMARY KEY (id)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

// -- 插入classes记录：
// INSERT INTO classes(id, name) VALUES (1, '一班');
// INSERT INTO classes(id, name) VALUES (2, '二班');
// INSERT INTO classes(id, name) VALUES (3, '三班');
// INSERT INTO classes(id, name) VALUES (4, '四班');

// -- 插入students记录：
// INSERT INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'M', 90);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (2, 1, '小红', 'F', 95);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (3, 1, '小军', 'M', 88);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (4, 1, '小米', 'F', 73);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (5, 2, '小白', 'F', 81);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (6, 2, '小兵', 'M', 55);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (7, 2, '小林', 'M', 85);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (8, 3, '小新', 'F', 91);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (9, 3, '小王', 'M', 89);
// INSERT INTO students (id, class_id, name, gender, score) VALUES (10, 3, '小丽', 'F', 85);

// -- OK:
// SELECT 'ok' as 'result:';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea,
.CodeMirror {
  border: 1px solid #666;
}
</style>

