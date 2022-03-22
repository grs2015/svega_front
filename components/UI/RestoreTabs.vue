<template>
  <base-card>
    <template #title>
      <span>Restore / Clean Data</span>
    </template>
    <template #content>
      <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        Activities
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        News
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        Categories
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        Tags
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        Offers
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        Requests
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-label
        </v-icon>
        Users
      </v-tab>



      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-activity-table></deleted-activity-table>
          </template>
        </tab-card>
      </v-tab-item>

      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-news-table></deleted-news-table>
          </template>
        </tab-card>
      </v-tab-item>

      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-categories-table></deleted-categories-table>
          </template>
        </tab-card>
      </v-tab-item>

      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-tags-table></deleted-tags-table>
          </template>
        </tab-card>
      </v-tab-item>

      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-offers-table></deleted-offers-table>
          </template>
        </tab-card>
      </v-tab-item>

      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-requests-table></deleted-requests-table>
          </template>
        </tab-card>
      </v-tab-item>

      <v-tab-item>
        <tab-card>
          <template #content>
            <deleted-users-table></deleted-users-table>
          </template>
        </tab-card>
      </v-tab-item>

    </v-tabs>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue'
import TabCard from '@/components/UI/TabCard.vue'
import DeletedActivityTable from '@/components/tables/DeletedActivityTable.vue'
import DeletedNewsTable from '@/components/tables/DeletedNewsTable.vue'
import DeletedCategoriesTable from '@/components/tables/DeletedCategoriesTable.vue'
import DeletedTagsTable from '@/components/tables/DeletedTagsTable.vue'
import DeletedOffersTable from '@/components/tables/DeletedOffersTable.vue'
import DeletedUsersTable from '@/components/tables/DeletedUsersTable.vue'
import DeletedRequestsTable from '@/components/tables/DeletedRequestsTable.vue'


export default {
  components: {
    BaseCard,
    TabCard,
    DeletedActivityTable,
    DeletedNewsTable,
    DeletedCategoriesTable,
    DeletedTagsTable,
    DeletedOffersTable,
    DeletedUsersTable,
    DeletedRequestsTable
  },
  data() {
    return {
      deletedActivities: {}
    }
  },
}
</script>

<style scoped>
 .v-tab { justify-content: start; }
</style>
