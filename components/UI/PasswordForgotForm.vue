<template>
  <v-card class="pa-6">
    <div class="text-center text-h6">Please enter your Email address</div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field v-model="formData.email" :rules="emailRules" label="E-mail" required ></v-text-field>
      <v-container class="mt-4">
        <v-row justify="space-between">
          <v-btn type="submit">Send Link</v-btn>
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
        email: 'goodwin.malcolm@example.org',
      },
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
