<template>
  <div class="sidebar" :class="{ 'minimized': isMinimized }">
    <button class="minimize-btn" @click="toggleMinimize">
      <i class="fa" :class="isMinimized ? 'fa-chevron-right' : 'fa-chevron-left'" aria-hidden="true"></i>
    </button>
    <nav>
      <ul>
        <li>
          <router-link to="/" class="menu-item">
            <i class="fa fa-home" aria-hidden="true"></i>
            <span class="text" v-show="!isMinimized">მთავარი</span>
          </router-link>
        </li>
        <li>
          <router-link to="/view" class="menu-item">
            <i class="fa fa-table" aria-hidden="true"></i>
            <span class="text" v-show="!isMinimized">ცხრილი</span>
          </router-link>
        </li>
        <li>
          <router-link to="/add" class="menu-item">
            <i class="fa fa-plus-square" aria-hidden="true"></i>
            <span class="text" v-show="!isMinimized">დამატება</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const isMinimized = ref(false);

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

</script>

<style scoped>
.sidebar {
  width: 12rem;
  height: 100vh;
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 100px 0;
  transition: width 0.3s ease;
  position: relative;
  box-shadow: 4px 7px 12px 0px rgb(0 48 73 / 25%);
  z-index: 200;
}

.sidebar.minimized {
  width: 4rem;
}

.minimize-btn {
  position: absolute;
  top: 30px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background: var(--primary-color);
  color: var(--text-color);
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
}

.minimize-btn:hover {
  background: #34495e;
}

.minimize-btn i {
  font-size: 1.5em;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: var(--text-color);
  text-decoration: none;
  gap: 1rem;
  white-space: nowrap;
}

.menu-item i {
  font-size: 1.3em;
}

.menu-item:hover {
  background-color: #34495e;
}

.text {
  font-size: 1.2em;
  transition: opacity 0.3s ease-in-out;
}

.router-link-active {
  background-color: #34495e;
  border-left: 4px solid #42b983;
}

.sidebar.minimized .menu-item {
  padding: 15px;
  justify-content: center;
}

.sidebar.minimized i {
  font-size: 1.4em;
}


</style>