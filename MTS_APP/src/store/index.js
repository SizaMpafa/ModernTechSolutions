import { createStore } from "vuex";
import employeesData from "./employee_info.json";
import attendanceData from "./attendance.json";
import payrollData from "./payroll_data.json";

// Always load from localStorage if available
function loadAttendance() {
  const saved = localStorage.getItem("employeesAttendance");
  return saved ? JSON.parse(saved) : attendanceData.attendanceAndLeave;
}

export default createStore({
  state: {
    employees: JSON.parse(localStorage.getItem("employees")) || employeesData.employeeInformation,
    employeesAttendance: loadAttendance(),
    employeesPayRoll: payrollData.payrollData,
  },

  getters: {
    hasSignedToday: (state) => (id) => {
      const employee = state.employeesAttendance.find((e) => e.employeeId == id);
      if (!employee) return false;

      const today = new Date().toISOString().split("T")[0];
      return employee.attendance.some(a => a.date === today);
    }
  },

  mutations: {
    // Save both to Vuex AND localStorage
    saveAttendance(state) {
      localStorage.setItem(
        "employeesAttendance",
        JSON.stringify(state.employeesAttendance)
      );
    },

    addRegister(state, payload) {
      const { id, newAttendanceRecord } = payload;
      const employee = state.employeesAttendance.find(e => e.employeeId == id);

      if (employee) {
        employee.attendance.push(newAttendanceRecord);

        // sync Vuex + LocalStorage
        this.commit("saveAttendance");
      }
    },

    addRequest(state, payload) {
      const { id, newLeaveRequestRecord } = payload;
      const employee = state.employeesAttendance.find(e => e.employeeId == id);

      if (employee) {
        employee.leaveRequests.push(newLeaveRequestRecord);

        // sync Vuex + LocalStorage
        this.commit("saveAttendance");
      }
    },

    updateLeaveStatus(state, { employeeId, newStatus }) {
      const employee = state.employeesAttendance.find(e => e.employeeId === employeeId);
      if (!employee) return;

      employee.leaveRequests.forEach(req => {
        if (req.status === "Pending") {
          req.status = newStatus; // "Approved" or "Declined"
        }
      });

      // sync Vuex + LocalStorage
      this.commit("saveAttendance");
    },
    addEmployee(state, newEmployee) {
    state.employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(state.employees));
  },
  },

  actions: {
    approveLeave({ commit }, employeeId) {
      commit("updateLeaveStatus", { employeeId, newStatus: "Approved" });
    },
    declineLeave({ commit }, employeeId) {
      commit("updateLeaveStatus", { employeeId, newStatus: "Declined" });
    }
  }
});
