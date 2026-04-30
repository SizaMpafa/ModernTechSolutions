import { createStore } from "vuex";

export default createStore({
  state: {
    employees: [],
    attendance: [],
    leaveRequests: [],
    payroll: []
  },

  getters: {
    employeesAttendanceCombined(state) {
        return state.employees.map(emp => ({
          employeeId: emp.employee_Id,
          name: emp.name,

          attendance: state.attendance
            ?.filter(a => a.employee_id === emp.employee_Id)
            .map(a => ({
              date: a.attendance_date,
              attendance_status: a.attendance_status
            })) || [],

            leaveRequests: state.leaveRequests
              ?.filter(l => l.employee_id === emp.employee_Id)
              .map(l => ({
                leave_request_id: l.leave_request_id,
                employee_id: l.employee_id,
                date: l.date,
                status: l.status,
                reason: l.reason
              })) || []

        }));
      }
  },

  mutations: {
    setEmployees(state, payload) {
      state.employees = payload;
    },
    setAttendance(state, payload) {
      state.attendance = payload;
    },
    setLeaveRequests(state, payload) {
      state.leaveRequests = payload;
    },
    setPayroll(state, payload) {
      state.payroll = payload;
    },
    updateLeaveStatus(state, { leave_request_id, status, employee_id }) {
      const leave = state.leaveRequests.find(
        l =>
          l.leave_request_id === leave_request_id &&
          l.employee_id === employee_id
      );

      if (leave) {
        leave.status = status;
      }
    }

  },

  actions: {
    async fetchEmployees({ commit }) {
      const { employees } =
        await (await fetch("https://mts-backend.up.railway.app/employees")).json();
      commit("setEmployees", employees);
    },

    async createEmployee({ commit }, employeeData) {
      const res = await fetch("https://mts-backend.up.railway.app/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
      });

      const { employees } = await res.json();
      commit("setEmployees", employees);
    },

    async updateEmployee({ commit }, { employee_Id, updates }) {
      const res = await fetch(
        `https://mts-backend.up.railway.app/employees/${employee_Id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates)
        }
      );

      const { employees } = await res.json();
      commit("setEmployees", employees);
    },

    async deleteEmployee({ commit }, employee_Id) {
      const res = await fetch(
        `https://mts-backend.up.railway.app/employees/${employee_Id}`,
        { method: "DELETE" }
      );

      const { employees } = await res.json();
      commit("setEmployees", employees);
    },

    async fetchAttendance({ commit }) {
      const { attendance } =
        await (await fetch("https://mts-backend.up.railway.app/attendance")).json();
      commit("setAttendance", attendance);
    },

    async fetchLeaveRequests({ commit }) {
      const response =
        await (await fetch("https://mts-backend.up.railway.app/leave_requests")).json();

      // BACKEND KEY IS `leave_request`
      commit("setLeaveRequests", response.leave_request);
    },
    async fetchPayroll({ commit }) {
      const {payroll} =
        await (await fetch("https://mts-backend.up.railway.app/payroll")).json();

      // BACKEND KEY IS `leave_request`
      commit("setPayroll", payroll);
    },



    async approveLeave({ commit }, { leave_request_id, employee_id }) {
      await fetch(
        `https://mts-backend.up.railway.app/employee/${employee_id}/leave_request/${leave_request_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Approved" })
        }
      );

      commit("updateLeaveStatus", {
        leave_request_id,
        employee_id,
        status: "Approved"
      });
    },

    async declineLeave({ commit }, { leave_request_id, employee_id }) {
      await fetch(
        `https://mts-backend.up.railway.app/employee/${employee_id}/leave_request/${leave_request_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Declined" })
        }
      );
      commit("updateLeaveStatus", {
        leave_request_id,
        employee_id,
        status: "Declined"
      });
    }
  }
});
