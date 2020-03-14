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
        <span class="title">Costambook</span>
      </v-toolbar-title>
    </v-app-bar>

    <div role="main">
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false
  })
};
</script>

<style scoped>
.theme-settings {
  padding: 20px;
}
</style>
