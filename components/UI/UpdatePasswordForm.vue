<template>
  <v-card class="pa-6">
    <div class="text-center text-h6">Update Your Password</div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        :append-icon="show_icon_3 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_icon_3 ? 'text' : 'password'"
        hint="Enter the current password at least 8 characters"
        @click:append="show_icon_3 = !show_icon_3"
        v-model="formData.current_password"
        :rules="passwordRules"
        label="Password"
        required>
      </v-text-field>
      <v-text-field
        :append-icon="show_icon_1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_icon_1 ? 'text' : 'password'"
        hint="Enter the new password at least 8 characters"
        @click:append="show_icon_1 = !show_icon_1"
        v-model="formData.password"
        :rules="passwordRules"
        label="Password"
        required>
      </v-text-field>
      <v-text-field
        :append-icon="show_icon_2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_icon_2 ? 'text' : 'password'"
        hint="Confirm your password"
        @click:append="show_icon_2 = !show_icon_2"
        v-model="formData.password_confirmation"
        :rules="passwordConfirmRules"
        label="Password Confirmation"
        required>
      </v-text-field>
      <v-container class="mt-4">
        <v-row justify="space-between">
          <v-btn type="submit">Reset</v-btn>
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
      show_icon_1: false,
      show_icon_2: false,
      show_icon_3: false,
      valid: true,
      formData: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      passwordRules: [
        v => !!v || 'Your password is required',
        v => (v && v.length >= 8) || 'Password must be greater than 8 characters'
      ],
      passwordConfirmRules: [
        v => (!!v && v) === this.formData.password || 'Password values don\'t match'
      ]
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
