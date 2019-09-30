<template>
  <div class="student">
    <h1>This is an student page</h1>
    <add-student></add-student>
    <student-list/>
  </div>
</template>
<script>
import AddStudent from "@/components/student/AddStudent" //@代表src
import StudentList from "@/components/student/StudentList"
export default {
  components: {
    "add-student": AddStudent,
    "student-list": StudentList
  },
  data() {
    return {
   
    };
  },
  methods: {
  }
};
</script>
<style>
.cont {
  padding: 20px;
}
.student h3 {
  margin: 10px 0;
}
</style>

