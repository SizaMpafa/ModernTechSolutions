import { createStore } from "vuex";
import employeesData from "./employee_info.json";
import attendanceData from "./attendance.json";
import payrollData from "./payroll_data.json";

function loadLocalAttendance() {
  const saved = localStorage.getItem("attendanceData");
  return saved ? JSON.parse(saved) : attendanceData.attendanceAndLeave;
}

export default createStore({
  state: {
    employees: employeesData.employeeInformation,
    employeesAttendance: loadLocalAttendance(),
    employeesPayRoll: payrollData.payrollData,
  },

  getters: {
    toRegister: (state) => (id) => {
      return state.employeesAttendance.find((e) => e.employeeId == id);
    },

    hasSignedToday: (state) => (id) => {
      const employee = state.employeesAttendance.find((e) => e.employeeId == id);
      if (!employee) return false;

      const today = new Date().toISOString().split("T")[0];
      return employee.attendance.some(a => a.date === today);
    }
  },

  mutations: {
    addRegister(state, payload) {
      const { id, newAttendanceRecord } = payload;

      const employee = state.employeesAttendance.find(
        (e) => e.employeeId == id
      );

      if (employee) {
        employee.attendance.push(newAttendanceRecord);

        // Save updated attendance to localStorage
        localStorage.setItem(
          "attendanceData",
          JSON.stringify(state.employeesAttendance)
        );
      }
    },
  },

  actions: {},
});
