<template>

  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <register-form @on-submit="registerSubmit"></register-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import RegisterForm from '@/components/UI/RegisterForm.vue'

export default {
  components: {
    RegisterForm
  },
  data() {
    return {

    }
  },
  methods: {
    registerSubmit(formData) {
      this.$axios.$post('/register', formData)
        .then(res => console.log(res))
        .then(e => console.log(e));
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  }
}
</script>
