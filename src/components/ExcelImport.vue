<template>
    <h3>Excel-ის მონაცემების იმპორტი</h3>
  <div class="excel-import">
    <div class="excel-paste-area">
      <textarea 
        v-model="excelPasteData" 
        @paste="handleExcelPaste"
        placeholder="ჩასვით Excel-ის მონაცემები აქ (სახელი და ტიპი ორ სვეტში)..."
        class="excel-textarea"
      ></textarea>
      
      <div class="button-group">
        <button @click="processExcelData" class="process-btn" :disabled="!excelPasteData.trim()">
          დამატება
        </button>
        <button @click="clearPasteData" class="clear-btn">
          გასუფთავება
        </button>
      </div>
    </div>

    <div v-if="previewData.length > 0" class="preview-section">
      <h4>{{ previewData.length }} ჩანაწერი:</h4>
      <div class="preview-table">
        <table>
          <thead>
            <tr>
              <th>სახელი</th>
              <th>ტიპი</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in previewData" :key="index">
              <td>{{ row.name }}</td>
              <td>{{ row.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TableRow } from '../types';
import moment from 'moment';

const emit = defineEmits(['rows-imported']);

const excelPasteData = ref('');

const handleExcelPaste = (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData;
  if (clipboardData) {
    const pastedText = clipboardData.getData('text');
    excelPasteData.value = pastedText;
  }
};

const previewData = computed(() => {
  if (!excelPasteData.value.trim()) return [];

  const lines = excelPasteData.value.trim().split('\n');
  const preview: { name: string; type: string }[] = [];

  lines.forEach(line => {
    const columns = line.split('\t');
    
    if (columns.length >= 2) {
      const name = columns[0].trim();
      const type = columns[1].trim();
      
      if (name && type) {
        preview.push({ name, type });
      }
    }
  });

  return preview;
});

const processExcelData = () => {
  if (!excelPasteData.value.trim()) return;

  const lines = excelPasteData.value.trim().split('\n');
  const newRows: TableRow[] = [];

  lines.forEach(line => {
    const columns = line.split('\t');
    
    if (columns.length >= 2) {
      const name = columns[0].trim();
      const type = columns[1].trim();
      
      if (name && type) {
        const newRow: TableRow = {
          id: Math.random().toString(16).slice(2, 6),
          name: name,
          type: type,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          createdBy: 'Excel Import',
          status: 'აქტიური'
        };
        
        newRows.push(newRow);
      }
    }
  });

  if (newRows.length > 0) {
    emit('rows-imported', newRows);
    clearPasteData();
  }
};

const clearPasteData = () => {
  excelPasteData.value = '';
};
</script>

<style scoped>
.excel-import {
  background-color: #e9f3f9;
  border-radius: 8px;
  padding: 15px;
  margin-top: -10px;
  margin-bottom: 20px;
}

.excel-import h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.excel-paste-area {
  margin-bottom: 15px;
}

.excel-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.process-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.process-btn:hover:not(:disabled) {
  background-color: #218838;
}

.process-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.clear-btn {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #5a6268;
}

.preview-section {
  margin-top: 20px;
}

.preview-section h4 {
  margin-bottom: 10px;
  color: #495057;
}

.preview-table {
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preview-table table {
  width: 100%;
  border-collapse: collapse;
}

.preview-table th,
.preview-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.preview-table th {
  background-color: #e9ecef;
  font-weight: 600;
}

.preview-table tr:last-child td {
  border-bottom: none;
}
</style> 