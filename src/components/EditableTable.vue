<template>

    <div class="header">

        <h3 v-if="props.mode === 'add'">ხელით დამატება</h3>
        <h3 v-if="props.mode === 'edit'">რედაქტირება</h3>
        <h3 v-if="props.mode === 'view'">ნახვა</h3>

        <button v-if="props.mode !== 'add'" class="action-btn" @click="emit('cancel')">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>

    <form @submit.prevent="handleSubmit" class="add-cont" novalidate>

        <table class="data-table">
            <thead>
                <tr>
                    <th v-for="col in props.columns">{{ col.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="col in props.columns" :key="col.key">
                        <!-- Add/Edit -->
                        <input 
                            v-if="['add', 'edit'].includes(props.mode)" 
                            :id="col.key" 
                            :type="col.type" 
                            :placeholder="col.label" 
                            v-model="rowData[col.key]"
                            required 
                            @input="error = ''" 
                        />

                        <!-- View -->
                        <span v-else>{{ props.row?.[col.key] }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <Transition name="error" tag="p">
            <p v-if="error" class="error">{{ error }}</p>
        </Transition>

        <Transition name="success">
            <p v-if="success" class="success">ჩანაწერი წარმატებით დაემატა</p>
        </Transition>

        <button v-if="props.mode !== 'view'" type="submit" class="submit">{{ props.mode === 'add' ? 'დამატება' : 'რედაქტირება' }}</button>

    </form>

</template>


<script setup lang="ts">

import { reactive, ref, watch } from 'vue'
import type { Column, TableRow } from "../types";
import moment from 'moment';
import authService from '../services/authService';

const props = defineProps<{
    columns: Column[];
    row?: TableRow | null;
    mode: 'add' | 'view' | 'edit';
}>();

const emit = defineEmits(['row-added', 'row-edited', 'cancel']);

const success = ref<boolean>(false);
const error = ref<string | null>(null);

const rowData = reactive<Record<string, any>>({});
const { user } = authService();


watch(
  () => props.row,
  () => {
    if (props.mode === 'edit' && props.row) {
      Object.assign(rowData, props.row)
    }
  },
  { immediate: true }
)

function handleSubmit() {

    error.value = ''

    const validator = props.columns.filter(col => {
        const val = rowData[col.key]
        return val == null || val.toString().trim() === '';
    })

    if (validator.length) {
        error.value = `შეავსეთ ველი: ${validator[0].label} !`
        return
    }
    
    if (props.mode === 'edit') {

        emit('row-edited', rowData);

    } else {
        const newRow: TableRow = {
            id: Math.random().toString(16).slice(2, 6),
            name: rowData.name,
            createdAt: moment().format('YYYY-MM-DD HH:ss'),
            createdBy: user.value?.username || '',
            type: rowData.type,
            status: 'აქტიური'
        };
    
        emit('row-added', newRow);
    
        props.columns.forEach(col => {
            rowData[col.key] = '';
        });
    }

    
    success.value = true;
    setTimeout(() => {
        success.value = false;
    }, 3000);

}

</script>


<style scoped>
.action-btn {
  padding: 6px 12px;
  border: 1px solid rgb(192, 191, 191);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  color: #313131;
  background-color: #ebeaea;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.add-cont {
    display: flex;
    flex-direction: column;
    align-items: flex-start
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

.data-table td {
    width: 1em;
}

.data-table th {
    background-color: #f5f5f5;
    font-weight: bold;
}

input {
    margin: 1rem;
    width: 90%;
    padding: 1rem 1rem;
}

.add-view {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px;
}

.submit {
    margin-top: 2rem;
}

.error {
    margin-top: 1rem;
    color: #d9534f;
    font-weight: 600;
    text-align: center;
}

.success {
    margin-top: 1rem;
    color: #00ad3a;
    font-weight: 600;
    text-align: center;
}

.error-enter-active,
.error-leave-active {
    transition: all 0.5s ease;
}

.error-enter-from,
.error-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

.success-enter-active,
.success-leave-active {
    transition: all 0.5s ease;
}

.success-enter-from,
.success-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

/* ღილაკის სტილები */
.submit {
    margin-left: auto;
    align-items: center;
    appearance: none;
    background-image: var(--bg-login);
    border: 0;
    border-radius: 6px;
    box-shadow: rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    height: 2.7rem;
    justify-content: center;
    line-height: 1;
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    font-size: 1rem;
    font-weight: 600;
}

.submit:focus {
    box-shadow: #045175 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.submit:hover {
    box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #035074 0 -3px 0 inset;
    transform: translateY(-2px);
}

.submit:active {
    box-shadow: #00263a 0 3px 7px inset;
    transform: translateY(2px);
}
</style>