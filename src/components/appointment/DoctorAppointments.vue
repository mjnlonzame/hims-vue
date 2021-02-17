<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="appointments"
      sort-by="patient.name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-spacer></v-spacer>-->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Doctor</v-btn>
            </template>-->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.patient.name" label="Patient name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.patient.age" label="Age" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.patient.gender" label="Gender" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.patient.address" label="Adddress" readonly></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.complaint" label="Complaint" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.diagnosis" label="Diagnosis"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.prescription" label="Prescription"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "DoctorAppointments",
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "patient.name"
      },
      { text: "Complaint", value: "complaint" },
      { text: "Age", value: "patient.age" },
      { text: "Gender", value: "patient.gender" },
      { text: "Visit Date", value: "visitDate" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      complaint: "",
      visitDate: "",
      appointmentDate: "",
      patient: {
        name: "",
        age: "",
        gender: "",
        address: ""
      },
      diagnosis : "",
      prescription: ""
    },
    defaultItem: {
      complaint: "",
      visitDate: "",
      appointmentDate: "",
      patient: {
        name: "",
        age: "",
        gender: "",
        address: ""
      },
      diagnosis : "",
      prescription: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Appointment" : "Edit Appointment";
    },
    appointments() {
      return this.$store.state.appointments;
      //   return this.$store.getters.getAppointmentsByDoctorId();
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created() {
    this.$store.dispatch("getAppointments");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.appointments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.appointments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },  

    deleteItemConfirm() {   
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch(
          "updateAppointment",
          Object.assign(this.appointments[this.editedIndex], this.editedItem)
        );
      } 
      this.close();
    }
  }
};
</script>


<style scoped>
</style>