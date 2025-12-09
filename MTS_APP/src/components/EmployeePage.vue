<script>
import store from "@/store";

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
            <a class="nav-link active" aria-current="page" href="#">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Request Leave</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
        </li>
    </ul>

  <div class="page">
    <h1>Welcome, {{ employee?.name }}</h1>
    <p>Email: {{ employee?.contact }}</p>
    <p>Department: {{ employee?.department }}</p>
    <p>Position: {{ employee?.position }}</p>
  </div>
</template>