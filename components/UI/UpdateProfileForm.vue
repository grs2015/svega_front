<template>
  <v-card class="pa-6">
    <div class="text-center text-h6">Update Your Profile</div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field v-model="formData.first_name" :rules="firstNameRules" label="First Name" required ></v-text-field>
      <v-text-field v-model="formData.last_name" :rules="lastNameRules" label="Last Name" required ></v-text-field>
      <v-text-field v-model="formData.email" :rules="emailRules" label="E-mail" required ></v-text-field>
      <v-container class="mt-4">
        <v-row justify="space-between">
          <v-btn type="submit">Update</v-btn>
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
      formData: {
        first_name: '',
        last_name: '',
        email: '',
      },
      firstNameRules: [
        v => !!v || 'Your first name is requried!',
      ],
      lastNameRules: [
        v => !!v || 'Your last name is required!',
      ],
      emailRules: [
        v => !!v || 'Your email is required',
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
