<template>
  <Teleport to="body">
    <TransitionGroup name="modal">
      <div class="modal-backdrop" v-if="props.isOpened">
        <div class="modal">
          <div class="modal-content">

            <ViewRow @row-edited="emitRowEdited" @cancel="emitCancel" :columns="props.columns" :row="props.row" :mode="props.mode"/>

          </div>
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import ViewRow from "./EditableTable.vue";
import type { Column, TableRow } from "../types";

const props = defineProps<{
  isOpened: boolean;
  row: TableRow;
  mode: 'add' | 'view' | 'edit';
  columns: Column[];
}>();



const emit = defineEmits(['cancel', 'row-edited']);


function emitRowEdited(editedRow: TableRow) {
  emit('row-edited', editedRow);
}

function emitCancel() {
  emit('cancel');
}

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  min-width: 75vw;
  max-width: 90vw;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content {
  width: 100%;
}
</style>