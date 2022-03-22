<template>
  <div>
    <v-data-table
      :headers="deletedActivitiesHeader"
      :items="activityTableData"
      :loading="loading"
      sort-by="activity_id"
      class="elevation-1"
      item-key="activity_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted Activities</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="mx-4" :disabled="!toggledItem.length > 0" @click="restoreData">Restore</v-btn>
          <v-btn text color="red darken-1" :disabled="!toggledItem.length > 0" @click="deleteData">Delete</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import isValid from 'date-fns/isValid'


export default {
  data() {
    return {
      selectedItems: [],
      activityTableData: [], // Data to be placed into table
      deletedActivitiesHeader: [
        {
          text: "Title",
          value: "activity_title",
          width: "35%"
        },
        {
          text: "Subtite",
          value: "activity_subtitle",
          width: "auto",
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1

    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedActivities')
      .then(() => this.activityTableData = [ ...this.$store.state.trashed.deletedActivityTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.activity_id)) {
        this.toggledItem.push(data.item.activity_id)
      } else if (!data.value && this.toggledItem.includes(data.item.activity_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.activity_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.activity_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreActivityData', this.toggledItem)
        .then(() => this.activityTableData = [ ...this.$store.state.trashed.deletedActivityTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Activities have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteActivityData', this.toggledItem)
        .then(() => this.activityTableData = [ ...this.$store.state.trashed.deletedActivityTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Activities have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
