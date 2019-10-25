<template>
  <div class="home">
    <my-count />
  </div>
</template>

<script>
// @ is an alias to /src
import MyCount from '@/components/MyCount.vue'

export default {
  name: 'home',
  components: {
    MyCount
  }
}
</script>
