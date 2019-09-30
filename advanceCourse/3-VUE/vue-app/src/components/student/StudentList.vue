<template>
  <div class="list">
    <hr>
    <hr>
    <h3>学生列表信息：</h3>
    <ul>
      <li v-for="item in studentList" :key="item.id">
        姓名： {{ item.name }}，
        年龄： {{ item.age }}
      </li>
    </ul>
    <hr>
    <hr>
    <h3>学生列表字符串：</h3>
    <ul class="list">
      <li v-for="(item,index) in newStudentList" :key="index+'new'">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'StudentList',
  data() {
    return {
    };
  },
  computed:{
    ...mapState('student',['studentList']),
    ...mapGetters('student',['newStudentList'])
  }
};
</script>
<style>
.list li{
  margin-bottom: 10px;
}
</style>

