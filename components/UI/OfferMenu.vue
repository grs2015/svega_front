<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          color="primary"
        >
          <v-icon>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <offer-edit-dialog
      v-if="dialogs.editOffer"
      @close="dialogs.editOffer = false"
      :offer="offer"
    >
    </offer-edit-dialog>

    <offer-delete-dialog
      v-if="dialogs.deleteOffer"
      @close="dialogs.deleteOffer = false"
      :offer="offer"
    >
    </offer-delete-dialog>

  </div>
</template>

<script>
import OfferEditDialog from '@/components/dialogs/OfferEditDialog.vue'
import OfferDeleteDialog from '@/components/dialogs/OfferDeleteDialog.vue'

export default {
  components: { OfferEditDialog, OfferDeleteDialog },
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Offer Edit',
          icon: 'mdi-pencil',
          click: () => {
            this.dialogs.editOffer = true;
          }
        },
        {
          title: 'Offer Delete',
          icon: 'mdi-delete',
          click: () => {
            this.dialogs.deleteOffer = true;
          }
        },
        {
          title: 'Sort Offers',
          icon: 'mdi-drag-horizontal-variant',
          click: () => {
            this.$store.commit('offer/toggleSorting');
          }
        }
      ],
      dialogs: {
        editOffer: false,
        deleteOffer: false,
      }
    }
  },
  methods: {
    handleClick(index) {
      this.menuItems[index].click()
    }
  }
}
</script>
