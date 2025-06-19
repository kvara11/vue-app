<template>
    <header class="app-header">
        <router-link class="logo-cont" to="/">
            <img src="../assets/logo.svg" alt="logo" class="logo-img">
            <strong class="logo-text">App</strong>
        </router-link>
        <div class="info">
            <span class="status-time">
                <i class="fa fa-circle" aria-hidden="true"></i>
                <span class="time">{{ time }}</span>
            </span>
            <span class="username"><i>{{ props.username }}</i></span>
            <button class="logout-button" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i><strong> გამოსვლა</strong></button>
        </div>
    </header>
</template>



<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import { authService } from '../services/authService';

const props = defineProps<{
    username: {
        type: string,
    }
}>();

let time = ref(moment().format('HH:mm'));

onMounted(() => {
    const intervalId = window.setInterval(() => {
        time.value = moment().format('HH:mm');
    }, 1000);

    onUnmounted(() => {
        clearInterval(intervalId);
    });
})

const { logout } = authService();

</script>



<style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-color);
    padding: 1rem 2rem;
    box-shadow: 4px 7px 12px 0px rgb(0 48 73 / 25%);
    z-index: 100;
}

.logo-text {
    font-size: 1.5rem;
}

.logo-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: var(--text-color);
}

.logo-img {
    width: 2em;
    transition: all 0.4s ease-in-out;
}

.logo-cont:hover .logo-img {
    filter: brightness(1.4);
    width: 2.3em;
    rotate: 25deg;
}


.info {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.5rem 1.2rem;
    border-radius: 2rem;
}

.status-time {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-weight: 500;
    color: #00ff80;
    background: rgba(0, 255, 128, 0.07);
    padding: 0.3em 0.9em;
    border-radius: 1em;
    font-size: 1.05em;
}

.status-time .fa-circle {
    font-size: 0.7em;
    color: #00ff80;
    animation: flash 2.2s infinite;
}

@keyframes flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.05; }
}

.time {
    color: var(--text-color);
    font-family: 'Fira Mono', 'Consolas', monospace;
    font-size: 1em;
    letter-spacing: 0.04em;
}

.username {
    color: var(--text-color);
    font-weight: 600;
    font-size: 1.05em;
    padding: 0.3em 0.9em;
    border-radius: 1em;
}

.logout-button {
    background: linear-gradient(90deg, #c43c3c 60%, #d6502e 100%);
    color: white;
    border: none;
    padding: 0.4em 1.2em;
    border-radius: 1.2em;
    font-weight: 700;
    font-size: 0.9em;
    margin-left: 0.7em;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(240, 78, 78, 0.08);
    transition: background 0.2s, box-shadow 0.2s;
}

.logout-button:hover {
    background: linear-gradient(90deg, #d35839 60%, #ce5a5a 100%);
    box-shadow: 0 4px 16px rgba(240, 78, 78, 0.15);
}
</style>