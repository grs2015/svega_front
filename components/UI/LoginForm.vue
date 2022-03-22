<template>
  <v-card class="pa-6">
    <div class="text-center text-h6">Please Sign-In</div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field v-model="formData.email" :rules="emailRules" label="E-mail" required ></v-text-field>
      <v-text-field
        :append-icon="show_icon ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_icon ? 'text' : 'password'"
        @click:append="show_icon = !show_icon"
        v-model="formData.password"
        :rules="passwordRules"
        label="Password"
        required ></v-text-field>
      <v-checkbox
        color="primary"
        label="Remember Me"
        v-model="formData.remember">

      </v-checkbox>
      <v-container class="mt-4">
        <v-row justify="space-between">
          <v-btn type="submit">Login</v-btn>
          <v-btn type="button" @click="onCancel" outlined>Cancel</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      valid: true,
      show_icon: false,
      formData: {
        email: 'osatterfield@example.org',
        password: 'password',
        remember: false
      },
      passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be greater than 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate()
      this.$emit('on-submit', this.formData)
    },
    onCancel() {
      this.$router.push('/')
    }
  }
}
</script>
