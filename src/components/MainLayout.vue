<template>
  <div>
    <Header :username="props.username" />
    <Footer />
  </div>
</template>


<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';

const props = defineProps<{
  username: {
    type: string,
  }
}>();

</script>



<style scoped>
h1 {
  color: #2c3e50;
}
</style>