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

    <news-table :news="loadedNews"></news-table>

  </div>
</template>

<script>
import { newsBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import NewsTable from '@/components/tables/NewsTable.vue'


export default {
  components: { newsBreadCrumbs, NewsTable },
  middleware: ['auth', 'verified'],
  layout: 'admin',
  data() {
    return {
      items: newsBreadCrumbs
    }
  },
  async asyncData({ app, store, error }) {
    try {
      let loadedData = await app.$axios.$get('/api/blogs?date=asc')
      let { data, ...medaData } = loadedData
      await store.dispatch('news/setMetaLinksNews', medaData)
      await store.dispatch('category/fetchAllCategories')
      return { loadedNews: {...data } }
    } catch(e) {
      await store.dispatch('showSnackBar', { message: e.message, status: 'error'})
      return error({ message: e.message, statusCode: e.response.status })
    }
  }
}

</script>
