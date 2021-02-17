import Vue from 'vue';

import Router from 'vue-router';
import HomePage from '../components/home/HomePage.vue';
import DoctorPage from '../components/doctor/DoctorPage.vue';
import PatientPage from '../components/patient/PatientPage.vue';
import GetAppointment from '../components/appointment/GetAppointment.vue';
import DoctorAppointments from '../components/appointment/DoctorAppointments.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: HomePage
  }, {
    path: '/doctor',
    name: 'Doctor',
    component: DoctorPage,
  },
  {
    path: '/patient]',
    name: 'Patient',
    component: PatientPage,
  },
  {
    path: '/get-appointment',
    name: 'GetAppointment',
    component: GetAppointment,
  },
  {
    path: '/doctor/appointments',
    name: 'DoctorAppointments',
    component: DoctorAppointments,
  }],
});
