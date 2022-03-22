<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <password-reset-form @on-submit="resetSubmit"></password-reset-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PasswordResetForm from '@/components/UI/PasswordResetForm.vue';

export default {
  components: {
    PasswordResetForm
  },
  methods: {
    resetSubmit(formData) {
      this.$axios.$post('/reset-password', formData)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  }
}

</script>
