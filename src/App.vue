<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item class="mt-3">
          <v-list-item-title class="grey--text text--darken-1">
            <v-switch
              class="theme-settings"
              v-model="$vuetify.theme.dark"
              hide-details
              inset
              label="Dark theme"
            ></v-switch>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <router-link :to="{name: 'home'}">
          <v-btn>Costambook</v-btn>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <div v-if="!authenticated">
        <router-link to="login">
          <v-btn>Login</v-btn>
        </router-link>
        <router-link to="register">
          <v-btn>Register</v-btn>
        </router-link>
      </div>
      <div v-else>
        <v-btn @click="logout">Logout</v-btn>
      </div>
    </v-app-bar>

    <div role="main">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import store from "./store";
import { AUTH_LOGOUT } from "./store/actions/auth";

export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false
  }),
  computed: {
    authenticated() {
      return store.getters.isAuthenticated;
    }
  },
  methods: {
    logout: function() {
      store.dispatch(AUTH_LOGOUT);
    }
  }
};
</script>

<style scoped>
.theme-settings {
  padding: 20px;
}
</style>
