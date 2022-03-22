<template>
  <v-container fluid>
    <v-row align-content="start">
      <v-col cols="12" md="6" >
        <div class="text-left text-h6 blue lighten-4 pa-1 mb-4 rounded-lg">
          <span class="blue--text text-darken-4 ml-2">Update User Information</span>
        </div>
        <v-form ref="form_profile" v-model="validProfile" @submit.prevent="onSubmitProfile">
          <v-text-field v-model="formProfileData.userFirstName" :rules="firstNameRules" label="First Name"></v-text-field>
          <v-text-field v-model="formProfileData.userLastName" :rules="lastNameRules" label="Last Name" ></v-text-field>
          <v-text-field
            v-model="formProfileData.userEmail"
            :rules="emailRules"
            label="E-mail"
            >
          </v-text-field>
          <v-container>
            <v-row justify="end">
              <v-btn type="submit" color="primary" :disabled="!validProfile">Update Profile</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-left text-h6 blue lighten-4 pa-1 mb-4 rounded-lg">
          <span class="blue--text text-darken-4 ml-2">Update Password</span>
        </div>
        <v-form ref="form_password" v-model="validPassword" @submit.prevent="onSubmitPassword">
          <v-text-field
            :append-icon="show_icon_1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_icon_1 ? 'text' : 'password'"
            hint="Enter your current password at least 8 characters"
            @click:append="show_icon_1 = !show_icon_1"
            v-model="formPasswordData.current_password"
            :rules="passwordRules"
            label="Your Current Password"
            required>
          </v-text-field>
          <v-text-field
            :append-icon="show_icon_2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_icon_2 ? 'text' : 'password'"
            hint="Enter the new password at least 8 characters"
            @click:append="show_icon_2 = !show_icon_2"
            v-model="formPasswordData.password"
            :rules="passwordRules"
            label="Your New Password"
            required>
          </v-text-field>
          <v-text-field
            :append-icon="show_icon_3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_icon_3 ? 'text' : 'password'"
            hint="Confirm your password"
            @click:append="show_icon_3 = !show_icon_3"
            v-model="formPasswordData.password_confirmation"
            :rules="passwordConfirmRules"
            label="Your New Password Confirmation"
            required>
          </v-text-field>
          <v-container>
            <v-row justify="end">
              <v-btn class="mr-3" type="button" color="secondary" @click="$refs.form_password.reset()">Reset Form</v-btn>
              <v-btn type="submit" color="primary" :disabled="!validPassword">Update Password</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-alert
          outlined
          type="success"
          text
          v-if="isUserVerified">
          Your Email is verified, no verification is needed
        </v-alert>
        <v-alert
          v-else
          prominent
          type="warning"
          text>
          <v-row align="center">
            <v-col class="grow">
              Your Email is not verified and you can't use all functionality of the APP.
            </v-col>
            <v-col class="shrink">
              <v-btn color="warning" @click="onSubmitVerification">Verify Email</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formPasswordData: {
        current_password: '',
        password: '',
        password_confirmation: ''
      },
      formProfileData: {},
      validProfile: true,
      validPassword: true,
      show_icon_1: false,
      show_icon_2: false,
      show_icon_3: false,
      passwordRules: [
        v => !!v || 'Your current password is required',
        v => (v && v.length >= 8) || 'Password must be greater than 8 characters'
      ],
      passwordConfirmRules: [
        v => (!!v && v) === this.formPasswordData.password || 'Password values don\'t match'
      ],
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
  created() {
    this.formProfileData = { ...this.$auth.user }
  },
  methods: {
    onSubmitProfile() {
      const formData = {
        first_name: this.formProfileData.userFirstName,
        last_name: this.formProfileData.userLastName,
        email: this.formProfileData.userEmail,
        type: 'profile'
      }
      this.$refs.form_profile.validate()
      this.$emit('on-submit', formData)
    },
    onSubmitPassword() {
      const formData = {...this.formPasswordData, type: 'password' }
      this.$refs.form_password.reset()
      this.$emit('on-submit', formData)
    },
    onSubmitVerification() {
      this.$emit('on-verify')
    }
  },
  computed: {
    isUserVerified() {
      return !!this.$auth.user.verifiedAt
    }
  }

}
</script>
