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

    <news-edit-table
      :newsEntry="loadedNewsEntry"
      :uploadStatus="uploadStatus"
      @onUpdate="updateNewsEntry"
      @onDelete="deleteNewsEntryImage"
    ></news-edit-table>

  </div>
</template>

<script>
import NewsEditTable from '@/components/tables/NewsEditTable.vue'
import { newsEditBreadCrumbs } from '@/utils/shared/breadcrumbs.js'

export default {
  components: { newsEditBreadCrumbs, NewsEditTable },
  middleware: ['auth', 'verified', 'editor'],
  layout: 'admin',
  data() {
    return {
      items: newsEditBreadCrumbs,
      uploadStatus: {},
      uploadedImages: [],
      loadedNewsEntry: {}

    }
  },
  computed: {
    redirect() {
      return this.$store.state.news.redirectOnSave
    }
  },
  asyncData({ app, params, store, error }) {
    return app.$axios.$get(`/api/blogs/${ params.id }`)
      .then(response => {
        return {
          loadedNewsEntry: { ...response.data }
        }
      })
      .catch(e => {
        store.dispatch('showSnackBar', { message: e.message, status: 'error'})
        return error({ message: e.message, statusCode: e.response.status })
      })
  },
  methods: {
    updateNewsEntry(entryData) {
      this.$store.dispatch('news/updateNewsEntry', { data: entryData, route: this.$route.params.id })
        .then(response => {
          this.loadedNewsEntry = { ...response.data }
        })
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The News Entry has been created!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() =>  {
          this.uploadStatus = { uploadAction: false, counterAction: false }
          if (this.redirect) {
            this.$router.push('/admin/news')
          } else {
            this.$store.commit('news/toggleRedirectOnSave')
          }
          })
    },
    deleteNewsEntryImage(imageData) {
      this.$store.dispatch('news/updateNewsEntry', { data: imageData, route: this.$route.params.id })
        .then(response => {
          this.loadedNewsEntry = { ...response.data }
          })
    }
  }
}
</script>
