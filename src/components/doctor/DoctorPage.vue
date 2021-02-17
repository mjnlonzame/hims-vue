<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="doctors"
      sort-by="name"
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
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Doctor</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.name" label="Doctor name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.specialization" label="Specialization"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.address" label="Adddress"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="10">
                      <v-text-field v-model="editedItem.gender" label="Gender"></v-text-field>
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
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "DoctorPage",
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Specialization", value: "specialization" },
      { text: "Age", value: "age" },
      { text: "Gender", value: "gender" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    // doctors: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      specialization: "",
      age: "",
      gender: "",
      address: ""
    },
    defaultItem: {
      name: "",
      specialization: "",
      age: "",
      gender: "",
      address: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Doctor" : "Edit Doctor";
    },
    doctors() {
      return this.$store.state.doctors;
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
    this.$store.dispatch("getDoctors");
  },

  methods: {
    initialize() {
      const doctors = [
        {
          name: "Mikee Escueta",
          specialization: "Pulmonology"
        },
        {
          name: "MJ Lonzame",
          specialization: "Cardiology"
        }
      ];
      this.$store.commit("addDoctor", doctors[0]);
      this.$store.commit("addDoctor", doctors[1]);
    },

    editItem(item) {
      this.editedIndex = this.doctors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.doctors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // console.log(this.editedItem);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("deleteDoctor", this.editedItem.id);
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
        // Object.assign(this.doctors[this.editedIndex], this.editedItem);
        this.$store.dispatch(
          "updateDoctor",
          Object.assign(this.doctors[this.editedIndex], this.editedItem)
        );
      } else {
        // this.doctors.push(this.editedItem);
        this.$store.dispatch("addDoctor", this.editedItem);
      }
      this.close();
    }
  }
};
</script>


<style scoped>
</style>