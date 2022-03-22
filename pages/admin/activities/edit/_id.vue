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

    <activity-edit-table
      :activityEntry="loadedActivityEntry"
      :uploadStatus="uploadStatus"
      @onUpdate="updateActivityEntry"
      @onDelete="deleteActivityEntryImage">
    </activity-edit-table>

  </div>

</template>

<script>
import { activityEditBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import ActivityEditTable from '@/components/tables/ActivityEditTable.vue'
import { mapGetters } from 'vuex'

export default {
  components: { activityEditBreadCrumbs, ActivityEditTable },
  middleware: ['auth', 'verified', 'editor'],
  layout: "admin",
  data() {
    return {
      items: activityEditBreadCrumbs,
      activityImage: '',
      loadedActivity: null,
      uploadStatus: {},
      loadedActivityEntry: {}
    }
  },
  computed: {
    redirect() {
      return this.$store.state.activity.redirectOnSave
    }
  },
  asyncData({ app, params, store, error }) {
    return app.$axios.$get(`/api/activities/${params.id}`)
      .then(response => {
        return {
          loadedActivityEntry: { ...response.data }
        }
      })
      .catch(e => {
        store.dispatch('showSnackBar', { message: e.message, status: 'error'})
        return error({ message: e.message, statusCode: e.response.status })
      })
  },
  methods: {
    updateActivityEntry(entryData) {
      this.$store.dispatch('activity/updateActivityEntry', { data: entryData, route: this.$route.params.id })
        .then(response => {
          this.loadedActivityEntry = { ...response.data }
        })
        .then(() => {
          this.$store.dispatch('showSnackBar', { message: 'The Activity Entry has been updated!', status: 'success'})
        })
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() =>  {
          this.uploadStatus = { uploadAction: false, counterAction: false }
          if (this.redirect) {
            this.$router.push('/admin/activities')
          } else {
            this.$store.commit('activity/toggleRedirectOnSave')
          }
          })
    },
    deleteActivityEntryImage(imageData) {
      this.$store.dispatch('activity/updateActivityEntry', { data: imageData, route: this.$route.params.id })
        .then(response => {
          this.loadedActivityEntry = { ...response.data }
          })
    }
  }
}
</script>
