<template>
  <div class="dashboard">
    <div class="welcome-box box">
      <h2><i class="fa fa-handshake" aria-hidden="true"></i> მოგესალმებით</h2>
      <div class="line"></div>
      <p>დღეს: {{ today }}</p>
    </div>

    <div class="flex">
      <div class="news-box box">
        <h2><i class="fa fa-newspaper" aria-hidden="true"></i> სიახლეები</h2>
        <div class="line"></div>
        <ul>
          <li>დაემატა რედაქტირებადი ცხრილი</li>
          <li>შეიძლება მონაცემების ჩასმა Excel-დან</li>
        </ul>
      </div>

      <div class="stats-box box">
        <h2><i class="fa fa-line-chart" aria-hidden="true"></i> სტატისტიკა</h2>
        <div class="line"></div>
        <p>ჩანაწერები: {{ total }}</p>
        <p class="completed">დასრულებული: {{ completed }}</p>
      </div>
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
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 98%;

}

.flex {
  display: flex;
  justify-content: space-between;
  gap: 2em;
}

.box {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
  min-height: 200px;
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

p {
  font-size: 1.1rem;
  padding-left: 2rem;
  margin-bottom: 0.8rem;
}

ul>li {
  font-size: 1.1rem;
  margin-left: 2rem;
  margin-bottom: 0.8rem;
}

.completed {
  color: #006800;
}

i {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.line {
  width: 60%;
  margin-top: -0.5em;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

</style>
