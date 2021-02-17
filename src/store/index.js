import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        doctors: [],
        patients: [],
        appointments: []
    },
    mutations: {
        addDoctor(state, doctor) {
            state.doctors.push(doctor);
        },
        updateDoctors(state, doctors) {
            state.doctors = [];
            state.doctors.push(...doctors);
        },
        updateDoctor(state, updatedDoctor) {
            const index = state.doctors.findIndex(doctor => doctor.id === updatedDoctor.id);
            if (index !== -1) state.doctors.splice(index, 1, updatedDoctor);
        },
        deleteDoctor(state, doctorId) {
            const index = state.doctors.findIndex(doctor => doctor.id === doctorId);
            state.doctors.splice(index, 1);
        },
        addPatient(state, patient) {
            state.patients.push(patient);
        },
        updatePatients(state, patients) {
            state.patients = [];
            state.patients.push(...patients);
        },
        updatePatient(state, updatedPatient) {
            const index = state.patients.findIndex(patient => patient.id === updatedPatient.id);
            if (index !== -1) state.patients.splice(index, 1, updatedPatient);
        },
        deletePatient(state, patientId) {
            const index = state.patients.findIndex(patient => patient.id === patientId);
            state.patients.splice(index, 1);
        },

        addAppointment(state, appointment) {
            state.appointments.push(appointment);
        },
        updateAppointments(state, appointments) {
            state.appointments = [];
            state.appointments.push(...appointments);
        },
        updateAppointment(state, updateAppointment) {
            const index = state.appointments.findIndex(appointment => appointment.id === updateAppointment.id);
            if (index !== -1) state.appointments.splice(index, 1, updateAppointment);
        },
    },
    getters : {
        getAppointmentsByDoctorId(state, doctorId){
            return state.appointments.filter((appointment) => appointment.doctor.id === doctorId);
        }
    },
    actions: {
        getDoctors({ commit }) {
            axios.get('/api/doctor/').then((result) => {
                commit('updateDoctors', result.data);
            }).catch(console.error);
        },
        addDoctor({ commit }, doctor) {
            console.log(doctor);
            axios.post(`/api/doctor/`, doctor).then((result) => {
                commit('addDoctor', result.data);
            });
        },
        updateDoctor({ commit }, doctor) {
            axios.patch(`/api/doctor/${doctor.id}`, doctor).then((result) => {
                commit('updateDoctor', result.data);
            });
        },

        deleteDoctor({ commit }, doctorId) {
            console.log("deleting doctor...");
            console.log(`delete doctor: ${doctorId}`)
            axios.delete(`/api/doctor/${doctorId}`).then(() => {
                commit('deleteDoctor', doctorId);
            });
        },
        getPatients({ commit }) {
            axios.get('/api/patient/').then((result) => {
                commit('updatePatients', result.data);
            }).catch(console.error);
        },
        addPatient({ commit }, patient) {
            axios.post(`/api/patient/`, patient).then((result) => {
                commit('addPatient', result.data);
            });
        },
        updatePatient({ commit }, patient) {
            axios.patch(`/api/patient/${patient.id}`, patient).then((result) => {
                commit('updatePatient', result.data);
            });
        },
        deletePatient({commit}, patientId){
            axios.delete(`/api/patient/${patientId}`).then(() => {
                commit('deletePatient', patientId);
            });
        },

        addAppointment({commit}, appointment){
            axios.post(`/api/appointment/`, appointment).then((result) => {
                commit('addAppointment', result.data);
            });
        },
        getAppointments({ commit }) {
            axios.get('/api/appointment/').then((result) => {
                commit('updateAppointments', result.data);
            }).catch(console.error);
        },
        updateAppointment({ commit }, appointment) {
            axios.patch(`/api/appointment/${appointment.id}`, appointment).then((result) => {
                commit('updateAppointment', result.data);
            });
        },
    }



});
