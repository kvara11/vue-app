<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form" novalidate>
            <h2>შესვლა</h2>

            <label for="email">ელ. ფოსტა</label>
            <input id="email" type="email" v-model="username" placeholder="your@email.com" required
                autocomplete="username" />

            <label for="password">პაროლი</label>
            <input id="password" type="password" v-model="password" placeholder="••••••••" required
                autocomplete="current-password" minlength="6" />

            <button type="submit">შესვლა</button>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>



<script setup lang="ts">

import { ref } from 'vue';
import { authService } from '../services/authService';

const { login } = authService();

const username = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);

function handleLogin(): void {
    
    error.value = null
    
    const success = login(username.value, password.value);

    if (!success) {
        error.value = 'არასწორი მომხმარებელი ან პაროლი';
    }
}
</script>




<style scoped>
.login-container {
    min-height: 65vh;
    min-width: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
}

.login-form {
    background: #201335;
    padding: 2.5rem 3rem;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    width: 320px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    margin-bottom: 0.3rem;
    font-weight: 600;
    color: #555;
    text-align: left;
    width: 100%;
    display: block;
}

h2 {
    margin-bottom: 1.5rem;
    color: #FFFDED;
    font-weight: 700;
    text-align: center;
}

label {
    margin-bottom: 0.3rem;
    font-weight: 600;
    color: #FFFDED;
}

input {
    padding: 0.55rem 0.75rem;
    margin-bottom: 1.25rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    outline-offset: 2px;
}

input:focus {
    border-color: #e44343;
    outline: none;
}

button {
    background: #e44343;
    color: white;
    padding: 0.7rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:disabled {
    background: #a0a0d8;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background: #5469d4;
}

.error {
    margin-top: 1rem;
    color: #d9534f;
    font-weight: 600;
    text-align: center;
}
</style>