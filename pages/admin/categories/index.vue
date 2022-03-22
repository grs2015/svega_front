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

    <category-add-field></category-add-field>
    <category-list></category-list>

  </div>
</template>

<script>
import { categoriesBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import CategoryList from '@/components/UI/CategoryList.vue'
import CategoryAddField from '@/components/UI/CategoryAddField.vue'

export default {
  components: { categoriesBreadCrumbs, CategoryList, CategoryAddField },
  middleware: ['auth', 'verified', 'editor'],
  layout: 'admin',
  data() {
    return {
      items: categoriesBreadCrumbs
    }
  },
  fetch() {
    return this.$store.dispatch('category/fetchAllCategories')
      .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
  }
}
</script>
