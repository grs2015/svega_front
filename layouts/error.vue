<template>
  <v-app>
    <h1 v-if="error.statusCode === 403">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    {{ error.message }}
    <NuxtLink to="/">
      Home page
    </NuxtLink>
    <the-snack-bar></the-snack-bar>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 403 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },

}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
