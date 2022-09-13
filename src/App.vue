<template>
  <v-app>
    <v-app-bar
      app
      class="white mx-auto header-border"
      flat
      elevation="1"
      :dense="!$vuetify.breakpoint.smOnly"
    >
      <!-- <div class="d-flex align-center"> -->
      <v-row class="max-width-screen mx-auto py-5">
        <div class="d-none d-sm-flex px-0 py-1">
          <v-btn to="/camera" color="blue-grey lighten-5" rounded light plain>
            <eva-icon name="camera-outline" color="white"></eva-icon>
          </v-btn>
        </div>
        <v-divider vertical class="mx-3 d-none d-sm-flex"></v-divider>
        <v-toolbar-title
          class="text-grand-hotel mx-auto"
          :class="
            $vuetify.breakpoint.smAndUp ? 'font-title-lg' : 'font-title-sm'
          "
        >
          Vuegram
        </v-toolbar-title>
        <v-spacer class="d-none d-sm-flex"></v-spacer>
        <div class="d-none d-sm-flex py-1">
          <v-btn to="/" color="blue-grey lighten-5" rounded light plain>
            <eva-icon name="home-outline"></eva-icon>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-layout class="max-width-screen mx-auto">
        <router-view />
      </v-layout>
    </v-main>
    <v-footer padless class="white d-flex d-sm-none" elevation="2" app>
      <v-row class="py-4 footer-border">
        <v-flex class="text-center" cols="12">
          <!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
          <v-btn to="/" class="ma-0 rounded-0" block plain>
            <eva-icon name="home-outline"></eva-icon>
          </v-btn>
        </v-flex>
        <v-flex class="text-center" cols="12">
          <v-btn to="/camera" class="ma-0 rounded-0" block plain light>
            <eva-icon name="camera-outline"></eva-icon>
          </v-btn>
        </v-flex>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap')

.max-width-screen
  max-width: 975px

.max-width-screen-cam
  max-width: 600px

.text-grand-hotel
  font-family: 'Grand Hotel', Roboto, cursive, 'Helvetica Neue', Helvetica, Arial, sans-serif
  font-weight: bold

.header-border
  border-bottom: 1 black solid

.footer-border
  border-top: 1 black solid

.font-title-lg
  font-size: 30px

.font-title-sm
  font-size: 20px

.header-height-77
  height: 77px

.header-height-48
  height: 48px

.bg-gradient
  background: linear-gradient(to bottom, #005aa7, #fffde4)

.html
  overflow: hidden !important
  scrollbar-width: none
  -ms-overflow-style: none
</style>