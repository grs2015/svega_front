<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          nuxt exact
          :to="item.to"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>

    </v-breadcrumbs>

    <profile-form @on-submit="profileSubmit" @on-verify="verifyEmail"></profile-form>

  </div>
</template>

<script>
import { accountBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import ProfileForm from '@/components/UI/ProfileForm.vue'

export default {
  components: { accountBreadCrumbs, ProfileForm },
  middleware: 'auth',
  layout: 'admin',
  data() {
    return {
      items: accountBreadCrumbs
    }
  },
  methods: {
    profileSubmit(formData) {
      let { type, ...data } = formData
      if (type === 'profile') {
        this.$store.dispatch('profile/profileUpdate', data)
          .then(() => this.$auth.fetchUser())
          .then(() => this.$store.dispatch('showSnackBar', { message: 'The profile has been updated!', status: 'success'}))
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
      } else {
        this.$store.dispatch('profile/passwordUpdate', data)
          .then(() => this.$store.dispatch('showSnackBar', { message: 'The password has been updated!', status: 'success'}))
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error.current_password[0], status: 'error'}))
      }
    },
    verifyEmail() {
      this.$store.dispatch('profile/verifyEmail')
        .then(() => this.$auth.fetchUser())
        .then(() => this.$store.dispatch('showSnackBar', { message: 'Please check your Email box!', status: 'success'}))
        .catch(e => console.log(e.response.data))
    }
  }
}
</script>
