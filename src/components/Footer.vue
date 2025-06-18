<template>
    <footer class="app-footer">
        <span><i class="fa fa-copyright" aria-hidden="true"></i> {{ currentYear }} • ყველა უფლება დაცულია </span>
    </footer>
</template>

<script setup lang="ts">
import moment from 'moment'

const currentYear = moment().format('YYYY')
</script>

<style scoped>

.app-footer {
  background-color: var(--primary-color);
  color: var(--text-color);
  height: 2.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
}

</style>