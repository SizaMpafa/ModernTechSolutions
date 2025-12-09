<template>
  <div class="login-wrapper">
    <div class="login-box">

      <h2 class="title">Employee Login</h2>

      <form @submit.prevent="loginEmployee">

        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="name" type="text" placeholder="Enter your name" />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="buttons">
          <button type="submit" class="btn login-btn">Login</button>
          <button type="button" class="btn cancel-btn" @click="$emit('close')">Cancel</button>
        </div>

      </form>

    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'

const name = ref('')
const email = ref('')
const error = ref('')
const router = useRouter()

const loginEmployee = () => {
  const employee = store.state.employees.find(
    e =>
      e.name.toLowerCase().trim() === name.value.toLowerCase().trim() &&
      e.contact.toLowerCase().trim() === email.value.toLowerCase().trim()
  )

  if (!employee) {
    error.value = 'Incorrect name or email. Please try again.'
    return
  }

  router.push(`/employee/${employee.employeeId}`)
}
</script>

<style scoped>
/* FULL PAGE CENTERING */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* space but not fullscreen */
  padding: 20px;
}

/* BEAUTIFUL FORM BOX */
.login-box {
  width: 420px;
  max-width: 90%;
  background: white;
  padding: 35px;
  border-radius: 18px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);

  animation: fadeIn 0.3s ease-out;
}

/* TITLE */
.title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
}

/* INPUTS */
.field {
  margin-bottom: 18px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4a90e2;
  outline: none;
}

/* ERROR TEXT */
.error {
  color: #e74c3c;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 500;
}

/* BUTTONS */
.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: 0.2s;
}

/* LOGIN */
.login-btn {
  background: #2ecc71;
  color: white;
}
.login-btn:hover {
  background: #27ae60;
}

/* CANCEL */
.cancel-btn {
  background: #e74c3c;
  color: white;
}
.cancel-btn:hover {
  background: #c0392b;
}

/* ANIMATION */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
