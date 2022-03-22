<template>
  <div>
    <v-data-table
      :headers="deletedTagsHeader"
      :items="tagsTableData"
      :loading="loading"
      sort-by="tag_id"
      class="elevation-1"
      item-key="tag_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted Tags</v-toolbar-title>
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
      tagsTableData: [], // Data to be placed into table
      deletedTagsHeader: [
        {
          text: "Tag Title",
          value: "tag_title",
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1
    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedTags')
      .then(() => this.tagsTableData = [ ...this.$store.state.trashed.deletedTagTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.tag_id)) {
        this.toggledItem.push(data.item.tag_id)
      } else if (!data.value && this.toggledItem.includes(data.item.tag_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.tag_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.tag_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreTagData', this.toggledItem)
        .then(() => this.tagsTableData = [ ...this.$store.state.trashed.deletedTagTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Tags have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteTagData', this.toggledItem)
        .then(() => this.tagsTableData = [ ...this.$store.state.trashed.deletedTagTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Tags have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
