<template>
    <header class="app-header">
        <div class="left">
            <strong class="logo">App</strong>
        </div>
        <div class="right">
            <span class="username">მოგესალმებით, {{ props.username }}!</span>
            <button class="logout-button" @click="logout">Logout</button>
        </div>
    </header>
</template>



<script setup lang="ts">

import { authService } from '../services/authService';

const props = defineProps<{
    username: {
        type: string,
    }
}>();

const { logout } = authService();

</script>



<style scoped>

.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e3a59;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 1.5rem;
}

.right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.username {
    font-weight: 500;
}

.logout-button {
    background-color: #f04e4e;
    color: white;
    border: none;
    padding: 0.4rem 1rem;
    border-radius: 5px;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #d63b3b;
}
</style>