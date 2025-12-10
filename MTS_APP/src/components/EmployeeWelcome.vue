<script>
    import store from '@/store';
    export default{
        props: ["id"],
        computed:{
            employee(){
                return store.state.employees.find(e => e.employeeId == this.id)
            }
        }
    }
</script>

<template>
        <h1 class="text-center">Welcome, {{ employee?.name }}</h1>
</template>