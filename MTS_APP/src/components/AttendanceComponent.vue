<script>
import store from '@/store';

export default {
  data() {
    return {
      attendance: JSON.parse(localStorage.getItem("employeesAttendance")) || store.state.employeesAttendance
    };
  },
  methods:{
    approveLeaveRequest(employeeId) {
    const employee = this.attendance.find(emp => emp.employeeId === employeeId);
    if (!employee) return;

    employee.leaveRequests.forEach(request => {
        if (request.status === "Pending") {
            request.status = "Approved";
        }
    });

    // Save updated attendance to localStorage
    localStorage.setItem("employeesAttendance", JSON.stringify(this.attendance));
},

declineLeaveRequest(employeeId) {
    const employee = this.attendance.find(emp => emp.employeeId === employeeId);
    if (!employee) return;

    employee.leaveRequests.forEach(request => {
        if (request.status === "Pending") {
            request.status = "Declined";
        }
    });

    // Save updated attendance to localStorage
    localStorage.setItem("employeesAttendance", JSON.stringify(this.attendance));
}
  }
  ,

  computed: {
    // return employees who have at least 1 absent day
    absentEmployees() {
      return this.attendance
        .map(emp => {
          // find all absent days
          const absentDays = emp.attendance.filter(day => day.status === "Absent");

          return {
            ...emp,
            absentDays
          };
        })
        .filter(emp => emp.absentDays.length > 0);
    },

    presentEmployees() {
      return this.attendance
        .map(emp => {
          // find all absent days
          const presentDays = emp.attendance.filter(day => day.status === "Present");

          return {
            ...emp,
            presentDays
          };
        })
        .filter(emp => emp.presentDays.length > 0);
    }, 
    approvedLeave(){
        return this.attendance.map(emp => {
            const leaveDays = emp.leaveRequests.filter(day => day.status === "Approved")
            return {
                ...emp,
                leaveDays
            }
        }).filter(emp => emp.leaveDays.length > 0)
    },
    pendingLeave(){
        return this.attendance.map(emp => {
            const UnconfirmedLeaveDays = emp.leaveRequests.filter(day => day.status === "Pending")
            return {
                ...emp,
                UnconfirmedLeaveDays
            }
        }).filter(emp => emp.UnconfirmedLeaveDays.length > 0)
    },
    declinedLeave(){
        return this.attendance.map(emp => {
            const declinedDays = emp.leaveRequests.filter(day => day.status === "Declined")
            return {
                ...emp,
                declinedDays
            }
        }).filter(emp => emp.declinedDays.length > 0)
    }
    

    // presentEmployees() {
    //   return this.attendance.filter(emp =>
    //     emp.attendance.every(day => day.status === "Present")
    //   );
    // }
  }
};
</script>


<template>
    <div class="parent d-flex">
        <div class="absent">
            <div class="cards">
                <h1 class="text-center">
                    Absent
                </h1>
                <div class="showAttendance">
                    <div class="card" v-for="emp in absentEmployees" :key="emp.employeeId">
                        <h5 class="card-header color-red">{{ emp.name }}</h5>
                        <div class="card-body">
                            <h6>Absent Days:</h6>
                                <ul>
                                <li v-for="day in emp.absentDays" :key="day.date">
                                    {{ day.date }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="present">
            <div class="cards">
                <h1 class="text-center">
                    Present
                </h1>
                <div class="showAttendance">
                    <div class="card" v-for="em in presentEmployees" :key="em.employeeId">
                        <h5 class="card-header color-green">{{ em.name }}</h5>
                    <div class="card-body">
                        <h6>Present Days:</h6>
                        <ul>
                            <li v-for="day in em.presentDays" :key="day.date">
                                {{ day.date }}
                            </li>
                        </ul>
                </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="approved">
            <div class="cards">
                <h1 class="text-center">
                    Aproved Leave
                </h1>
                <div class="showAttendance">
                    <div class="card" v-for="emp in approvedLeave" :key="emp.employeeId">
                        <h5 class="card-header color-green">{{ emp.name }}</h5>
                    <div class="card-body">
                        <h6>Leave Days:</h6>
                        <ul>
                            <li v-for="day in emp.leaveDays" :key="day.date">
                                {{ day.date }}
                                <br>
                                {{ day.reason }}
                            </li>
                        </ul>
                </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pending">
            <div class="cards">
                <h1 class="text-center">
                    Pending Leave
                </h1>
                <div class="showAttendance">
                    <div class="card" v-for="emp in pendingLeave" :key="emp.employeeId">
                        <h5 class="card-header color-yellow">{{ emp.name }}</h5>
                    <div class="card-body">
                        <h6>Leave Days:</h6>
                        <ul>
                            <li v-for="day in emp.UnconfirmedLeaveDays" :key="day.date">
                                {{ day.date }}
                                <br>
                                {{ day.reason }}
                                <button class="btn btn-primary" @click="approveLeaveRequest(emp.employeeId)">Approve Leave</button>
                                <button class="btn btn-warning" @click="declineLeaveRequest(emp.employeeId)">Decline Leave</button>
                            </li>
                            
                        </ul>
                </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="declined">
            <div class="cards">
                <h1 class="text-center">
                    Declined Leave
                </h1>
                <div class="showAttendance">
                    <div class="card" v-for="emp in declinedLeave" :key="emp.employeeId">
                        <h5 class="card-header color-red">{{ emp.name }}</h5>
                    <div class="card-body">
                        <h6>Leave Days:</h6>
                        <ul>
                            <li v-for="day in emp.declinedDays" :key="day.date">
                                {{ day.date }}
                            </li>
                            
                        </ul>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style>
   .parent {
  display: flex;
  flex-direction: column; /* stack sections vertically */
  gap: 30px;
  padding: 20px;
  background: #f5f7fa;
}

/* Headings for each section */
.cards h1 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

/* Employee cards layout */
.showAttendance {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

/* Individual card styling */
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.card-header {
  padding: 12px;
  font-weight: 600;
  color: #fff;
}

.color-red {
  background-color: #d9534f !important;
}
.color-yellow {
  background-color: #fa8842e4 !important;
}

.color-green {
  background-color: #5cb85c !important;
}

.card-body {
  padding: 15px;
}

.card-body h6 {
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
}

.card-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-body li {
  background: #f1f3f5;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  border-left: 4px solid #5cb85c;
}


/* Wrap buttons in a flex container */
.card-body ul li {
  display: flex;
  flex-direction: column; /* stack date/reason and buttons */
  background: #f1f3f5;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  border-left: 4px solid #5cb85c;
}

/* Buttons container */
.card-body ul li .btn-container {
  display: flex;
  gap: 8px; /* space between buttons */
  margin-top: 8px;
}

/* Keep button styles */
button.btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  color: white;
  transition: 0.2s;
}

button.btn-primary {
  background-color: #0275d8;
}

button.btn-primary:hover {
  background-color: #025aa5;
}

button.btn-warning {
  background-color: #f0ad4e;
}

button.btn-warning:hover {
  background-color: #ec971f;
}


/* Specific border colors for declined items */
.color-red li {
  border-left: 4px solid #d9534f !important;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .showAttendance {
    grid-template-columns: 1fr;
  }
}

</style>