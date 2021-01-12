<!--
 * @Author: @Guojufeng
 * @Date: 2020-11-08 11:12:10
 * @LastEditors: @Guojufeng
 * @LastEditTime: 2020-11-08 11:29:16
 * @FilePath: /Users/guojufeng/Documents/GitHub/JuFengGuo/advanceCourse/3-VUE/5-vue-api/src/components/ApiSlot.vue
-->
<template>
  <div class="api-slot slot">
    <h4>slot & template</h4>
    <div class="api-slot-default">
      <slot :user="user"></slot>
    </div>
    <div class="api-slot-name">
      <slot name="name"></slot>
    </div>
    <div class="api-slot-name2">
      <slot name="name2"></slot>
    </div>
    <div class="api-slot-slotName">
      <slot name="slotName"></slot>
    </div>
    <div class="api-slot-slotProps">
      <slot name="slotProps" v-bind:user="user"></slot>
    </div>
  </div>
</template>
<script>
const {log} = console
export default {
  name: "ApiSlot",
  props: {
  },
  data() {
    return {
      user: {
        name: 'xing.org1^',
        sex: 'male'
      }
    };
  },
  mounted() {
    log('插槽API')
  },
  methods: {
    
  }
};
</script>