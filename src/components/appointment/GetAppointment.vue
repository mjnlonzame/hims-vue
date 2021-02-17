<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="appointment.complaint"
        label="Complaint"
        required
      ></v-text-field>

      <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
      <v-select
        v-model="appointment.patient"
        :items="patients"
        item-text="name"
        item-value="id"
        :rules="[v => !!v || 'Patient is required']"
        label="Patient"
        return-object
        required
      ></v-select>
      <v-select
        v-model="appointment.doctor"
        :items="doctors"
        item-text="name"
        item-value="id"
        :rules="[v => !!v || 'Doctor is required']"
        label="Doctor"
        return-object
        required
      ></v-select>

      <!-- <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>-->
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="appointment.visitDate"
            label="Visit Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="appointment.visitDate" @input="menu2 = false"></v-date-picker>
      </v-menu>
      <v-btn color="blue darken-1" text @click="save">Book Appointment</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "GetAppointment",
  data: () => ({
    valid: true,
    doctor: {},
    patient: {},
    appointment: {
      complaint: "",
      appointmentDate: new Date(),
      visitDate: new Date().toISOString().substr(0, 10),
      doctor: null,
      patient: null,
      diagnosis: "",
      prescription: ""
    },
    checkbox: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false
  }),
  computed: {
    doctors() {
      return this.$store.state.doctors;
    },
    patients() {
      return this.$store.state.patients;
    }
  },
  created() {
    this.$store.dispatch("getDoctors");
    this.$store.dispatch("getPatients");
  },

  methods: {
    save() {
        console.log("doctor");
        console.log(this.doctor);

        console.log("patient");
        console.log(this.patient);
        this.$store.dispatch("addAppointment", this.appointment);
      console.log(this.appointment);
    }
    // validate() {
    //   this.$refs.form.validate();
    // },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
  }
};
</script>