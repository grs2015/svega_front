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

    <user-table :users="loadedUsers"></user-table>

  </div>
</template>

<script>
import { usersBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import UserTable from '@/components/tables/UserTable.vue'

export default {
  components: { usersBreadCrumbs, UserTable },
  middleware: ['auth', 'verified', 'admin'],
  layout: 'admin',
  data() {
    return {
      items: usersBreadCrumbs
    }
  },
  asyncData({ app, store, error }) {
    return app.$axios.$get('/api/users')
      .then(response => {
        return {
          loadedUsers: { ... response.data }
        }
      })
      .catch(e => {
        store.dispatch('showSnackBar', { message: e.message, status: 'error'})
        return error({ message: e.message, statusCode: e.response.status })
      })
  }
}
</script>
