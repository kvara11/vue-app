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

            <button @click="openViewModal(row)" class="action-btn view" title="დათვალირება">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            
            <button @click="openSendModal(row.id)" class="action-btn send" title="გადაგზავნა" :disabled="row.status !== 'აქტიური'">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
            
            <button @click="openEditModal(row)" class="action-btn edit" title="რედაქტირება" :disabled="row.status !== 'აქტიური'">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            
            <button @click="openDeleteModal(row.id)" class="action-btn delete" title="წაშლა" :disabled="row.status !== 'აქტიური'">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>

          </td>
        </tr>
      </TransitionGroup>
    </table>

    <RowModal
      v-if="showViewModal && selectedRow"
      :isOpened="showViewModal"
      :row="selectedRow"
      :columns="viewColumns"
      mode="view"
      message="sss"
      @cancel="closeViewModal"
    />
    
    <Modal 
      v-if="showSendModal"
      :isOpened="showSendModal"
      message="ნამდვილად გსურთ გადაგზავნა?"
      @confirm="confirmSend"
      @cancel="closeSendModal"
    />

    <RowModal
      v-if="showEditModal && editingRow"
      :isOpened="showEditModal"
      :row="editingRow"
      :columns="editColumns"
      mode="edit"
      message="რედაქტირება"
      @row-edited="confirmEdit"
      @confirm="confirmEdit"
      @cancel="closeEditModal"
    />

    <Modal
      v-if="showDeleteModal"
      :isOpened="showDeleteModal"
      message="ნამდვილად გსურთ წაშლა?"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableRow, Column } from '../types';
import Modal from "../components/ConfirmModal.vue";
import RowModal from "../components/TableRowModal.vue";

const props = defineProps<{
  data: TableRow[];
  columns: Column[];
  title?: string;
}>();

const emits = defineEmits<{
  view: [id: string];
  send: [id: string];
  edit: [row: TableRow];
  delete: [id: string];
}>();

const tableData = ref<TableRow[]>(props.data);


  const viewColumns: Column[] = [
    { key: 'id', type: 'text', label: 'ID' },
    { key: 'name', type: 'text', label: 'სახელი' },
    { key: 'type', type: 'text', label: 'ტიპი' },
    { key: 'createdAt', type: 'text', label: 'შექმნის დრო' },
    { key: 'createdBy', type: 'text', label: 'ვინ შექმნა' },
    { key: 'status', type: 'text', label: 'სტატუსი' }
];

const editColumns: Column[] = [
  { key: 'name', type: 'text', label: 'სახელი' },
  { key: 'type', type: 'text', label: 'ტიპი' },
];


// Modal ის ფუნქციები
const selectedRowId = ref<string | null>(null);
const selectedRow = ref<TableRow | null>(null);

// view
const showViewModal = ref(false);

function openViewModal(row: TableRow) {
  selectedRow.value = row;
  showViewModal.value = true;
}

function closeViewModal() {
  showViewModal.value = false;
}

// send
const showSendModal = ref(false);

function openSendModal(id: string) {
  selectedRowId.value = id;
  showSendModal.value = true;
}

function closeSendModal() {
  showSendModal.value = false;
  selectedRowId.value = null;
}

function confirmSend() {
  if (selectedRowId.value) {
    emits('send', selectedRowId.value);
  }

  closeSendModal();
}

// edit
const editingRow = ref<TableRow | null>(null);
const showEditModal = ref(false);

function openEditModal(row: TableRow) {
  editingRow.value = { ...row };
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
  editingRow.value = null;
}

function confirmEdit(updatedRow: TableRow) {
  const index = tableData.value.findIndex(r => r.id === updatedRow.id);
  if (index !== -1) {
    tableData.value[index] = updatedRow;
    localStorage.setItem('data', JSON.stringify(tableData.value));
  }
  closeEditModal();
}


// delete
const showDeleteModal = ref(false);

function openDeleteModal(id: string) {
  selectedRowId.value = id;
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  selectedRowId.value = null;
}

function confirmDelete() {
  if (selectedRowId.value) {
    emits('delete', selectedRowId.value);
  }

  closeDeleteModal();
}



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

.action-btn:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  opacity: 0.6;
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
  color: #313131;
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