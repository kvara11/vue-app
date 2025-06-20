<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column.key">{{ column.label }}</th>
          <th>მოქმედებები</th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody" name="fade">
        <tr v-for="row in tableData" :key="row.id">
          <td v-for="column in props.columns" :key="column.key">{{ row[column.key] }}</td>
          <td class="actions">

            <button @click="emits('view', row.id)" class="action-btn view" title="დათვალირება">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            
            <button @click="emits('send', row.id)" class="action-btn send" title="გადაგზავნა">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
            
            <button @click="emits('edit', row.id)" class="action-btn edit" title="რედაქტირება">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            
            <button @click="emits('delete', row.id)" class="action-btn delete" title="წაშლა">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>

          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableRow, Column } from '../types';
// import * as XLSX from 'xlsx';




const props = defineProps<{
  data: TableRow[];
  columns: Column[];
  title?: string;
  onView?: (id: string) => void;
  onSend?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}>();

const emits = defineEmits<{
  view: [id: string];
  send: [id: string];
  edit: [id: string];
  delete: [id: string];
}>();


const tableData = ref<TableRow[]>(props.data);

</script>



<style scoped>
.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.data-table tr:hover {
  background-color: #e8feff;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.view {
  background-color: #4CAF50;
  color: white;
}

.send {
  background-color: #2196F3;
  color: white;
}

.edit {
  background-color: #ffbd07;
  color: rgb(49, 49, 49);
}

.delete {
  background-color: #f44336;
  color: white;
}

.action-btn:hover {
  opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}



</style>