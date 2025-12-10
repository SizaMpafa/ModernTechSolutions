<script>
import store from '@/store';

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
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card shadow-lg p-4" style="width: 450px; border-radius: 20px;">

      <!-- Header -->
      <div class="text-center mb-4">
        <div 
          class="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-3"
          style="width: 100px; height: 100px; font-size: 2.5rem;"
        >
          {{ employee?.name.charAt(0) }}
        </div>

        <h2 class="fw-bold">{{ employee?.name }}</h2>
        <p class="text-muted mb-1">{{ employee?.position }}</p>
        <p class="text-muted">{{ employee?.department }} Department</p>
      </div>

      <hr>

      <!-- Details -->
      <div class="px-2">

        <div class="d-flex justify-content-between mb-3">
          <strong>Email:</strong>
          <span>{{ employee?.contact }}</span>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <strong>Position:</strong>
          <span>{{ employee?.position }}</span>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <strong>Department:</strong>
          <span>{{ employee?.department }}</span>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <strong>Salary:</strong>
          <span>R{{ employee?.salary }}</span>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
}
</style>
