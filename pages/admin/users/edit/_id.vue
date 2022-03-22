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
          :disabled="item.disabled"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>

    </v-breadcrumbs>
    User Edit
  </div>
</template>

<script>
import { userEditBreadCrumbs } from '@/utils/shared/breadcrumbs.js'

export default {
  components: { userEditBreadCrumbs },
  middleware: 'auth',
  layout: 'admin',
  data() {
    return {
      items: userEditBreadCrumbs
    }
  }
}
</script>
