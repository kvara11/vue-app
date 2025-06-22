<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Header />
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

</style>