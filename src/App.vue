<template>
  <div>
    <Login v-if="!isLoggedIn" />
    <MainLayout v-else :username="user?.username" />
  </div>
</template>


<script setup lang="ts">

import { computed } from 'vue'
import { authService } from './services/authService'
import Login from './components/Login.vue'
import MainLayout from './components/MainLayout.vue'

const { user } = authService()
const isLoggedIn = computed(() => user.value)



// create example data
if (isLoggedIn) {
  
  const j = [
    {
      id: 1,
      name: 'მაგალითი 1',
      createdAt: '2024-03-20',
      createdBy: 'ადმინი',
      type: 'ტიპი 1',
      status: 'აქტიური'
    },
    {
      id: 2,
      name: 'მაგალითი 1',
      createdAt: '2024-03-20',
      createdBy: 'ადმინი',
      type: 'ტიპი 1',
      status: 'აქტიური'
    },
    {
      id: 3,
      name: 'მაგალითი 1',
      createdAt: '2024-03-20',
      createdBy: 'ადმინი',
      type: 'ტიპი 1',
      status: 'აქტიური'
    }
  ];
  
  localStorage.setItem('data', JSON.stringify(j));

}
</script>
