<script>
    import store from '@/store';
    import CreateEmployee from './CreateEmployee.vue';
    
    export default {
        components:{
            CreateEmployee
        },
        data(){
            return{
                workers: store.state.employees,
                selectedEmployee: null
            }
        },
        methods:{
            showAllEmployeeDetails(employeeId){
               this.selectedEmployee = this.workers.find(worker => worker.employeeId === employeeId)
            },
            hideSelectedEmployeeDetails(){
                this.selectedEmployee = null
            }
        }
    }
</script>

<template>
    <CreateEmployee/>
    <div class="cards">
        <div class="employee mb-2 border-top pt-3" v-for="employee in workers" :key="employee.employeeId" @click="showAllEmployeeDetails(employee.employeeId)">
            <div class="d-flex">
                <i class="fa-solid fa-user-tie mr-2"></i> 
                <div class="nameNposition mr-6">
                    <h6 class="pb-0">
                        {{ employee.name }}
                    </h6>

                    <p class="text-lowercase  text-center font-italic">{{ employee.position }}</p>
                </div>
                <p class="btn btn-primary right-0">{{ employee.department }}</p>
            </div>
            <div v-if="selectedEmployee && selectedEmployee.employeeId === employee.employeeId" class="popup" @click.stop="hideSelectedEmployeeDetails()">
                <div class=" expanded d-flex">
                    <div class="sal">
                        <strong>Salary:</strong><p>R{{ selectedEmployee.salary}}</p>
                    </div>
                    <div class="empHis">
                        <strong>Employment History:</strong><p>{{ selectedEmployee.employmentHistory }}</p>
                    </div>
                    <div class="con">
                        <strong>Contact:</strong><p>{{ selectedEmployee.contact }}</p>
                    </div>
                </div>
                <hr>
                <button class="btn btn-danger" @click.stop="hideSelectedEmployeeDetails()"> close {{ selectedEmployee.name }}</button>
            </div>
        </div>
    </div>

</template>

<style>
    .expanded{
        justify-content: space-between;
        padding-left: 50px;
        padding-right: 50px;
    }
    .popup {
        background: white;
        padding: 1rem;
        border: 1px solid black;
        margin-top: 10px;
        border-radius: 4px;
        transition: all 0.3s ease;
    }
    .popup p{
        font-style: italic;
    }

    .employee{
        position: relative;
    }
    .employee:hover{
        background-color: rgb(218, 218, 248);
    }
    .right-0{
        position: absolute;
        right: 0;
        top: 6px;
        
    }
    .font-italic{
        font-style: italic;
        font-size: x-small;
        margin-top: 0;
        padding-top: 0;
    }

    .contact{
        margin-left: 150px;
        font-size: medium;
    }

    .fa-user-tie{
        font-size: xx-large;
    }

</style>