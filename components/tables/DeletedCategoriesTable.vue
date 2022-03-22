<template>
  <div>
    <v-data-table
      :headers="deletedCategoriesHeader"
      :items="categoryTableData"
      :loading="loading"
      sort-by="category_id"
      class="elevation-1"
      item-key="category_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted Categories</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="mx-4" :disabled="!toggledItem.length > 0" @click="restoreData">Restore</v-btn>
          <v-btn text color="red darken-1" :disabled="!toggledItem.length > 0" @click="deleteData">Delete</v-btn>
        </v-toolbar>
      </template>

      <template #item.category_icon="{ item }">
        <v-avatar
          :color="item.category_color"
          class="lighten-2 ma-2"
          text-color="white"
          rounded
          size="36"
        >
          <v-icon dark>
            {{ item.category_icon }}
          </v-icon>
        </v-avatar>
      </template>
    </v-data-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItems: [],
      categoryTableData: [], // Data to be placed into table
      deletedCategoriesHeader: [
        {
          text: "Category Title",
          value: "category_title",
          width: "35%"
        },
        {
          text: "Category Icon",
          value: "category_icon",
          width: "auto",
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1
    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedCategories')
      .then(() => this.categoryTableData = [ ...this.$store.state.trashed.deletedCategoryTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.category_id)) {
        this.toggledItem.push(data.item.category_id)
      } else if (!data.value && this.toggledItem.includes(data.item.category_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.category_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.category_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreCategoryData', this.toggledItem)
        .then(() => this.categoryTableData = [ ...this.$store.state.trashed.deletedCategoryTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Categories have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteCategoryData', this.toggledItem)
        .then(() => this.categoryTableData = [ ...this.$store.state.trashed.deletedCategoryTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Categories have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
