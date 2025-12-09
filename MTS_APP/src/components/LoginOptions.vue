<script setup>
import { ref } from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import { RouterLink } from 'vue-router'

const showLoginForm = ref(false)
</script>

<template>
  <div class="home-container">
    <h1 class="title">Welcome to ModernTech Portal</h1>

    <div class="login-buttons">
      <!-- HR LOGIN -->
      <RouterLink
        to="/hr"
        class="btn hr-btn"
      >
        Login as HR
      </RouterLink>

      <!-- EMPLOYEE LOGIN -->
      <button
        class="btn employee-btn"
        @click="showLoginForm = true"
      >
        Login as Employee
      </button>
    </div>

    <!-- EMPLOYEE LOGIN FORM POPUP -->
    <div v-if="showLoginForm">
      <LoginComponent @close="showLoginForm = false" />
    </div>
  </div>
</template>



<style scoped>
.home-container {
  text-align: center;
  margin-top: 80px;
}

.title {
  font-size: 32px;
  margin-bottom: 40px;
  font-weight: bold;
}

.login-buttons {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.btn {
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: 0.3s;
}

.hr-btn {
  background: #2a65ff;
  color: white;
}

.employee-btn {
  background: #00b894;
  color: white;
}

.btn:hover {
  transform: scale(1.05);
}
</style>

