<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <update-profile-form @on-submit="profileUpdateSubmit"></update-profile-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpdateProfileForm from '@/components/UI/UpdateProfileForm.vue';

export default {
  components: {
    UpdateProfileForm
  },
  methods: {
    profileUpdateSubmit(formData) {
      this.$axios.$put('/user/profile-information', formData)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  }
}

</script>
