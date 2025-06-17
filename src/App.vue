<script setup lang="ts">
import { computed } from 'vue'
import { authService } from './services/authService'
import Login from './components/Login.vue'
// import MainLayout from './components/MainLayout.vue'

const { user } = authService()
const isLoggedIn = computed(() => user.value !== null)
</script>

<template>
  <div>
    <Login v-if="!isLoggedIn" />
    <!-- <MainLayout v-else /> -->
  </div>
</template>
