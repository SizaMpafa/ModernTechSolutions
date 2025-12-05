<script>
    import store from '@/store';
    export default {
        data(){
            return{
                workers: store.state.employees
            }
        }
    }
</script>

<template>
    <ul>
        <li v-for="employee in workers" :key="employee.employeeId">{{ employee.name }}</li>
    </ul>

</template>

<style>

</style>