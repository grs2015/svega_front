<template>
  <div>
    <v-breadcrumbs :items="items">
      <template #divider>
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
    <request-table :requests="loadedRequests"></request-table>
  </div>
</template>

<script>
import { requestsBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import RequestTable from '@/components/tables/RequestTable.vue'

export default {
  components: { RequestTable },
  middleware: ['auth', 'verified', 'manager'],
  layout: 'admin',
  data() {
    return {
      items: requestsBreadCrumbs
    }
  },
  asyncData({ app, store, error }) {
    return app.$axios.$get('/api/contacts')
      .then(response => {
        return {
          loadedRequests: { ...response.data }
        }
      })
      .catch(e => {
        store.dispatch('showSnackBar', { message: e.message, status: 'error'})
        return error({ message: e.message, statusCode: e.response.status })
      })
  }
}
</script>
