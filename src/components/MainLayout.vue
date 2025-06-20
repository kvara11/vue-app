<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Header :username="props.username" />
      <main class="content">
        <RouterView />
      </main>
      <Footer />
    </div>
  </div>
</template>


<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
import Sidebar from './Sidebar.vue';

const props = defineProps<{
  username: {
    type: string,
  }
}>();

</script>



<style scoped>

.layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 20px;
  background: var(--bg-layout);
}

h1 {
  color: #2c3e50;
}
</style>