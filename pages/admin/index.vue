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

    Admin Main
  </div>
</template>

<script>
import { dashboardBreadcrumbs } from '@/utils/shared/breadcrumbs.js'

export default {
  components: { dashboardBreadcrumbs },
  middleware: 'auth',
  layout: 'admin',
  data() {
    return {
      items: dashboardBreadcrumbs
    }
  },
}

</script>
