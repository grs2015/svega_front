<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <password-forgot-form @on-submit="forgotSubmit"></password-forgot-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PasswordForgotForm from '@/components/UI/PasswordForgotForm.vue';

export default {
  components: {
    PasswordForgotForm
  },
  methods: {
    forgotSubmit(emailData) {
      this.$axios.$post('/forgot-password', emailData)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  }
}

</script>
