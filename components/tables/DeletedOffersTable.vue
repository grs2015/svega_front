<template>
  <div>
    <v-data-table
      :headers="deletedOffersHeader"
      :items="offerTableData"
      :loading="loading"
      sort-by="offer_id"
      class="elevation-1"
      item-key="offer_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted Offers</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="mx-4" :disabled="!toggledItem.length > 0" @click="restoreData">Restore</v-btn>
          <v-btn text color="red darken-1" :disabled="!toggledItem.length > 0" @click="deleteData">Delete</v-btn>
        </v-toolbar>
      </template>

      <template #item.offer_icon="{ item }">
        <v-avatar
          color="primary"
          class="lighten-2 ma-2"
          text-color="white"
          rounded
          size="36"
        >
          <v-icon dark>
            {{ item.offer_icon }}
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
      offerTableData: [], // Data to be placed into table
      deletedOffersHeader: [
        {
          text: "Offer Title",
          value: "offer_title",
          width: "35%"
        },
        {
          text: "Offer Icon",
          value: "offer_icon",
          width: "auto",
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1
    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedOffers')
      .then(() => this.offerTableData = [ ...this.$store.state.trashed.deletedOfferTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.offer_id)) {
        this.toggledItem.push(data.item.offer_id)
      } else if (!data.value && this.toggledItem.includes(data.item.offer_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.offer_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.offer_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreOfferData', this.toggledItem)
        .then(() => this.offerTableData = [ ...this.$store.state.trashed.deletedOfferTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offers have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteOfferData', this.toggledItem)
        .then(() => this.offerTableData = [ ...this.$store.state.trashed.deletedOfferTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offers have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
