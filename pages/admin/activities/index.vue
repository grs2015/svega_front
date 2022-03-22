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
    <activity-table :activities="loadedActivities"></activity-table>
  </div>
</template>

<script>
import { activitiesBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import ActivityTable from '@/components/tables/ActivityTable.vue'

export default {
  components: { ActivityTable },
  middleware: ['auth', 'verified'],
  layout: 'admin',
  data() {
    return {
      items: activitiesBreadCrumbs
    }
  },
  asyncData({ app, store, error }) {
    return app.$axios.$get('/api/activities')
      .then(response => {
        return {
          loadedActivities: { ...response.data }
        }
      })
      .catch(e => {
        store.dispatch('showSnackBar', { message: e.message, status: 'error'})
        return error({ message: e.message, statusCode: e.response.status })
      })
  }

}
</script>
