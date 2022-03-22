<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
    >

    </v-navigation-drawer> -->

    <v-app-bar
      app
      class="px-10"
    >
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->

        <v-app-bar-title>
          Svega Company
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <div v-if="$auth.loggedIn">
          <v-btn text color="primary" nuxt to="/admin" class="mr-2">
            panel
            <v-icon
              right
              dark>
              mdi-cog
            </v-icon>

          </v-btn>
          <v-btn text color="primary" @click="$auth.logout()" class="mr-2">Logout</v-btn>
        </div>
        <div v-else>
          <v-btn text color="primary" nuxt to="/auth" class="mr-0">Login</v-btn>
          <v-btn text color="primary" nuxt to="/register" class="mr-0">Register</v-btn>
          <v-btn text color="primary" nuxt to="/forgotpassword" class="mr-0">Reset Password</v-btn>
        </div>

        <template #extension>
          <v-tabs
            v-model="tab"
            right

          >
            <v-tabs-slider color="orange"></v-tabs-slider>
              <v-tab
                v-for="(item, index) in scrollItems"
                :key="index"
                @click="onTabClick"
                :href="item.href"
                :disabled="currentRoute !== 'index' && item.text !== 'Witaj'"
              >
                {{ item.text }}
              </v-tab>

          </v-tabs>
        </template>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt />
        <the-snack-bar></the-snack-bar>
      </v-container>
    </v-main>

    <v-footer>
      <v-col
        class="text-left text-body-2"
        cols="12"
       >
        {{ new Date().getFullYear() }} — {{ companyName }} // Svega Project
    </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      tab: '',
      scrollItems: [
        {
          text: 'Witaj',
          href: '#section-1',
        },
        {
          text: 'Co robimy',
          href: '#section-2',
        },
        {
          text: 'Nasza oferta',
          href: '#section-3',
        },
        {
          text: 'Jak działamy',
          href: '#section-4',
        },
        {
          text: 'Nowości',
          href: '#section-5',
        },
        {
          text: 'Kontakt',
          href: '#section-6',
        },

      ],
      duration: 400,
      offset: -64,
      easing: 'easeInOutCubic',
    }
  },


  computed: {
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      }
    },
    currentRoute() {
      return this.$store.state.currentRoute
    },
    companyName() {
      return this.$store.state.main.main.mainCompanyName
    }
  },
  methods: {
    verifyEmail() {
      this.$axios.$get('/sanctum/csrf-cookie')
      this.$axios.$post('/email/verification-notification')
        .then(() => console.log('Verify Email'))
        .catch(e => console.log(e))
    },
    onTabClick() {
      if (this.currentRoute !== 'index') {
        this.$router.replace('/')
        this.tab = ''
        return
      }

      this.$nextTick(() => {
        this.$store.commit('tabs/setTab', this.tab)
        this.$vuetify.goTo(`#${ this.$store.state.tabs.currentTab }`, this.options)
       })
    },
    }
}
</script>
