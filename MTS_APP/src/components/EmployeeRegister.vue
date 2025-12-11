<script>
import store from "@/store";

export default {
  props: ["id"],

  computed: {
    todayDate() {
      return new Date().toISOString().split("T")[0];
    },

    alreadySigned() {
      return store.getters.hasSignedToday(this.id);
    },

    employeeAttendance() {
      const employee = store.state.employeesAttendance.find(e => e.employeeId == this.id);
      return employee ? employee.attendance : [];
    },

    signedStatus() {
      const employee = store.state.employeesAttendance.find(e => e.employeeId == this.id);
      const record = employee?.attendance.find(a => a.date === this.todayDate);
      return record ? record.status : null;
    }
  },

  methods: {
    signRegister(status) {
      if (this.alreadySigned) return;

      const newAttendance = {
        id: this.id,
        newAttendanceRecord: {
          date: this.todayDate,
          status
        }
      };

      store.commit("addRegister", newAttendance);
    }
  }
};
</script>


<template>
  <div class="mt-4" style="max-width: 550px; margin: auto;">
<RouterLink 
  :to="`/employee/${id}`"
  class="back-btn d-inline-flex align-items-center gap-2 mb-3"
>
  <i class="bi bi-arrow-left"></i> Back
</RouterLink>

    <!-- Success / Already Signed Message -->
    <div v-if="alreadySigned || signedStatus" class="alert alert-success text-center shadow">
  <strong>Attendance submitted:</strong>
  <div>{{ todayDate }} - {{ signedStatus || "Already signed today" }}</div>
</div>


    <!-- Attendance Card -->
    <div v-else class="card shadow">

      <div class="card-header bg-dark text-white text-center fw-bold">
        Attendance for {{ todayDate }}
      </div>

      <div class="card-body d-flex justify-content-around py-4">

        <button
          class="btn btn-success btn-lg px-4"
          :disabled="alreadySigned"
          @click="signRegister('Present')"
        >
          Present
        </button>

        <button
          class="btn btn-danger btn-lg px-4"
          :disabled="alreadySigned"
          @click="signRegister('Absent')"
        >
          Absent
        </button>

      </div>
    </div>

    <!-- Attendance History -->
    <div class="card shadow mt-4">
      <div class="card-header bg-secondary text-white text-center fw-bold">
        Attendance History
      </div>

      <div class="card-body">

        <div v-if="employeeAttendance.length === 0" class="text-center text-muted">
          No attendance records yet.
        </div>

        <ul v-else class="list-group">
          <li
            v-for="day in employeeAttendance"
            :key="day.date"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{{ day.date }}</span>

            <span
              :class="{
                'badge bg-success': day.status === 'Present',
                'badge bg-danger': day.status === 'Absent'
              }"
            >
              {{ day.status }}
            </span>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<style>
</style>
