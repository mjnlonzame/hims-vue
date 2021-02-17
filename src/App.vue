<template>
  <v-app id="app">
    <div class="container">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">HIMS </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Appointment</em>
              </template>
              <b-dropdown-item :to="{name : 'GetAppointment'}">Get Appointment</b-dropdown-item>
              <b-dropdown-item :to="{name : 'DoctorAppointments'}">See Doctor Schedule</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item :to="{name : 'Doctor'}">Doctors</b-nav-item>
            <b-nav-item :to="{name : 'Patient'}">Patients</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
