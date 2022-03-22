<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <login-form @on-submit="loginSubmit"></login-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/UI/LoginForm.vue';

export default {
  components: {
    LoginForm
  },
  methods: {
    loginSubmit(loginData) {
      this.$auth.loginWith('laravelSanctum', { data: loginData})
        .then(() => console.log(`Current user logged in: ${this.$auth.loggedIn}`))
        .then(() => this.$store.commit('user/setCurrentUserRole', this.$auth.user.userRole))
        .catch(e => console.log(e))
    }
  }
}

</script>
