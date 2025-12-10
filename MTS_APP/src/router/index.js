import { createRouter, createWebHistory } from "vue-router";
import LoginLayout from "@/layouts/LoginLayout.vue";
import HRLayout from "@/layouts/HRLayout.vue";

import TableComponent from "@/components/TableComponent.vue";
import EmployeesView from "@/views/EmployeesView.vue";
import AttendanceView from "@/views/AttendanceView.vue";
import EmployeeView from "@/views/EmployeeView.vue";
import PayrollView from '@/views/PayrollView.vue'
import ProfileView from "@/views/ProfileView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
  path: "/",
  component: LoginLayout,
  children: [
    {
      path: "",
      name: "LoginOptions",
      component: () => import("@/components/LoginOptions.vue")
    },
        {
          path: "employee/:id",
          name: "EmployeePage",
          component: EmployeeView,
          props: true,
          children:[
            {
              path: "",
              name: "EmployeeWlcome",
              component: () => import("@/components/EmployeeWelcome.vue"),
              props: true
            },
            {
              path: "profile",
              name: "EmployeeProfile",
              component: ProfileView,
              props: true
            },
            {
              path: "register",
              name: "EmployeeRegister",
              component: RegisterView,
              props: true
            }
          ]
        }
  ]
}
,

    {
      path: "/hr",
      component: HRLayout,
      children: [
        {
          path: "",
          name: "HRDashboard",
          component: TableComponent 
        },
        {
          path: "employees",
          name: "HREmployees",
          component: EmployeesView
        },
        {
          path: "attendance",
          name: "HRAttendance",
          component: AttendanceView
        },
        {
          path: 'payroll',
          name: 'HRPayroll',
          component: PayrollView 
         }
        ]
      }
    ]
  });
   

export default router;
