<template>
  <div class="dashboard">
    <div class="welcome-box box">
      <h2>მოგესალმებით</h2>
      <p>დღეს: {{ today }}</p>
    </div>

    <div class="news-box box">
      <h2>სიახლეები</h2>
      <ul>
        <li>დაემატა რედაქტირებადი ცხრილი</li>
        <li>შეიძლება მონაცემების ჩასმა Excel-დან</li>
      </ul>
    </div>

    <div class="stats-box box">
      <h2>სტატისტიკა</h2>
      <p>ჩანაწერები: {{ total }}</p>
      <p class="completed">დასრულებული: {{ completed }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import type { TableRow } from '../types';

const today = moment().format('YYYY-MM-DD')

const records = JSON.parse(localStorage.getItem('data') || '[]') as TableRow[];
const total = records.length;
const completed = records.filter((record) => record.status === 'დასრულებული').length;

</script>


<style scoped>

.dashboard {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2em;
  padding: 2rem;
  margin: 2rem auto;
}

.box {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.box h2 {
  padding-bottom: 1em;
}


.welcome-box,
.news-box,
.stats-box {
  background: #f7f7f7;
  padding: 2em;
  border-radius: 8px;
}

ul > li {
  margin-left: 1rem;
}

.completed {
  color: #006800;
}
</style>
