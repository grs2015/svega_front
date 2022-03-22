export default {
  profileUpdate(_, formData) {
    return this.$axios.$put('/user/profile-information', formData)
  },

  passwordUpdate(_, formData) {
    return this.$axios.$put('/user/password', formData)
  },

  verifyEmail(_, formData) {
    return this.$axios.$post('/email/verification-notification')
  }
}
