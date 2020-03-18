import Dasboard from './components/pages/Dashboard.vue';
import Employees from './components/pages/employees/Employees.vue';
import EmployeesHome from './components/pages/employees/EmployeesHome.vue';
import EmployeesAdd from './components/pages/employees/EmployeesAdd.vue';
import EmployeesEdit from './components/pages/employees/EmployeesEdit.vue';
import Attendance from './components/pages/Attendance.vue';
import Applicants from './components/pages/applicants/Applicants.vue';
import ApplicantsHome from './components/pages/applicants/ApplicantsHome.vue';
import ApplicantsAdd from './components/pages/applicants/ApplicantsAdd.vue';
import ApplicantsDetail from './components/pages/applicants/ApplicantsDetail.vue';
import ApplicantsEdit from './components/pages/applicants/ApplicantsEdit.vue';
import LeaveReaquest from './components/pages/leave-reaquest/LeaveReaquest.vue';
import LeaveReaquestHome from './components/pages/leave-reaquest/LeaveReaquestHome.vue';
import LeaveReaquestAdd from './components/pages/leave-reaquest/LeaveReaquestAdd.vue';
import LeaveReaquestDetail from './components/pages/leave-reaquest/LeaveReaquestDetail.vue';
import Apply from './components/pages/Apply.vue';
import Login from './components/pages/Login.vue'

export const routes = [
  { path: '/', component: Dasboard, name: 'dashboard' },
  { path: '/employees', component: Employees, children:[
    { path: '', component: EmployeesHome, name: 'employees' },
    { path: 'add', component: EmployeesAdd, name: 'add_employees' },
    { path: ':id/edit', component: EmployeesEdit, name: 'edit_employees' },
  ] },
  { path: '/attendance', component: Attendance, name: 'attendance' },
  { path: '/applicants', component: Applicants, children:[
    { path: '', component: ApplicantsHome, name: 'applicants' },
    { path: 'add', component: ApplicantsAdd, name: 'add_applicants' },
    { path: ':id/detail', component: ApplicantsDetail, name: 'detail_applicants' },
    { path: ':id/edit', component: ApplicantsEdit, name: 'edit_applicants' },
  ] },
  { path: '/leave-reaquest', component: LeaveReaquest, children:[
    { path: '', component: LeaveReaquestHome, name: 'leave_reaquest' },
    { path: 'add', component: LeaveReaquestAdd, name: 'add_leave_reaquest' },
    { path: ':id/detail', component: LeaveReaquestDetail, name: 'detail_leave_reaquest' },
  ] },
  { path: '/apply', component: Apply, name: 'apply' },
  { path: '/login', component: Login, name: 'login' },
  { path: '*', redirect: '/', name: 'redirect'},
];