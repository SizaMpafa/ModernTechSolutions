<script>
import store from "@/store";
import { RouterLink, RouterView } from "vue-router";

export default {
  props: ["id"],
  computed: {
    employee() {
      return store.state.employees.find(e => e.employeeId == this.id);
    }
  }
};
</script>

<template>
    <ul class="nav justify-content-center bg-dark">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"><RouterLink class="text-white text-decoration-none" to="/">
              Modern Tech Solutions
            </RouterLink>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"><RouterLink :to="{ name: 'EmployeeRegister', params: { id: employee.employeeId } }">Register</RouterLink></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Request Leave</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#"><RouterLink :to="{ name: 'EmployeeProfile', params: { id: employee.employeeId } }">Profile</RouterLink></a>
        </li>
    </ul>
    <div class="container">
        <RouterView/>
    </div>
</template>