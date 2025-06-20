<template>
  <main>
    <Login v-if="!isLoggedIn" />
    <MainLayout v-else :username="user?.username" />
  </main>
</template>


<script setup lang="ts">

import { computed } from 'vue'
import authService from './services/authService'
import Login from './components/Login.vue'
import MainLayout from './components/MainLayout.vue'

const { user } = authService();
console.log(user.value);

const isLoggedIn = computed(() => user.value);
  


if (isLoggedIn) {

  // სადემონსტრაციო ინფორმაცია
  const data = localStorage.getItem('data');

  if (!data) {

    const j = [
      {
        id: 1,
        name: 'მაგალითი 1',
        createdAt: '2025-01-00 10:33',
        createdBy: 'admin',
        type: 'ტიპი 1',
        status: 'აქტიური'
      },
      {
        id: 2,
        name: 'მაგალითი 2',
        createdAt: '2025-02-17 12:00',
        createdBy: 'admin',
        type: 'ტიპი 1',
        status: 'აქტიური'
      },
      {
        id: 3,
        name: 'მაგალითი 3',
        createdAt: '2025-03-20 15:20',
        createdBy: 'admin',
        type: 'ტიპი 1',
        status: 'დასრულებული'
      }
    ];

    localStorage.setItem('data', JSON.stringify(j));

  }
}
</script>
