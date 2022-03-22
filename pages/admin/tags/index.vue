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

    <tag-add-field></tag-add-field>
    <tag-list></tag-list>

  </div>
</template>

<script>
import { tagsBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import TagAddField from '@/components/UI/TagAddField.vue'
import TagList from '@/components/UI/TagList.vue'

export default {
  components: { tagsBreadCrumbs, TagAddField, TagList },
  middleware: ['auth', 'verified', 'editor'],
  layout: 'admin',
  data() {
    return {
      items: tagsBreadCrumbs
    }
  },
  fetch() {
    return this.$store.dispatch('tag/fetchAllTags')
      .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
  }
}
</script>
