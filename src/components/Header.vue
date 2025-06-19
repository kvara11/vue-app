<template>
    <header class="app-header">
        <router-link class="logo-cont" to="/">
            <img src="../assets/logo.svg" alt="logo">
            <strong class="logo">App</strong>
        </router-link>
        <div class="info">
            <span class="username"><i class="fa fa-circle" aria-hidden="true"></i> Logged in as: <i>{{ props.username }}</i></span>
            <button class="logout-button" @click="logout"><strong>გასვლა</strong></button>
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
    background-color: var(--primary-color);
    padding: 1rem 2rem;
    z-index: 1000;
}

.logo {
    font-size: 1.5rem;
}

.logo-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: var(--text-color);
}

.info {
    color: var(--text-color);
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
    font-size: 0.9rem;
}

.logout-button:hover {
    background-color: #d63b3b;
}

img {
    width: 2em;
}

.fa-circle {
    color: #00ff80;
    font-size: 0.8em;
    margin-right: 0.5em;
}
</style>