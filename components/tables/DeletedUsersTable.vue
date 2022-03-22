<template>
  <div>
    <v-data-table
      :headers="deletedUsersHeader"
      :items="userTableData"
      :loading="loading"
      sort-by="user_id"
      class="elevation-1"
      item-key="user_id"
      show-select
      v-model="selectedItems"
      @item-selected="onItemToggling"
      @toggle-select-all="onAllItemsToggling"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Deleted Users</v-toolbar-title>
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
      userTableData: [], // Data to be placed into table
      deletedUsersHeader: [
        {
          text: "First Name",
          value: "user_first_name",
        },
        {
          text: "Last Name",
          value: "user_last_name",
        },
        {
          text: "Role",
          value: "user_role",
        },
        {
          text: "Email",
          value: "user_email",
          width: '30%'
        },
      ],
      loading: false,
      toggledItem: [],
      itemsPerPage: -1
    }
  },
  fetch() {
    return this.$store.dispatch('trashed/fetchDeletedUsers')
      .then(() => this.userTableData = [ ...this.$store.state.trashed.deletedUserTableData ])
  },
  methods: {
    onItemToggling(data) {
      if (data.value && !this.toggledItem.includes(data.item.user_id)) {
        this.toggledItem.push(data.item.user_id)
      } else if (!data.value && this.toggledItem.includes(data.item.user_id)) {
        this.toggledItem = this.toggledItem.filter(id => id !== data.item.user_id)
      }
    },
    onAllItemsToggling(data) {
      const ids = []
      data.items.forEach(item => {
        ids.push(item.user_id)
      })
      this.toggledItem = data.value ? [ ...ids ] : []
    },
    restoreData() {
      this.$store.dispatch('trashed/restoreUserData', this.toggledItem)
        .then(() => this.userTableData = [ ...this.$store.state.trashed.deletedUserTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offers have been restored!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))

    },
    deleteData() {
      this.$store.dispatch('trashed/deleteUserData', this.toggledItem)
        .then(() => this.userTableData = [ ...this.$store.state.trashed.deletedUserTableData ])
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offers have been erased!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
    }
  }
}
</script>
