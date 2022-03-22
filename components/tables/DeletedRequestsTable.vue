<template>
  <div>
    <v-data-table
      :headers="deletedRequestsHeader"
      :items="requestTableData"
      :loading="loading"
      sort-by="request_id"
      class="elevation-1"
      item-key="request_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted Requests</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="mx-4" :disabled="!toggledItem.length > 0" @click="restoreData">Restore</v-btn>
          <v-btn text color="red darken-1" :disabled="!toggledItem.length > 0" @click="deleteData">Delete</v-btn>
        </v-toolbar>
      </template>

      <template #item.user_role="{ item }">
        <v-chip
          color="primary"
          class="ma-2"
          text-color="white"
          label
        >
          <v-icon
            dark
            left
            small
          >
            mdi-tag
          </v-icon>
            {{ item.user_role }}
        </v-chip>
      </template>
    </v-data-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItems: [],
      requestTableData: [], // Data to be placed into table
      deletedRequestsHeader: [
        {
          text: "Name",
          value: "request_name",
        },
        {
          text: "Email",
          value: "request_email",
        },
        {
          text: "Confirmation Date",
          value: "request_date",
          width: '100'
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1
    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedRequests')
      .then(() => this.requestTableData = [ ...this.$store.state.trashed.deletedRequestTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.request_id)) {
        this.toggledItem.push(data.item.request_id)
      } else if (!data.value && this.toggledItem.includes(data.item.request_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.request_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.request_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreRequestData', this.toggledItem)
        .then(() => this.requestTableData = [ ...this.$store.state.trashed.deletedRequestTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Requests have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteRequestData', this.toggledItem)
        .then(() => this.requestTableData = [ ...this.$store.state.trashed.deletedRequestTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Requests have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
