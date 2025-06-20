<template>
  <div class="view-view">
    <h3>ცხრილი</h3>
    <div v-if="loading" class="table-loading">
      <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <Table
      v-else
      :data="tableData"
      :columns="columns"
      @view=""
      @edit=""
      @row-edited="editRow"
      @send="sendRow"
      @delete="deleteRow"
    />

    
  </div>
</template>

<!-- filters status date-->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import type { TableRow, Column } from '../types';

const loading = ref(true);

const columns: Column[] = [
  { key: 'id', type: 'text', label: 'ID' },
  { key: 'name', type: 'text', label: 'სახელი' },
  { key: 'createdAt', type: 'text', label: 'შექმნის დრო' },
  { key: 'createdBy', type: 'text', label: 'ვინ შექმნა' },
  { key: 'type', type: 'text', label: 'ტიპი' },
  { key: 'status', type: 'text', label: 'სტატუსი' }
];


const tableData = ref<TableRow[]>([]);


// loading ის სიმულაცია
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    tableData.value = JSON.parse(localStorage.getItem('data') || '[]');
    loading.value = false;
  }, 200);
});



const sendRow = (id: string) => {
  const index = tableData.value.findIndex(row => row.id === id);
  tableData.value[index].status = 'დასრულებული';
};

function editRow(editedRow: TableRow) {
  const index = tableData.value.findIndex((row: TableRow) => row.id === editedRow.id);

  tableData.value[index] = editedRow;
  localStorage.setItem('data', JSON.stringify(tableData));
}

const deleteRow = (id: string) => {
  const index = tableData.value.findIndex(row => row.id === id);
  if (index !== -1) {
    tableData.value.splice(index, 1);
  }
};

</script>


<style scoped>
.view-view {
  padding: 20px;
}

.table-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--primary-color);
  font-size: 1.2em;
}
</style> 