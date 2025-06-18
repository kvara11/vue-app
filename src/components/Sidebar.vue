<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/add" class="menu-item">
            <span class="icon">➕</span>
            <span class="text">დამატება</span>
          </router-link>
        </li>
        <li>
          <router-link to="/view" class="menu-item">
            <span class="icon">👁️</span>
            <span class="text">ცხრილი</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup lang="ts">

</script>

<style scoped>

.sidebar {
  width: 160px;
  height: 100vh;
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 100px 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #34495e;
}

.icon {
  margin-right: 10px;
  font-size: 1.2em;
}

.text {
  font-size: 0.9em;
}

.router-link-active {
  background-color: #34495e;
  border-left: 4px solid #42b983;
}
</style>