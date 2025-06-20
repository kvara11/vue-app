<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal-backdrop" v-if="isOpened">
        <div class="modal">
          <div class="modal-content">
            <slot name="icon">
              <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </slot>
            <p class="modal-message">{{ props.message }}</p>
            <div class="modal-actions">
              <button class="confirm" @click="emitConfirm">{{ props.confirmText }}</button>
              <button class="cancel" @click="emitCancel">{{ props.cancelText }}</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  message: { type: String, default: 'ნამდვილად გსურთ?' },
  confirmText: { type: String, default: 'დიახ' },
  cancelText: { type: String, default: 'არა' }
});

const emit = defineEmits(['confirm', 'cancel']);

function emitConfirm() {
  emit('confirm');
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
  min-width: 320px;
  max-width: 90vw;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-message {
  margin: 1.2rem 0 1.5rem 0;
  font-size: 1.15rem;
  text-align: center;
}
.modal-actions {
  display: flex;
  gap: 1.2rem;
}
.confirm {
  background: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6em 1.5em;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.confirm:hover {
  background: #b92d2d;
}
.cancel {
  background: #eee;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 0.6em 1.5em;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel:hover {
  background: #ccc;
}
.fa-exclamation-triangle {
  font-size: 2rem;
  color: #e44343;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>