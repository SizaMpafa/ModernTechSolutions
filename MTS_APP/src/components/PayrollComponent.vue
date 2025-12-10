<template>
  <div class="payroll-container">
    <!-- Employee Cards -->
    <div class="cards">
      <div
  class="employee-card"
  v-for="payroll in payrollWithNames"
  :key="payroll.employeeId"
  @click="showAllEmployeeDetails(payroll.employeeId)"
>
  <div class="card-content">
    <i class="fa-solid fa-user-tie icon"></i>
    <div class="details">
      <h6 class="employee-name">Employee: {{ payroll.name }}</h6>
      <p class="hours-worked">Hours Worked: {{ payroll.hoursWorked }}</p>
      <p class="leave-deductions">Leave Deductions: {{ payroll.leaveDeductions }}</p>
      <p class="final-salary">Final Salary: R{{ payroll.finalSalary }}</p>
    </div>
  </div>
</div>

    </div>

    <!-- Modal for Selected Employee Details -->
    <div v-if="selectedEmployee" class="modal-overlay" @click="hideSelectedEmployeeDetails">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="hideSelectedEmployeeDetails">&times;</button>
        <h4>Employee Details</h4>
        <div class="employee-details">
          <p><strong>Employee:</strong> {{ selectedEmployee.name }}</p>
          <p><strong>Hours Worked:</strong> {{ selectedEmployee.hoursWorked }}</p>
          <p><strong>Leave Deductions:</strong> {{ selectedEmployee.leaveDeductions }}</p>
          <p><strong>Final Salary:</strong> R{{ selectedEmployee.finalSalary }}</p>
          <p v-if="selectedEmployee.salary"><strong>Monthly Salary:</strong> R{{ selectedEmployee.salary }}</p>
          <!-- Add calculated working rate and deduction rate based on above info -->
          <p><strong>Working Rate (per hour):</strong> R350</p>
          <p><strong>Deduction Rate (per leave unit):</strong> R62.5</p>
          <p><strong>Calculation Note:</strong> Final Salary ≈ Monthly Salary - (Leave Deductions * 62.5)</p>
               <button @click="generatePayslip(selectedEmployee)" class="payslip-btn btn btn-warning">
                Generate Payslip
              </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import jsPDF from "jspdf";

export default {
  name: 'PayrollApp',
  data() {
    return {
      // workersPayroll: store.state.employeesPayRoll || [], // Fallback to empty array if not set
      selectedEmployeeId: null
    };
  },
  methods: {
  showAllEmployeeDetails(employeeId) {
    this.selectedEmployeeId = employeeId;
  },
  hideSelectedEmployeeDetails() {
    this.selectedEmployeeId = null;
  },
  generatePayslip(employee) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payslip", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Employee ID: ${employee.employeeId}`, 20, 40);
    doc.text(`Hours Worked: ${employee.hoursWorked}`, 20, 50);
    doc.text(`Leave Deductions: ${employee.leaveDeductions}`, 20, 60);
    doc.text(`Monthly Salary: R${employee.salary || "N/A"}`, 20, 70);
    doc.text(`Final Salary: R${employee.finalSalary}`, 20, 80);
    doc.text(`Working Rate (per hour): R350`, 20, 90);
    doc.text(`Deduction Rate (per leave unit): R62.5`, 20, 100);
    doc.text(`Calculation Note: Final Salary ≈ Monthly Salary - (Leave Deductions * 62.5)`, 20, 110);
    doc.save(`Payslip_${employee.employeeId}.pdf`);
  }
},

  computed: {
  payrollWithNames() {
    const payrolls = store.state.employeesPayRoll || [];
    const employees = store.state.employees || [];

    return payrolls.map(payroll => {
      const employee = employees.find(emp => emp.employeeId === payroll.employeeId);
      return {
        ...payroll,
        name: employee ? employee.name : "Unknown"
      };
    });
  },
  selectedEmployee() {
    if (!this.selectedEmployeeId) return null;
    return this.payrollWithNames.find(p => p.employeeId === this.selectedEmployeeId);
  }
}



};
</script>

<style scoped>
/* Container */
.payroll-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Cards Grid */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

/* Employee Card */
.employee-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.employee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.employee-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.employee-card:hover::before {
  opacity: 1;
}

/* Card Content */
.card-content {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.icon {
  font-size: 3rem;
  margin-right: 15px;
  color: #fff;
}

.details {
  flex: 1;
}

.employee-id {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.hours-worked,
.leave-deductions,
.final-salary {
  margin: 5px 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.final-salary {
  font-weight: bold;
  color: #ffd700;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

.close-btn:hover {
  color: #ff0000;
}

.employee-details p {
  margin: 10px 0;
  font-size: 1rem;
  line-height: 1.5;
}

.employee-details strong {
  color: #667eea;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }
  .card-content {
    flex-direction: column;
    text-align: center;
  }
  .icon {
    margin-bottom: 10px;
  }
}
</style>