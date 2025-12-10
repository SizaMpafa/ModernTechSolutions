<script>
import store from "@/store";

export default {
  props: ["id"],

  computed: {
    employee() {
      return store.state.employees.find((e) => e.employeeId == this.id);
    },

    employeeRecord() {
      return store.getters.toRegister(this.id);
    },

    todayDate() {
      return new Date().toISOString().split("T")[0];
    },

    alreadySigned() {
      return store.getters.hasSignedToday(this.id);
    }
  },

  data() {
    return {
      signedStatus: null, // Holds "Present" or "Absent"
    };
  },

  methods: {
    signRegister(status) {
      if (this.alreadySigned) return;

      this.signedStatus = status;

      const newAttendance = {
        id: this.id,
        newAttendanceRecord: {
          date: this.todayDate,
          status: status,
        },
      };

      store.commit("addRegister", newAttendance);
    },
  },
};
</script>

<template>
  <div class="mt-4" style="max-width: 450px; margin: auto;">

    <!-- If already signed, show message ONLY -->
    <div v-if="alreadySigned || signedStatus" class="alert alert-success text-center shadow">
      <strong>Attendance submitted:</strong>
      <div>{{ todayDate }} - {{ signedStatus || 'Already signed today' }}</div>
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

  </div>
</template>

<style>
</style>
