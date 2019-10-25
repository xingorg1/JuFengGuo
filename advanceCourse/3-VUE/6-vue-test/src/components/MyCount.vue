<template>
    <div class="my-count">
      {{ count }}
      <button @click="increment">自增</button>
    </div>
</template>
<script>
export default {
  name: 'my-count',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      this.count++
    }
  }
}
</script>
