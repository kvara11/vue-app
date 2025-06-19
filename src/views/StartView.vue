<template>
  <div class="dashboard">
    <div class="welcome-box box">
      <h2>მოგესალმებით</h2>
      <p>{{ today }}</p>
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
      <p>ჩანაწერების რაოდენობა: {{ total }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'

const today = moment().format('YYYY-MM-DD')
const total = JSON.parse(localStorage.getItem('data') || '[]').length;

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
  background: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.box h2 {
  padding-bottom: 0.5rem;
}


.welcome-box,
.news-box,
.data-box,
.stats-box {
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 8px;
}

ul > li {
  margin-left: 1rem;
}
</style>
