<script>
import store from '@/store';

export default {
  data() {
    return {
      name: "",
      position: "",
      salary: "",
      department: "",
      employmentHistory: "",
      contact: "",
      showModal: false, // <-- reactive modal toggle
      departments: [...new Set(store.state.employees.map(e => e.department))]
    };
  },
  computed: {
    nextEmployeeId() {
      const employees = store.state.employees;
      if (!employees.length) return 1;
      return Math.max(...employees.map(e => e.employeeId)) + 1;
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    generateEmail(name) {
      return `${name.toLowerCase().replace(/\s+/g, '.')}@moderntech.com`;
    },
    createEmployee() {
      const newEmployee = {
        employeeId: this.nextEmployeeId,
        name: this.name,
        position: this.position,
        salary: this.salary,
        department: this.department,
        employmentHistory: this.employmentHistory,
        contact: this.generateEmail(this.name)
      };

      store.commit('addEmployee', newEmployee);

      // Reset form
      this.name = '';
      this.position = '';
      this.salary = '';
      this.department = '';
      this.employmentHistory = '';

      // Hide modal after creation
      this.closeModal();
    }
  }
};
</script>

<template>
  <!-- New Employee Button -->
  <button @click="openModal" class="text-black bg-brand ... btn employeee">
    New Employee
  </button>

  <!-- Modal -->
  <div v-if="showModal" class="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
    <div class="purple-like rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-2 mb-4">
        <h3 class="text-lg font-medium">Create New Employee</h3>
        <button @click="closeModal" class="text-xl font-bold">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="createEmployee" class="space-y-4">
        <div>
          <label>Name</label>
          <input v-model="name" type="text" required class="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label>Position</label>
          <input v-model="position" type="text" required class="w-full border px-3 py-2 rounded" />
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <label>Salary</label>
            <input v-model="salary" type="number" required class="w-full border px-3 py-2 rounded" />
          </div>
          <div class="flex-1">
            <label>Department</label>
            <select v-model="department" required class="w-full border px-3 py-2 rounded">
              <option disabled value="">Select department</option>
              <option v-for="dep in departments" :key="dep" :value="dep">{{ dep }}</option>
            </select>
          </div>
        </div>
        <div>
          <label>Employment History</label>
          <textarea v-model="employmentHistory" rows="3" class="w-full border px-3 py-2 rounded"></textarea>
        </div>

        <div class="flex justify-end gap-2">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded">Add Employee</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
    .employeee, .purple-like{
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
</style>