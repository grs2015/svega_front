<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <update-password-form @on-submit="updateSubmit"></update-password-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpdatePasswordForm from '@/components/UI/UpdatePasswordForm.vue';

export default {
  components: {
    UpdatePasswordForm
  },
  methods: {
    updateSubmit(formData) {
      this.$axios.$put('/user/password', formData)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  }
}

</script>
