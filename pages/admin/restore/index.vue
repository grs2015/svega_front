<template>
  <div>
    <v-breadcrumbs :items="items">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template #item="{ item }">
        <v-breadcrumbs-item
          nuxt exact
          :to="item.to"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <restore-tabs></restore-tabs>

  </div>
</template>


<script>
import { restoreBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import RestoreTabs from '@/components/UI/RestoreTabs.vue'

export default {
  components: { RestoreTabs },
  middleware: ['auth', 'verified', 'admin'],
  layout: 'admin',
  data() {
    return {
      items: restoreBreadCrumbs
    }
  },

}
</script>
