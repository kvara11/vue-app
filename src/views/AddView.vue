<template>
  <div class="add-view">

    <AddRow @row-added="handleRowAdded" :columns="columns" mode="add" />
    <div class="line"></div>
    <ExcelImport @rows-imported="handleExcelImport" />

  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import AddRow from "../components/EditableTable.vue";
import ExcelImport from "../components/ExcelImport.vue";
import type { Column, TableRow } from "../types";

const columns: Column[] = [
  { key: 'name', type: 'text', label: 'სახელი' },
  { key: 'type', type: 'text', label: 'ტიპი' },
];

const finalData = reactive<TableRow[]>(JSON.parse(localStorage.getItem('data') || '[]'));

function handleRowAdded(newRow: TableRow) {
  finalData.push(newRow);
  localStorage.setItem('data', JSON.stringify(finalData));
}

function handleExcelImport(importedRows: TableRow[]) {
  finalData.push(...importedRows);
  localStorage.setItem('data', JSON.stringify(finalData));
}

</script>

<style scoped>
.add-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.line {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
</style>