import EmployeesView from '@/views/EmployeesView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView

    },
    {
      path: '/attendance',
      name: 'attendance',
      component: AttendanceView

    }
  ],
})

export default router
