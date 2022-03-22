<template>
  <div>
    <v-data-table
      :headers="deletedNewsHeader"
      :items="newsTableData"
      :loading="loading"
      sort-by="news_id"
      class="elevation-1"
      item-key="news_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted News</v-toolbar-title>
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
export default {
  data() {
    return {
      selectedItems: [],
      newsTableData: [], // Data to be placed into table
      deletedNewsHeader: [
        {
          text: "News Title",
          value: "news_title",
          width: "65%"
        },
        {
          text: "Publish Date",
          value: "news_date",
          width: "auto",
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1

    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedNews')
      .then(() => this.newsTableData = [ ...this.$store.state.trashed.deletedNewsTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.news_id)) {
        this.toggledItem.push(data.item.news_id)
      } else if (!data.value && this.toggledItem.includes(data.item.news_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.news_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.news_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreNewsData', this.toggledItem)
        .then(() => this.newsTableData = [ ...this.$store.state.trashed.deletedNewsTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The News have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteNewsData', this.toggledItem)
        .then(() => this.newsTableData = [ ...this.$store.state.trashed.deletedNewsTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The News have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
